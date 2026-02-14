import { useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import questions from '../data/questions.json';
import { calculateResult, isAllAnswered } from '../utils/scoring';

/**
 * Shuffle questions so that no two consecutive questions share the same axis.
 * Uses a greedy approach: pick randomly from axes that differ from the last placed.
 */
function shuffleQuestions(qs) {
  // Group questions by axis
  const byAxis = {};
  for (const q of qs) {
    if (!byAxis[q.axis]) byAxis[q.axis] = [];
    byAxis[q.axis].push(q);
  }

  // Shuffle each axis group
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
    // Collect axes that differ from last AND still have questions
    const available = Object.keys(byAxis).filter(
      (axis) => byAxis[axis].length > 0 && axis !== lastAxis
    );

    let chosenAxis;
    if (available.length > 0) {
      // Pick the axis with most remaining questions (tie-break random)
      available.sort((a, b) => byAxis[b].length - byAxis[a].length);
      const maxLen = byAxis[available[0]].length;
      const topAxes = available.filter((a) => byAxis[a].length === maxLen);
      chosenAxis = topAxes[Math.floor(Math.random() * topAxes.length)];
    } else {
      // Forced to repeat axis (only one axis left)
      chosenAxis = Object.keys(byAxis).find((axis) => byAxis[axis].length > 0);
    }

    result.push(byAxis[chosenAxis].pop());
    lastAxis = chosenAxis;
  }

  return result;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showValidation, setShowValidation] = useState(false);
  const cardRefs = useRef({});

  // Shuffle once on mount
  const shuffledQuestions = useMemo(() => shuffleQuestions([...questions]), []);

  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Clear validation highlight once user starts answering
    setShowValidation(false);
  }, []);

  const handleSubmit = () => {
    if (!isAllAnswered(answers)) {
      setShowValidation(true);

      // Scroll to the first unanswered question
      const firstUnanswered = shuffledQuestions.find((q) => answers[q.id] == null);
      if (firstUnanswered && cardRefs.current[firstUnanswered.id]) {
        cardRefs.current[firstUnanswered.id].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      return;
    }
    const { typeKey } = calculateResult(answers);
    navigate(`/result?key=${encodeURIComponent(typeKey)}`);
  };

  const canSubmit = isAllAnswered(answers);

  return (
    <Layout>
      <div className="pt-2">
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
            <p className="text-center text-sm text-green-600 font-bold mb-3">
              未回答の質問があります（緑色の項目を確認してください）
            </p>
          )}
          <button
            className="w-full py-4 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer hover:bg-coral-dark transition-colors"
            onClick={handleSubmit}
          >
            {canSubmit ? 'あの人の本性を暴く' : `あと${totalQuestions - answeredCount}問`}
          </button>
        </div>
      </div>
    </Layout>
  );
}
