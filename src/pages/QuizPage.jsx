import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import questions from '../data/questions.json';
import { calculateResult, isAllAnswered } from '../utils/scoring';

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const question = questions[currentIndex];
  const totalQuestions = questions.length;

  // 回答済みの問題数
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
    const { typeKey } = calculateResult(answers);
    navigate(`/result?key=${typeKey}`);
  };

  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canSubmit = isAllAnswered(answers);
  const hasAnsweredCurrent = answers[question.id] != null;

  return (
    <Layout>
      <div className="quiz-page">
        <ProgressBar current={answeredCount} total={totalQuestions} />

        <QuestionCard
          question={question}
          value={answers[question.id] ?? null}
          onChange={handleAnswer}
        />

        <div className="quiz-nav">
          <button
            className="btn btn-ghost"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            戻る
          </button>

          {isLastQuestion ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              結果を見る
            </button>
          ) : (
            <button
              className="btn btn-primary"
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
