import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TeaserCard from '../components/TeaserCard';
import ResultCard from '../components/ResultCard';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';

/**
 * 残り時間をフォーマットする
 * 日が残っている場合は「○日○時間」、それ以外は「○時間○分」
 */
function formatRemaining(ms) {
  if (ms <= 0) return null;

  const totalMinutes = Math.floor(ms / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}日${hours}時間`;
  }
  return `${hours}時間${minutes}分`;
}

export default function ReceivedResultPage({ typeId, modifier, senderName }) {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URLパラメータから exp と revenge を取得
  const expParam = searchParams.get('exp');
  const revengeParam = searchParams.get('revenge');
  const exp = expParam ? Number(expParam) : null;
  const isRevenge = revengeParam === '1';

  // 期限切れ判定
  const isExpired = exp !== null && Date.now() > exp;

  // カウントダウンタイマー
  const [remaining, setRemaining] = useState(() => {
    if (exp === null) return null;
    const diff = exp - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (exp === null || isExpired) return;

    const interval = setInterval(() => {
      const diff = exp - Date.now();
      if (diff <= 0) {
        setRemaining(0);
        clearInterval(interval);
      } else {
        setRemaining(diff);
      }
    }, 60 * 1000); // 1分ごとに更新

    return () => clearInterval(interval);
  }, [exp, isExpired]);

  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const resolvedKey = found.key;
  const result = found.data;

  const displayName = modifier ? `${modifier}${result.name}` : result.name;

  const handleReveal = () => {
    setRevealed(true);
    // 開封後、少し待ってから結果セクションまでスクロール
    setTimeout(() => {
      const el = document.getElementById('received-result');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleGoToQuiz = () => {
    if (isRevenge) {
      navigate('/quiz?revenge=1');
    } else {
      navigate('/quiz');
    }
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  // ============================================
  // 期限切れ画面
  // ============================================
  if (isExpired) {
    return (
      <div className="pt-12 pb-8 text-center animate-fade-in-up">
        <div className="mb-8">
          <span className="text-5xl">💀</span>
        </div>
        <h1 className="text-2xl font-extrabold text-text-primary mb-4 leading-tight">
          あーあ、見んかったんや…
        </h1>
        <p className="text-sm text-text-secondary leading-relaxed mb-8">
          この診断結果は48時間で消えてしもたわ。<br />
          知らんほうが幸せやったかもな。
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark shadow-xl"
            onClick={() => { navigate('/quiz'); window.scrollTo(0, 0); }}
          >
            自分で自分を診断してみる
          </button>
          <button
            className="btn-secondary w-full py-3.5 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer"
            onClick={handleGoHome}
          >
            トップに戻る
          </button>
        </div>
      </div>
    );
  }

  // 残り1時間以下かどうか
  const isUrgent = remaining !== null && remaining <= 60 * 60 * 1000;

  return (
    <div className="pt-2 pb-8">

      {/* ============================================ */}
      {/* ティザーセクション */}
      {/* ============================================ */}
      {!revealed && (
        <>
          <TeaserCard senderName={senderName} onReveal={handleReveal} />

          {/* カウントダウンタイマー（期限が設定されている場合のみ） */}
          {remaining !== null && remaining > 0 && (
            <div className="text-center mt-4 animate-fade-in-up">
              <p className={`text-sm font-bold ${isUrgent ? 'text-red-500' : 'text-text-secondary'}`}>
                あと {formatRemaining(remaining)} で消えるで
              </p>
            </div>
          )}
        </>
      )}

      {/* ============================================ */}
      {/* 開封後の結果表示 */}
      {/* ============================================ */}
      {revealed && (
        <div id="received-result" className="received-reveal">

          {/* 開封演出ヘッダー */}
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-xs tracking-[0.15em] text-vivid-pink/60 mb-2 font-semibold">
              ― {senderName || '誰か'} さんの診断結果 ―
            </p>
            <h1 className="text-lg font-bold text-text-primary mb-1">
              あんたの裏の顔は…
            </h1>
            <p className="text-xs text-text-secondary">
              もう見てもうたから、知らんぷりはでけへんで
            </p>
          </div>

          {/* 結果カード（既存コンポーネント再利用） */}
          <ResultCard result={result} typeKey={resolvedKey} modifier={modifier} />

          {/* ハッシュタグ */}
          <div className="text-center py-4 mb-4">
            <span className="inline-block text-sm font-bold text-vivid-pink bg-vivid-pink/10 px-5 py-2 rounded-full border border-vivid-pink/20">
              #あの人の裏の顔診断
            </span>
          </div>

          {/* ============================================ */}
          {/* リベンジセクション */}
          {/* ============================================ */}
          <div className="bg-card rounded-2xl p-6 mb-4 border border-vivid-pink/30 shadow-lg text-center revenge-section">
            <div className="mb-4">
              <span className="text-3xl">🔥</span>
            </div>
            <h2 className="text-xl font-extrabold text-text-primary mb-2">
              黙ってられへんやろ？
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-2">
              <span className="text-vivid-pink font-bold">{senderName || '誰か'}</span> さんに
              裏の顔を暴かれて悔しないんか？
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              今度はあんたが<span className="text-vivid-pink font-semibold">あの人の裏の顔</span>を<br />
              暴いたれや。
            </p>
            <button
              className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark shadow-xl pulse-gentle"
              onClick={handleGoToQuiz}
            >
              やり返す（裏の顔を暴く）
            </button>
          </div>

          {/* ============================================ */}
          {/* 自分も診断するセクション */}
          {/* ============================================ */}
          <div className="bg-card/60 rounded-2xl p-5 mb-4 border border-coral/20 text-center">
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">
              気になるあの人の裏の顔、<br />
              あんたも覗いてみぃへん？
            </p>
            <button
              className="btn-secondary w-full py-3.5 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer"
              onClick={() => { navigate('/quiz'); window.scrollTo(0, 0); }}
            >
              自分も誰かを診断する
            </button>
          </div>

          {/* フッター注意書き */}
          <p className="text-center text-xs text-text-secondary/40 mt-6">
            ※ 悪趣味エンタメです。本気にしないでね。
          </p>
        </div>
      )}
    </div>
  );
}
