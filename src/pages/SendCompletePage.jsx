import { useState } from 'react';
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import { MODIFIER_DETAILS } from '../utils/scoring';
import ObachanBubble from '../components/ObachanBubble';

export default function SendCompletePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  // --- パラメータ取得 ---
  const rawTypeId = searchParams.get('t');
  const rawModifier = searchParams.get('m');
  const rawFrom = searchParams.get('from');
  const rawMsg = searchParams.get('msg');
  const rawExp = searchParams.get('exp');
  const targetName = searchParams.get('n') || '';

  // --- バリデーション: パラメータ不正時は / にリダイレクト ---
  if (rawTypeId == null || rawFrom == null || rawMsg == null || rawExp == null) {
    return <Navigate to="/" replace />;
  }

  let typeId = parseInt(rawTypeId, 10);
  if (isNaN(typeId) || typeId < 0 || typeId > 15) {
    return <Navigate to="/" replace />;
  }

  const validModifiers = Object.keys(MODIFIER_DETAILS);
  let modifier = rawModifier;
  if (!modifier || !validModifiers.includes(modifier)) {
    modifier = '量産型の';
  }

  const senderName = decodeURIComponent(rawFrom);
  const message = decodeURIComponent(rawMsg);
  const expirationTimestamp = parseInt(rawExp, 10);

  if (isNaN(expirationTimestamp)) {
    return <Navigate to="/" replace />;
  }

  // --- 受信者URL生成 ---
  const receivedUrl = `${window.location.origin}/received?t=${encodeURIComponent(typeId)}&m=${encodeURIComponent(modifier)}&from=${encodeURIComponent(senderName)}&exp=${encodeURIComponent(expirationTimestamp)}${targetName ? `&n=${encodeURIComponent(targetName)}` : ''}`;

  // --- 有効期限の日時表示 ---
  const expirationDate = new Date(expirationTimestamp);
  const expirationDisplay = `${expirationDate.getMonth() + 1}月${expirationDate.getDate()}日 ${String(expirationDate.getHours()).padStart(2, '0')}時${String(expirationDate.getMinutes()).padStart(2, '0')}分`;

  // --- 共有用テキスト（ユーザーが選んだメッセージを使用） ---
  const shareText = `${message}\n\n${receivedUrl}`;

  // --- URLのみコピー ---
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(receivedUrl);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = receivedUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setUrlCopied(true);
      setTimeout(() => setUrlCopied(false), 2000);
    }
  };

  // --- メッセージ + URLコピー ---
  const handleCopyWithMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --- LINE共有（ユーザーが選んだメッセージを送信） ---
  const handleLineShare = () => {
    const lineText = encodeURIComponent(`${message}\n\n${receivedUrl}`);
    window.open(`https://line.me/R/share?text=${lineText}`, '_blank');
  };

  // --- メール共有 ---
  const handleMailShare = () => {
    const subject = encodeURIComponent('あんたの裏の顔、暴いたったで');
    const body = encodeURIComponent(`${message}\n\n${receivedUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // --- Xシェア ---
  const handleXShare = () => {
    const text = encodeURIComponent(message);
    const url = encodeURIComponent(receivedUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  // --- プレビューを新しいタブで開く ---
  const handlePreview = () => {
    window.open(receivedUrl, '_blank');
  };

  return (
    <div className="pt-6 animate-fade-in-up">
      {/* ===== 1. 成功演出セクション ===== */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-vivid-pink/15 mb-4">
          <svg
            className="w-10 h-10 text-vivid-pink"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold text-text-primary mb-2">
          叩きつけ完了や！
        </h1>
        <p className="text-sm text-text-secondary">
          もう後戻りはでけへんで…
        </p>
      </div>

      <div className="mb-5">
        <ObachanBubble variant="reveal">
          やってもうたな！あとはあの人がリンク開くのを待つだけや。震えて待っときや〜
        </ObachanBubble>
      </div>

      {/* ===== 2. 送信用URL表示 ===== */}
      <div className="bg-card rounded-3xl p-5 shadow-lg mb-5 border border-coral/20">
        <h2 className="text-sm font-bold text-text-primary mb-1">
          このURLを叩きつけろ
        </h2>
        <p className="text-xs text-text-secondary mb-3">
          相手にこれ送りつけたれ。逃げ場はないで
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 min-w-0 px-3 py-2.5 border border-coral/30 rounded-full text-xs text-text-secondary bg-sakura"
            value={receivedUrl}
            readOnly
          />
          <button
            className="whitespace-nowrap px-4 py-2.5 rounded-full bg-vivid-pink/15 text-vivid-pink text-xs font-semibold border-0 cursor-pointer hover:bg-vivid-pink/25 transition-colors"
            onClick={handleCopyUrl}
          >
            {urlCopied ? 'コピー済み' : 'コピー'}
          </button>
        </div>
      </div>

      {/* ===== 3. 共有ボタン群 ===== */}
      <div className="bg-card rounded-3xl p-5 shadow-lg mb-5 border border-coral/20">
        <h2 className="text-sm font-bold text-text-primary mb-4">
          メッセージ付きで叩きつける
        </h2>
        <div className="flex flex-col gap-3">
          {/* LINEで送る */}
          <button
            className="btn-primary w-full py-4 rounded-full bg-[#06C755] text-white font-bold text-base border-0 cursor-pointer hover:brightness-110 transition-all"
            onClick={handleLineShare}
          >
            LINEで送る
          </button>

          {/* メールで送る */}
          <button
            className="btn-primary w-full py-4 rounded-full bg-coral text-text-primary font-bold text-base border-0 cursor-pointer hover:brightness-110 transition-all"
            onClick={handleMailShare}
          >
            メールで送る
          </button>

          {/* URLをコピー */}
          <button
            className="btn-primary w-full py-4 rounded-full bg-vivid-pink/15 text-vivid-pink font-bold text-base border border-vivid-pink/30 cursor-pointer hover:bg-vivid-pink/25 transition-colors"
            onClick={handleCopyWithMessage}
          >
            {copied ? 'コピーしたで！' : 'URLをコピー'}
          </button>

          {/* Xでシェア */}
          <button
            className="btn-primary w-full py-4 rounded-full bg-[#1D9BF0] text-white font-bold text-base border-0 cursor-pointer hover:brightness-110 transition-all"
            onClick={handleXShare}
          >
            Xでシェアする
          </button>
        </div>
      </div>

      {/* ===== 4. 有効期限表示 ===== */}
      <div className="bg-card rounded-3xl p-5 shadow-lg mb-5 border border-vivid-pink/20">
        <div className="flex items-start gap-3">
          <span className="text-xl mt-0.5">&#9200;</span>
          <div>
            <p className="text-sm font-bold text-vivid-pink mb-1">
              48時間で証拠は消えるで
            </p>
            <p className="text-xs text-text-secondary">
              有効期限: {expirationDisplay}
            </p>
          </div>
        </div>
      </div>

      {/* ===== 5. プレビューセクション ===== */}
      <div className="bg-card rounded-3xl p-5 shadow-lg mb-5 border border-coral/20">
        <h2 className="text-sm font-bold text-text-primary mb-1">
          相手にはこう届くで
        </h2>
        <p className="text-xs text-text-secondary mb-3">
          逃げられへん証拠のプレビュー
        </p>
        <div className="bg-sakura rounded-2xl p-4 border border-coral/15 mb-4">
          <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
            {message}
          </p>
        </div>
        <button
          className="btn-secondary w-full py-3 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer hover:border-vivid-pink/30 hover:bg-coral/10 transition-colors"
          onClick={handlePreview}
        >
          受信者プレビューを見る
        </button>
      </div>

      {/* ===== 6. アクションボタン ===== */}
      <div className="flex flex-col gap-3 mt-2">
        <button
          className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer hover:bg-coral-dark"
          onClick={() => {
            navigate(`/send?t=${encodeURIComponent(typeId)}&m=${encodeURIComponent(modifier)}`);
            window.scrollTo(0, 0);
          }}
        >
          もう一人叩きつけたる
        </button>
        <button
          className="btn-secondary w-full py-3.5 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer hover:border-vivid-pink/30 hover:bg-coral/10 transition-colors"
          onClick={() => {
            navigate('/quiz');
            window.scrollTo(0, 0);
          }}
        >
          もう一度診断する
        </button>
        <button
          className="btn-secondary w-full py-3.5 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer hover:border-vivid-pink/30 hover:bg-coral/10 transition-colors"
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
}
