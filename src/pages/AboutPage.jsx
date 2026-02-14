import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="about-page">
        <h1>診断について</h1>

        <section className="about-section">
          <h2>3つの軸</h2>
          <p>この診断では、以下の3つの軸であなたの行動スタイルを分析します。</p>

          <div className="axis-cards">
            <div className="axis-card">
              <h3>自由 ↔ 安定</h3>
              <p>
                変化や挑戦を好むか、安定した環境を好むか。
                新しい環境への飛び込みやすさや、計画性に関する軸です。
              </p>
            </div>
            <div className="axis-card">
              <h3>直感 ↔ 分析</h3>
              <p>
                感覚やひらめきで判断するか、データや論理で判断するか。
                意思決定のスタイルに関する軸です。
              </p>
            </div>
            <div className="axis-card">
              <h3>つながり ↔ 自立</h3>
              <p>
                人と一緒に力を発揮するか、一人で集中して力を発揮するか。
                エネルギーの源に関する軸です。
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>スコアの算出方法</h2>
          <p>
            各質問は5段階（1〜5）で回答します。中央の3を基準として、
            各軸ごとにスコアを合算します。スコアが0以上なら左側（自由/直感/つながり）、
            0未満なら右側（安定/分析/自立）に分類されます。
          </p>
          <p>
            3軸の組み合わせにより、全8タイプのいずれかに判定されます。
          </p>
        </section>

        <section className="about-section">
          <h2>注意事項</h2>
          <ul>
            <li>この診断はエンタメ・自己理解を目的としています。</li>
            <li>性格や能力を断定するものではありません。</li>
            <li>回答に正解・不正解はありません。直感で答えてください。</li>
            <li>結果はあくまで傾向の一つとしてお楽しみください。</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
