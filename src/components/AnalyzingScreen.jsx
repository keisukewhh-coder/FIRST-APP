import { useState, useEffect } from 'react';
import ObachanIllustration from './ObachanIllustration';

/**
 * 診断結果表示前の「解析中」演出
 * おばちゃんがリアクションしながら解析メッセージを表示
 * 約4秒後に onComplete を呼び出す
 */
const ANALYSIS_MESSAGES = [
  { text: 'データ受信中…あんたの回答、えぐいな', delay: 0 },
  { text: '裏の顔をスキャン中…👀', delay: 800 },
  { text: 'ゲス度を計測中…📊 うわ、これは…', delay: 1600 },
  { text: '闇の深さ、測定不能レベルやないか…', delay: 2400 },
  { text: '結果出たわ。覚悟しいや…！', delay: 3200 },
];

export default function AnalyzingScreen({ targetName, onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [phase, setPhase] = useState('analyzing'); // analyzing → reveal

  useEffect(() => {
    const timers = [];

    // Show messages one by one
    ANALYSIS_MESSAGES.forEach((msg, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), msg.delay)
      );
    });

    // Progress bar animation
    timers.push(setTimeout(() => setProgressWidth(15), 100));
    timers.push(setTimeout(() => setProgressWidth(35), 800));
    timers.push(setTimeout(() => setProgressWidth(60), 1600));
    timers.push(setTimeout(() => setProgressWidth(82), 2400));
    timers.push(setTimeout(() => setProgressWidth(100), 3200));

    // Complete after all messages
    timers.push(setTimeout(() => {
      setPhase('reveal');
    }, 3800));

    timers.push(setTimeout(() => {
      onComplete();
    }, 4300));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-sakura flex flex-col items-center justify-center px-6">
      {/* Background pulse effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(204,17,51,${0.05 + progressWidth * 0.002}) 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />

      {/* Obachan illustration with shake */}
      <div className={`mb-6 ${phase === 'reveal' ? 'analyzing-obachan-reveal' : visibleCount >= 4 ? 'analyzing-obachan-shock' : 'analyzing-obachan-idle'}`}>
        <ObachanIllustration size={120} />
      </div>

      {/* Target name */}
      {targetName && (
        <p className="text-vivid-pink font-bold text-sm mb-2 tracking-wider opacity-60">
          {targetName}の裏の顔を解析中…
        </p>
      )}

      {/* Analysis messages */}
      <div className="w-full max-w-sm space-y-2 mb-6">
        {ANALYSIS_MESSAGES.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm"
            style={{
              animation: 'fadeInUp 0.4s ease-out forwards',
            }}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${
              i < visibleCount - 1 ? 'bg-green-400' : 'bg-vivid-pink animate-pulse'
            }`} />
            <span className={`${
              i === visibleCount - 1 ? 'text-vivid-pink font-bold' : 'text-text-secondary'
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-4">
        <div className="h-1.5 bg-coral/30 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${progressWidth}%`,
              background: progressWidth >= 100
                ? 'linear-gradient(90deg, #CC1133, #FF3355)'
                : 'linear-gradient(90deg, #5A1520, #CC1133)',
              boxShadow: progressWidth >= 80 ? '0 0 12px rgba(204,17,51,0.5)' : 'none',
            }}
          />
        </div>
        <p className="text-right text-xs text-vivid-pink/50 mt-1 font-mono">
          {progressWidth}%
        </p>
      </div>

      {/* Final reveal flash */}
      {phase === 'reveal' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            animation: 'analyzingFlash 0.5s ease-out forwards',
          }}
        />
      )}

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div
          className="w-full h-[2px] bg-vivid-pink/20"
          style={{
            animation: 'analyzingScanline 2s linear infinite',
          }}
        />
      </div>
    </div>
  );
}
