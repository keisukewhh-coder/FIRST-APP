import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import StartCard from './components/StartCard';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import NotFoundPage from './pages/NotFoundPage';
import { MODIFIER_DETAILS } from './utils/scoring';

/**
 * ルートパスの結果表示対応
 * 旧URL形式 /?type=X&modifier=Y でアクセスされた場合、/result に転送
 */
function HomePageWrapper() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 旧URL形式の結果パラメータを検出して /result にリダイレクト
  const typeId = searchParams.get('type');
  const modifier = searchParams.get('modifier');
  if (typeId != null) {
    const newParams = new URLSearchParams();
    newParams.set('t', typeId);
    if (modifier) newParams.set('m', modifier);
    return <Navigate to={`/result?${newParams.toString()}`} replace />;
  }

  const handleStartQuiz = () => {
    navigate('/quiz');
    window.scrollTo(0, 0);
  };

  return <StartCard onStart={handleStartQuiz} />;
}

/**
 * クイズページラッパー
 * 診断完了時に /result へ遷移
 */
function QuizPageWrapper() {
  const navigate = useNavigate();

  const handleShowResult = ({ typeId, modifier }) => {
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    if (modifier) params.set('m', modifier);
    navigate(`/result?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return <QuizPage onResult={handleShowResult} />;
}

/**
 * 結果ページラッパー
 * URLクエリパラメータからtypeIdとmodifierを取得
 * 不正なパラメータの場合はフォールバック処理
 */
function ResultPageWrapper() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rawTypeId = searchParams.get('t');
  const rawModifier = searchParams.get('m');

  // パラメータが全く無い場合（/result に直接アクセス）はホームに戻す
  if (rawTypeId == null) {
    return <Navigate to="/" replace />;
  }

  // typeId のバリデーション: 0〜15 の整数であること
  let typeId = parseInt(rawTypeId, 10);
  if (isNaN(typeId) || typeId < 0 || typeId > 15) {
    typeId = 0; // フォールバック: 最初のタイプ
  }

  // modifier のバリデーション: MODIFIER_DETAILS に存在する修飾語であること
  const validModifiers = Object.keys(MODIFIER_DETAILS);
  let modifier = rawModifier;
  if (!modifier || !validModifiers.includes(modifier)) {
    modifier = '量産型の'; // フォールバック: デフォルト修飾語
  }

  // バリデーション後の正規化されたURLに書き換え（不正値を修正）
  const correctedTypeId = String(typeId);
  if (rawTypeId !== correctedTypeId || rawModifier !== modifier) {
    const params = new URLSearchParams();
    params.set('t', correctedTypeId);
    params.set('m', modifier);
    return <Navigate to={`/result?${params.toString()}`} replace />;
  }

  const handleRestart = () => {
    navigate('/quiz');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <ResultPage
      typeId={typeId}
      modifier={modifier}
      onRestart={handleRestart}
      onGoHome={handleGoHome}
    />
  );
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/quiz" element={<QuizPageWrapper />} />
        <Route path="/result" element={<ResultPageWrapper />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
