import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TeaserCard from '../components/TeaserCard';
import ResultCard from '../components/ResultCard';
import FileUnlockReveal from '../components/FileUnlockReveal';
import { getTypeByKey, idToTypeKey } from '../utils/scoring';
import sendMessagesData from '../data/sendMessages.json';

/** ランダムに1つ選ぶヘルパー */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 残り時間を構造化データで返す
 * urgency: 'normal' | 'warning' | 'critical' | 'final'
 */
function parseRemaining(ms) {
  if (ms <= 0) return null;

  const totalSeconds = Math.floor(ms / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // 緊急度レベル
  let urgency = 'normal';
  if (totalHours < 1) urgency = 'final';        // 1時間以内
  else if (totalHours < 6) urgency = 'critical'; // 6時間以内
  else if (totalHours < 24) urgency = 'warning'; // 24時間以内

  return { days, hours, minutes, seconds, urgency, totalHours };
}

export default function ReceivedResultPage({ typeId, modifier, senderName, targetName }) {
  // 'teaser' → 'unlocking' → 'revealed' の3段階
  const [phase, setPhase] = useState('teaser');
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

    // 6時間以内は毎秒、それ以外は30秒ごと
    const diff = exp - Date.now();
    const intervalMs = diff <= 6 * 60 * 60 * 1000 ? 1000 : 30000;

    const interval = setInterval(() => {
      const d = exp - Date.now();
      if (d <= 0) {
        setRemaining(0);
        clearInterval(interval);
      } else {
        setRemaining(d);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [exp, isExpired]);

  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const resolvedKey = found.key;
  const result = found.data;

  const displayName = modifier ? `${modifier}${result.name}` : result.name;

  // sendMessages.json から各フェーズ用メッセージをランダム選出（初回マウント時に固定）
  const { resultIntroMsg, revengeMsg } = useMemo(() => ({
    resultIntroMsg: pickRandom(sendMessagesData.sendMessages.resultIntro),
    revengeMsg: pickRandom(sendMessagesData.sendMessages.revenge),
  }), []);

  // ボタン押下 → 開封アニメーション開始
  const handleReveal = () => {
    setPhase('unlocking');
    window.scrollTo(0, 0);
  };

  // 開封アニメーション完了 → 結果表示
  const handleUnlockComplete = () => {
    setPhase('revealed');
    window.scrollTo(0, 0);
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

  const parsed = parseRemaining(remaining ?? 0);

  return (
    <div className="pt-2 pb-8">

      {/* ============================================ */}
      {/* ティザーセクション */}
      {/* ============================================ */}
      {phase === 'teaser' && (
        <>
          {/* カウントダウンタイマー（期限が設定されている場合のみ） */}
          {remaining !== null && remaining > 0 && parsed && (
            <div className={`countdown-container animate-fade-in-up ${parsed.urgency === 'final' ? 'countdown-final' : parsed.urgency === 'critical' ? 'countdown-critical' : parsed.urgency === 'warning' ? 'countdown-warning' : ''}`}>
              <div className="countdown-header">
                <span className="countdown-icon">
                  {parsed.urgency === 'final' ? '💀' : parsed.urgency === 'critical' ? '🔥' : '⏳'}
                </span>
                <span className="countdown-label">
                  {parsed.urgency === 'final'
                    ? 'もうすぐ消えるで！！'
                    : parsed.urgency === 'critical'
                      ? '急がな間に合わんで…！'
                      : 'この結果、期限付きや'}
                </span>
              </div>

              {/* 大きなカウントダウン数字 */}
              <div className="countdown-digits">
                {parsed.days > 0 && (
                  <div className="countdown-unit">
                    <span className="countdown-number">{parsed.days}</span>
                    <span className="countdown-unit-label">日</span>
                  </div>
                )}
                <div className="countdown-unit">
                  <span className="countdown-number">{String(parsed.hours).padStart(2, '0')}</span>
                  <span className="countdown-unit-label">時間</span>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-unit">
                  <span className="countdown-number">{String(parsed.minutes).padStart(2, '0')}</span>
                  <span className="countdown-unit-label">分</span>
                </div>
                {parsed.urgency === 'final' && (
                  <>
                    <div className="countdown-separator">:</div>
                    <div className="countdown-unit">
                      <span className="countdown-number countdown-seconds">{String(parsed.seconds).padStart(2, '0')}</span>
                      <span className="countdown-unit-label">秒</span>
                    </div>
                  </>
                )}
              </div>

              {/* 残り時間バー */}
              <div className="countdown-bar-track">
                <div
                  className="countdown-bar-fill"
                  style={{ width: `${Math.max(0, Math.min(100, (remaining / (48 * 60 * 60 * 1000)) * 100))}%` }}
                />
              </div>

              <p className="countdown-footer">
                {parsed.urgency === 'final'
                  ? '見んかったら一生後悔するで？'
                  : parsed.urgency === 'critical'
                    ? '時間切れたら二度と見られへんで'
                    : '48時間で消滅するで'}
              </p>
            </div>
          )}

          <TeaserCard senderName={senderName} targetName={targetName} onReveal={handleReveal} />
        </>
      )}

      {/* ============================================ */}
      {/* 鍵付きファイル開封アニメーション */}
      {/* ============================================ */}
      {phase === 'unlocking' && (
        <FileUnlockReveal
          senderName={senderName}
          onComplete={handleUnlockComplete}
        />
      )}

      {/* ============================================ */}
      {/* 開封後の結果表示 */}
      {/* ============================================ */}
      {phase === 'revealed' && (
        <div id="received-result" className="received-reveal">

          {/* 開封演出ヘッダー */}
          <div className="text-center mb-6 animate-fade-in-up">
            <p className="text-xs tracking-[0.15em] text-vivid-pink/60 mb-2 font-semibold [text-wrap:balance]">
              ― {senderName || '名無しの誰かさん'} が暴いた診断結果 ―
            </p>
            <h1 className="text-lg font-bold text-text-primary mb-1">
              {targetName ? <><span className="text-vivid-pink">{targetName}</span>の裏の顔は…</> : 'あんたの裏の顔は…'}
            </h1>
          </div>

          {/* 結果カード */}
          <ResultCard result={result} typeKey={resolvedKey} modifier={modifier} targetName={targetName} />

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
            <p className="text-sm text-text-secondary leading-relaxed mb-5 whitespace-pre-line">
              {revengeMsg}
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
