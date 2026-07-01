# 資格合格トレーニング（IT系資格 学習アプリ）

基本情報技術者などの **IT系資格** の勉強用アプリです。iPhone の Safari で開き、
「ホーム画面に追加」するとネイティブアプリのように全画面で使えます（PWA）。

## 特長

- 📱 **iPhone最適化** … 縦画面・大きめボタン・セーフエリア対応
- 📚 **分野別出題** … テクノロジ / マネジメント / ストラテジ
- 🔁 **復習モード** … 間違えた問題だけをもう一度出題
- 📊 **進捗記録** … 正答率・学習した問題数を端末内に保存（localStorage）
- 🔌 **オフライン対応** … 一度開けば電波がなくても使える（Service Worker）
- 🧩 **問題の追加が簡単** … `data/questions.js` に追記するだけ

## 使い方（iPhone）

1. アプリを配信（下記「動かし方」）し、iPhone の Safari で URL を開く
2. 共有ボタン → **「ホーム画面に追加」**
3. ホーム画面のアイコンから起動（全画面で起動します）

## 動かし方（ローカル確認）

`file://` では Service Worker が動かないため、簡易サーバー経由で開きます。

```bash
# このフォルダで
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

同じ Wi-Fi 上の iPhone から確認する場合は、PCのローカルIP（例 `http://192.168.x.x:8000`）を開きます。
本番公開は GitHub Pages / Netlify / Vercel などに静的ファイルを置くだけでOKです（HTTPS 必須）。

## 問題の追加・編集

`data/questions.js` の `window.QUESTIONS` 配列に要素を足します。

```js
{
  id: "t999",                 // 一意のID（進捗の保存キー）
  category: "technology",     // technology | management | strategy
  field: "ネットワーク",       // 分野名（結果画面の内訳に表示）
  q: "問題文",
  choices: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"],
  answer: 1,                  // 正解の choices インデックス（0始まり）
  explanation: "解説文"
}
```

## ファイル構成

```
index.html              画面のマークアップ
css/style.css           スタイル（ダークテーマ・モバイル最適化）
js/app.js               アプリ本体（バニラJS・進捗管理）
data/questions.js       問題データ
manifest.webmanifest    PWA設定（ホーム画面アイコン等）
sw.js                   Service Worker（オフライン対応）
icons/                  アイコン（gen_icons.py で再生成可能）
```

## 今後：本格的なネイティブアプリ化について

現在は Web/PWA 版です。App Store 配信ができる本格的なネイティブアプリにするには、
主に次の 2 ルートがあります。

### ルートA：SwiftUI（純ネイティブ・おすすめ）
- **必要なもの**：Mac（macOS）+ **Xcode**（無料）、iPhone実機（任意）、
  App Store 配信するなら **Apple Developer Program**（年 約 99 USD）
- この Web 版の問題データ（`questions.js`）と画面設計をそのまま Swift に移植できます

### ルートB：この PWA を薄いネイティブに包む
- **Capacitor**（`npx cap add ios`）で、いまの Web 版をほぼそのまま iOS アプリ化
- ビルド時は結局 Mac + Xcode が必要ですが、コードの大部分を再利用できます

> まずは今の PWA で内容（問題・UX）を固め、方向性が決まったら上記どちらかへ移行するのが
> 手戻りが少なくおすすめです。ネイティブ化に進む際は声をかけてください。
