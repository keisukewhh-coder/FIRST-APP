import AnimalIllustration from './AnimalIllustration';
import { MODIFIER_DETAILS } from '../utils/scoring';

export default function ResultCard({ result, typeKey, modifier }) {
  if (!result) {
    return (
      <div className="bg-card rounded-3xl p-6 shadow-sm text-center">
        <p className="text-text-secondary">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  const modifierDetail = modifier ? MODIFIER_DETAILS[modifier] : null;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-md mb-5">
      {/* Animal illustration */}
      <div className="flex justify-center mb-4">
        <AnimalIllustration typeKey={typeKey} />
      </div>

      {/* Modifier + Type name (seamless, same styling) */}
      <h2 className="text-center text-2xl font-extrabold text-text-primary mb-1">
        {modifier}{result.name}
      </h2>
      <p className="text-center text-sm text-vivid-pink font-semibold mb-4">
        {result.tagline}
      </p>

      {/* Traits */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {result.traits.map((trait, i) => (
          <span
            key={i}
            className="text-xs font-semibold bg-vivid-pink/15 text-vivid-pink px-3 py-1.5 rounded-full"
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Result sections */}
      <div className="space-y-5">
        {/* 1. 表の顔と裏の顔 */}
        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC1133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">表の顔</h3>
          </div>
          <div className="text-sm leading-relaxed text-text-primary pl-9 whitespace-pre-line">
            {result.front}
          </div>
        </div>

        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC1133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">裏の顔</h3>
          </div>
          <div className="text-sm leading-relaxed text-text-primary pl-9 whitespace-pre-line">
            {result.hidden}
          </div>
          {modifierDetail && (
            <p className="text-sm leading-relaxed text-text-primary pl-9 mt-3 pt-3 border-t border-coral/15">
              さらにこの人は<span className="font-bold text-vivid-pink">「{modifier}」</span>タイプ。{modifierDetail}
            </p>
          )}
        </div>

        {/* 2. 取扱説明書 */}
        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC1133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">この人のトリセツ</h3>
          </div>
          <div className="text-sm leading-relaxed text-text-primary pl-9 whitespace-pre-line">
            {result.manual}
          </div>
        </div>

        {/* 3. デートのシミュレーション */}
        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC1133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">デートのシミュレーション</h3>
          </div>
          <div className="text-sm leading-relaxed text-text-primary pl-9 whitespace-pre-line">
            {result.date}
          </div>
        </div>

        {/* 4. 付き合ったらどうなる？ */}
        {result.love && (
          <div className="result-section">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC1133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </span>
              <h3 className="text-sm font-bold text-vivid-pink">付き合ったらどうなる？</h3>
            </div>
            <div className="text-sm leading-relaxed text-text-primary pl-9 whitespace-pre-line">
              {result.love}
            </div>
          </div>
        )}

        {/* 5. キラーフレーズ */}
        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC1133" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">相手の心を開かせるキラーフレーズ</h3>
          </div>
          <div className="text-sm leading-relaxed text-text-primary pl-9 font-semibold whitespace-pre-line">
            {result.killer}
          </div>
        </div>
      </div>

      {/* Hashtag */}
      <div className="text-center mt-6 pt-4 border-t border-coral/20">
        <span className="text-sm font-bold text-vivid-pink">#あの人の裏の顔診断</span>
      </div>
    </div>
  );
}
