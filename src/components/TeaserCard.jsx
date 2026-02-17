export default function TeaserCard({ senderName, targetName, onReveal }) {
  const displayName = senderName || '名無しの誰かさん';
  const targetLabel = targetName || 'あんた';

  return (
    <div className="text-center pt-8 pb-4 animate-fade-in-up">

      {/* 不穏なアイコン */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-vivid-pink/15 border-2 border-vivid-pink/30 hero-glow">
          <span className="text-6xl float-bob">👿</span>
        </div>
      </div>

      {/* 不穏なキャッチコピー */}
      <div className="mb-6">
        <p className="text-xs tracking-[0.15em] text-vivid-pink/60 mb-3 font-semibold teaser-flicker">
          ― 裏の顔、バレてもうてるで ―
        </p>
        <h1 className="text-2xl font-extrabold text-text-primary mb-3 leading-tight">
          {targetName
            ? <><span className="text-vivid-pink">{targetName}</span>の<span className="text-vivid-pink">裏の顔</span>、<br />暴かれてしもたわ</>
            : <>あんたの<span className="text-vivid-pink">裏の顔</span>、<br />暴かれてしもたわ</>
          }
        </h1>
      </div>

      {/* 送信者名 */}
      <div className="bg-card rounded-2xl p-5 mb-6 border border-vivid-pink/20 shadow-lg">
        <p className="text-xs text-text-secondary mb-1">診断した人</p>
        <p className="text-lg font-bold text-text-primary mb-2">
          <span className="text-vivid-pink">{displayName}</span>
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          が、{targetLabel}のこと<br />
          <span className="text-vivid-pink font-semibold">勝手に丸裸にしよった</span>みたいやで。
        </p>
      </div>

      {/* 煽りテキスト */}
      <div className="bg-card/50 rounded-2xl p-4 mb-6 border border-vivid-pink/15 text-left">
        <p className="text-sm text-text-primary leading-relaxed">
          ダメなところ、ヤバいクセ、黒い本性…<br />
          <span className="text-vivid-pink font-bold">ぜーんぶ暴かれとるで。</span><br />
          見る覚悟はあるんか？
        </p>
      </div>

      {/* 結果を見るボタン */}
      <button
        className="teaser-reveal-btn w-full max-w-xs mx-auto py-4 px-8 rounded-full bg-vivid-pink text-white font-extrabold text-lg border-0 cursor-pointer shadow-xl transition-colors hover:bg-coral-dark"
        onClick={onReveal}
      >
        覚悟して結果を見る
      </button>

      <p className="mt-4 text-xs text-text-secondary/50">
        ※ 見たら最後、知らんかったことにはでけへんで？
      </p>
    </div>
  );
}
