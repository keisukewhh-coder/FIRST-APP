import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeaserCard from '../components/TeaserCard';
import ResultCard from '../components/ResultCard';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';

export default function ReceivedResultPage({ typeId, modifier, senderName }) {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

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
    navigate('/quiz');
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-2 pb-8">

      {/* ============================================ */}
      {/* ティザーセクション */}
      {/* ============================================ */}
      {!revealed && (
        <TeaserCard senderName={senderName} onReveal={handleReveal} />
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
              onClick={handleGoToQuiz}
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
