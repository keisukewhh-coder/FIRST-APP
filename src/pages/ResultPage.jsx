import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import ShareBox from '../components/ShareBox';
import FileOpenReveal from '../components/FileOpenReveal';
import ObachanBubble from '../components/ObachanBubble';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';

export default function ResultPage({ typeId, modifier, targetName, onRestart, onGoHome }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isRevenge = searchParams.get('revenge') === '1';
  // 直リンク（URLバー直打ち・シェアリンク）の場合は演出スキップ
  const isDirectLink = searchParams.get('reveal') === '0';
  const [revealDone, setRevealDone] = useState(isDirectLink);

  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const resolvedKey = found.key;
  const result = found.data;

  const displayName = modifier ? `${modifier}${result.name}` : result.name;
  const nameLabel = targetName || 'あの人';

  const handleSend = () => {
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    params.set('m', modifier);
    if (targetName) params.set('n', targetName);
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
    <>
      {/* ファイル開封演出（初回のみ） */}
      {!revealDone && (
        <FileOpenReveal
          targetName={targetName}
          onComplete={() => setRevealDone(true)}
        />
      )}

    <div className={`pt-6 ${revealDone ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="text-center mb-2">
        <p className="text-xs tracking-[0.15em] text-vivid-pink/40 mb-2 font-medium">
          ANALYSIS COMPLETE
        </p>
        <h1 className="text-lg font-extrabold text-text-primary mb-1">
          {targetName ? (
            <><span className="text-vivid-pink">{targetName}</span>の裏の顔、<span className="text-vivid-pink">暴いちゃいました</span></>
          ) : (
            <>あの人の裏の顔、<span className="text-vivid-pink">暴いちゃいました</span></>
          )}
        </h1>
        <p className="text-xs text-text-secondary/60">
          ※ 本人に見せるかどうかはあんた次第やで
        </p>
      </div>

      <ResultCard result={result} typeKey={resolvedKey} modifier={modifier} targetName={targetName} />
      <ShareBox typeId={typeId} modifier={modifier} resultName={result.name} targetName={targetName} />

      {/* おばちゃんの煽り */}
      <ObachanBubble variant="shout">
        {targetName
          ? `ここまで暴いたんやから、${targetName}本人に突きつけたらんと意味ないやろ！遠慮すんな！`
          : 'ここまで暴いたんやから、本人に突きつけたらんと意味ないやろ！ビビってんちゃうやろな？'
        }
      </ObachanBubble>

      {/* 送りつけるボタン */}
      <div className="bg-card rounded-3xl p-6 shadow-lg mb-6 border border-vivid-pink/30 text-center">
        <p className="text-lg font-extrabold text-text-primary mb-1">
          {targetName ? `${targetName}に` : '本人に'}叩きつけたれ
        </p>
        <p className="text-xs text-text-secondary mb-4">
          「{displayName}」を{targetName ? `${targetName}に` : '相手に'}送りつけたる
        </p>
        {isRevenge ? (
          <>
            <button
              className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark pulse-gentle"
              onClick={handleRevengeSend}
            >
              タダでやり返したる！
            </button>
            <p className="text-xs text-vivid-pink/70 mt-2">
              リベンジは無料や。やったもん勝ちやで
            </p>
          </>
        ) : (
          <>
            <button
              className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark pulse-gentle"
              onClick={handleSend}
            >
              本人に叩きつけたる！
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
    </>
  );
}
