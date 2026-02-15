import AnimalIllustration from './AnimalIllustration';
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

export default function ResultCard({ result, typeKey, modifier }) {
  if (!result) {
    return (
      <div className="bg-card rounded-3xl p-6 shadow-sm text-center">
        <p className="text-text-secondary">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  const modifierDetail = modifier ? MODIFIER_DETAILS[modifier] : null;

  // テキストをパースして各セクションに配置
  const manualParsed = parseSections(result.manual);
  const dateParsed = parseSections(result.date);

  const attackStrategy = manualParsed.sections['攻略法'] || '';
  const landmine = manualParsed.sections['地雷ポイント'] || '';
  const dateSimulation = dateParsed.sections['シミュレーション'] || '';
  const dateSpot = dateParsed.sections['おすすめスポット'] || '';

  return (
    <div className="space-y-6 mb-5">

      {/* ============================================ */}
      {/* Section 1: 診断結果 */}
      {/* ============================================ */}
      <div className="result-section bg-card rounded-2xl p-6 shadow-lg border border-coral/20">
        {/* Animal illustration - large centered */}
        <div className="flex justify-center mb-5">
          <div className="w-40 h-40 flex items-center justify-center">
            <AnimalIllustration typeKey={typeKey} />
          </div>
        </div>

        {/* Modifier + Type name */}
        <h2 className="text-center text-3xl font-extrabold text-text-primary mb-2 leading-tight">
          {modifier}{result.name}
        </h2>

        {/* Tagline */}
        <p className="text-center text-sm text-vivid-pink font-semibold mb-4 px-2">
          {result.tagline}
        </p>

        {/* Traits badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {result.traits.map((trait, i) => (
            <span
              key={i}
              className="text-xs font-semibold bg-vivid-pink/15 text-vivid-pink px-3 py-1.5 rounded-full"
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================ */}
      {/* Section 2: 表の顔 */}
      {/* ============================================ */}
      <div className="result-section bg-card rounded-2xl shadow-lg border border-coral/30 overflow-hidden">
        {/* Header */}
        <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">😇</span>
          <h3 className="text-xl font-bold text-text-primary">
            表の顔
          </h3>
          <span className="text-xs text-text-secondary ml-auto">みんなが見ている姿</span>
        </div>
        {/* Body */}
        <div className="p-5">
          <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
            {result.front}
          </p>
        </div>
      </div>

      {/* ============================================ */}
      {/* Section 3: 裏の顔 */}
      {/* ============================================ */}
      <div className="result-section bg-card rounded-2xl shadow-xl border-2 border-vivid-pink/50 overflow-hidden">
        {/* Header - vivid pink accent */}
        <div className="bg-vivid-pink/25 px-5 py-5 flex items-center gap-3">
          <span className="text-3xl">👿</span>
          <h3 className="text-2xl font-extrabold text-vivid-pink">
            裏の顔
          </h3>
          <span className="text-xs text-vivid-pink/70 ml-auto">ちょいゲスな本性</span>
        </div>
        {/* Body */}
        <div className="p-5">
          <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
            {result.hidden}
          </p>

          {/* Modifier detail */}
          {modifierDetail && (
            <div className="mt-4 pt-4 border-t border-vivid-pink/20">
              <div className="bg-vivid-pink/8 rounded-xl p-4">
                <p className="text-sm leading-relaxed text-text-primary">
                  <span className="font-bold text-vivid-pink">「{modifier}」</span>
                  <span className="text-text-secondary text-xs ml-1">タイプの裏側</span>
                </p>
                <p className="text-sm leading-relaxed text-text-primary mt-2">
                  {modifierDetail}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================ */}
      {/* Section 4: この人の取扱説明書 */}
      {/* ============================================ */}
      <div className="result-section bg-card rounded-2xl shadow-lg border border-coral/20 overflow-hidden">
        {/* Header */}
        <div className="bg-coral/25 px-5 py-4 flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <h3 className="text-xl font-bold text-text-primary">
            この人のトリセツ
          </h3>
        </div>
        {/* Body */}
        <div className="p-5 space-y-5">

          {/* 攻略法 */}
          {attackStrategy && (
            <div className="bg-coral-light/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">✅</span>
                <h4 className="text-base font-bold text-text-primary">攻略法</h4>
              </div>
              <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
                {attackStrategy}
              </p>
            </div>
          )}

          {/* デートのシミュレーション */}
          {dateSimulation && (
            <div className="bg-coral-light/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🎬</span>
                <h4 className="text-base font-bold text-text-primary">デートのシミュレーション</h4>
              </div>
              <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
                {dateSimulation}
              </p>
            </div>
          )}

          {/* 喜ぶデートスポット */}
          {dateSpot && (
            <div className="torisetsu-item rounded-xl p-4 border border-coral/20 bg-coral-light/30">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">🎯</span>
                <div>
                  <h4 className="text-base font-bold text-vivid-pink mb-1">喜ぶデートスポット</h4>
                  <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
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
                  <h4 className="text-base font-bold text-vivid-pink mb-1">絶対にやってはいけないNG行動</h4>
                  <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
                    {landmine}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 最強の落とし方 */}
          {result.killer && (
            <div className="torisetsu-item rounded-xl p-4 border border-coral/20 bg-coral-light/30">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">💘</span>
                <div>
                  <h4 className="text-base font-bold text-vivid-pink mb-1">最強の落とし方</h4>
                  <p className="text-sm leading-relaxed text-text-primary font-semibold whitespace-pre-line">
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
        <div className="result-section bg-card rounded-2xl shadow-lg border border-coral/30 overflow-hidden">
          {/* Header */}
          <div className="bg-coral/20 px-5 py-4 flex items-center gap-3">
            <span className="text-2xl">💕</span>
            <h3 className="text-xl font-bold text-text-primary">
              付き合ったらどうなる？
            </h3>
          </div>
          {/* Body */}
          <div className="p-5">
            <p className="text-sm leading-relaxed text-text-primary whitespace-pre-line">
              {result.love}
            </p>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* Section 6: ハッシュタグ */}
      {/* ============================================ */}
      <div className="result-section text-center py-4">
        <span className="inline-block text-sm font-bold text-vivid-pink bg-vivid-pink/10 px-5 py-2 rounded-full">
          #あの人の裏の顔診断
        </span>
      </div>
    </div>
  );
}
