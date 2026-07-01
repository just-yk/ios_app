/*
 * 問題データ（基本情報技術者 想定のサンプル）
 * category: "technology" | "management" | "strategy"
 * answer: choices 配列の正解インデックス（0始まり）
 *
 * 問題を追加・編集するときはこの配列に要素を足すだけでOK。
 * id は重複しない一意の文字列にしてください（進捗の保存キーになります）。
 */
window.QUESTIONS = [
  {
    id: "t001", category: "technology", field: "基礎理論",
    q: "2進数 1011 を10進数で表したものはどれか。",
    choices: ["9", "11", "13", "15"],
    answer: 1,
    explanation: "1011(2) = 8+0+2+1 = 11。各桁は2の累乗（8,4,2,1）に対応します。"
  },
  {
    id: "t002", category: "technology", field: "基礎理論",
    q: "8ビットで表現できる符号なし整数の最大値はどれか。",
    choices: ["127", "128", "255", "256"],
    answer: 2,
    explanation: "符号なし8ビットは 0〜2^8-1 = 0〜255 を表現できます。"
  },
  {
    id: "t003", category: "technology", field: "アルゴリズム",
    q: "データ数 n に対して、二分探索の平均計算量はどれか。",
    choices: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: 1,
    explanation: "二分探索は探索範囲を毎回半分にするため O(log n)。ただし配列は整列済みが前提です。"
  },
  {
    id: "t004", category: "technology", field: "アルゴリズム",
    q: "後入れ先出し（LIFO）でデータを管理するデータ構造はどれか。",
    choices: ["キュー", "スタック", "ヒープ", "リスト"],
    answer: 1,
    explanation: "スタックはLIFO（Last In First Out）。キューはFIFO（先入れ先出し）です。"
  },
  {
    id: "t005", category: "technology", field: "コンピュータ構成",
    q: "CPUが主記憶より高速な小容量メモリを介して処理を高速化する仕組みはどれか。",
    choices: ["仮想記憶", "キャッシュメモリ", "スワップ", "レジスタファイル"],
    answer: 1,
    explanation: "キャッシュメモリはCPUと主記憶の速度差を埋める高速メモリです。"
  },
  {
    id: "t006", category: "technology", field: "ソフトウェア",
    q: "OSが複数のプロセスにCPU時間を短い時間ごとに割り当てて並行実行させる方式はどれか。",
    choices: ["バッチ処理", "タイムシェアリング", "リアルタイム処理", "スプーリング"],
    answer: 1,
    explanation: "タイムシェアリング（時分割）方式では、短いタイムスライスを順に割り当てます。"
  },
  {
    id: "t007", category: "technology", field: "データベース",
    q: "関係データベースで、行を一意に識別するために設定する項目はどれか。",
    choices: ["外部キー", "主キー", "インデックス", "ビュー"],
    answer: 1,
    explanation: "主キー（プライマリキー）は各行を一意に識別します。値の重複とNULLは許されません。"
  },
  {
    id: "t008", category: "technology", field: "データベース",
    q: "SQLで、条件に一致する行を取り出す操作を表す句はどれか。",
    choices: ["SELECT ... WHERE", "INSERT INTO", "CREATE TABLE", "GRANT"],
    answer: 0,
    explanation: "WHERE句で抽出条件を指定します。INSERTは追加、CREATEは定義、GRANTは権限付与です。"
  },
  {
    id: "t009", category: "technology", field: "ネットワーク",
    q: "IPアドレスとMACアドレスの対応を解決するプロトコルはどれか。",
    choices: ["DNS", "ARP", "DHCP", "ICMP"],
    answer: 1,
    explanation: "ARPはIPアドレスから同一ネットワーク上のMACアドレスを求めます。DNSは名前解決です。"
  },
  {
    id: "t010", category: "technology", field: "ネットワーク",
    q: "TCP/IPで、ホスト名からIPアドレスを求める仕組みはどれか。",
    choices: ["DHCP", "DNS", "NAT", "SMTP"],
    answer: 1,
    explanation: "DNS（Domain Name System）がドメイン名とIPアドレスを対応付けます。"
  },
  {
    id: "t011", category: "technology", field: "セキュリティ",
    q: "公開鍵暗号方式の説明として正しいものはどれか。",
    choices: [
      "暗号化と復号に同じ鍵を使う",
      "暗号化と復号に異なる鍵（公開鍵と秘密鍵）を使う",
      "鍵を使わずハッシュのみで暗号化する",
      "常に共通鍵より高速である"
    ],
    answer: 1,
    explanation: "公開鍵暗号は公開鍵で暗号化し秘密鍵で復号します。共通鍵方式より一般に低速です。"
  },
  {
    id: "t012", category: "technology", field: "セキュリティ",
    q: "利用者が知っている情報（パスワード）と持っている物（スマホ等）を組み合わせて認証する方式はどれか。",
    choices: ["シングルサインオン", "多要素認証", "バイオメトリクス認証", "チャレンジレスポンス"],
    answer: 1,
    explanation: "知識・所持・生体などの異なる要素を2つ以上組み合わせるのが多要素認証です。"
  },
  {
    id: "t013", category: "technology", field: "セキュリティ",
    q: "Webアプリで、入力値を通じて不正なSQLを実行させる攻撃はどれか。",
    choices: ["クロスサイトスクリプティング", "SQLインジェクション", "DoS攻撃", "フィッシング"],
    answer: 1,
    explanation: "SQLインジェクションは入力を悪用して意図しないSQLを実行させます。対策はプレースホルダ利用など。"
  },
  {
    id: "m001", category: "management", field: "プロジェクトマネジメント",
    q: "作業を階層的に分解し、プロジェクトの全体像を管理する図はどれか。",
    choices: ["WBS", "アローダイアグラム", "ガントチャート", "PERT図"],
    answer: 0,
    explanation: "WBS（Work Breakdown Structure）は作業を階層的に細分化した構造です。"
  },
  {
    id: "m002", category: "management", field: "プロジェクトマネジメント",
    q: "アローダイアグラムで、遅れると全体の完了が遅れる一連の作業経路を何というか。",
    choices: ["ダミー作業", "クリティカルパス", "マイルストーン", "リードタイム"],
    answer: 1,
    explanation: "所要日数が最長の経路がクリティカルパスで、余裕（フロート）がありません。"
  },
  {
    id: "m003", category: "management", field: "サービスマネジメント",
    q: "ITサービスの品質を維持・向上させるための、提供者と利用者間の合意文書はどれか。",
    choices: ["SLA", "RFP", "NDA", "MOU"],
    answer: 0,
    explanation: "SLA（Service Level Agreement）はサービス水準を数値目標で合意する文書です。"
  },
  {
    id: "m004", category: "management", field: "システム監査",
    q: "システム監査人に求められる立場として正しいものはどれか。",
    choices: ["開発担当として実装する", "被監査部門から独立している", "経営者の指示に無条件に従う", "利用者の代表を兼ねる"],
    answer: 1,
    explanation: "監査の客観性・信頼性を保つため、監査人は被監査部門から独立している必要があります。"
  },
  {
    id: "s001", category: "strategy", field: "経営戦略",
    q: "自社の強み・弱み・機会・脅威を分析するフレームワークはどれか。",
    choices: ["SWOT分析", "PPM", "3C分析", "バリューチェーン"],
    answer: 0,
    explanation: "SWOTはStrength/Weakness/Opportunity/Threatの4象限で分析します。"
  },
  {
    id: "s002", category: "strategy", field: "経営戦略",
    q: "製品を「市場成長率」と「市場占有率」の2軸で分類し、資源配分を検討する手法はどれか。",
    choices: ["SWOT分析", "PPM（プロダクトポートフォリオマネジメント）", "PEST分析", "ファイブフォース"],
    answer: 1,
    explanation: "PPMは花形・金のなる木・問題児・負け犬の4象限に分類します。"
  },
  {
    id: "s003", category: "strategy", field: "法務",
    q: "著作権法において、プログラムは原則としてどのように扱われるか。",
    choices: ["特許権で保護される", "著作物として保護される", "保護対象外である", "商標として登録が必要"],
    answer: 1,
    explanation: "プログラムは著作物として著作権法で保護されます（アイデアではなく表現が対象）。"
  },
  {
    id: "s004", category: "strategy", field: "企業活動",
    q: "損益分岐点の説明として正しいものはどれか。",
    choices: [
      "売上高と変動費が等しくなる点",
      "売上高と総費用（固定費+変動費）が等しくなる点",
      "利益が最大になる点",
      "固定費がゼロになる点"
    ],
    answer: 1,
    explanation: "損益分岐点は売上高＝総費用となり、利益も損失もゼロになる点です。"
  }
];
