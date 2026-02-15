import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';

export default function ResultPage({ typeId, modifier, onRestart, onGoHome }) {
  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const resolvedKey = found.key;
  const result = found.data;

  return (
    <div className="pt-6 animate-fade-in-up">
      <h1 className="text-center text-xs tracking-[0.2em] text-text-secondary/70 mb-6 font-semibold">
        あの人の裏の顔、暴いちゃいました
      </h1>

      <ResultCard result={result} typeKey={resolvedKey} modifier={modifier} />
      <ShareBox typeId={typeId} modifier={modifier} resultName={result.name} />

      <div className="flex flex-col gap-3 mt-2">
        <button
          className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer hover:bg-coral-dark"
          onClick={onRestart}
        >
          もう一度診断する
        </button>
        <button
          className="btn-secondary w-full py-3.5 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer"
          onClick={onGoHome}
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
}
