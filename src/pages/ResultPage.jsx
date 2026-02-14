import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import { getTypeByKey } from '../utils/scoring';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeKey = searchParams.get('key');

  useEffect(() => {
    if (!typeKey) {
      navigate('/quiz');
    }
  }, [typeKey, navigate]);

  if (!typeKey) return null;

  const found = getTypeByKey(typeKey);

  if (!found) {
    return (
      <Layout>
        <div className="result-page">
          <div className="error-card">
            <p>無効な結果キーです。診断をやり直してください。</p>
            <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
              診断をやり直す
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // found.key は復元済みの正しいキー、found.data がタイプ情報
  const resolvedKey = found.key;
  const result = found.data;

  return (
    <Layout>
      <div className="result-page">
        <h1 className="result-heading">あなたのタイプは…</h1>

        <ResultCard result={result} typeKey={resolvedKey} />
        <ShareBox typeKey={resolvedKey} />

        <div className="result-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/quiz')}
          >
            もう一度診断する
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate('/')}
          >
            トップに戻る
          </button>
        </div>
      </div>
    </Layout>
  );
}
