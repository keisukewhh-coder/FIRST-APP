import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import questions from '../data/questions.json';
import { calculateResult, isAllAnswered } from '../utils/scoring';

export default function QuizPage() {
  const navigate = useNavigate();
  const [ageGroup, setAgeGroup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (!isAllAnswered(answers)) return;
    const { typeKey } = calculateResult(answers, ageGroup);
    navigate(`/result?key=${encodeURIComponent(typeKey)}&age=${ageGroup}`);
  };

  // Age selection screen
  if (!ageGroup) {
    return (
      <Layout>
        <div className="pt-4 animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-text-primary mb-2">
              あなたの年代を教えてください
            </h2>
            <p className="text-sm text-text-secondary">
              年代に合わせたアドバイスをお届けします
            </p>
          </div>

          <div className="space-y-3 max-w-xs mx-auto">
            <button
              onClick={() => setAgeGroup('teens')}
              className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-coral/30 text-text-primary font-semibold text-base cursor-pointer hover:border-coral hover:bg-coral/5 transition-all"
            >
              <span className="block text-lg mb-0.5">10代</span>
              <span className="block text-xs text-text-secondary font-normal">
                部活・学校・放課後がキーワード
              </span>
            </button>

            <button
              onClick={() => setAgeGroup('twenties')}
              className="w-full py-4 px-6 rounded-2xl bg-white border-2 border-coral/30 text-text-primary font-semibold text-base cursor-pointer hover:border-coral hover:bg-coral/5 transition-all"
            >
              <span className="block text-lg mb-0.5">20代</span>
              <span className="block text-xs text-text-secondary font-normal">
                仕事・キャリア・休日がキーワード
              </span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canSubmit = isAllAnswered(answers);
  const hasAnsweredCurrent = answers[question.id] != null;

  return (
    <Layout>
      <div className="pt-2">
        <ProgressBar current={answeredCount} total={totalQuestions} />

        <QuestionCard
          key={question.id}
          question={question}
          value={answers[question.id] ?? null}
          onChange={handleAnswer}
          index={currentIndex + 1}
          total={totalQuestions}
        />

        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-full bg-white text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer hover:bg-coral/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            戻る
          </button>

          {isLastQuestion ? (
            <button
              className="flex-1 py-3 rounded-full bg-coral-dark text-white font-bold text-sm border-0 cursor-pointer hover:bg-coral transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              結果を見る
            </button>
          ) : (
            <button
              className="flex-1 py-3 rounded-full bg-coral-dark text-white font-bold text-sm border-0 cursor-pointer hover:bg-coral transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
            >
              次へ
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
