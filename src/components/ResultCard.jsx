import AnimalIllustration from './AnimalIllustration';
import RadarChart from './RadarChart';
import { MODIFIER_DETAILS } from '../utils/scoring';

/**
 * テキストを【見出し】で分割するユーティリティ
 * 例: "前文【攻略法】本文【地雷ポイント】本文" → { prefix, sections: { 攻略法: "...", 地雷ポイント: "..." } }
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

export default function ResultCard({ result, typeKey, modifier }) {
  if (!result) {
    return (
      <div className="bg-card rounded-3xl p-6 shadow-sm text-center">
        <p className="text-text-secondary">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  const modifierDetail = modifier ? MODIFIER_DETAILS[modifier] : null;

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
    <div className="space-y-8 mb-6">

      {/* ============================================ */}
      {/* Section 1: 診断結果 (Hero) */}
      {/* ============================================ */}
      <div className="result-section hero-gradient rounded-2xl p-8 shadow-xl border border-vivid-pink/20 card-shine">
        {/* Animal illustration - large centered with glow */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-48 flex items-center justify-center hero-glow bg-sakura/50 rounded-full p-4">
            <AnimalIllustration typeKey={typeKey} />
          </div>
        </div>

        {/* Modifier + Type name with neon glow */}
        <h2 className="text-center text-[1.75rem] sm:text-4xl font-extrabold text-text-primary mb-3 leading-tight result-title-glow tracking-tight">
          {modifier}{result.name}
        </h2>

        {/* Decorative divider */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-vivid-pink to-transparent rounded-full" />
        </div>

        {/* Tagline */}
        <p className="text-center text-sm text-vivid-pink font-semibold mb-5 px-2">
          {result.tagline}
        </p>

        {/* Traits badges - larger with glow */}
        <div className="flex flex-wrap justify-center gap-2">
          {result.traits.map((trait, i) => (
            <span
              key={i}
              className="text-sm font-bold bg-vivid-pink/20 text-vivid-pink px-4 py-2 rounded-full border border-vivid-pink/30 shadow-[0_0_12px_rgba(204,17,51,0.15)]"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.4s ease-out ${0.5 + i * 0.1}s forwards`
              }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* レーダーチャート */}
        <div className="mt-6">
          <RadarChart typeKey={typeKey} modifier={modifier} />
        </div>
      </div>

      <SectionDivider />

      {/* ============================================ */}
      {/* Section 2: 表の顔 */}
      {/* ============================================ */}
      <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-blue-400/70">
        {/* Header */}
        <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">😇</span>
          <h3 className="text-xl font-bold text-text-primary">
            表の顔
          </h3>
          <span className="text-xs text-text-secondary ml-auto">みんなが見ている姿</span>
        </div>
        {/* Body */}
        <div className="px-5 py-6">
          <p className="text-xs text-vivid-pink/50 italic mb-3">こんな顔して裏ではね…</p>
          <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
            {result.front}
          </p>
        </div>
      </div>

      <SectionDivider />

      {/* ============================================ */}
      {/* Section 3: 裏の顔 (dramatic reveal) */}
      {/* ============================================ */}
      <div className="result-section bg-card rounded-2xl shadow-xl border-2 border-vivid-pink/40 overflow-hidden ura-card">
        {/* Header - dramatic gradient */}
        <div className="ura-header px-5 py-5 flex items-center gap-3">
          <span className="text-3xl">👿</span>
          <h3 className="text-2xl font-extrabold text-vivid-pink">
            裏の顔
          </h3>
          <span className="text-[0.65rem] text-vivid-pink/60 ml-auto font-medium tracking-wider">ちょいゲスな本性</span>
        </div>
        {/* ゲス度メーター */}
        <div className="px-5 pt-3 pb-0 flex items-center gap-3">
          <span className="text-xs font-bold text-vivid-pink/70">ゲス度</span>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <span key={i} className={`w-4 h-4 rounded-full ${i <= gesudoLevel ? 'bg-vivid-pink shadow-[0_0_6px_rgba(204,17,51,0.4)]' : 'bg-coral/30'}`} />
            ))}
          </div>
          <span className="text-xs text-vivid-pink/50 ml-auto">{gesudoLevel}/5</span>
        </div>
        {/* Body */}
        <div className="px-5 py-6 ura-body">
          <p className="text-xs text-vivid-pink/50 italic mb-3">さぁ、ここからが本番やで</p>
          <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
            {result.hidden}
          </p>

          {/* Modifier detail */}
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

      <SectionDivider />

      {/* ============================================ */}
      {/* Section 4: この人の取扱説明書 */}
      {/* ============================================ */}
      <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-amber-500/70">
        {/* Header */}
        <div className="bg-coral/25 px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <h3 className="text-xl font-bold text-text-primary">
            この人のトリセツ
          </h3>
        </div>
        {/* Body */}
        <div className="px-5 py-6 space-y-5">
          <p className="text-xs text-vivid-pink/50 italic">攻略するも地雷を踏むも、あんた次第や</p>

          {/* 攻略法 */}
          {attackStrategy && (
            <div className="glass-inner rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">✅</span>
                <h4 className="text-[0.95rem] font-extrabold text-text-primary tracking-wide">攻略法</h4>
              </div>
              <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
                {attackStrategy}
              </p>
            </div>
          )}

          {/* デートのシミュレーション */}
          {dateSimulation && (
            <div className="torisetsu-item glass-inner rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🎬</span>
                <h4 className="text-[0.95rem] font-extrabold text-text-primary tracking-wide">デートのシミュレーション</h4>
              </div>
              <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
                {dateSimulation}
              </p>
            </div>
          )}

          {/* 喜ぶデートスポット */}
          {dateSpot && (
            <div className="torisetsu-item rounded-xl p-4 glass-inner">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">🎯</span>
                <div>
                  <h4 className="text-[0.95rem] font-extrabold text-vivid-pink mb-1 tracking-wide">喜ぶデートスポット</h4>
                  <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
                    {dateSpot}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 絶対にやってはいけないNG行動 */}
          {landmine && (
            <div className="torisetsu-item rounded-xl p-4 border border-vivid-pink/30 bg-vivid-pink/5">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">⚠️</span>
                <div>
                  <h4 className="text-[0.95rem] font-extrabold text-vivid-pink mb-1 tracking-wide">絶対にやってはいけないNG行動</h4>
                  <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
                    {landmine}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 最強の落とし方 */}
          {result.killer && (
            <div className="torisetsu-item rounded-xl p-4 glass-inner">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">💘</span>
                <div>
                  <h4 className="text-[0.95rem] font-extrabold text-vivid-pink mb-1 tracking-wide">最強の落とし方</h4>
                  <p className="text-sm leading-8 text-text-primary font-semibold whitespace-pre-line">
                    {result.killer}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* Section 5: 付き合ったらどうなる？（conditional） */}
      {/* ============================================ */}
      {result.love && (
        <>
          <SectionDivider />
          <div className="result-section glass-card rounded-2xl shadow-lg overflow-hidden border-l-4 border-l-pink-400/70">
            {/* Header */}
            <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
              <span className="text-2xl">💕</span>
              <h3 className="text-xl font-bold text-text-primary">
                付き合ったらどうなる？
              </h3>
            </div>
            {/* 恋愛キケン度メーター */}
            <div className="px-5 pt-3 pb-0 flex items-center gap-3">
              <span className="text-xs font-bold text-vivid-pink/70">恋愛キケン度</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={`text-sm ${i <= dangerLevel ? '' : 'opacity-20'}`}>💀</span>
                ))}
              </div>
            </div>
            {/* Body */}
            <div className="px-5 py-6">
              <p className="text-xs text-vivid-pink/50 italic mb-3">覚悟はええか？</p>
              <p className="text-sm leading-8 text-text-primary whitespace-pre-line">
                {result.love}
              </p>
            </div>
          </div>
        </>
      )}

      {/* ============================================ */}
      {/* Section 6: ハッシュタグ */}
      {/* ============================================ */}
      <div className="result-section text-center py-4">
        <span className="inline-block text-sm font-bold text-vivid-pink bg-vivid-pink/10 px-5 py-2 rounded-full border border-vivid-pink/20">
          #あの人の裏の顔診断
        </span>
      </div>
    </div>
  );
}
