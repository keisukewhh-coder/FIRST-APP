import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * FileOpenReveal - "極秘ファイル開封" 演出コンポーネント
 *
 * クイズ完了 -> 結果画面の間に再生される全画面オーバーレイアニメーション。
 * 約3秒間で「機密ファイルが開封される」演出を行い、完了後に onComplete を呼ぶ。
 *
 * Phase 0: 暗転 (0-0.6s) - "CLASSIFIED" テキストフリッカー
 * Phase 1: フォルダ開封 (0.6-1.2s) - CSSフォルダが開く
 * Phase 2: 警告表示 (1.2-2.0s) - WARNING + 危険メッセージ
 * Phase 3: グリッチ (2.0-2.5s) - 画面が乱れる
 * Phase 4: フェードアウト (2.5-3.0s) - 全体が消える -> onComplete
 */
export default function FileOpenReveal({ targetName, onComplete }) {
  const [phase, setPhase] = useState(0);
  const onCompleteRef = useRef(onComplete);

  // Keep the ref fresh without re-triggering the effect
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const handleComplete = useCallback(() => {
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 2500),
      setTimeout(() => {
        setPhase(5);
        setTimeout(handleComplete, 500);
      }, 3000),
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
      {/* ===== SCANLINES OVERLAY ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(204,17,51,0.03) 2px, rgba(204,17,51,0.03) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ===== VIGNETTE OVERLAY ===== */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          padding: '20px',
          ...(phase === 3 ? glitchContainerStyle : {}),
        }}
        className={phase === 3 ? 'file-reveal-glitch' : ''}
      >
        {/* ----- Phase 0: CLASSIFIED text flicker ----- */}
        <div
          style={{
            opacity: phase >= 0 && phase < 4 ? 1 : 0,
            transition: 'opacity 0.3s',
            textAlign: 'center',
          }}
        >
          <p
            className="file-reveal-flicker"
            style={{
              fontSize: '12px',
              letterSpacing: '0.3em',
              color: '#CC1133',
              marginBottom: '8px',
              fontWeight: 600,
              opacity: phase === 0 ? 1 : 0.4,
              transition: 'opacity 0.3s',
            }}
          >
            CLASSIFIED
          </p>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #CC1133, transparent)',
              margin: '0 auto',
              opacity: phase === 0 ? 1 : 0.3,
              transition: 'opacity 0.3s',
            }}
          />
        </div>

        {/* ----- Phase 1: CSS Folder opening ----- */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
        >
          <FolderIcon isOpen={phase >= 2} />
        </div>

        {/* ----- Phase 2: WARNING + danger message ----- */}
        <div
          style={{
            opacity: phase >= 2 && phase < 4 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#CC1133',
              letterSpacing: '0.2em',
              textShadow: '0 0 20px rgba(204,17,51,0.6), 0 0 40px rgba(204,17,51,0.3)',
              marginBottom: '12px',
            }}
          >
            WARNING
          </p>
          <p
            style={{
              fontSize: '13px',
              color: '#F0E0E0',
              lineHeight: 1.8,
              textShadow: '0 0 10px rgba(204,17,51,0.3)',
            }}
          >
            この情報は本人にバレると危険です
          </p>
        </div>

        {/* ----- Target name loading message ----- */}
        {targetName && (
          <div
            style={{
              opacity: phase >= 1 && phase < 4 ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            <p
              className="file-reveal-dots"
              style={{
                fontSize: '14px',
                color: '#A88888',
                fontWeight: 500,
              }}
            >
              {targetName}の極秘ファイル開封中
            </p>
          </div>
        )}
      </div>

      {/* ===== GLITCH CLONE LAYERS (Phase 3) ===== */}
      {phase === 3 && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
            }}
            className="file-reveal-glitch-layer-r"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              pointerEvents: 'none',
            }}
            className="file-reveal-glitch-layer-b"
          />
        </>
      )}

      {/* ===== INLINE STYLES (keyframes) ===== */}
      <style>{keyframeStyles}</style>
    </div>
  );
}

