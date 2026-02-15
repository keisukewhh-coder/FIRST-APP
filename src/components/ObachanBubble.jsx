/**
 * ObachanBubble — 関西弁おばちゃんナレーターの吹き出し
 *
 * アプリ全体を通じて、おばちゃんが解説・煽り・ツッコミを入れる。
 * variant で見た目を切り替え:
 *   - "default" : 通常の吹き出し（左にアバター）
 *   - "whisper" : 小声のひそひそ話風（控えめ）
 *   - "shout"   : 叫び（強調・大きめ）
 *   - "reveal"  : 暴露時のドラマチック演出
 */
import ObachanIllustration from './ObachanIllustration';

export default function ObachanBubble({ children, variant = 'default' }) {
  if (!children) return null;

  const isWhisper = variant === 'whisper';
  const isShout = variant === 'shout';
  const isReveal = variant === 'reveal';

  const avatarSize = isShout || isReveal ? 44 : 36;

  return (
    <div
      className={`
        flex items-start gap-3 my-4
        ${isReveal ? 'obachan-reveal' : ''}
      `}
      style={
        variant !== 'default'
          ? { opacity: 0, animation: 'fadeInUp 0.4s ease-out 0.1s forwards' }
          : undefined
      }
    >
      {/* おばちゃんアバター */}
      <div className={`
        shrink-0 flex items-center justify-center rounded-full overflow-hidden
        ${isShout || isReveal
          ? 'w-12 h-12 bg-vivid-pink/15 border-2 border-vivid-pink/40 shadow-[0_0_12px_rgba(204,17,51,0.2)]'
          : 'w-10 h-10 bg-coral/20 border border-vivid-pink/20'
        }
      `}>
        <ObachanIllustration size={avatarSize} />
      </div>

      {/* 吹き出し */}
      <div className={`
        relative flex-1 rounded-2xl px-4 py-3
        ${isWhisper
          ? 'bg-coral/10 border border-coral/20'
          : isShout
            ? 'bg-vivid-pink/15 border border-vivid-pink/35 shadow-[0_0_15px_rgba(204,17,51,0.1)]'
            : isReveal
              ? 'bg-vivid-pink/20 border-2 border-vivid-pink/40 shadow-[0_0_20px_rgba(204,17,51,0.15)]'
              : 'bg-card border border-coral/25'
        }
      `}>
        {/* 吹き出しの三角 */}
        <div
          className={`
            absolute top-3 -left-2 w-0 h-0
            border-t-[6px] border-t-transparent
            border-b-[6px] border-b-transparent
            ${isWhisper
              ? 'border-r-[8px] border-r-coral/20'
              : isShout || isReveal
                ? 'border-r-[8px] border-r-vivid-pink/35'
                : 'border-r-[8px] border-r-coral/25'
            }
          `}
        />

        {/* セリフ */}
        <p className={`
          leading-relaxed
          ${isWhisper
            ? 'text-xs text-text-secondary italic'
            : isShout
              ? 'text-sm text-vivid-pink font-bold'
              : isReveal
                ? 'text-sm text-text-primary font-bold'
                : 'text-xs text-text-primary'
          }
        `}>
          {children}
        </p>
      </div>
    </div>
  );
}
