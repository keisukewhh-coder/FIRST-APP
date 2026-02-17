import { useState, useEffect } from 'react';
import ObachanIllustration from './ObachanIllustration';

/**
 * ObachanRageReveal — シンプル版おばちゃん演出
 *
 * フェーズ:
 *   0 (0-0.6s)  : おばちゃん登場 + テキストフェードイン
 *   1 (0.6-1.6s): テキスト強調 + 赤グロー
 *   2 (1.6-2.0s): フラッシュ → onComplete
 */
export default function ObachanRageReveal({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1600),
      setTimeout(() => {
        setPhase(3);
        if (onComplete) onComplete();
      }, 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#0D0808' }}
    >
      {/* 背景の赤グロー */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: phase >= 1
            ? 'radial-gradient(circle at 50% 50%, rgba(204,17,51,0.25) 0%, rgba(13,8,8,1) 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(204,17,51,0.05) 0%, rgba(13,8,8,1) 50%)',
        }}
      />

      {/* おばちゃん + テキスト */}
      <div className="relative flex flex-col items-center" style={{
        opacity: 0,
        animation: 'fadeInUp 0.5s ease-out 0.1s forwards',
      }}>
        <div className="mb-4">
          <ObachanIllustration size={120} />
        </div>

        <p
          className="font-black tracking-wider text-center transition-all duration-500"
          style={{
            fontSize: phase >= 1 ? '1.5rem' : '1.125rem',
            color: phase >= 1 ? '#FF3355' : 'rgba(255,51,85,0.7)',
            textShadow: phase >= 1
              ? '0 0 20px rgba(204,17,51,0.6)'
              : 'none',
          }}
        >
          さぁ、覚悟しいや…！
        </p>
      </div>

      {/* フラッシュ */}
      {phase >= 2 && (
        <div className="absolute inset-0 obachan-rage-whiteout" />
      )}
    </div>
  );
}
