# Life Compass - 人生コンパスタイプ診断

## 開発方針
- Vite + React (JavaScript) で構成
- 追加依存は `react-router-dom` のみ
- CSS はプレーンCSS（index.css: リセット・変数、App.css: コンポーネント）
- データは JSON で外部化し、テキスト差し替えが容易な設計

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
│   ├── Layout.jsx        # ヘッダー・フッター共通レイアウト
│   ├── StartCard.jsx     # LP 開始カード
│   ├── QuestionCard.jsx  # 設問表示
│   ├── ScaleSelector.jsx # 5段階選択UI
│   ├── ProgressBar.jsx   # 進捗バー
│   ├── ResultCard.jsx    # 結果表示カード
│   └── ShareBox.jsx      # 共有リンク
├── pages/          # ページコンポーネント
│   ├── HomePage.jsx      # / (LP)
│   ├── QuizPage.jsx      # /quiz (診断)
│   ├── ResultPage.jsx    # /result (結果)
│   └── AboutPage.jsx     # /about (診断について)
├── data/           # 外部データファイル
│   ├── questions.json    # 12問の質問データ
│   └── types.json        # 8タイプの結果データ
├── utils/
│   └── scoring.js        # スコア計算・タイプ判定ロジック
├── App.jsx         # ルーティング定義
├── App.css         # コンポーネントCSS
├── index.css       # リセット・CSS変数
└── main.jsx        # エントリーポイント
```

## データファイル
- `questions.json`: 12問。各軸(freedom/intuition/connection) × 4問。direction で加点方向を制御
- `types.json`: 8タイプ。キー形式は `F+I+C+` 等（3軸の符号）

## 判定ロジック（src/utils/scoring.js）
1. 回答値(1-5)を中央3基準で -2〜+2 に正規化
2. direction=left → そのまま、right → 符号反転して各軸に加算
3. 軸合計が 0以上 → `+`、0未満 → `-`
4. 3軸の符号を結合して typeKey を生成 → types.json から結果取得
