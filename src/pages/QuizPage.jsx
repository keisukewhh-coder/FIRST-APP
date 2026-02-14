import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import questions from '../data/questions.json';
import { calculateResult, isAllAnswered } from '../utils/scoring';

export default function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const bottomRef = useRef(null);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (!isAllAnswered(answers)) return;
    const { typeKey } = calculateResult(answers);
    navigate(`/result?key=${encodeURIComponent(typeKey)}`);
  };

  const canSubmit = isAllAnswered(answers);

  return (
    <Layout>
      <div className="pt-2">
        <ProgressBar current={answeredCount} total={totalQuestions} />

        <div className="space-y-0">
          {questions.map((question, i) => (
            <QuestionCard
              key={question.id}
              question={question}
              value={answers[question.id] ?? null}
              onChange={(value) => handleAnswer(question.id, value)}
              index={i + 1}
              total={totalQuestions}
            />
          ))}
        </div>

        <div ref={bottomRef} className="mt-4">
          <button
            className="w-full py-4 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer hover:bg-coral-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {canSubmit ? '本性を暴く' : `あと${totalQuestions - answeredCount}問`}
          </button>
        </div>
      </div>
    </Layout>
  );
}