/**
 * CSS-only folder icon
 * A tab on top + body rectangle that "opens" via rotateX
 */
function FolderIcon({ isOpen }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '80px',
        height: '60px',
        perspective: '200px',
      }}
    >
      {/* Folder body */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '80px',
          height: '50px',
          backgroundColor: '#1C1212',
          border: '1.5px solid rgba(204,17,51,0.4)',
          borderRadius: '0 0 6px 6px',
          boxShadow: '0 0 15px rgba(204,17,51,0.15)',
        }}
      >
        {/* "TOP SECRET" label inside folder */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '7px',
            letterSpacing: '0.15em',
            color: '#CC1133',
            fontWeight: 700,
            opacity: 0.7,
            whiteSpace: 'nowrap',
          }}
        >
          TOP SECRET
        </div>
      </div>

      {/* Folder tab / flap (opens) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40px',
          height: '16px',
          backgroundColor: '#1C1212',
          border: '1.5px solid rgba(204,17,51,0.4)',
          borderBottom: 'none',
          borderRadius: '6px 6px 0 0',
          transformOrigin: 'bottom center',
          transform: isOpen ? 'rotateX(-70deg)' : 'rotateX(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 10px rgba(204,17,51,0.1)',
        }}
      />

      {/* Top edge of folder body (connects with tab) */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '40px',
          right: 0,
          height: '6px',
          backgroundColor: '#1C1212',
          border: '1.5px solid rgba(204,17,51,0.4)',
          borderBottom: 'none',
          borderLeft: 'none',
          borderRadius: '0 6px 0 0',
        }}
      />

      {/* Glow effect when open */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '10%',
            right: '10%',
            height: '20px',
            background:
              'radial-gradient(ellipse at center, rgba(204,17,51,0.3) 0%, transparent 70%)',
            filter: 'blur(4px)',
            animation: 'fileRevealFolderGlow 0.8s ease-in-out infinite alternate',
          }}
        />
      )}
    </div>
  );
}

/** Glitch container style for Phase 3 */
const glitchContainerStyle = {
  animation: 'fileRevealShake 0.1s linear infinite',
};

/**
 * All keyframe animations scoped to this component.
 * Prefixed with "fileReveal" to avoid collisions with the app's existing animations.
 */
