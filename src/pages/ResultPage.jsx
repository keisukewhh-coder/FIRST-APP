import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeId = searchParams.get('t');
  const modifier = searchParams.get('m') || '量産型の';

  useEffect(() => {
    if (typeId == null) {
      navigate('/quiz');
    }
  }, [typeId, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (typeId == null) return null;

  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const resolvedKey = found.key;
  const result = found.data;

  return (
    <Layout>
      <div className="pt-2 animate-fade-in-up">
        <h1 className="text-center text-base text-text-secondary mb-4 font-medium">
          あの人の裏の顔、暴いちゃいました
        </h1>

        <ResultCard result={result} typeKey={resolvedKey} modifier={modifier} />
        <ShareBox typeId={typeId} modifier={modifier} resultName={result.name} />

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-3 rounded-full bg-vivid-pink text-white font-bold text-sm border-0 cursor-pointer hover:bg-coral-dark transition-colors"
            onClick={() => navigate('/quiz')}
          >
            もう一度診断する
          </button>
          <button
            className="w-full py-3 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer hover:bg-coral/5 transition-colors"
            onClick={() => navigate('/')}
          >
            トップに戻る
          </button>
        </div>
      </div>
    </Layout>
  );
}
