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
│   ├── AnimalIllustration.jsx # 8動物タイプSVGイラスト
│   └── ShareBox.jsx          # 共有リンク + Xシェア
├── pages/          # ページコンポーネント
│   ├── HomePage.jsx      # / (LP)
│   ├── QuizPage.jsx      # /quiz (20問フルスクロール診断・シャッフル付き)
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
- `questions.json`: 20問。4軸(EI/SN/TF/JP) × 各5問。direction で加点方向を制御
- `types.json`: 8動物タイプ。キー形式は MBTI 4文字（INTJ, ENFP 等）

## 動物タイプ一覧
| タイプキー | 名前 | 特徴 |
|-----------|------|------|
| INTJ | ラグジュアリー猫 | 俺様が一番正しいモンスター |
| ENFP | 路地裏チワワ | 構ってちゃんモンスター |
| ESTJ | 爆走ライオン | 完璧主義の不器用王様 |
| ESFJ | ひだまりレトリバー | 依存煽り職人 |
| ISTJ | 戦略ペンギン | ルール至上主義のむっつり |
| INFP | 雨宿りうさぎ | 脳内ダークファンタジー |
| ISTP | 職人ウルフ | 論破マウント中毒 |
| ESFP | お祭りパンダ | 逃避行動の天才 |

## 判定ロジック（src/utils/scoring.js）
1. 回答値(1-5)を中央3基準で -2〜+2 に正規化
2. 軸の正方向(E,S,T,J) → そのまま加算、負方向(I,N,F,P) → 符号反転して加算
3. 各軸スコアが 0以上 → 正方向の文字、0未満 → 負方向の文字
4. 4文字を結合して typeKey を生成 → types.json から結果取得

## 結果画面の構成（あの人のちょいゲス取説）
1. 動物タイプ名 & SVGイラスト
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
