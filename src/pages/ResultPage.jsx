import { useNavigate, useSearchParams } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';

export default function ResultPage({ typeId, modifier, onRestart, onGoHome }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRevenge = searchParams.get('revenge') === '1';

  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const resolvedKey = found.key;
  const result = found.data;

  const displayName = modifier ? `${modifier}${result.name}` : result.name;

  const handleSend = () => {
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    params.set('m', modifier);
    navigate(`/send?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  // リベンジ無料: 決済をスキップして直接送信完了へ
  const handleRevengeSend = () => {
    const expiresAt = Date.now() + 48 * 60 * 60 * 1000;
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    params.set('m', modifier);
    params.set('from', '');
    params.set('msg', 'やり返したったわ。あんたの裏の顔、暴いたで。知らんけど。');
    params.set('exp', String(expiresAt));
    navigate(`/send-complete?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-6 animate-fade-in-up">
      <h1 className="text-center text-xs tracking-[0.2em] text-text-secondary/70 mb-6 font-semibold">
        あの人の裏の顔、暴いちゃいました
      </h1>

      <ResultCard result={result} typeKey={resolvedKey} modifier={modifier} />
      <ShareBox typeId={typeId} modifier={modifier} resultName={result.name} />

      {/* 送りつけるボタン */}
      <div className="bg-card rounded-3xl p-6 shadow-lg mb-6 border border-vivid-pink/30 text-center">
        <p className="text-lg font-extrabold text-text-primary mb-1">
          この結果、本人に届けたろか？
        </p>
        <p className="text-xs text-text-secondary mb-4">
          「{displayName}」を相手に送りつけられるで
        </p>
        {isRevenge ? (
          <>
            <button
              className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark pulse-gentle"
              onClick={handleRevengeSend}
            >
              無料でやり返す（送りつける）
            </button>
            <p className="text-xs text-vivid-pink/70 mt-2">
              リベンジ初回は無料やで
            </p>
          </>
        ) : (
          <>
            <button
              className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark pulse-gentle"
              onClick={handleSend}
            >
              この結果を送りつける
            </button>
            <p className="text-xs text-text-secondary/60 mt-2">
              有効期限48時間 / LINE・メール等で共有
            </p>
          </>
        )}
      </div>

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
