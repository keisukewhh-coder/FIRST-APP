import ObachanBubble from './ObachanBubble';
import ObachanIllustration from './ObachanIllustration';

export default function TeaserCard({ senderName, onReveal }) {
  const displayName = senderName || '名無しの誰かさん';

  return (
    <div className="text-center pt-8 pb-4 animate-fade-in-up">

      {/* おばちゃん登場 */}
      <div className="mb-6 relative">
        <div className="mx-auto w-32 h-44 relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-vivid-pink/10 teaser-bg-pulse" />
          <div className="relative z-10">
            <ObachanIllustration size={100} />
          </div>
        </div>
      </div>

      {/* おばちゃんの第一声 */}
      <div className="text-left mb-6">
        <ObachanBubble variant="shout">
          ちょっとあんた！{displayName}さんがあんたのこと色々言うてるで！えげつないこと書かれとるわ〜
        </ObachanBubble>
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

      {/* おばちゃんの煽り */}
      <div className="text-left mb-6">
        <ObachanBubble variant="whisper">
          ダメなところ、ヤバいクセ、黒い本性…ぜーんぶ動物に例えて暴かれとるで。見る覚悟はあるんか？
        </ObachanBubble>
      </div>

      {/* 結果を見るボタン（脈動アニメーション付き） */}
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
