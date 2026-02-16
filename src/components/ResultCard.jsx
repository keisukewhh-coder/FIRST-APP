import { useState, useRef, useCallback, useEffect } from 'react';
import AnimalIllustration from './AnimalIllustration';
import RadarChart from './RadarChart';
import ObachanBubble from './ObachanBubble';
import { MODIFIER_DETAILS } from '../utils/scoring';

/** Confetti particle generator */
function ConfettiEffect() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#CC1133', '#FF3355', '#FF6B85', '#FFD700', '#FF8C00', '#FF1493', '#F0E0E0'];
    const shapes = ['circle', 'square', 'triangle'];
    const newParticles = [];

    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: 4 + Math.random() * 8,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 1.5,
      });
    }
    setParticles(newParticles);

    // Clean up particles after animation
    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: p.shape === 'triangle' ? '0' : `${p.size}px`,
            backgroundColor: p.shape !== 'triangle' ? p.color : 'transparent',
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
            borderLeft: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
            borderRight: p.shape === 'triangle' ? `${p.size / 2}px solid transparent` : 'none',
            borderBottom: p.shape === 'triangle' ? `${p.size}px solid ${p.color}` : 'none',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/** Dramatic pause overlay — black screen that fades to reveal */
function DramaticPause({ targetName }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="dramatic-overlay">
      <div className="dramatic-text">
        {targetName ? `${targetName}の裏の顔…` : 'あの人の裏の顔…'}
      </div>
    </div>
  );
}

/**
 * テキストを【見出し】で分割するユーティリティ
 */
function parseSections(text) {
  if (!text) return { prefix: '', sections: {} };
  const parts = text.split(/【([^】]+)】/);
  const prefix = parts[0].trim();
  const sections = {};
  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i];
    const value = (parts[i + 1] || '').trim();
    sections[key] = value;
  }
  return { prefix, sections };
}

/** セクション間の装飾ドットセパレータ */
function SectionDivider() {
  return (
    <div className="flex justify-center items-center gap-2 py-2">
      <span className="w-1.5 h-1.5 rounded-full bg-vivid-pink/30" />
      <span className="w-1 h-1 rounded-full bg-vivid-pink/20" />
      <span className="w-1.5 h-1.5 rounded-full bg-vivid-pink/30" />
    </div>
  );
}

/**
 * TeaserDivider — セクション間の煽りテキスト付きディバイダ（スクロールで表示）
 */
function TeaserDivider({ text }) {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={`reveal-section py-3 ${isVisible ? 'revealed' : ''}`}
    >
      <SectionDivider />
      <div className="text-center py-3">
        <p className={`teaser-text text-sm font-extrabold text-vivid-pink/80 tracking-wide ${isVisible ? 'revealed' : ''}`}>
          {text}
        </p>
      </div>
      <SectionDivider />
    </div>
  );
}

/**
 * DangerMeter — アニメーション付きゲージバー
 */
function DangerMeter({ label, level, maxLevel = 5, icon, visible }) {
  const percent = (level / maxLevel) * 100;

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-xs font-bold text-vivid-pink/70 shrink-0 w-20">{icon} {label}</span>
      <div className="flex-1 h-3 bg-coral/30 rounded-full overflow-hidden meter-bar-glow">
        <div
          className="h-full rounded-full meter-bar-fill"
          style={{
            width: visible ? `${percent}%` : '0%',
            transitionDelay: '0.3s',
          }}
        />
      </div>
      <span className="text-xs font-extrabold text-vivid-pink shrink-0">{level}/{maxLevel}</span>
    </div>
  );
}

/**
 * AnimatedStars — 星がポップするアニメーション付き
 */
function AnimatedStars({ level, visible }) {
  return (
    <div className="flex gap-1.5">
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          className={`text-sm star-pop ${i <= level ? '' : 'opacity-20'}`}
          style={{
            animationDelay: visible ? `${0.3 + i * 0.15}s` : '0s',
            opacity: visible ? undefined : 0,
          }}
        >
          {i <= level ? '💀' : '💀'}
        </span>
      ))}
    </div>
  );
}

/**
 * useScrollReveal — Intersection Observer を使ったスクロール表示制御
 */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * RevealSection — スクロールで表示されるセクションラッパー
 */
