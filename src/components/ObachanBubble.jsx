/**
 * ObachanBubble — 関西弁おばちゃんナレーターの吹き出し（豪華版）
 *
 * アプリ全体を通じて、おばちゃんが解説・煽り・ツッコミを入れる。
 * variant で見た目を切り替え:
 *   - "default" : 通常の吹き出し（左にアバター + ふわふわ浮遊）
 *   - "whisper" : 小声のひそひそ話風（控えめ + 点滅）
 *   - "shout"   : 叫び（派手グロー + シェイク）
 *   - "reveal"  : 暴露時のドラマチック演出（フルグロー）
 */
import ObachanIllustration from './ObachanIllustration';

export default function ObachanBubble({ children, variant = 'default' }) {
  if (!children) return null;

  const isWhisper = variant === 'whisper';
  const isShout = variant === 'shout';
  const isReveal = variant === 'reveal';

  const avatarSize = isShout || isReveal ? 52 : 42;

  return (
    <div
      className={`
        obachan-bubble-wrapper
        flex items-start gap-3 my-5
        ${isReveal ? 'obachan-reveal' : ''}
        ${isShout ? 'obachan-shout-shake' : ''}
      `}
      style={
        variant !== 'default'
          ? { opacity: 0, animation: 'obachanEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards' }
          : { opacity: 0, animation: 'obachanEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }
      }
    >
      {/* おばちゃんアバター — 常にふわふわ浮遊 */}
      <div className={`
        shrink-0 flex items-center justify-center rounded-full overflow-hidden obachan-avatar-float
        ${isShout || isReveal
          ? 'w-14 h-14 bg-vivid-pink/20 border-2 border-vivid-pink/50 shadow-[0_0_20px_rgba(204,17,51,0.3)]'
          : 'w-11 h-11 bg-coral/25 border-2 border-vivid-pink/25 shadow-[0_0_8px_rgba(204,17,51,0.15)]'
        }
      `}>
        <ObachanIllustration size={avatarSize} />
      </div>

      {/* 吹き出し — 豪華グラデーション + グロー */}
      <div className={`
        relative flex-1 rounded-2xl px-4 py-3 obachan-bubble-body
        ${isWhisper
          ? 'obachan-whisper-bubble'
          : isShout
            ? 'obachan-shout-bubble'
            : isReveal
              ? 'obachan-reveal-bubble'
              : 'obachan-default-bubble'
        }
      `}>
        {/* 吹き出しの三角ポインター */}
        <div
          className={`
            absolute top-4 -left-2 w-0 h-0
            border-t-[7px] border-t-transparent
            border-b-[7px] border-b-transparent
            ${isWhisper
              ? 'border-r-[9px] border-r-coral/30'
              : isShout
                ? 'border-r-[9px] border-r-vivid-pink/50'
                : isReveal
                  ? 'border-r-[9px] border-r-vivid-pink/60'
                  : 'border-r-[9px] border-r-coral/35'
            }
          `}
        />

        {/* セリフ */}
        <p className={`
          leading-relaxed
          ${isWhisper
            ? 'text-xs text-text-secondary italic'
            : isShout
              ? 'text-[0.9rem] text-vivid-pink font-extrabold tracking-wide'
              : isReveal
                ? 'text-[0.9rem] text-text-primary font-extrabold'
                : 'text-sm text-text-primary font-medium'
          }
        `}>
          {children}
        </p>
      </div>
    </div>
  );
}
