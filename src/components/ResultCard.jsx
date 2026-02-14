import AnimalIllustration from './AnimalIllustration';

export default function ResultCard({ result, typeKey }) {
  if (!result) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
        <p className="text-text-secondary">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md mb-5">
      {/* Animal illustration */}
      <div className="flex justify-center mb-4">
        <AnimalIllustration typeKey={typeKey} />
      </div>

      {/* Type badge */}
      <div className="text-center mb-4">
        <span className="inline-block text-xs font-semibold text-white bg-vivid-pink px-4 py-1 rounded-full tracking-wider">
          {typeKey}
        </span>
      </div>

      {/* Type name & tagline */}
      <h2 className="text-center text-2xl font-extrabold text-text-primary mb-1">
        {result.name}
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

      {/* Description */}
      <div className="text-sm leading-relaxed text-text-primary mb-6 pb-5 border-b border-coral/20">
        <p>{result.description}</p>
      </div>

      {/* Gesu result sections */}
      <div className="space-y-5">
        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">ゲスい弱点</h3>
          </div>
          <p className="text-sm leading-relaxed text-text-primary pl-9">
            {result.weakness}
          </p>
        </div>

        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">喜ぶデート</h3>
          </div>
          <p className="text-sm leading-relaxed text-text-primary pl-9">
            {result.date}
          </p>
        </div>

        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">モテる動き</h3>
          </div>
          <p className="text-sm leading-relaxed text-text-primary pl-9">
            {result.attractive}
          </p>
        </div>

        <div className="result-section">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-vivid-pink/20 flex items-center justify-center text-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF3355" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span>
            <h3 className="text-sm font-bold text-vivid-pink">刺さる一言</h3>
          </div>
          <p className="text-sm leading-relaxed text-text-primary pl-9 font-semibold">
            {result.approach}
          </p>
        </div>
      </div>

      {/* Hashtag */}
      <div className="text-center mt-6 pt-4 border-t border-coral/20">
        <span className="text-sm font-bold text-vivid-pink">#あの人勝手に占っちゃおう診断</span>
      </div>
    </div>
  );
}
