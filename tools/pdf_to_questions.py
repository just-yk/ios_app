#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
IPA公式過去問PDF → アプリの問題形式(JS) 変換ツール

IPA（情報処理推進機構）が公開する午前問題PDFから「問N」と選択肢(ア/イ/ウ/エ)を
抜き出し、data/questions-ipa.js に貼れる形の JavaScript を生成します。
解答例（答え）を渡すと answer も埋めます。

⚠️ 使ってよいのは IPA公式が公開している試験問題のみ。出典(source)は自動で付与します。
   過去問道場など第三者サイトのコンテンツには使わないでください。

依存: PyMuPDF (pip install pymupdf)

使い方の例:
  python3 tools/pdf_to_questions.py \
      --pdf 2019h_fe_am_qs.pdf \
      --answers 2019h_fe_am_ans.txt \
      --exam "基本情報技術者試験" --term "令和元年度 秋期" --section "午前" \
      --id-prefix fe-r01a \
      --out tools/out/fe-r01a.js

解答ファイル(--answers)の書式（いずれもOK）:
  - .txt : 「1 ウ」「問1 ウ」「1,ウ」を1行ずつ  /  または「1ウ2エ3ア…」の連続
  - .json: {"1": "ウ", "2": "エ", ...}
  - .pdf : 「問1 ウ」等のパターンを自動抽出（IPAの解答例PDF・簡易対応）
  - 省略時: answer は null（後で手動入力）
