import AnimalIllustration from './AnimalIllustration';

export default function ResultCard({ result, typeKey, ageGroup }) {
  if (!result) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
        <p className="text-text-secondary">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  const advice = result.advice?.[ageGroup] || result.advice?.twenties;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md mb-5">
      {/* Animal illustration */}
      <div className="flex justify-center mb-4">
        <AnimalIllustration typeKey={typeKey} />
      </div>

      {/* Type badge */}
      <div className="text-center mb-4">
        <span className="inline-block text-xs font-semibold text-white bg-coral-dark px-4 py-1 rounded-full tracking-wider">
          {typeKey}
        </span>
      </div>

      {/* Type name & tagline */}
      <h2 className="text-center text-2xl font-extrabold text-text-primary mb-1">
        {result.name}
      </h2>
      <p className="text-center text-sm text-text-secondary mb-4">
        {result.tagline}
      </p>

      {/* Traits */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {result.traits.map((trait, i) => (
          <span
            key={i}
            className="text-xs font-semibold bg-coral/15 text-coral-dark px-3 py-1.5 rounded-full"
          >
            {trait}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="text-sm leading-relaxed text-text-primary mb-6 pb-5 border-b border-coral/20">
        <p>{result.description}</p>
      </div>

      {/* Advice sections */}
      {advice && (
        <div className="space-y-5">
          <div className="result-section">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-coral/20 flex items-center justify-center text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF99AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </span>
              <h3 className="text-sm font-bold text-coral-dark">オーダーメイド・デート</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-primary pl-9">
              {advice.date}
            </p>
          </div>

          <div className="result-section">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-coral/20 flex items-center justify-center text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF99AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </span>
              <h3 className="text-sm font-bold text-coral-dark">意外な一面（裏の顔）</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-primary pl-9">
              {advice.hidden}
            </p>
          </div>

          <div className="result-section">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-coral/20 flex items-center justify-center text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF99AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </span>
              <h3 className="text-sm font-bold text-coral-dark">モテるための動き方</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-primary pl-9">
              {advice.attractive}
            </p>
          </div>

          <div className="result-section">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-coral/20 flex items-center justify-center text-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF99AA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </span>
              <h3 className="text-sm font-bold text-coral-dark">最強のアプローチ</h3>
            </div>
            <p className="text-sm leading-relaxed text-text-primary pl-9">
              {advice.approach}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
