import { useState, useEffect } from 'react';
import ObachanIllustration from './ObachanIllustration';

/**
 * ObachanRageReveal — おばちゃん発狂 → 巨大化 → 画面埋め尽くし演出
 *
 * フェーズ:
 *   0 (0-0.8s)   : おばちゃん登場、小刻みに震え始める
 *   1 (0.8-2.0s) : 発狂！叫びテキスト出現、激しくシェイク
 *   2 (2.0-3.5s) : 巨大化開始、画面いっぱいに迫ってくる
 *   3 (3.5-4.2s) : 画面埋め尽くし → フラッシュ
 *   4 (4.2s+)    : onComplete 発火
 */
const SCREAMS = [
  'あんたの裏の顔ッ！！',
  'バレてもうてるでぇぇぇ！！',
  '逃げられへんでぇぇ！！',
  '覚悟しいやぁぁ！！！',
];

export default function ObachanRageReveal({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [screamIndex, setScreamIndex] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setScreamIndex(1), 1200),
      setTimeout(() => setScreamIndex(2), 1600),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setScreamIndex(3), 2400),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => {
        setPhase(4);
        if (onComplete) onComplete();
      }, 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#0D0808' }}
    >
      {/* 背景のビネット + 赤グロー */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: phase >= 1
            ? `radial-gradient(circle at 50% 50%, rgba(204,17,51,${phase >= 2 ? 0.4 : 0.15}) 0%, rgba(13,8,8,1) ${phase >= 2 ? '80%' : '60%'})`
            : 'radial-gradient(circle at 50% 50%, rgba(204,17,51,0.05) 0%, rgba(13,8,8,1) 50%)',
        }}
      />

      {/* 画面揺れエフェクト（フェーズ1-2で画面全体がガタガタ） */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          phase === 1 ? 'obachan-rage-screen-shake' :
          phase === 2 ? 'obachan-rage-screen-shake-heavy' : ''
        }`}
      >
        {/* おばちゃん本体 */}
        <div
          className={`relative flex flex-col items-center ${
            phase === 0 ? 'obachan-rage-enter' :
            phase === 1 ? 'obachan-rage-tremble' :
            phase === 2 ? 'obachan-rage-grow' :
            phase === 3 ? 'obachan-rage-fill' : 'obachan-rage-flash'
          }`}
        >
          {/* おばちゃんSVG */}
          <div className={`relative ${phase >= 2 ? '' : 'mb-4'}`}>
            <ObachanIllustration
              size={phase === 0 ? 120 : phase === 1 ? 140 : 160}
            />

            {/* 怒りマーク（フェーズ1以降） */}
            {phase >= 1 && phase < 3 && (
              <>
                <span className="absolute -top-3 -right-3 text-2xl obachan-rage-anger-mark"
                  style={{ animationDelay: '0s' }}>💢</span>
                <span className="absolute -top-1 -left-4 text-xl obachan-rage-anger-mark"
                  style={{ animationDelay: '0.3s' }}>💢</span>
                {phase >= 2 && (
                  <span className="absolute top-1/2 -right-6 text-3xl obachan-rage-anger-mark"
                    style={{ animationDelay: '0.15s' }}>💢</span>
                )}
              </>
            )}
          </div>

          {/* 叫びテキスト（フェーズ0-2） */}
          {phase < 3 && (
            <div className="text-center mt-2">
              <p className={`font-black tracking-wider transition-all duration-300 ${
                phase === 0
                  ? 'text-lg text-vivid-pink/80'
                  : phase === 1
                    ? 'text-2xl text-vivid-pink obachan-rage-text-shake'
                    : 'text-3xl text-white obachan-rage-text-shake'
              }`}
                style={phase >= 1 ? {
                  textShadow: '0 0 20px rgba(204,17,51,0.8), 0 0 40px rgba(204,17,51,0.4)'
                } : {}}
              >
                {SCREAMS[screamIndex]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* フラッシュ（フェーズ3） */}
      {phase >= 3 && (
        <div className="absolute inset-0 obachan-rage-whiteout" />
      )}

      {/* スキャンライン */}
      {phase >= 1 && phase < 4 && (
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,17,51,0.03) 2px, rgba(204,17,51,0.03) 4px)',
          }}
        />
      )}
    </div>
  );
}
