# あの人勝手に占っちゃおう診断（ちょいゲス）

## 開発方針
- Vite + React (JavaScript) で構成
- 依存: `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`
- CSS は Tailwind CSS v4 ユーティリティ + index.css でカスタムテーマ定義
- データは JSON で外部化し、テキスト差し替えが容易な設計
- カラー: メイン #FFF0F5（サクラピンク）、アクセント #FF3355（ビビッドピンク）

## コマンド
```bash
npm install        # 依存インストール
npm run dev        # 開発サーバー起動 (localhost:5173)
npm run build      # プロダクションビルド
npm run preview    # ビルド結果プレビュー
```

## ディレクトリ構成
```
src/
├── components/     # 再利用コンポーネント
│   ├── Layout.jsx            # ヘッダー・フッター共通レイアウト
│   ├── StartCard.jsx         # LP 開始カード
│   ├── QuestionCard.jsx      # 設問表示（緑ハイライト対応）
│   ├── ScaleSelector.jsx     # 5段階丸型選択UI
│   ├── ProgressBar.jsx       # 進捗バー
│   ├── ResultCard.jsx        # 結果表示（ちょいゲス攻略アドバイス付き）
│   ├── AnimalIllustration.jsx # 16動物タイプSVGイラスト
│   └── ShareBox.jsx          # 共有リンク + Xシェア
├── pages/          # ページコンポーネント
│   ├── HomePage.jsx      # / (LP)
│   ├── QuizPage.jsx      # /quiz (28問フルスクロール診断・シャッフル付き)
│   └── ResultPage.jsx    # /result (結果)
├── data/           # 外部データファイル
│   ├── questions.json    # 20問の質問データ (E-I, S-N, T-F, J-P)
│   └── types.json        # 8動物タイプの結果データ（ちょいゲス味アドバイス）
├── utils/
│   └── scoring.js        # スコア計算・タイプ判定ロジック
├── App.jsx         # ルーティング定義
├── App.css         # (Tailwindに移行済み)
├── index.css       # Tailwind import + カスタムテーマ・アニメーション
└── main.jsx        # エントリーポイント
```

## データファイル
- `questions.json`: 28問。8軸(MBTI 4軸 + Spice 4軸)。axes オブジェクトで複数軸への影響を定義
- `types.json`: 16動物タイプ（MBTI全16パターン）。キー形式は MBTI 4文字

## 動物タイプ一覧（Noun: 16種）
| タイプキー | 名前 | 特徴 |
|-----------|------|------|
| INTJ | 夜景の黒猫 | 俺様が一番正しいモンスター |
| INFJ | 高嶺の花子さん | 孤高の理想主義者 |
| INTP | 無愛想なロボ | 天然マウントマシン |
| ISTP | 一匹狼ウルフ | 論破マウント中毒 |
| ENTJ | ビッグマム | 支配欲の帝王 |
| ESTJ | 爆走ライオン | 完璧主義の不器用王様 |
| ENTP | マウント拡声器 | 知的マウントモンスター |
| ENFP | 路地裏チワワ | 構ってちゃんモンスター |
| ISTJ | 鉄壁の金庫 | ルール絶対主義の石頭 |
| ISFJ | 戦略ペンギン | ルール至上主義のむっつり |
| ISFP | 雨宿りうさぎ | 繊細すぎる感受性 |
| INFP | お豆腐メンタル | 脳内ポエムのカオス |
| ESTP | お祭りパンダ | 逃避行動の天才 |
| ESFP | 偽善ウミガメ | いい人仮面の逃避の達人 |
| ENFJ | ひだまりレトリバー | 依存煽り職人 |
| ESFJ | 偽善ウミガメ | 感謝を要求する世話焼き |

## 修飾語（Modifier: Spice軸から決定）
| 条件 | 修飾語 |
|------|--------|
| maxSpice ≥ 3 (Approval) | 自撮り加工済みの |
| maxSpice ≥ 3 (Obsession) | カギアカ監視中の |
| maxSpice ≥ 3 (Emotion) | 即泣き地雷原な |
| maxSpice ≥ 3 (Fickle) | 沈黙が耐えられない |
| maxSpice 0〜2 | 平凡な / 量産型の |
| maxSpice < 0 | 悟りを開いた / 無害な |

## 判定ロジック（src/utils/scoring.js）
1. 回答値(1-5)を中央3基準で -2〜+2 に正規化（buttonToScore）
2. 各質問のaxesオブジェクトに基づき、weight × answerScore を全8軸に加算
3. MBTI 4軸: 各軸スコアが 0以上 → 正方向の文字、0未満 → 負方向の文字
4. 4文字を結合して typeKey を生成 → types.json から結果取得
5. Spice 4軸: 最大スコアの軸と値からModifier（修飾語）を決定
6. 出力: `{{Modifier}} {{Noun}}`（例: 「自撮り加工済みの 路地裏チワワ」）
7. フォールバック: どの回答組み合わせでも必ず結果が生成される

## 結果画面の構成（あの人のちょいゲス取説）
1. 修飾語 + 動物タイプ名 & SVGイラスト
2. ゲスい弱点（weakness）
3. 喜ぶデート（date）
4. モテる動き（attractive）
5. 刺さる一言（approach）
6. ハッシュタグ: #あの人勝手に占っちゃおう診断

## UIデザイン
- フルスクロール1カラム（画面遷移なし）
- 丸型ぷるんボタン（角ばったボタンなし）
- ビビッドピンク (#FF3355) でゲスい強調
- SNSシェア対応（X/コピー）
- 質問シャッフル: アクセスごとにランダム順、同じ軸が連続しない
- 未回答バリデーション: 送信時に未回答項目を緑色ハイライト + 自動スクロール
