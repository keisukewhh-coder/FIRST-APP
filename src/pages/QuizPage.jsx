import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import ObachanBubble from '../components/ObachanBubble';
import AnalyzingScreen from '../components/AnalyzingScreen';
import questions from '../data/questions.json';
import { calculateResult, isAllAnswered, typeKeyToId } from '../utils/scoring';

/**
 * 質問の「主軸」を取得（axes の最初のキー）
 * シャッフル時に同一軸の連続を防ぐために使用
 */
function getPrimaryAxis(q) {
  return Object.keys(q.axes)[0] || 'other';
}

/**
 * ランダムシャッフル（同じ主軸が連続しないよう配慮）
 */
function shuffleQuestions(qs) {
  const byAxis = {};
  for (const q of qs) {
    const axis = getPrimaryAxis(q);
    if (!byAxis[axis]) byAxis[axis] = [];
    byAxis[axis].push(q);
  }

  // 各グループ内をシャッフル
  for (const axis of Object.keys(byAxis)) {
    const arr = byAxis[axis];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  const result = [];
  let lastAxis = null;

  while (Object.values(byAxis).some((arr) => arr.length > 0)) {
    const available = Object.keys(byAxis).filter(
      (axis) => byAxis[axis].length > 0 && axis !== lastAxis
    );

    let chosenAxis;
    if (available.length > 0) {
      available.sort((a, b) => byAxis[b].length - byAxis[a].length);
      const maxLen = byAxis[available[0]].length;
      const topAxes = available.filter((a) => byAxis[a].length === maxLen);
      chosenAxis = topAxes[Math.floor(Math.random() * topAxes.length)];
    } else {
      chosenAxis = Object.keys(byAxis).find((axis) => byAxis[axis].length > 0);
    }

    result.push(byAxis[chosenAxis].pop());
    lastAxis = chosenAxis;
  }

  return result;
}

export default function QuizPage({ onResult, targetName }) {
  const [answers, setAnswers] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const [taunt, setTaunt] = useState('');
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [poppedCard, setPoppedCard] = useState(null);
  const [showAnalyzing, setShowAnalyzing] = useState(false);
  const pendingResult = useRef(null);
  const cardRefs = useRef({});
  const lastAnswerTime = useRef(Date.now());
  const comboTimer = useRef(null);

  const shuffledQuestions = useMemo(() => shuffleQuestions([...questions]), []);

  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;

  // Progressive vignette intensity — starts at 30% progress
  const progress = answeredCount / totalQuestions;
  const vignetteIntensity = Math.max(0, progress - 0.3) * 0.15;
  const vignetteSpread = Math.round(40 + progress * 120);
  const vignetteSize = Math.round(20 + progress * 80);

  // Screen tremble for final questions
  const trembleThreshold = Math.max(1, totalQuestions - 5);
  const shouldTremble = answeredCount >= trembleThreshold;

  // Milestone taunts (updated for 45 questions)
  useEffect(() => {
    const taunts = {
      12: 'あらあら、だんだん見えてきたで…ニヤニヤ',
      25: 'うわぁ、もう隠しきれへんなこれ…',
      [totalQuestions - 10]: 'あと少しで丸裸やで！覚悟しいや！',
      [totalQuestions - 5]: 'もう逃げられへんで…！全部見えとるわ！',
      [totalQuestions - 1]: '最後の1問や…！さぁ暴いたれ！',
    };
    if (taunts[answeredCount]) {
      setTaunt(taunts[answeredCount]);
      const timer = setTimeout(() => setTaunt(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [answeredCount, totalQuestions]);

  const handleAnswer = useCallback((questionId, value) => {
    const now = Date.now();
    const elapsed = now - lastAnswerTime.current;
    lastAnswerTime.current = now;

    // Combo logic: if answered within 3 seconds, increment combo
    if (elapsed < 3000) {
      setCombo((prev) => {
        const newCombo = prev + 1;
        if (newCombo >= 3) {
          setShowCombo(true);
          if (comboTimer.current) clearTimeout(comboTimer.current);
          comboTimer.current = setTimeout(() => {
            setShowCombo(false);
          }, 1500);
        }
        return newCombo;
      });
    } else {
      setCombo(1);
      setShowCombo(false);
    }

    // Pop visual feedback
    setPoppedCard(questionId);
    setTimeout(() => setPoppedCard(null), 400);

    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowValidation(false);
  }, []);

  // Cleanup combo timer
  useEffect(() => {
    return () => {
      if (comboTimer.current) clearTimeout(comboTimer.current);
    };
  }, []);

  const handleSubmit = () => {
    if (!isAllAnswered(answers)) {
      setShowValidation(true);

      const firstUnanswered = shuffledQuestions.find((q) => answers[q.id] == null);
      if (firstUnanswered && cardRefs.current[firstUnanswered.id]) {
        cardRefs.current[firstUnanswered.id].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }
    const { typeKey, modifier } = calculateResult(answers);
    pendingResult.current = { typeId: typeKeyToId(typeKey), modifier };
    setShowAnalyzing(true);
  };

  const handleAnalyzingComplete = useCallback(() => {
    if (pendingResult.current) {
      onResult(pendingResult.current);
    }
  }, [onResult]);

  const canSubmit = isAllAnswered(answers);
  const almostDone = answeredCount >= totalQuestions - 3;

  // Combo display text
  const comboText = combo >= 10
    ? `${combo}連続！！！`
    : combo >= 5
    ? `${combo}連続！！`
    : `${combo}連続！`;
  const comboEmoji = combo >= 10 ? '\u{1F30B}' : combo >= 7 ? '\u{1F4A5}' : combo >= 5 ? '\u{1F525}' : '\u{26A1}';

  if (showAnalyzing) {
    return (
      <AnalyzingScreen
        targetName={targetName}
        onComplete={handleAnalyzingComplete}
      />
    );
  }

  return (
    <div
      className={`pt-2 transition-all duration-700 ${shouldTremble ? 'screen-tremble' : ''}`}
      style={{
        boxShadow: vignetteIntensity > 0
          ? `inset 0 0 ${vignetteSize}px ${vignetteSpread}px rgba(204,17,51,${vignetteIntensity.toFixed(3)})`
          : 'none',
      }}
    >
      {/* Milestone taunt banner - おばちゃん style */}
      {taunt && (
        <div className="quiz-taunt-banner">
          <span className="mr-2">👵</span>{taunt}
        </div>
      )}

      {/* Combo counter */}
      {showCombo && combo >= 3 && (
        <div className="combo-banner combo-enter">
          <span className="combo-fire">
            {comboEmoji} {comboText}
          </span>
        </div>
      )}

      {/* おばちゃんの案内 */}
      <div className="mb-4">
        <ObachanBubble>
          {targetName
            ? `ほな${targetName}のこと思い出しながら答えてな！分からん問題は真ん中の「どっちとも言えん」押しときゃええねん。気楽にいこ！`
            : 'さぁ始めるで！分からん問題は真ん中の「どっちとも言えん」押しときゃええねん。深く考えんと、パパッと答えたってな！'
          }
        </ObachanBubble>
      </div>

      {/* Progress bar with glow wrapper at 80%+ */}
      <div className={progress > 0.8 ? 'progress-glow-wrapper' : ''}>
        <ProgressBar current={answeredCount} total={totalQuestions} />
      </div>

      <div className="space-y-0">
        {shuffledQuestions.map((question, i) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id] ?? null}
            onChange={(value) => handleAnswer(question.id, value)}
            index={i + 1}
            total={totalQuestions}
            highlighted={showValidation && answers[question.id] == null}
            cardRef={(el) => { cardRefs.current[question.id] = el; }}
            popped={poppedCard === question.id}
          />
        ))}
      </div>

      <div className="mt-4">
        {showValidation && (
          <p className="text-center text-sm text-green-400 font-bold mb-3">
            未回答の質問があります（緑色の項目を確認してください）
          </p>
        )}
        <button
          className={`w-full py-4 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer hover:bg-coral-dark transition-colors${almostDone ? ' quiz-submit-escalate' : ''}`}
          onClick={handleSubmit}
        >
          {canSubmit ? '暴いたれ！' : `あと${totalQuestions - answeredCount}問`}
        </button>
      </div>
    </div>
  );
}