"""

import argparse
import json
import os
import re
import sys
import tempfile
import urllib.request

try:
    import fitz  # PyMuPDF
except ImportError:
    sys.exit("PyMuPDF が必要です:  pip install pymupdf")

CHOICE_LABELS = ["ア", "イ", "ウ", "エ"]
LABEL_TO_INDEX = {c: i for i, c in enumerate(CHOICE_LABELS)}

# 行頭の「問N」
QNUM_RE = re.compile(r"^[\s　]*問\s*([0-9０-９]+)[\s　\.．]?\s*(.*)$")
# 行頭の選択肢マーカー（ア/イ/ウ/エ）
CHOICE_RE = re.compile(r"^[\s　]*([アイウエ])[\s　\.．、,，:：]*\s*(.*)$")
# 図表・プログラムなど、テキスト抽出だけでは不完全になりがちな問題の目印
# （「表した」等の誤検出を避けるため、図表は具体的な言い回しで判定する）
REVIEW_HINTS = [
    "次の図", "下の図", "図中", "図の", "図に示す", "図1", "図2",
    "次の表", "下の表", "表中", "表1", "表2",
    "プログラム", "ソースコード", "擬似言語", "副プログラム", "手続",
]

Z2H = str.maketrans("０１２３４５６７８９", "0123456789")


def resolve_source(path):
    """path が URL ならダウンロードして一時ファイルのパスを返す。ローカルパスはそのまま。"""
    if not path or not re.match(r"^https?://", path):
        return path, None
    sys.stderr.write("ダウンロード中: %s\n" % path)
    suffix = os.path.splitext(path.split("?")[0])[1] or ".bin"
    req = urllib.request.Request(path, headers={"User-Agent": "Mozilla/5.0 (pdf_to_questions)"})
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            tmp.write(resp.read())
        tmp.close()
    except Exception as e:
        tmp.close()
        os.unlink(tmp.name)
        sys.exit(
            "ダウンロードに失敗しました: %s\n  %s\n"
            "  ※この実行環境は外部Webが遮断されている場合があります。"
            "その場合はPDFをローカルに保存してパスを指定するか、ネット接続のあるPCで実行してください。"
            % (path, e))
    return tmp.name, tmp.name


def extract_lines(pdf_path):
    """PDF全ページのテキストを読み取り順（上→下, 左→右）で行リストにする。"""
    doc = fitz.open(pdf_path)
    lines = []
    for page in doc:
        # sort=True で段組みをおおむね読み順に整列
        text = page.get_text("text", sort=True)
        for raw in text.splitlines():
            s = raw.rstrip()
            if s.strip():
                lines.append(s)
    doc.close()
    return lines


def clean(text):
    s = re.sub(r"[ \t　]+", " ", text.replace("\n", " ")).strip()
    # 日本語の行折り返しで入った、全角文字どうしの間の半角スペースを除去
    prev = None
    while prev != s:
        prev = s
        s = re.sub(r"(?<=[^\x00-\x7F]) (?=[^\x00-\x7F])", "", s)
    return s


def parse_questions(lines):
    """行リストを [{num, stem, choices, review_reason}] に分解する。"""
    # 問Nごとにブロック分割
    blocks = []
    cur = None
    for line in lines:
        m = QNUM_RE.match(line)
        if m and not CHOICE_RE.match(line):
            if cur:
                blocks.append(cur)
            num = int(m.group(1).translate(Z2H))
            cur = {"num": num, "lines": [m.group(2)] if m.group(2).strip() else []}
        elif cur is not None:
            cur["lines"].append(line)
    if cur:
        blocks.append(cur)

    questions = []
    for b in blocks:
        stem_parts = []
        choices = []          # list of (label, [text lines])
        state = "stem"
        for line in b["lines"]:
            cm = CHOICE_RE.match(line)
            marker = cm.group(1) if cm else None
            expected_next = CHOICE_LABELS[len(choices)] if len(choices) < 4 else None
            if marker and marker == expected_next:
                choices.append([marker, [cm.group(2)] if cm.group(2).strip() else []])
                state = "choices"
            elif state == "choices" and choices:
                choices[-1][1].append(line)  # 折り返した選択肢テキスト
            else:
                stem_parts.append(line)

        reason = None
        if len(choices) != 4:
            reason = "選択肢を4つ検出できませんでした（%d個）" % len(choices)
        else:
            for hint in REVIEW_HINTS:
                if hint in " ".join(stem_parts):
                    reason = "図表・プログラム等を含む可能性（'%s'）— 内容を要確認" % hint
                    break

        questions.append({
            "num": b["num"],
            "stem": clean(" ".join(stem_parts)),
            "choices": [clean(" ".join(t)) for _, t in choices],
            "review_reason": reason,
        })
    return questions


def load_answers(path):
    """解答ファイルを {番号: 'ア'} の辞書にして返す。"""
    if not path:
        return {}
    ext = os.path.splitext(path)[1].lower()
    if ext == ".json":
        with open(path, encoding="utf-8") as f:
            return {int(str(k).translate(Z2H)): v.strip() for k, v in json.load(f).items()}
    if ext == ".pdf":
        text = " ".join(extract_lines(path))
    else:
        with open(path, encoding="utf-8") as f:
            text = f.read()

    ans = {}
    # 「問1 ウ」「1 ウ」「1,ウ」「1:ウ」形式
    for m in re.finditer(r"(?:問\s*)?([0-9０-９]+)\s*[\.．、,，:：\s]\s*([アイウエ])", text):
        ans[int(m.group(1).translate(Z2H))] = m.group(2)
    # 「1ウ2エ3ア…」の連続形式（上で拾えなかった場合の補完）
    if not ans:
        for m in re.finditer(r"([0-9０-９]+)([アイウエ])", text):
            ans[int(m.group(1).translate(Z2H))] = m.group(2)
    return ans


def js_string(s):
    return json.dumps(s, ensure_ascii=False)


def build_js(questions, answers, args):
    items = []
    stats = {"total": 0, "with_answer": 0, "review": 0}
    for q in questions:
        stats["total"] += 1
        label = answers.get(q["num"])
        answer_idx = LABEL_TO_INDEX.get(label) if label else None
        if answer_idx is not None:
            stats["with_answer"] += 1
        review = q["review_reason"]
        if review:
            stats["review"] += 1

        qid = "%s-q%02d" % (args.id_prefix, q["num"])
        source = "IPA %s %s %s 問%d" % (args.exam, args.term, args.section, q["num"])

        lines = []
        if review:
            lines.append("  // ⚠️ 要確認: %s" % review)
        lines.append("  {")
        lines.append('    id: %s, category: %s, field: %s,' % (
            js_string(qid), js_string(args.category), js_string(args.field)))
        lines.append("    q: %s," % js_string(q["stem"]))
        choices = q["choices"] + [""] * (4 - len(q["choices"])) if len(q["choices"]) < 4 else q["choices"]
        lines.append("    choices: [%s]," % ", ".join(js_string(c) for c in choices))
        lines.append("    answer: %s," % ("null" if answer_idx is None else str(answer_idx)))
        lines.append("    explanation: %s," % js_string(""))
        lines.append("    source: %s" % js_string(source))
        lines.append("  }")
        items.append("\n".join(lines))

    header = (
        "/* 自動生成: tools/pdf_to_questions.py\n"
        "   出典: IPA %s %s %s\n"
        "   ※ answer が null / '⚠️ 要確認' の項目は、原本PDFと照合して手で修正してください。\n"
        "      explanation（解説）は空です。必要に応じて追記してください。 */\n"
        "(function () {\n  var list = [\n"
    ) % (args.exam, args.term, args.section)
    footer = "\n  ];\n  window.QUESTIONS = (window.QUESTIONS || []).concat(list.filter(function(x){return x.answer !== null;}));\n})();\n"
    body = ",\n".join(items)
    return header + body + footer, stats


def main():
    ap = argparse.ArgumentParser(description="IPA午前PDF → 問題JS 変換")
    ap.add_argument("--pdf", required=True, help="午前問題のPDF（ローカルパス または http(s) URL）")
    ap.add_argument("--answers", help="解答ファイル(.txt/.json/.pdf)。URLも可")
    ap.add_argument("--exam", default="基本情報技術者試験")
    ap.add_argument("--term", required=True, help='例: "令和元年度 秋期"')
    ap.add_argument("--section", default="午前")
    ap.add_argument("--category", default="technology",
                    help="technology|management|strategy（既定 technology）")
    ap.add_argument("--field", default="", help="分野名（任意）")
    ap.add_argument("--id-prefix", default="ipa", help='id接頭辞。例: fe-r01a')
    ap.add_argument("--out", help="出力先JSパス（省略時は標準出力）")
    args = ap.parse_args()

    # URL 指定ならダウンロードしてから処理（後片付け用に一時ファイル名を控える）
    tmp_files = []
    pdf_path, t1 = resolve_source(args.pdf)
    ans_path, t2 = resolve_source(args.answers)
    tmp_files += [t for t in (t1, t2) if t]

    try:
        lines = extract_lines(pdf_path)
        questions = parse_questions(lines)
        answers = load_answers(ans_path)
        js, stats = build_js(questions, answers, args)
    finally:
        for t in tmp_files:
            try:
                os.unlink(t)
            except OSError:
                pass

    if args.out:
        os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(js)

    sys.stderr.write(
        "検出 %d問 / 解答あり %d問 / 要確認 %d問\n" % (
            stats["total"], stats["with_answer"], stats["review"]))
    if args.out:
        sys.stderr.write("→ 生成: %s（内容を確認のうえ data/questions-ipa.js へ反映してください）\n" % args.out)
    else:
        sys.stdout.write(js)


if __name__ == "__main__":
    main()
