/*
 * 資格合格トレーニング — アプリ本体（フレームワークなしのバニラJS）
 * 進捗は localStorage に保存します。
 */
(function () {
  "use strict";

  var STORAGE_KEY = "shikaku-tore.progress.v1";

  var CATEGORIES = [
    { id: "all", title: "すべての分野", sub: "全問題からランダム出題", emoji: "📚" },
    { id: "technology", title: "テクノロジ系", sub: "アルゴリズム・DB・NW・セキュリティ 他", emoji: "💻" },
    { id: "management", title: "マネジメント系", sub: "プロジェクト・サービス・監査", emoji: "📋" },
    { id: "strategy", title: "ストラテジ系", sub: "経営戦略・法務・企業活動", emoji: "📈" }
  ];

  var CATEGORY_LABEL = {
    technology: "テクノロジ系",
    management: "マネジメント系",
    strategy: "ストラテジ系"
  };

  // ---- 状態 ----
  var state = {
    selectedCategory: "all",
    reviewOnly: false,
    shuffle: true,
    queue: [],       // 出題する問題オブジェクトの配列
    index: 0,
    answered: false,
    results: []      // { question, correct }
  };

  // ---- 進捗の永続化 ----
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function recordAnswer(qid, correct) {
    var p = loadProgress();
    var rec = p[qid] || { seen: 0, correct: 0, wrong: 0 };
    rec.seen += 1;
    if (correct) rec.correct += 1; else rec.wrong += 1;
    rec.lastCorrect = correct;
    p[qid] = rec;
    saveProgress(p);
  }
  function wrongQuestionIds() {
    var p = loadProgress();
    return Object.keys(p).filter(function (id) {
      return p[id].lastCorrect === false;
    });
  }

  // ---- DOM ヘルパ ----
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function show(screenId) {
    ["screen-home", "screen-quiz", "screen-result"].forEach(function (s) {
      $(s).classList.toggle("hidden", s !== screenId);
    });
    window.scrollTo(0, 0);
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // ---- ホーム画面の描画 ----
  function renderHome() {
    // 統計
    var p = loadProgress();
    var ids = Object.keys(p);
    var totalSeen = ids.length;
    var totalAnswers = 0, totalCorrect = 0;
    ids.forEach(function (id) {
      totalAnswers += p[id].seen;
      totalCorrect += p[id].correct;
    });
    var rate = totalAnswers ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

    var stats = $("home-stats");
    stats.innerHTML = "";
    [
      { num: window.QUESTIONS.length, label: "収録問題数" },
      { num: totalSeen, label: "学習した問題" },
      { num: rate + "%", label: "累計正答率", good: rate >= 70 }
    ].forEach(function (s) {
      var card = el("div", "stat-card");
      card.appendChild(el("div", "num" + (s.good ? " good" : ""), String(s.num)));
      card.appendChild(el("div", "label", s.label));
      stats.appendChild(card);
    });

    // カテゴリ
    var list = $("category-list");
    list.innerHTML = "";
    CATEGORIES.forEach(function (c) {
      var count = c.id === "all"
        ? window.QUESTIONS.length
        : window.QUESTIONS.filter(function (q) { return q.category === c.id; }).length;
      var item = el("div", "category-item" + (state.selectedCategory === c.id ? " selected" : ""));
      item.appendChild(el("div", "emoji", c.emoji));
      var body = el("div", "ci-body");
      body.appendChild(el("div", "ci-title", escapeHtml(c.title)));
      body.appendChild(el("div", "ci-sub", escapeHtml(c.sub) + " ・ " + count + "問"));
      item.appendChild(body);
      item.appendChild(el("div", "ci-check", "✓"));
      item.addEventListener("click", function () {
        state.selectedCategory = c.id;
        renderHome();
      });
      list.appendChild(item);
    });

    // 復習モードの注記
    var wrong = wrongQuestionIds().length;
    $("wrong-count-note").textContent = wrong > 0 ? ("復習できる問題: " + wrong + "問") : "間違えた問題はまだありません";
    $("mode-review").checked = state.reviewOnly;
    $("mode-shuffle").checked = state.shuffle;
  }

  // ---- 出題キューの構築 ----
  function buildQueue() {
    var pool = window.QUESTIONS.slice();
    if (state.selectedCategory !== "all") {
      pool = pool.filter(function (q) { return q.category === state.selectedCategory; });
    }
    if (state.reviewOnly) {
      var wrong = wrongQuestionIds();
      pool = pool.filter(function (q) { return wrong.indexOf(q.id) !== -1; });
    }
    if (state.shuffle) pool = shuffleArray(pool);
    return pool;
  }

  // ---- クイズ開始 ----
  function startQuiz() {
    var queue = buildQueue();
    if (queue.length === 0) {
      alert(state.reviewOnly
        ? "復習できる問題がありません。まずは通常モードで問題を解いてみましょう。"
        : "この分野の問題がありません。");
      return;
    }
    state.queue = queue;
    state.index = 0;
    state.results = [];
    show("screen-quiz");
    renderQuestion();
  }

  function renderQuestion() {
    state.answered = false;
    var q = state.queue[state.index];

    // 進捗バー
    var pct = Math.round((state.index / state.queue.length) * 100);
    $("progress-fill").style.width = pct + "%";
    $("progress-text").textContent = (state.index + 1) + " / " + state.queue.length;

    var fieldLabel = (CATEGORY_LABEL[q.category] || "") + (q.field ? " ・ " + q.field : "");
    $("q-meta").textContent = fieldLabel;
    $("q-text").textContent = q.q;

    var box = $("choices");
    box.innerHTML = "";
    q.choices.forEach(function (choice, i) {
      var btn = el("button", "choice");
      btn.appendChild(el("div", "marker", String.fromCharCode(65 + i))); // A,B,C,D
      btn.appendChild(el("div", "choice-text", escapeHtml(choice)));
      btn.addEventListener("click", function () { onAnswer(i); });
      box.appendChild(btn);
    });

    var exp = $("explanation");
    exp.className = "explanation hidden";
    exp.innerHTML = "";
    $("btn-next").classList.add("hidden");
  }

  function onAnswer(chosen) {
    if (state.answered) return;
    state.answered = true;
    var q = state.queue[state.index];
    var correct = chosen === q.answer;

    var nodes = $("choices").children;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add("disabled");
      if (i === q.answer) nodes[i].classList.add("correct");
      else if (i === chosen) nodes[i].classList.add("wrong");
    }

    recordAnswer(q.id, correct);
    state.results.push({ question: q, correct: correct });

    var exp = $("explanation");
    exp.className = "explanation " + (correct ? "ok" : "ng");
    exp.innerHTML =
      '<div class="exp-head">' + (correct ? "正解！" : "不正解") + "</div>" +
      '<div class="exp-body">' + escapeHtml(q.explanation || "") + "</div>";
    exp.classList.remove("hidden");

    var next = $("btn-next");
    next.textContent = (state.index + 1 >= state.queue.length) ? "結果を見る" : "次へ";
    next.classList.remove("hidden");

    if (navigator.vibrate) navigator.vibrate(correct ? 15 : [10, 40, 10]);
  }

  function nextQuestion() {
    state.index += 1;
    if (state.index >= state.queue.length) {
      renderResult();
    } else {
      renderQuestion();
      window.scrollTo(0, 0);
    }
  }

  // ---- 結果画面 ----
  function renderResult() {
    var total = state.results.length;
    var correct = state.results.filter(function (r) { return r.correct; }).length;
    var rate = total ? Math.round((correct / total) * 100) : 0;

    $("result-emoji").textContent = rate >= 80 ? "🎉" : rate >= 60 ? "👍" : "💪";
    $("result-score").textContent = correct + " / " + total;
    $("result-rate").textContent = "正答率 " + rate + "%";

    // 分野別の内訳
    var byField = {};
    state.results.forEach(function (r) {
      var key = r.question.field || CATEGORY_LABEL[r.question.category] || "その他";
      byField[key] = byField[key] || { total: 0, correct: 0 };
      byField[key].total += 1;
      if (r.correct) byField[key].correct += 1;
    });
    var bd = $("result-breakdown");
    bd.innerHTML = "";
    Object.keys(byField).forEach(function (key) {
      var v = byField[key];
      var pct = Math.round((v.correct / v.total) * 100);
      var row = el("div", "breakdown-row");
      var left = el("div");
      left.appendChild(el("div", null, escapeHtml(key)));
      var barWrap = el("div", null);
      barWrap.style.cssText = "width:120px;height:6px;background:#334155;border-radius:999px;margin-top:8px;overflow:hidden;";
      var bar = el("div", "bar");
      bar.style.width = pct + "%";
      if (pct < 60) bar.style.background = "#ef4444";
      else if (pct < 80) bar.style.background = "#f59e0b";
      barWrap.appendChild(bar);
      left.appendChild(barWrap);
      row.appendChild(left);
      row.appendChild(el("div", "bd-count", v.correct + "/" + v.total));
      bd.appendChild(row);
    });

    var wrongExists = state.results.some(function (r) { return !r.correct; });
    $("btn-retry-wrong").classList.toggle("hidden", !wrongExists);

    show("screen-result");
  }

  // ---- イベント登録 ----
  function bind() {
    $("btn-start").addEventListener("click", startQuiz);
    $("btn-next").addEventListener("click", nextQuestion);
    $("btn-quit").addEventListener("click", function () {
      if (confirm("学習を中断してホームに戻りますか？（ここまでの解答は記録されています）")) {
        renderHome();
        show("screen-home");
      }
    });
    $("btn-home").addEventListener("click", function () {
      renderHome();
      show("screen-home");
    });
    $("btn-retry-wrong").addEventListener("click", function () {
      // 直前セッションで間違えた問題だけを再出題
      var wrongQs = state.results.filter(function (r) { return !r.correct; }).map(function (r) { return r.question; });
      state.queue = state.shuffle ? shuffleArray(wrongQs) : wrongQs;
      state.index = 0;
      state.results = [];
      show("screen-quiz");
      renderQuestion();
    });
    $("mode-review").addEventListener("change", function (e) { state.reviewOnly = e.target.checked; renderHome(); });
    $("mode-shuffle").addEventListener("change", function (e) { state.shuffle = e.target.checked; });
    $("btn-reset").addEventListener("click", function () {
      if (confirm("学習データ（正答率・復習リスト）をすべて削除します。よろしいですか？")) {
        localStorage.removeItem(STORAGE_KEY);
        renderHome();
      }
    });
  }

  // ---- 起動 ----
  function init() {
    if (!window.QUESTIONS || !window.QUESTIONS.length) {
      $("home-stats").innerHTML = "<p>問題データを読み込めませんでした。</p>";
      return;
    }
    bind();
    renderHome();
    show("screen-home");

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("sw.js").catch(function () {});
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
