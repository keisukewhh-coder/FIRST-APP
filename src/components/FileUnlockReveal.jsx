import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * FileUnlockReveal - 受信側の「鍵付きファイル開封」演出
 *
 * ボタン押下後 → 結果表示の間に再生される全画面アニメーション。
 * 約4秒で「鍵付きファイルが揺れて→鍵が壊れて→開封される」演出を行う。
 *
 * Phase 0: 暗転 + ファイル出現 (0-0.8s)
 * Phase 1: ファイルがガタガタ震える (0.8-2.2s)
 * Phase 2: 鍵が光って砕ける (2.2-3.0s)
 * Phase 3: ファイルが開く + 「開封！」テキスト (3.0-3.8s)
 * Phase 4: フェードアウト (3.8-4.3s) → onComplete
 */
export default function FileUnlockReveal({ senderName, onComplete }) {
  const [phase, setPhase] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => {
        setPhase(5);
        setTimeout(handleComplete, 500);
      }, 4300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [handleComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0D0808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: phase === 5 ? 0 : 1,
        transition: phase === 5 ? 'opacity 0.5s ease-out' : 'none',
        pointerEvents: phase === 5 ? 'none' : 'auto',
      }}
    >
      {/* スキャンライン */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,17,51,0.02) 2px, rgba(204,17,51,0.02) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ビネット */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* メインコンテンツ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '20px',
        }}
      >
        {/* 開封テキスト */}
        <p
          style={{
            fontSize: '13px',
            color: '#F0E0E0',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.8,
            opacity: phase >= 0 && phase < 3 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          {phase === 0 && '開封中…'}
          {phase === 1 && 'ガタガタ…なんか出てきそうや…！'}
          {phase === 2 && '鍵が…！！'}
        </p>

        {/* 鍵付きファイルアイコン */}
        <div
          className={phase === 1 ? 'unlock-file-shake' : ''}
          style={{
            position: 'relative',
            opacity: phase >= 0 && phase < 4 ? 1 : 0,
            transform: phase === 0 ? 'scale(0.8)' : 'scale(1)',
            transition: phase === 0 ? 'opacity 0.4s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'opacity 0.3s',
          }}
        >
          {/* ファイル本体 */}
          <div
            style={{
              width: '100px',
              height: '120px',
              backgroundColor: '#1C1212',
              border: `2px solid ${phase >= 2 ? 'rgba(204,17,51,0.7)' : 'rgba(204,17,51,0.35)'}`,
              borderRadius: '8px',
              position: 'relative',
              boxShadow: phase >= 2
                ? '0 0 40px rgba(204,17,51,0.4), 0 0 80px rgba(204,17,51,0.15)'
                : '0 0 15px rgba(204,17,51,0.15)',
              transition: 'border-color 0.3s, box-shadow 0.5s',
              overflow: 'hidden',
            }}
          >
            {/* ファイルの折り目（右上） */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '20px',
                height: '20px',
                background: 'linear-gradient(135deg, #0D0808 50%, rgba(204,17,51,0.2) 50%)',
                borderBottomLeft: '1px solid rgba(204,17,51,0.3)',
              }}
            />

            {/* ファイル内のテキスト行（装飾） */}
            <div style={{ padding: '28px 12px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ height: '3px', width: '60%', background: 'rgba(204,17,51,0.15)', borderRadius: '2px' }} />
              <div style={{ height: '3px', width: '80%', background: 'rgba(204,17,51,0.1)', borderRadius: '2px' }} />
              <div style={{ height: '3px', width: '45%', background: 'rgba(204,17,51,0.15)', borderRadius: '2px' }} />
              <div style={{ height: '3px', width: '70%', background: 'rgba(204,17,51,0.1)', borderRadius: '2px' }} />
              <div style={{ height: '3px', width: '55%', background: 'rgba(204,17,51,0.12)', borderRadius: '2px' }} />
            </div>

            {/* 「極秘」スタンプ */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translate(-50%) rotate(-8deg)',
                fontSize: '14px',
                fontWeight: 900,
                color: 'rgba(204,17,51,0.5)',
                letterSpacing: '0.2em',
                border: '2px solid rgba(204,17,51,0.3)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              極秘
            </div>

            {/* 開封時のバースト光 */}
            {phase >= 3 && (
              <div
                className="unlock-burst-light"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(204,17,51,0.5) 0%, transparent 70%)',
                  zIndex: 5,
                }}
              />
            )}
          </div>

          {/* 鍵アイコン（Phase 2で砕ける） */}
          <div
            className={phase === 2 ? 'unlock-lock-break' : ''}
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: phase >= 3 ? 0 : 1,
              transition: phase >= 3 ? 'opacity 0.2s' : 'none',
            }}
          >
            {/* 鍵のU字部分 */}
            <div
              className={phase >= 2 ? 'unlock-lock-glow' : ''}
              style={{
                width: '28px',
                height: '20px',
                border: '3px solid rgba(204,17,51,0.6)',
                borderBottom: 'none',
                borderRadius: '14px 14px 0 0',
                margin: '0 auto',
              }}
            />
            {/* 鍵の四角い本体 */}
            <div
              style={{
                width: '36px',
                height: '22px',
                backgroundColor: 'rgba(204,17,51,0.35)',
                border: '2px solid rgba(204,17,51,0.6)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 鍵穴 */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#0D0808',
                  boxShadow: '0 4px 0 0 #0D0808',
                }}
              />
            </div>
          </div>

          {/* 鍵が砕けた時のパーティクル */}
          {phase >= 2 && phase < 4 && (
            <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="unlock-particle"
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#CC1133',
                    borderRadius: '50%',
                    animationDelay: `${i * 0.06}s`,
                    '--particle-x': `${(i % 2 === 0 ? 1 : -1) * (15 + i * 8)}px`,
                    '--particle-y': `${-20 - i * 10}px`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* 送信者名 */}
        <p
          style={{
            fontSize: '12px',
            color: '#A88888',
            fontWeight: 500,
            textAlign: 'center',
            opacity: phase >= 0 && phase < 3 ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          From: {senderName || '名無しの誰かさん'}
        </p>

        {/* Phase 3: 開封テキスト */}
        <div
          style={{
            opacity: phase === 3 ? 1 : 0,
            transform: phase === 3 ? 'scale(1)' : 'scale(0.5)',
            transition: 'opacity 0.3s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#CC1133',
              letterSpacing: '0.15em',
              textShadow: '0 0 30px rgba(204,17,51,0.8), 0 0 60px rgba(204,17,51,0.4)',
            }}
          >
            開封！
          </p>
          <p
            style={{
              fontSize: '13px',
              color: '#F0E0E0',
              marginTop: '8px',
              textShadow: '0 0 10px rgba(204,17,51,0.3)',
            }}
          >
            もう後戻りはでけへんで…
          </p>
        </div>
      </div>

      <style>{keyframeStyles}</style>
    </div>
  );
}

const keyframeStyles = `
  /* ファイルがガタガタ震える */
  @keyframes unlockFileShake {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    5% { transform: translate(-3px, 1px) rotate(-1deg); }
    10% { transform: translate(3px, -1px) rotate(1deg); }
    15% { transform: translate(-2px, 2px) rotate(-0.5deg); }
    20% { transform: translate(4px, 0px) rotate(1.5deg); }
    25% { transform: translate(-1px, -2px) rotate(-1deg); }
    30% { transform: translate(3px, 1px) rotate(0.5deg); }
    35% { transform: translate(-4px, -1px) rotate(-1.5deg); }
    40% { transform: translate(2px, 2px) rotate(1deg); }
    45% { transform: translate(-3px, 0px) rotate(-0.5deg); }
    50% { transform: translate(1px, -2px) rotate(1.5deg); }
    55% { transform: translate(-2px, 1px) rotate(-1deg); }
    60% { transform: translate(4px, -1px) rotate(0.5deg); }
    65% { transform: translate(-3px, 2px) rotate(-1.5deg); }
    70% { transform: translate(2px, 0px) rotate(1deg); }
    75% { transform: translate(-4px, -2px) rotate(-0.5deg); }
    80% { transform: translate(3px, 1px) rotate(1.5deg); }
    85% { transform: translate(-1px, -1px) rotate(-1deg); }
    90% { transform: translate(4px, 2px) rotate(0.5deg); }
    95% { transform: translate(-2px, 0px) rotate(-1.5deg); }
  }

  .unlock-file-shake {
    animation: unlockFileShake 0.15s linear infinite;
  }

  /* 鍵が光るグロー */
  @keyframes unlockLockGlow {
    0% { box-shadow: 0 0 5px rgba(204,17,51,0.3); border-color: rgba(204,17,51,0.6); }
    30% { box-shadow: 0 0 30px rgba(204,17,51,0.9), 0 0 60px rgba(204,17,51,0.4); border-color: rgba(255,51,85,1); }
    60% { box-shadow: 0 0 50px rgba(204,17,51,1), 0 0 100px rgba(204,17,51,0.5); border-color: rgba(255,255,255,0.9); }
    100% { box-shadow: 0 0 0 0 transparent; border-color: transparent; }
  }

  .unlock-lock-glow {
    animation: unlockLockGlow 0.8s ease-out forwards;
  }

  /* 鍵が砕ける */
  @keyframes unlockLockBreak {
    0% { transform: translateX(-50%) scale(1) rotate(0deg); opacity: 1; }
    30% { transform: translateX(-50%) scale(1.3) rotate(0deg); opacity: 1; filter: brightness(3); }
    60% { transform: translateX(-50%) scale(1.1) rotate(15deg); opacity: 0.7; }
    100% { transform: translateX(-50%) scale(0) rotate(45deg); opacity: 0; }
  }

  .unlock-lock-break {
    animation: unlockLockBreak 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  /* 砕けたパーティクル */
  @keyframes unlockParticle {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--particle-x), var(--particle-y)) scale(0);
      opacity: 0;
    }
  }

  .unlock-particle {
    animation: unlockParticle 0.7s cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  /* 開封時のバースト光 */
  @keyframes unlockBurstLight {
    0% { opacity: 0; transform: scale(0.5); }
    40% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(2); }
  }

  .unlock-burst-light {
    animation: unlockBurstLight 0.8s ease-out forwards;
  }
`;
