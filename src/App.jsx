import { Routes, Route, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import StartCard from './components/StartCard';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ReceivedResultPage from './pages/ReceivedResultPage';
import SendPage from './pages/SendPage';
import SendCompletePage from './pages/SendCompletePage';
import LegalPage from './pages/LegalPage';
import PrivacyPage from './pages/PrivacyPage';
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

  const handleStartQuiz = (targetName) => {
    const params = new URLSearchParams();
    if (targetName) params.set('n', targetName);
    const qs = params.toString();
    navigate(`/quiz${qs ? `?${qs}` : ''}`);
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
  const [searchParams] = useSearchParams();
  const targetName = searchParams.get('n') || '';

  const handleShowResult = ({ typeId, modifier }) => {
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    if (modifier) params.set('m', modifier);
    if (targetName) params.set('n', targetName);
    navigate(`/result?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return <QuizPage onResult={handleShowResult} targetName={targetName} />;
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
  const targetName = searchParams.get('n') || '';

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
    if (targetName) params.set('n', targetName);
    return <Navigate to={`/result?${params.toString()}`} replace />;
  }

  const handleRestart = () => {
    const params = new URLSearchParams();
    if (targetName) params.set('n', targetName);
    const qs = params.toString();
    navigate(`/quiz${qs ? `?${qs}` : ''}`);
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
      targetName={targetName}
      onRestart={handleRestart}
      onGoHome={handleGoHome}
    />
  );
}

/**
 * 受信結果ページラッパー
 * URLクエリパラメータ: ?t={typeId}&m={modifier}&from={送信者名}
 */
function ReceivedResultPageWrapper() {
  const [searchParams] = useSearchParams();

  const rawTypeId = searchParams.get('t');
  const rawModifier = searchParams.get('m');
  const rawFrom = searchParams.get('from');

  // パラメータが全く無い場合はホームに戻す
  if (rawTypeId == null) {
    return <Navigate to="/" replace />;
  }

  // typeId のバリデーション: 0〜15 の整数であること
  let typeId = parseInt(rawTypeId, 10);
  if (isNaN(typeId) || typeId < 0 || typeId > 15) {
    typeId = 0;
  }

  // modifier のバリデーション
  const validModifiers = Object.keys(MODIFIER_DETAILS);
  let modifier = rawModifier;
  if (!modifier || !validModifiers.includes(modifier)) {
    modifier = '量産型の';
  }

  // 送信者名（デコード済み、フォールバック付き）
  const senderName = rawFrom ? decodeURIComponent(rawFrom) : '';

  // バリデーション後の正規化されたURLに書き換え（不正値を修正）
  const correctedTypeId = String(typeId);
  if (rawTypeId !== correctedTypeId || rawModifier !== modifier) {
    const params = new URLSearchParams();
    params.set('t', correctedTypeId);
    params.set('m', modifier);
    if (senderName) params.set('from', senderName);
    return <Navigate to={`/received?${params.toString()}`} replace />;
  }

  return (
    <ReceivedResultPage
      typeId={typeId}
      modifier={modifier}
      senderName={senderName}
    />
  );
}

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/quiz" element={<QuizPageWrapper />} />
        <Route path="/result" element={<ResultPageWrapper />} />
        <Route path="/received" element={<ReceivedResultPageWrapper />} />
        <Route path="/send" element={<SendPage />} />
        <Route path="/send-complete" element={<SendCompletePage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
