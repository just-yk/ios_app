/*
 * 問題データ（基本情報技術者 想定のサンプル）
 * category: "technology" | "management" | "strategy"
 * answer: choices 配列の正解インデックス（0始まり）
 *
 * 問題を追加・編集するときはこの配列に要素を足すだけでOK。
 * id は重複しない一意の文字列にしてください（進捗の保存キーになります）。
 *
 * source（任意）: 出典。IPA公式過去問を引用する場合は必ず明記する。
 *   例: source: "IPA 基本情報技術者試験 令和元年秋期 午前 問1"
 *   ※ 過去問道場など第三者サイトの問題文・解説の転載は不可（著作権・規約）。
 *      オリジナル問題には source を付けなくてよい。
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
  },

  // ===== 追加問題（オリジナル・科目A向け） =====
  {
    id: "t014", category: "technology", field: "基礎理論",
    q: "16進数 2A を10進数で表したものはどれか。",
    choices: ["21", "32", "42", "52"],
    answer: 2,
    explanation: "2A(16) = 2×16 + 10 = 42。A は10を表します。"
  },
  {
    id: "t015", category: "technology", field: "基礎理論",
    q: "2つの2進数 1100 と 1010 の排他的論理和（XOR）はどれか。",
    choices: ["0110", "1110", "1000", "0100"],
    answer: 0,
    explanation: "XORは各ビットが異なるとき1。1100 XOR 1010 = 0110 です。"
  },
  {
    id: "t016", category: "technology", field: "基礎理論",
    q: "8ビットの2の補数表現で、10進数 -5 を表したものはどれか。",
    choices: ["10000101", "11111010", "11111011", "00000101"],
    answer: 2,
    explanation: "+5=00000101 の各ビットを反転（11111010）し1を加えると 11111011 になります。"
  },
  {
    id: "t017", category: "technology", field: "アルゴリズム",
    q: "バブルソートで n 個のデータを整列するときの最悪計算量はどれか。",
    choices: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"],
    answer: 3,
    explanation: "バブルソートは隣接要素の比較交換を繰り返すため、最悪・平均とも O(n^2) です。"
  },
  {
    id: "t018", category: "technology", field: "アルゴリズム",
    q: "先入れ先出し（FIFO）でデータを管理するデータ構造はどれか。",
    choices: ["スタック", "キュー", "木", "ハッシュ表"],
    answer: 1,
    explanation: "キューはFIFO（First In First Out）。最初に入れたデータが最初に取り出されます。"
  },
  {
    id: "t019", category: "technology", field: "コンピュータ構成",
    q: "稼働率 0.9 の装置を2台直列に接続したシステム全体の稼働率はどれか。",
    choices: ["0.81", "0.90", "0.95", "0.99"],
    answer: 0,
    explanation: "直列は全装置が稼働して初めて動くため 0.9×0.9 = 0.81 です。"
  },
  {
    id: "t020", category: "technology", field: "コンピュータ構成",
    q: "稼働率 0.9 の装置を2台並列（片方が動けばよい）にしたシステムの稼働率はどれか。",
    choices: ["0.81", "0.90", "0.95", "0.99"],
    answer: 3,
    explanation: "並列は両方同時に故障したときだけ停止するため 1-(1-0.9)^2 = 0.99 です。"
  },
  {
    id: "t021", category: "technology", field: "コンピュータ構成",
    q: "複数の磁気ディスクにデータを分散し、冗長性を持たせて信頼性を高める技術はどれか。",
    choices: ["RAID", "キャッシュ", "仮想記憶", "スプーリング"],
    answer: 0,
    explanation: "RAIDは複数ディスクを組み合わせ、ミラーリングやパリティで信頼性・性能を高めます。"
  },
  {
    id: "t022", category: "technology", field: "ソフトウェア",
    q: "複数のプロセスが互いに相手の資源解放を待ち続け、処理が進まなくなる状態はどれか。",
    choices: ["スラッシング", "デッドロック", "フラグメンテーション", "ページフォールト"],
    answer: 1,
    explanation: "デッドロックは資源の奪い合いで相互に待ち続ける状態。回避には資源要求順序の統一などがあります。"
  },
  {
    id: "t023", category: "technology", field: "ソフトウェア",
    q: "仮想記憶方式で、主記憶と補助記憶の間でページの入れ替えが頻発し性能が極端に低下する現象はどれか。",
    choices: ["デッドロック", "スラッシング", "スワップアウト", "ガベージコレクション"],
    answer: 1,
    explanation: "スラッシングはページ置換が多発してCPUが本来の処理をほとんど行えなくなる状態です。"
  },
  {
    id: "t024", category: "technology", field: "ハードウェア",
    q: "入力Aと入力Bがともに1のときだけ出力が1になる論理回路はどれか。",
    choices: ["OR回路", "AND回路", "NOT回路", "NAND回路"],
    answer: 1,
    explanation: "AND回路はすべての入力が1のときのみ出力1。ORはいずれか1で1になります。"
  },
  {
    id: "t025", category: "technology", field: "データベース",
    q: "関係データベースの正規化を行う主な目的はどれか。",
    choices: [
      "検索速度を必ず速くするため",
      "データの重複や不整合（更新時異常）を防ぐため",
      "ディスク容量を必ず増やすため",
      "SQL文を書けなくするため"
    ],
    answer: 1,
    explanation: "正規化はデータの重複を排除し、更新・挿入・削除時の不整合を防ぐために行います。"
  },
  {
    id: "t026", category: "technology", field: "データベース",
    q: "トランザクションが持つべき4つの特性 ACID に含まれないものはどれか。",
    choices: ["原子性（Atomicity）", "一貫性（Consistency）", "独立性（Isolation）", "冗長性（Redundancy）"],
    answer: 3,
    explanation: "ACIDは原子性・一貫性・独立性・持続性（Durability）。冗長性は含まれません。"
  },
  {
    id: "t027", category: "technology", field: "データベース",
    q: "トランザクション処理で、更新を確定させる操作はどれか。",
    choices: ["ロールバック", "コミット", "チェックポイント", "デッドロック"],
    answer: 1,
    explanation: "コミットで更新を確定。異常時はロールバックで開始前の状態に戻します。"
  },
  {
    id: "t028", category: "technology", field: "ネットワーク",
    q: "サブネットマスクが 255.255.255.0（/24）のネットワークで、割り当て可能なホスト数はどれか。",
    choices: ["16台", "128台", "254台", "256台"],
    answer: 2,
    explanation: "ホスト部は8ビットで 2^8=256。ネットワークアドレスとブロードキャストを除き 254 台です。"
  },
  {
    id: "t029", category: "technology", field: "ネットワーク",
    q: "HTTPS通信で標準的に使われるポート番号はどれか。",
    choices: ["21", "80", "443", "25"],
    answer: 2,
    explanation: "HTTPSは443番。HTTPは80、FTPは21、SMTPは25です。"
  },
  {
    id: "t030", category: "technology", field: "ネットワーク",
    q: "OSI基本参照モデルの階層数はいくつか。",
    choices: ["4層", "5層", "7層", "8層"],
    answer: 2,
    explanation: "OSI参照モデルは物理・データリンク・ネットワーク・トランスポート・セッション・プレゼンテーション・アプリケーションの7層です。"
  },
  {
    id: "t031", category: "technology", field: "セキュリティ",
    q: "情報セキュリティの3要素（CIA）に含まれるものの組合せはどれか。",
    choices: [
      "機密性・完全性・可用性",
      "機密性・効率性・拡張性",
      "正確性・完全性・冗長性",
      "可用性・保守性・移植性"
    ],
    answer: 0,
    explanation: "CIAは Confidentiality（機密性）・Integrity（完全性）・Availability（可用性）です。"
  },
  {
    id: "t032", category: "technology", field: "セキュリティ",
    q: "ディジタル署名で、送信者が署名を生成するときに使う鍵はどれか。",
    choices: ["受信者の公開鍵", "受信者の秘密鍵", "送信者の公開鍵", "送信者の秘密鍵"],
    answer: 3,
    explanation: "送信者は自分の秘密鍵で署名し、受信者は送信者の公開鍵で検証します。これで完全性と否認防止を実現します。"
  },
  {
    id: "t033", category: "technology", field: "セキュリティ",
    q: "Webページに不正なスクリプトを埋め込み、閲覧者のブラウザ上で実行させる攻撃はどれか。",
    choices: ["SQLインジェクション", "クロスサイトスクリプティング（XSS）", "ブルートフォース攻撃", "中間者攻撃"],
    answer: 1,
    explanation: "XSSは入力値のエスケープ不備を突き、他人のブラウザで悪意あるスクリプトを実行させます。"
  },
  {
    id: "t034", category: "technology", field: "セキュリティ",
    q: "リスク対応のうち「保険をかけて損失を第三者に肩代わりしてもらう」方法はどれか。",
    choices: ["リスク回避", "リスク低減", "リスク移転", "リスク受容"],
    answer: 2,
    explanation: "リスク移転は保険や外部委託などで損失を第三者へ移す対応です。"
  },
  {
    id: "m005", category: "management", field: "プロジェクトマネジメント",
    q: "ソフトウェアの規模を、入出力やファイル数などの機能単位から見積もる手法はどれか。",
    choices: ["ファンクションポイント法", "COCOMO", "類推見積り", "デルファイ法"],
    answer: 0,
    explanation: "ファンクションポイント法は機能の数と複雑さから規模を定量化する見積り手法です。"
  },
  {
    id: "m006", category: "management", field: "ソフトウェア開発管理",
    q: "プログラムの内部構造には着目せず、入力と出力の関係だけで仕様どおり動くか検証するテストはどれか。",
    choices: ["ホワイトボックステスト", "ブラックボックステスト", "単体テスト", "回帰テスト"],
    answer: 1,
    explanation: "ブラックボックステストは内部ロジックを見ず、外部仕様（入出力）に基づいて検証します。"
  },
  {
    id: "m007", category: "management", field: "サービスマネジメント",
    q: "ITILにおいて、サービスの中断を可能な限り迅速に復旧させることを目的とする活動はどれか。",
    choices: ["問題管理", "インシデント管理", "変更管理", "容量管理"],
    answer: 1,
    explanation: "インシデント管理はサービス復旧の迅速化が目的。根本原因の除去は問題管理が担います。"
  },
  {
    id: "m008", category: "management", field: "システム監査",
    q: "監査の過程で、監査人が結論の裏付けとして収集する記録や資料を何というか。",
    choices: ["監査証跡", "監査調書", "監査証拠", "監査計画書"],
    answer: 2,
    explanation: "監査証拠は結論を裏付ける事実・資料。証跡（監査証跡）は処理を追跡できる記録の連なりを指します。"
  },
  {
    id: "s005", category: "strategy", field: "経営戦略",
    q: "顧客（Customer）・競合（Competitor）・自社（Company）の3つの視点から市場環境を分析する手法はどれか。",
    choices: ["SWOT分析", "3C分析", "PPM", "バリューチェーン分析"],
    answer: 1,
    explanation: "3C分析は Customer・Competitor・Company の頭文字。市場と競合、自社の関係を整理します。"
  },
  {
    id: "s006", category: "strategy", field: "企業活動",
    q: "取得原価100万円、残存価額0円、耐用年数5年の設備を定額法で減価償却するとき、1年あたりの償却費はどれか。",
    choices: ["10万円", "20万円", "25万円", "50万円"],
    answer: 1,
    explanation: "定額法は（取得原価−残存価額）÷耐用年数 = 100万÷5 = 20万円/年 です。"
  },
  {
    id: "s007", category: "strategy", field: "企業活動",
    q: "自己資本利益率（ROE）の計算式として正しいものはどれか。",
    choices: [
      "当期純利益 ÷ 自己資本",
      "売上高 ÷ 総資産",
      "営業利益 ÷ 売上高",
      "負債 ÷ 自己資本"
    ],
    answer: 0,
    explanation: "ROE＝当期純利益÷自己資本。株主が出した資本でどれだけ利益を上げたかを示します。"
  },
  {
    id: "s008", category: "strategy", field: "法務",
    q: "営業秘密の不正取得や不正使用などを規制する法律はどれか。",
    choices: ["著作権法", "特許法", "不正競争防止法", "個人情報保護法"],
    answer: 2,
    explanation: "不正競争防止法は営業秘密の侵害や模倣品の販売など、不正な競争行為を規制します。"
  },
  {
    id: "s009", category: "strategy", field: "経営戦略",
    q: "業務プロセスやパフォーマンスを、優れた他社（ベストプラクティス）と比較して改善点を見つける手法はどれか。",
    choices: ["ベンチマーキング", "アウトソーシング", "リエンジニアリング", "コアコンピタンス"],
    answer: 0,
    explanation: "ベンチマーキングは優良事例と比較し、自社の改善の指標や目標を得る手法です。"
  }
];
