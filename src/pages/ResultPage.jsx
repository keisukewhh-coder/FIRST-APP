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
  const ageGroup = searchParams.get('age') || 'twenties';

  useEffect(() => {
    if (!typeKey) {
      navigate('/quiz');
    }
  }, [typeKey, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!typeKey) return null;

  const found = getTypeByKey(typeKey);

  if (!found) {
    return (
      <Layout>
        <div className="pt-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
            <p className="text-text-secondary mb-4">無効な結果キーです。診断をやり直してください。</p>
            <button
              className="py-3 px-8 rounded-full bg-coral-dark text-white font-bold text-sm border-0 cursor-pointer"
              onClick={() => navigate('/quiz')}
            >
              診断をやり直す
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const resolvedKey = found.key;
  const result = found.data;

  return (
    <Layout>
      <div className="pt-2 animate-fade-in-up">
        <h1 className="text-center text-base text-text-secondary mb-4 font-medium">
          あの人のタイプは…
        </h1>

        <ResultCard result={result} typeKey={resolvedKey} ageGroup={ageGroup} />
        <ShareBox typeKey={resolvedKey} ageGroup={ageGroup} />

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-3 rounded-full bg-coral-dark text-white font-bold text-sm border-0 cursor-pointer hover:bg-coral transition-colors"
            onClick={() => navigate('/quiz')}
          >
            もう一度診断する
          </button>
          <button
            className="w-full py-3 rounded-full bg-white text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer hover:bg-coral/5 transition-colors"
            onClick={() => navigate('/')}
          >
            トップに戻る
          </button>
        </div>
      </div>
    </Layout>
  );
}
