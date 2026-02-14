import { useState } from 'react';

export default function ShareBox({ typeKey }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/result?key=${encodeURIComponent(typeKey)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API が使えない場合のフォールバック
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="share-box">
      <h3>結果をシェア</h3>
      <div className="share-url-row">
        <input
          type="text"
          className="share-url-input"
          value={shareUrl}
          readOnly
        />
        <button className="btn btn-secondary" onClick={handleCopy}>
          {copied ? 'コピーしました!' : 'リンクをコピー'}
        </button>
      </div>
    </div>
  );
}