const keyframeStyles = `
  /* Text flicker for CLASSIFIED */
  .file-reveal-flicker {
    animation: fileRevealFlicker 0.15s step-end infinite;
  }

  @keyframes fileRevealFlicker {
    0%   { opacity: 1; }
    10%  { opacity: 0.4; }
    20%  { opacity: 1; }
    30%  { opacity: 0.7; }
    40%  { opacity: 1; }
    50%  { opacity: 0.3; }
    60%  { opacity: 1; }
    70%  { opacity: 0.6; }
    80%  { opacity: 1; }
    90%  { opacity: 0.5; }
    100% { opacity: 1; }
  }

  /* Loading dots for target name */
  .file-reveal-dots::after {
    content: '';
    animation: fileRevealDots 1.2s step-end infinite;
  }

  @keyframes fileRevealDots {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
  }

  /* Folder glow pulse when open */
  @keyframes fileRevealFolderGlow {
    0%   { opacity: 0.5; }
    100% { opacity: 1; }
  }

  /* Screen shake during glitch phase */
  @keyframes fileRevealShake {
    0%   { transform: translate(2px, -1px); }
    10%  { transform: translate(-2px, 2px); }
    20%  { transform: translate(3px, 0px); }
    30%  { transform: translate(-1px, -2px); }
    40%  { transform: translate(1px, 3px); }
    50%  { transform: translate(-3px, 1px); }
    60%  { transform: translate(2px, -3px); }
    70%  { transform: translate(-2px, 2px); }
    80%  { transform: translate(3px, -1px); }
    90%  { transform: translate(-1px, 3px); }
    100% { transform: translate(1px, -2px); }
  }

  /* Glitch: Red channel shift layer */
  .file-reveal-glitch-layer-r {
    animation: fileRevealGlitchR 0.15s step-end infinite;
    mix-blend-mode: screen;
  }

  @keyframes fileRevealGlitchR {
    0%   { clip-path: inset(15% 0 80% 0); background: rgba(204,17,51,0.15); transform: translate(4px, 0); }
    10%  { clip-path: inset(60% 0 10% 0); background: rgba(204,17,51,0.1);  transform: translate(-3px, 0); }
    20%  { clip-path: inset(20% 0 55% 0); background: rgba(204,17,51,0.2);  transform: translate(5px, 0); }
    30%  { clip-path: inset(70% 0 5% 0);  background: rgba(204,17,51,0.12); transform: translate(-4px, 0); }
    40%  { clip-path: inset(5% 0 85% 0);  background: rgba(204,17,51,0.18); transform: translate(3px, 0); }
    50%  { clip-path: inset(40% 0 30% 0); background: rgba(204,17,51,0.15); transform: translate(-5px, 0); }
    60%  { clip-path: inset(80% 0 5% 0);  background: rgba(204,17,51,0.1);  transform: translate(4px, 0); }
    70%  { clip-path: inset(10% 0 70% 0); background: rgba(204,17,51,0.2);  transform: translate(-3px, 0); }
    80%  { clip-path: inset(50% 0 25% 0); background: rgba(204,17,51,0.12); transform: translate(5px, 0); }
    90%  { clip-path: inset(30% 0 50% 0); background: rgba(204,17,51,0.15); transform: translate(-4px, 0); }
    100% { clip-path: inset(75% 0 10% 0); background: rgba(204,17,51,0.1);  transform: translate(3px, 0); }
  }

  /* Glitch: Blue/cyan channel shift layer */
  .file-reveal-glitch-layer-b {
    animation: fileRevealGlitchB 0.12s step-end infinite;
    mix-blend-mode: screen;
  }

  @keyframes fileRevealGlitchB {
    0%   { clip-path: inset(45% 0 35% 0); background: rgba(51,17,204,0.1);  transform: translate(-3px, 0); }
    10%  { clip-path: inset(10% 0 75% 0); background: rgba(51,17,204,0.08); transform: translate(4px, 0); }
    20%  { clip-path: inset(65% 0 15% 0); background: rgba(51,17,204,0.12); transform: translate(-5px, 0); }
    30%  { clip-path: inset(25% 0 55% 0); background: rgba(51,17,204,0.1);  transform: translate(3px, 0); }
    40%  { clip-path: inset(80% 0 5% 0);  background: rgba(51,17,204,0.08); transform: translate(-4px, 0); }
    50%  { clip-path: inset(5% 0 80% 0);  background: rgba(51,17,204,0.12); transform: translate(5px, 0); }
    60%  { clip-path: inset(55% 0 25% 0); background: rgba(51,17,204,0.1);  transform: translate(-3px, 0); }
    70%  { clip-path: inset(35% 0 45% 0); background: rgba(51,17,204,0.08); transform: translate(4px, 0); }
    80%  { clip-path: inset(15% 0 65% 0); background: rgba(51,17,204,0.12); transform: translate(-5px, 0); }
    90%  { clip-path: inset(70% 0 10% 0); background: rgba(51,17,204,0.1);  transform: translate(3px, 0); }
    100% { clip-path: inset(40% 0 40% 0); background: rgba(51,17,204,0.08); transform: translate(-4px, 0); }
  }

  /* Phase 3 overall glitch effect on the content container */
  .file-reveal-glitch {
    animation: fileRevealShake 0.1s linear infinite;
  }
`;
