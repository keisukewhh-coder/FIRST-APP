import { useState } from 'react';

export default function ShareBox({ typeId, modifier, resultName }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/result?t=${encodeURIComponent(typeId)}&m=${encodeURIComponent(modifier || '')}`;
  const displayName = modifier ? `${modifier}${resultName}` : resultName;
  const shareText = `#あの人の裏の顔診断\nあの人の裏の顔は「${displayName}」だった…！\n${shareUrl}`;

  const handleCopy = async () => {
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

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`#あの人の裏の顔診断\nあの人の裏の顔を暴いた結果…！`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="bg-card rounded-3xl p-6 shadow-lg mb-6 border border-vivid-pink/25">
      <h3 className="text-base font-extrabold text-text-primary mb-1">この裏の顔、みんなに暴露する？</h3>
      <p className="text-xs text-vivid-pink font-semibold mb-4">#あの人の裏の顔診断</p>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="flex-1 min-w-0 px-3 py-2 border border-coral/30 rounded-full text-xs text-text-secondary bg-sakura"
          value={shareUrl}
          readOnly
        />
        <button
          className="whitespace-nowrap px-4 py-2 rounded-full bg-vivid-pink/15 text-vivid-pink text-xs font-semibold border-0 cursor-pointer hover:bg-vivid-pink/25 transition-colors"
          onClick={handleCopy}
        >
          {copied ? 'コピー済み' : 'コピー'}
        </button>
      </div>
      <button
        className="btn-primary w-full py-3 rounded-full bg-vivid-pink text-white text-sm font-bold border-0 cursor-pointer hover:bg-coral-dark pulse-gentle"
        onClick={handleTwitterShare}
      >
        Xでシェアする
      </button>
    </div>
  );
}
