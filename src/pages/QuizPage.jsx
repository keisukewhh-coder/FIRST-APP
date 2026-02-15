import { useState, useRef, useMemo, useCallback } from 'react';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
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
  const cardRefs = useRef({});

  const shuffledQuestions = useMemo(() => shuffleQuestions([...questions]), []);

  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setShowValidation(false);
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
    onResult({ typeId: typeKeyToId(typeKey), modifier });
  };

  const canSubmit = isAllAnswered(answers);

  return (
    <div className="pt-2">
      {/* 対象者名の表示 */}
      {targetName && (
        <div className="text-center mb-4 py-3 bg-vivid-pink/10 rounded-2xl border border-vivid-pink/20">
          <p className="text-sm text-text-primary">
            <span className="text-vivid-pink font-extrabold">{targetName}</span>
            <span className="text-text-secondary"> のことを思い浮かべて答えてな</span>
          </p>
        </div>
      )}

      {/* 案内注釈ボックス */}
      <div className="bg-coral/10 border border-coral/30 rounded-2xl px-5 py-4 mb-4 flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5" aria-hidden="true">📝</span>
        <div>
          <p className="text-text-primary font-bold text-base mb-1">
            回答できる問題だけ回答してください
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            分からない・判断できない問題は「どっちとも言えん」（真ん中のボタン）を選んでください。
          </p>
        </div>
      </div>

      <ProgressBar current={answeredCount} total={totalQuestions} />

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
          className="w-full py-4 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer hover:bg-coral-dark transition-colors"
          onClick={handleSubmit}
        >
          {canSubmit ? '暴いたれ！' : `あと${totalQuestions - answeredCount}問`}
        </button>
      </div>
    </div>
  );
}
