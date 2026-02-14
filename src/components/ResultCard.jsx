export default function ResultCard({ result, typeKey }) {
  if (!result) {
    return (
      <div className="result-card">
        <p className="error-message">結果データが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="result-card">
      <div className="result-type-key">{typeKey}</div>
      <h2 className="result-name">{result.name}</h2>
      <p className="result-tagline">{result.tagline}</p>

      <div className="result-description">
        <p>{result.description}</p>
      </div>

      <div className="result-section">
        <h3>強み</h3>
        <ul className="result-strengths">
          {result.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="result-section">
        <h3>落とし穴</h3>
        <p className="result-pitfall">{result.pitfall}</p>
      </div>

      <div className="result-section">
        <h3>今日の一手</h3>
        <p className="result-action">{result.nextAction}</p>
      </div>

      <div className="result-section">
        <h3>相性が良いタイプ</h3>
        <p className="result-match">{result.goodMatch}</p>
      </div>
    </div>
  );
}
