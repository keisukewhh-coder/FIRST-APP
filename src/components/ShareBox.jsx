import { useState } from 'react';

export default function ShareBox({ typeKey, ageGroup }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/result?key=${encodeURIComponent(typeKey)}&age=${ageGroup}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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
    <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
      <h3 className="text-sm font-bold text-text-primary mb-3">結果をシェア</h3>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 min-w-0 px-3 py-2 border border-coral/30 rounded-full text-xs text-text-secondary bg-sakura"
          value={shareUrl}
          readOnly
        />
        <button
          className="whitespace-nowrap px-4 py-2 rounded-full bg-coral-light text-coral-dark text-xs font-semibold border-0 cursor-pointer hover:bg-coral/40 transition-colors"
          onClick={handleCopy}
        >
          {copied ? 'コピー済み' : 'コピー'}
        </button>
      </div>
    </div>
  );
}
