# アニマル恋愛攻略診断 - Animal Love Guide

## 開発方針
- Vite + React (JavaScript) で構成
- 依存: `react-router-dom`, `tailwindcss`, `@tailwindcss/vite`
- CSS は Tailwind CSS v4 ユーティリティ + index.css でカスタムテーマ定義
- データは JSON で外部化し、テキスト差し替えが容易な設計
- カラー: メイン #FFF0F5（サクラピンク）、アクセント #FFB6C1（コーラルピンク）

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
│   ├── QuestionCard.jsx      # 設問表示
│   ├── ScaleSelector.jsx     # 5段階丸型選択UI
│   ├── ProgressBar.jsx       # 進捗バー
│   ├── ResultCard.jsx        # 結果表示（攻略アドバイス付き）
│   ├── AnimalIllustration.jsx # 8動物タイプSVGイラスト
│   └── ShareBox.jsx          # 共有リンク
├── pages/          # ページコンポーネント
│   ├── HomePage.jsx      # / (LP)
│   ├── QuizPage.jsx      # /quiz (年代選択 + 15問診断)
│   └── ResultPage.jsx    # /result (結果)
├── data/           # 外部データファイル
│   ├── questions.json    # 15問の質問データ (E-I, S-N, T-F, J-P)
│   └── types.json        # 8動物タイプの結果データ（年代別アドバイス付き）
├── utils/
│   └── scoring.js        # スコア計算・タイプ判定ロジック
├── App.jsx         # ルーティング定義
├── App.css         # (Tailwindに移行済み)
├── index.css       # Tailwind import + カスタムテーマ・アニメーション
└── main.jsx        # エントリーポイント
```

## データファイル
- `questions.json`: 15問。4軸(EI/SN/TF/JP) × 各3-4問。direction で加点方向を制御
- `types.json`: 8動物タイプ。キー形式は MBTI 4文字（INTJ, ENFP 等）。年代別アドバイス付き

## 動物タイプ一覧
| タイプキー | 名前 | 特徴 |
|-----------|------|------|
| INTJ | ラグジュアリー猫 | 知的で気高い |
| ENFP | 路地裏チワワ | 好奇心の塊 |
| ESTJ | 爆走ライオン | 圧倒的リーダー |
| ESFJ | ひだまりレトリバー | 共感の天才 |
| ISTJ | 戦略ペンギン | 几帳面な実務家 |
| INFP | 雨宿りうさぎ | 繊細な芸術家 |
| ISTP | 職人ウルフ | 寡黙なこだわり派 |
| ESFP | お祭りパンダ | 今を楽しむ |

## 判定ロジック（src/utils/scoring.js）
1. 回答値(1-5)を中央3基準で -2〜+2 に正規化
2. 軸の正方向(E,S,T,J) → そのまま加算、負方向(I,N,F,P) → 符号反転して加算
3. 各軸スコアが 0以上 → 正方向の文字、0未満 → 負方向の文字
4. 4文字を結合して typeKey を生成 → types.json から結果取得

## 属性フィルター
- 10代 (teens): 部活動・学校・放課後がキーワードのアドバイス
- 20代 (twenties): 仕事・キャリア・休日がキーワードのアドバイス

## 結果画面の構成
1. 動物タイプ名 & SVGイラスト
2. オーダーメイド・デート提案
3. 意外な一面（裏の顔）
4. モテるための動き方
5. 最強のアプローチ
