import { useNavigate } from 'react-router-dom';

export default function StartCard() {
  const navigate = useNavigate();

  return (
    <div className="start-card">
      <h1 className="start-title">人生コンパスタイプ診断</h1>
      <p className="start-tagline">
        あなたの「動き方」のタイプがわかる、12問の診断
      </p>

      <div className="start-info">
        <div className="info-item">
          <span className="info-label">所要時間</span>
          <span className="info-value">約2分</span>
        </div>
        <div className="info-item">
          <span className="info-label">質問数</span>
          <span className="info-value">12問</span>
        </div>
        <div className="info-item">
          <span className="info-label">回答形式</span>
          <span className="info-value">5段階</span>
        </div>
      </div>

      <p className="start-description">
        3つの軸（自由/安定・直感/分析・つながり/自立）から、
        あなたの行動スタイルを8タイプに分類します。
      </p>

      <p className="start-note">
        ※ エンタメ・自己理解を目的とした診断です。性格を断定するものではありません。
      </p>

      <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
        診断をはじめる
      </button>
    </div>
  );
}