function RevealSection({ children, delay = 0, onReveal }) {
  const [ref, isVisible] = useScrollReveal(0.1);

  useEffect(() => {
    if (isVisible && onReveal) {
      onReveal();
    }
  }, [isVisible, onReveal]);

  return (
    <div
      ref={ref}
      className={`reveal-section ${isVisible ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/**
 * LockedSection — タップで開封するロック付きセクション
 * ロック中: ブラー + 鍵マーク + 煽りテキスト
 * 解除後: 通常表示 + 開封アニメーション
 */
function LockedSection({ id, label, emoji, unlocked, onUnlock, children }) {
  const ref = useRef(null);

  const handleUnlock = () => {
    onUnlock(id);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  if (unlocked) {
    return (
      <div ref={ref} className="unlock-burst" style={{ opacity: 0, animation: 'unlockBurst 0.6s ease-out forwards, fadeInUp 0.5s ease-out 0.1s forwards' }}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* ブラーされたプレビュー */}
      <div className="blur-[6px] opacity-40 pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
      {/* ロック解除オーバーレイ — パルスするボーダー */}
      <button
        onClick={handleUnlock}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer bg-sakura/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-vivid-pink/30 lock-overlay-pulse transition-all hover:border-vivid-pink/60 hover:bg-sakura/40 group"
        style={{ zIndex: 5 }}
      >
        <span className="text-4xl group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(204,17,51,0.4)]">
          {emoji || '🔒'}
        </span>
        <p className="text-sm font-extrabold text-vivid-pink drop-shadow-[0_0_8px_rgba(204,17,51,0.3)]">
          タップして暴く
        </p>
        <p className="text-xs text-text-secondary">
          {label}
        </p>
      </button>
    </div>
  );
}

/** セクション間の煽りテキスト一覧 */
const TEASER_TEXTS = [
  'ここからが本番やで…覚悟しとき 👀',
  'まだまだ暴くで…逃げられへんで 🔥',
  '攻略法わかったやろ？次はデートや 💕',
  '最終兵器、見せたるわ… 💣',
  'ラスト。これ知ったらもう戻れへんで… 💀',
];

export default function ResultCard({ result, typeKey, modifier, targetName }) {
  if (!result) {
    return (
      <div className="bg-card rounded-3xl p-6 shadow-sm text-center">
        <p className="text-text-secondary">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  const nameLabel = targetName || 'あの人';
  const modifierDetail = modifier ? MODIFIER_DETAILS[modifier] : null;

  // ロック状態管理: 各セクションの開封状態
  const [unlocked, setUnlocked] = useState({ front: true }); // 表の顔は最初から見える
  const [gokuhi, setGokuhi] = useState(false);
  const gokuhiRef = useRef(null);

  // シェイク演出: 裏の顔が開封された時に画面をシェイク
  const [shaking, setShaking] = useState(false);
  const shakeContainerRef = useRef(null);

  // メーターの表示制御
  const [metersVisible, setMetersVisible] = useState(false);
  const [loveMetersVisible, setLoveMetersVisible] = useState(false);

  const handleUnlock = useCallback((id) => {
    setUnlocked((prev) => ({ ...prev, [id]: true }));

    // 裏の顔セクションが開封されたら画面シェイク
    if (id === 'hidden') {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }, []);

  const handleGokuhiToggle = useCallback(() => {
    setGokuhi((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          gokuhiRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
      return next;
    });
  }, []);

  // 暴露度計算（開封されたセクション数）
  const totalSections = 4; // front, hidden, manual, love
  const unlockedCount = Object.values(unlocked).filter(Boolean).length;
  const bakuroPercent = Math.round((unlockedCount / totalSections) * 100);

  // ゲス度を typeKey から算出（1-5）
  const gesudoLevel = typeKey ? ((typeKey.charCodeAt(0) + typeKey.charCodeAt(1) + typeKey.charCodeAt(2) + typeKey.charCodeAt(3)) % 4) + 2 : 3;

  // 面倒くさ度を算出（1-5: traitsの文字数 + typeKeyから）
  const mendokusaLevel = typeKey ? ((typeKey.charCodeAt(1) + typeKey.charCodeAt(3)) % 4) + 2 : 3;

  // ★の数を数えて恋愛キケン度を算出（1-5）
  const dangerMatch = result.love?.match(/★/g);
  const dangerLevel = dangerMatch ? dangerMatch.length : 3;

  // 名前の文字数からアニメーションタイミングを計算
  const fullName = `${modifier || ''}${result.name}`;
  const nameRevealEnd = 1.4 + fullName.length * 0.12 + 0.3; // 名前演出完了時刻

  // テキストをパースして各セクションに配置
  const manualParsed = parseSections(result.manual);
  const dateParsed = parseSections(result.date);

  const attackStrategy = manualParsed.sections['攻略法'] || '';
  const landmine = manualParsed.sections['地雷ポイント'] || '';
  const dateSimulation = dateParsed.sections['シミュレーション'] || '';
  const dateSpot = dateParsed.sections['おすすめスポット'] || '';

  return (
    <>
    {/* Dramatic pause overlay */}
    <DramaticPause targetName={targetName} />

    {/* Confetti effect */}
    <ConfettiEffect />

    <div ref={shakeContainerRef} className={`space-y-8 mb-6 pb-24 ${shaking ? 'ura-shake' : ''}`}>

      {/* ============================================ */}
      {/* Section 1: 診断結果 (Hero) — 常に表示 */}
      {/* ============================================ */}
      <div className="result-section hero-gradient rounded-2xl p-8 shadow-xl border border-vivid-pink/20 card-shine relative">
        {/* キラキラパーティクル */}
        <div className="sparkle-field" aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>

        {/* シルエット → 徐々に明るくなるイラスト */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-48 h-48 flex items-center justify-center hero-glow bg-sakura/50 rounded-full p-4 silhouette-reveal">
            <AnimalIllustration typeKey={typeKey} />
          </div>
        </div>

        {/* おばちゃんの第一声 */}
        <div className="dondon-item dondon-delay-1">
          <ObachanBubble variant="reveal">
            {targetName
              ? `出たわ…！${targetName}の裏の顔、まさかの…！`
              : 'あちゃー、出てもうたわ…！まさかの…！'
            }
          </ObachanBubble>
        </div>

        {targetName && (
          <p className="text-center text-sm text-vivid-pink/70 font-bold mb-2 tracking-wide dondon-item dondon-delay-2">
            {targetName}の裏の顔は…
          </p>
        )}

        {/* 診断名 — 1文字ずつ「ボン！」と出現 */}
        <h2 className="text-center text-[1.75rem] sm:text-4xl font-extrabold text-text-primary mb-3 leading-tight result-title-glow tracking-tight">
          {fullName.split('').map((char, i) => (
            <span
              key={i}
              className="char-bon"
              style={{ animationDelay: `${1.4 + i * 0.12}s` }}
            >
              {char}
            </span>
          ))}
        </h2>

        <div className="flex justify-center mb-3" style={{ opacity: 0, animation: `fadeInUp 0.5s ease-out ${nameRevealEnd}s forwards` }}>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-vivid-pink to-transparent rounded-full" />
        </div>

        <p
          className="text-center text-sm text-vivid-pink font-semibold mb-5 px-2 dondon-item"
          style={{ animationDelay: `${nameRevealEnd + 0.3}s` }}
        >
          {result.tagline}
        </p>

        <div
          className="flex flex-wrap justify-center gap-2"
        >
          {result.traits.map((trait, i) => (
            <span
              key={i}
              className="text-sm font-bold bg-vivid-pink/20 text-vivid-pink px-4 py-2 rounded-full border border-vivid-pink/30 trait-badge-glow trait-bounce-in"
              style={{ animationDelay: `${nameRevealEnd + 0.7 + i * 0.25}s` }}
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="mt-6 dondon-item" style={{ animationDelay: `${nameRevealEnd + 1.1}s` }}>
          <RadarChart typeKey={typeKey} modifier={modifier} />
        </div>
      </div>

      {/* ============================================ */}
      {/* 煽りテキスト 1 */}
      {/* ============================================ */}
      <TeaserDivider text={TEASER_TEXTS[0]} />

      <RevealSection delay={0.1}>
        <ObachanBubble variant="whisper">
          まずは表の顔から見せたるわ…裏はもっとエグいで？
        </ObachanBubble>
      </RevealSection>

      {/* ============================================ */}
      {/* Section 2: 表の顔 — 常に開放 */}
      {/* ============================================ */}
      <RevealSection delay={0.15}>
        <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-blue-400/70" style={{ opacity: 1 }}>
          <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
            <span className="text-2xl">😇</span>
            <h3 className="text-xl font-bold text-text-primary">
              {nameLabel}の表の顔
            </h3>
            <span className="text-xs text-text-secondary ml-auto">みんなが見ている姿</span>
          </div>
          <div className="px-5 py-6">
            <p className="text-xs text-vivid-pink/50 italic mb-3">こんな顔して裏ではね…</p>
            <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
              {result.front}
            </p>
          </div>
        </div>
      </RevealSection>

      {/* ============================================ */}
      {/* 煽りテキスト 2 */}
      {/* ============================================ */}
      <TeaserDivider text={TEASER_TEXTS[1]} />

      <RevealSection delay={0.1}>
        <ObachanBubble variant="shout">
          さぁここからが本番や！タップして暴いたれ！
        </ObachanBubble>
      </RevealSection>

      {/* ============================================ */}
      {/* Section 3: 裏の顔 — ロック付き + シェイク演出 */}
      {/* ============================================ */}
      <RevealSection delay={0.15}>
        <LockedSection
          id="hidden"
          label={`${nameLabel}の黒い本性、見る覚悟あるか？`}
          emoji="👿"
          unlocked={unlocked.hidden}
          onUnlock={handleUnlock}
        >
          <div className="result-section bg-card rounded-2xl shadow-xl border-2 border-vivid-pink/40 overflow-hidden ura-card" style={{ opacity: 1 }}>
            <div className="ura-header px-5 py-5 flex items-center gap-3">
              <span className="text-3xl">👿</span>
              <h3 className="text-2xl font-extrabold text-vivid-pink">
                {nameLabel}の裏の顔
              </h3>
              <span className="text-[0.65rem] text-vivid-pink/60 ml-auto font-medium tracking-wider">ちょいゲスな本性</span>
            </div>

            {/* 危険度メーター群 */}
            <div className="px-5 pt-4 pb-2 space-y-1">
              <RevealSection delay={0} onReveal={() => setMetersVisible(true)}>
                <DangerMeter label="ゲス度" level={gesudoLevel} icon="👿" visible={metersVisible && unlocked.hidden} />
                <DangerMeter label="面倒くさ度" level={mendokusaLevel} icon="😮‍💨" visible={metersVisible && unlocked.hidden} />
              </RevealSection>
            </div>

            <div className="px-5 py-6 ura-body">
              <p className="text-xs text-vivid-pink/50 italic mb-3">さぁ、ここからが本番やで</p>
              <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
                {result.hidden}
              </p>
              {modifierDetail && (
                <div className="mt-4 pt-4 border-t border-vivid-pink/20">
                  <div className="modifier-reveal rounded-xl p-4">
                    <p className="text-sm leading-relaxed text-text-primary">
                      <span className="font-bold text-vivid-pink">「{modifier}」</span>
                      <span className="text-text-secondary text-xs ml-1">タイプの裏側</span>
                    </p>
                    <p className="text-sm leading-8 text-text-primary mt-2">
                      {modifierDetail}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LockedSection>
      </RevealSection>

      {/* ============================================ */}
      {/* 煽りテキスト 3 */}
      {/* ============================================ */}
      <TeaserDivider text={TEASER_TEXTS[2]} />

      <RevealSection delay={0.1}>
        <ObachanBubble>
          攻略法教えたるわ。でも地雷踏んでも知らんで？
        </ObachanBubble>
      </RevealSection>

      {/* ============================================ */}
      {/* Section 4: トリセツ — ロック付き */}
      {/* ============================================ */}
      <RevealSection delay={0.15}>
        <LockedSection
          id="manual"
          label={`${nameLabel}の攻略法と地雷、知りたいか？`}
          emoji="📖"
          unlocked={unlocked.manual}
          onUnlock={handleUnlock}
        >
          <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-amber-500/70" style={{ opacity: 1 }}>
            <div className="bg-coral/25 px-5 py-4 flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <h3 className="text-xl font-bold text-text-primary">
                {nameLabel}のトリセツ
              </h3>
            </div>
            <div className="px-5 py-6 space-y-5">
              <p className="text-xs text-vivid-pink/50 italic">{targetName ? `${targetName}を` : ''}攻略するも地雷を踏むも、あんた次第や</p>

              {attackStrategy && (
                <div className="glass-inner rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">✅</span>
                    <h4 className="text-[0.95rem] font-extrabold text-text-primary tracking-wide">攻略法</h4>
                  </div>
                  <p className="text-sm leading-8 text-text-primary whitespace-pre-line">{attackStrategy}</p>
                </div>
              )}

              {dateSimulation && (
                <div className="torisetsu-item glass-inner rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🎬</span>
                    <h4 className="text-[0.95rem] font-extrabold text-text-primary tracking-wide">デートのシミュレーション</h4>
                  </div>
                  <p className="text-sm leading-8 text-text-primary whitespace-pre-line">{dateSimulation}</p>
                </div>
              )}

              {dateSpot && (
                <div className="torisetsu-item rounded-xl p-4 glass-inner">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5 shrink-0">🎯</span>
                    <div>
                      <h4 className="text-[0.95rem] font-extrabold text-vivid-pink mb-1 tracking-wide">喜ぶデートスポット</h4>
                      <p className="text-sm leading-8 text-text-primary whitespace-pre-line">{dateSpot}</p>
                    </div>
                  </div>
                </div>
              )}

              {landmine && (
                <div className="torisetsu-item rounded-xl p-4 border border-vivid-pink/30 bg-vivid-pink/5">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5 shrink-0">⚠️</span>
                    <div>
                      <h4 className="text-[0.95rem] font-extrabold text-vivid-pink mb-1 tracking-wide">絶対にやってはいけないNG行動</h4>
                      <p className="text-sm leading-8 text-text-primary whitespace-pre-line">{landmine}</p>
                    </div>
                  </div>
                </div>
              )}

              {result.killer && (
                <div className="torisetsu-item rounded-xl p-4 glass-inner">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5 shrink-0">💘</span>
                    <div>
                      <h4 className="text-[0.95rem] font-extrabold text-vivid-pink mb-1 tracking-wide">最強の落とし方</h4>
                      <p className="text-sm leading-8 text-text-primary font-semibold whitespace-pre-line">{result.killer}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LockedSection>
      </RevealSection>

      {/* ============================================ */}
      {/* Section 5: 付き合ったらどうなる？ — ロック付き */}
      {/* ============================================ */}
      {result.love && (
        <>
          {/* 煽りテキスト 4 */}
          <TeaserDivider text={TEASER_TEXTS[3]} />

          <RevealSection delay={0.1}>
            <ObachanBubble variant="whisper">
              ここだけの話やけど…恋愛面はなかなかヤバいで。
            </ObachanBubble>
          </RevealSection>

          <RevealSection delay={0.15}>
            <LockedSection
              id="love"
              label="恋愛のヤバい真実、覗いてみるか？"
              emoji="💕"
              unlocked={unlocked.love}
              onUnlock={handleUnlock}
            >
              <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-pink-400/70" style={{ opacity: 1 }}>
                <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
                  <span className="text-2xl">💕</span>
                  <h3 className="text-xl font-bold text-text-primary">
                    {targetName ? `${targetName}と` : ''}付き合ったらどうなる？
                  </h3>
                </div>

                {/* 恋愛キケン度メーター */}
                <div className="px-5 pt-3 pb-1 space-y-1">
                  <RevealSection delay={0} onReveal={() => setLoveMetersVisible(true)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-vivid-pink/70">恋愛キケン度</span>
                      <AnimatedStars level={dangerLevel} visible={loveMetersVisible && unlocked.love} />
                    </div>
                    <DangerMeter label="依存度" level={Math.min(dangerLevel + 1, 5)} maxLevel={5} icon="🫠" visible={loveMetersVisible && unlocked.love} />
                  </RevealSection>
                </div>

                <div className="px-5 py-6">
                  <p className="text-xs text-vivid-pink/50 italic mb-3">覚悟はええか？</p>
                  <p className="text-sm leading-8 text-text-primary whitespace-pre-line">{result.love}</p>
                </div>
              </div>
            </LockedSection>
          </RevealSection>
        </>
      )}

      {/* ============================================ */}
      {/* 最後の煽りテキスト */}
      {/* ============================================ */}
      <TeaserDivider text={TEASER_TEXTS[4]} />

      {/* ============================================ */}
      {/* Section 7: 極秘ファイル（フローティングバーから開放） */}
      {/* ============================================ */}
      {gokuhi && (
        <>
          <SectionDivider />
          <ObachanBubble variant="reveal">
            極秘ファイル開いてもうたな…！もう後戻りできひんで！
          </ObachanBubble>
          <div
            ref={gokuhiRef}
            className="result-section bg-card rounded-2xl shadow-xl border-2 border-vivid-pink/50 overflow-hidden gokuhi-card"
            style={{ opacity: 0, animation: 'fadeInUp 0.6s ease-out 0.1s forwards' }}
          >
            <div className="gokuhi-header px-5 py-5 flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              <h3 className="text-xl font-extrabold text-vivid-pink">
                {nameLabel}の極秘ファイル
              </h3>
              <span className="text-[0.6rem] text-vivid-pink/60 ml-auto font-bold tracking-widest">TOP SECRET</span>
            </div>
            <div className="px-5 py-6 space-y-4">
              <div className="glass-inner rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">🎭</span>
                  <h4 className="text-sm font-extrabold text-vivid-pink">本人が絶対認めたくない真実</h4>
                </div>
                <p className="text-sm leading-8 text-text-primary">
                  {typeKey?.[0] === 'E'
                    ? `${nameLabel}は目立ちたがりのくせに、一人になると急に不安になるタイプや。SNSの「いいね」の数、こっそりチェックしとるで。`
                    : `${nameLabel}は「一人が好き」言うてるけど、ほんまは構ってほしいだけやねん。誘われんかったらめっちゃ凹んどるで。`
                  }
                </p>
              </div>
              <div className="glass-inner rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">💣</span>
                  <h4 className="text-sm font-extrabold text-vivid-pink">ブチギレスイッチ</h4>
                </div>
                <p className="text-sm leading-8 text-text-primary">
                  {typeKey?.[2] === 'T'
                    ? `論理が破綻した議論を見た瞬間、${nameLabel}の中で何かが切れる。顔には出さへんけど、心の中で「こいつアホか」って30回くらい繰り返しとるで。`
                    : `自分の気持ちを軽く扱われた瞬間、${nameLabel}は表面上ニコニコしながら心のシャッター全部閉めるで。一回閉じたらもう開かへんからな。`
                  }
                </p>
              </div>
              <div className="glass-inner rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">🌙</span>
                  <h4 className="text-sm font-extrabold text-vivid-pink">深夜3時の本音</h4>
                </div>
                <p className="text-sm leading-8 text-text-primary">
                  {typeKey?.[1] === 'N'
                    ? `「もしあの時ちがう選択しとったら…」って妄想が止まらんくなって朝まで寝られへん。${nameLabel}の脳内は深夜が一番忙しいねん。`
                    : `「明日やらなあかんこと」を頭の中でリスト化して、結局不安になって眠れへん。${nameLabel}は心配性すぎて自分で自分を追い込んどるわ。`
                  }
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ============================================ */}
      {/* Section 8: ハッシュタグ */}
      {/* ============================================ */}
      <RevealSection delay={0.1}>
        <div className="text-center py-4">
          <span className="inline-block text-sm font-bold text-vivid-pink bg-vivid-pink/10 px-5 py-2 rounded-full border border-vivid-pink/20">
            #あの人の裏の顔診断
          </span>
        </div>
      </RevealSection>
    </div>

    {/* ============================================ */}
    {/* フローティング暴露バー（常時表示） */}
    {/* ============================================ */}
    <div className="fixed bottom-0 left-0 right-0 z-50 floating-bar-gradient">
      <div className="max-w-lg mx-auto px-4 py-3">
        {/* 暴露度プログレスバー */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold text-vivid-pink shrink-0">暴露度</span>
          <div className="flex-1 h-2 bg-coral/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-vivid-pink rounded-full transition-all duration-700 ease-out"
              style={{ width: `${bakuroPercent}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-vivid-pink shrink-0">{bakuroPercent}%</span>
        </div>

        {/* 極秘モードボタン */}
        <button
          onClick={handleGokuhiToggle}
          className={`
            w-full flex items-center justify-center gap-3 py-3 rounded-full
            font-extrabold text-sm border-0 cursor-pointer
            transition-all duration-500
            ${gokuhi
              ? 'bg-vivid-pink text-white shadow-[0_0_25px_rgba(204,17,51,0.5)]'
              : 'bg-card text-vivid-pink border-2 border-vivid-pink/40 hover:bg-vivid-pink/10'
            }
            ${bakuroPercent >= 80 && !gokuhi ? 'pulse-gentle' : ''}
          `}
        >
          <span className="text-lg">{gokuhi ? '🔓' : '🔒'}</span>
          {gokuhi ? '極秘ファイル開放中' : '極秘ファイルを解放する'}
        </button>
      </div>
    </div>
    </>
  );
}
