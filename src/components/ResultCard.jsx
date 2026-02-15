import { useState, useRef, useCallback } from 'react';
import AnimalIllustration from './AnimalIllustration';
import RadarChart from './RadarChart';
import ObachanBubble from './ObachanBubble';
import { MODIFIER_DETAILS } from '../utils/scoring';

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
      <div ref={ref} style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.1s forwards' }}>
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
      {/* ロック解除オーバーレイ */}
      <button
        onClick={handleUnlock}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer bg-sakura/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-vivid-pink/30 transition-all hover:border-vivid-pink/60 hover:bg-sakura/40 group"
        style={{ zIndex: 5 }}
      >
        <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
          {emoji || '🔒'}
        </span>
        <p className="text-sm font-extrabold text-vivid-pink">
          タップして暴く
        </p>
        <p className="text-xs text-text-secondary">
          {label}
        </p>
      </button>
    </div>
  );
}

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

  const handleUnlock = useCallback((id) => {
    setUnlocked((prev) => ({ ...prev, [id]: true }));
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

  // ★の数を数えて恋愛キケン度を算出（1-5）
  const dangerMatch = result.love?.match(/★/g);
  const dangerLevel = dangerMatch ? dangerMatch.length : 3;

  // テキストをパースして各セクションに配置
  const manualParsed = parseSections(result.manual);
  const dateParsed = parseSections(result.date);

  const attackStrategy = manualParsed.sections['攻略法'] || '';
  const landmine = manualParsed.sections['地雷ポイント'] || '';
  const dateSimulation = dateParsed.sections['シミュレーション'] || '';
  const dateSpot = dateParsed.sections['おすすめスポット'] || '';

  return (
    <>
    <div className="space-y-8 mb-6 pb-24">

      {/* ============================================ */}
      {/* Section 1: 診断結果 (Hero) — 常に表示 */}
      {/* ============================================ */}
      <div className="result-section hero-gradient rounded-2xl p-8 shadow-xl border border-vivid-pink/20 card-shine">
        {/* シルエット → 徐々に明るくなるイラスト */}
        <div className="flex justify-center mb-6">
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

        <h2 className="text-center text-[1.75rem] sm:text-4xl font-extrabold text-text-primary mb-3 leading-tight result-title-glow tracking-tight dondon-item dondon-delay-2">
          {modifier}{result.name}
        </h2>

        <div className="flex justify-center mb-3 dondon-item dondon-delay-2">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-vivid-pink to-transparent rounded-full" />
        </div>

        <p className="text-center text-sm text-vivid-pink font-semibold mb-5 px-2 dondon-item dondon-delay-3">
          {result.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-2 dondon-item dondon-delay-4">
          {result.traits.map((trait, i) => (
            <span
              key={i}
              className="text-sm font-bold bg-vivid-pink/20 text-vivid-pink px-4 py-2 rounded-full border border-vivid-pink/30 shadow-[0_0_12px_rgba(204,17,51,0.15)]"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="mt-6 dondon-item dondon-delay-5">
          <RadarChart typeKey={typeKey} modifier={modifier} />
        </div>
      </div>

      <SectionDivider />
      <div className="dondon-item dondon-delay-6">
        <ObachanBubble variant="whisper">
          まずは表の顔から見せたるわ…裏はもっとエグいで？
        </ObachanBubble>
      </div>

      {/* ============================================ */}
      {/* Section 2: 表の顔 — 常に開放 */}
      {/* ============================================ */}
      <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-blue-400/70">
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

      <SectionDivider />
      <ObachanBubble variant="shout">
        さぁここからが本番や！タップして暴いたれ！
      </ObachanBubble>

      {/* ============================================ */}
      {/* Section 3: 裏の顔 — ロック付き */}
      {/* ============================================ */}
      <LockedSection
        id="hidden"
        label={`${nameLabel}の黒い本性、見る覚悟あるか？`}
        emoji="👿"
        unlocked={unlocked.hidden}
        onUnlock={handleUnlock}
      >
        <div className="result-section bg-card rounded-2xl shadow-xl border-2 border-vivid-pink/40 overflow-hidden ura-card">
          <div className="ura-header px-5 py-5 flex items-center gap-3">
            <span className="text-3xl">👿</span>
            <h3 className="text-2xl font-extrabold text-vivid-pink">
              {nameLabel}の裏の顔
            </h3>
            <span className="text-[0.65rem] text-vivid-pink/60 ml-auto font-medium tracking-wider">ちょいゲスな本性</span>
          </div>
          <div className="px-5 pt-3 pb-0 flex items-center gap-3">
            <span className="text-xs font-bold text-vivid-pink/70">ゲス度</span>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={`w-4 h-4 rounded-full ${i <= gesudoLevel ? 'bg-vivid-pink shadow-[0_0_6px_rgba(204,17,51,0.4)]' : 'bg-coral/30'}`} />
              ))}
            </div>
            <span className="text-xs text-vivid-pink/50 ml-auto">{gesudoLevel}/5</span>
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

      <SectionDivider />
      <ObachanBubble>
        攻略法教えたるわ。でも地雷踏んでも知らんで？
      </ObachanBubble>

      {/* ============================================ */}
      {/* Section 4: トリセツ — ロック付き */}
      {/* ============================================ */}
      <LockedSection
        id="manual"
        label={`${nameLabel}の攻略法と地雷、知りたいか？`}
        emoji="📖"
        unlocked={unlocked.manual}
        onUnlock={handleUnlock}
      >
        <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-amber-500/70">
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

      {/* ============================================ */}
      {/* Section 5: 付き合ったらどうなる？ — ロック付き */}
      {/* ============================================ */}
      {result.love && (
        <>
          <SectionDivider />
          <ObachanBubble variant="whisper">
            ここだけの話やけど…恋愛面はなかなかヤバいで。
          </ObachanBubble>
          <LockedSection
            id="love"
            label="恋愛のヤバい真実、覗いてみるか？"
            emoji="💕"
            unlocked={unlocked.love}
            onUnlock={handleUnlock}
          >
            <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-pink-400/70">
              <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
                <span className="text-2xl">💕</span>
                <h3 className="text-xl font-bold text-text-primary">
                  {targetName ? `${targetName}と` : ''}付き合ったらどうなる？
                </h3>
              </div>
              <div className="px-5 pt-3 pb-0 flex items-center gap-3">
                <span className="text-xs font-bold text-vivid-pink/70">恋愛キケン度</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <span key={i} className={`text-sm ${i <= dangerLevel ? '' : 'opacity-20'}`}>💀</span>
                  ))}
                </div>
              </div>
              <div className="px-5 py-6">
                <p className="text-xs text-vivid-pink/50 italic mb-3">覚悟はええか？</p>
                <p className="text-sm leading-8 text-text-primary whitespace-pre-line">{result.love}</p>
              </div>
            </div>
          </LockedSection>
        </>
      )}

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
      <div className="result-section text-center py-4">
        <span className="inline-block text-sm font-bold text-vivid-pink bg-vivid-pink/10 px-5 py-2 rounded-full border border-vivid-pink/20">
          #あの人の裏の顔診断
        </span>
      </div>
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
