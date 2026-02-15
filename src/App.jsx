import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import StartCard from './components/StartCard';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  const [page, setPage] = useState('home');
  const [resultData, setResultData] = useState({ typeId: null, modifier: null });

  // 初回レンダリング時にURLパラメータを監視し、結果画面を復元
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeId = params.get('type');
    const modifier = params.get('modifier');
    if (typeId != null) {
      setResultData({ typeId, modifier: modifier || '量産型の' });
      setPage('result');
    }
  }, []);

  const handleStartQuiz = () => {
    setPage('quiz');
    window.scrollTo(0, 0);
  };

  const handleShowResult = ({ typeId, modifier }) => {
    setResultData({ typeId, modifier });
    setPage('result');
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    // クエリパラメータをクリア
    window.history.replaceState({}, '', window.location.pathname);
    setResultData({ typeId: null, modifier: null });
    setPage('quiz');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    window.history.replaceState({}, '', window.location.pathname);
    setResultData({ typeId: null, modifier: null });
    setPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {page === 'home' && <StartCard onStart={handleStartQuiz} />}
      {page === 'quiz' && <QuizPage onResult={handleShowResult} />}
      {page === 'result' && resultData.typeId != null && (
        <ResultPage
          typeId={resultData.typeId}
          modifier={resultData.modifier}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}
    </Layout>
  );
}

export default App;
