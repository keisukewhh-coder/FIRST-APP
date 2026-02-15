export default function TeaserCard({ senderName, onReveal }) {
  const displayName = senderName || '名無しの誰かさん';

  return (
    <div className="text-center pt-8 pb-4 animate-fade-in-up">

      {/* 不穏な封筒イラスト */}
      <div className="mb-8 relative">
        <div className="mx-auto w-40 h-40 relative">
          {/* 背景グロー */}
          <div className="absolute inset-0 rounded-full bg-vivid-pink/10 teaser-bg-pulse" />

          <svg viewBox="0 0 160 160" width="160" height="160" className="mx-auto relative z-10">
            {/* 封筒の影 */}
            <ellipse cx="80" cy="140" rx="50" ry="8" fill="#0D0808" opacity="0.4" />

            {/* 封筒本体 */}
            <rect x="30" y="50" width="100" height="70" rx="6" fill="#1C1212" stroke="#CC1133" strokeWidth="1.5" opacity="0.9" />

            {/* 封筒のフラップ（開いている） */}
            <path d="M30 50 L80 20 L130 50" fill="#251015" stroke="#CC1133" strokeWidth="1.5" strokeLinejoin="round" />

            {/* 封筒の中の紙（はみ出している） */}
            <rect x="42" y="35" width="76" height="50" rx="3" fill="#2A1A1A" stroke="#CC1133" strokeWidth="0.8" opacity="0.7" className="teaser-paper" />

            {/* ドクロアイコン */}
            <g transform="translate(65, 42)">
              <circle cx="15" cy="12" r="10" fill="none" stroke="#CC1133" strokeWidth="1.2" opacity="0.8" />
              <circle cx="11" cy="10" r="2" fill="#CC1133" opacity="0.6" />
              <circle cx="19" cy="10" r="2" fill="#CC1133" opacity="0.6" />
              <path d="M11 16 Q15 19 19 16" stroke="#CC1133" strokeWidth="1" fill="none" opacity="0.6" />
            </g>

            {/* 浮遊する ?マーク */}
            <text x="45" y="30" fontSize="14" fill="#CC1133" opacity="0.4" className="teaser-float-1">?</text>
            <text x="110" y="40" fontSize="10" fill="#CC1133" opacity="0.3" className="teaser-float-2">!</text>
            <text x="25" y="75" fontSize="12" fill="#CC1133" opacity="0.25" className="teaser-float-3">?</text>
          </svg>
        </div>
      </div>

      {/* 不穏なキャッチコピー */}
      <div className="mb-6">
        <p className="text-xs tracking-[0.15em] text-vivid-pink/60 mb-3 font-semibold teaser-flicker">
          ― 裏の顔、バレてもうてるで ―
        </p>
        <h1 className="text-2xl font-extrabold text-text-primary mb-3 leading-tight">
          あんたの<span className="text-vivid-pink">裏の顔</span>、<br />
          暴かれてしもたわ
        </h1>
      </div>

      {/* 送信者名 */}
      <div className="bg-card rounded-2xl p-5 mb-6 border border-vivid-pink/20 shadow-lg">
        <p className="text-xs text-text-secondary mb-1">診断した人</p>
        <p className="text-lg font-bold text-text-primary mb-2">
          <span className="text-vivid-pink">{displayName}</span> さん
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          が、あんたのこと<br />
          <span className="text-vivid-pink font-semibold">勝手に丸裸にしよった</span>みたいやで。
        </p>
      </div>

      {/* 煽りコピー */}
      <div className="mb-8">
        <p className="text-sm text-text-secondary leading-relaxed mb-2">
          ダメなところ、ヤバいクセ、黒い本性…<br />
          ぜーんぶ動物に例えて暴かれてるわ。
        </p>
        <p className="text-xs text-text-secondary/60">
          ※ 見たら最後、知らんかったことにはでけへんで？
        </p>
      </div>

      {/* 結果を見るボタン（脈動アニメーション付き） */}
      <button
        className="teaser-reveal-btn w-full max-w-xs mx-auto py-4 px-8 rounded-full bg-vivid-pink text-white font-extrabold text-lg border-0 cursor-pointer shadow-xl transition-colors hover:bg-coral-dark"
        onClick={onReveal}
      >
        覚悟して結果を見る
      </button>

      <p className="mt-4 text-xs text-text-secondary/50">
        タップしたら裏の顔が暴かれます
      </p>
    </div>
  );
}
