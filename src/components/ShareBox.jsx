import { useState } from 'react';

export default function ShareBox({ typeKey, modifier, resultName }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/result?key=${encodeURIComponent(typeKey)}&mod=${encodeURIComponent(modifier || '')}`;
  const displayName = modifier ? `${modifier}${resultName}` : resultName || typeKey;
  const shareText = `#あの人勝手に占っちゃおう診断\nあの人の本性は「${displayName}」だった…！\n${shareUrl}`;

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
    const text = encodeURIComponent(`#あの人勝手に占っちゃおう診断\nあの人の本性を暴いた結果…！`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm mb-5">
      <h3 className="text-sm font-bold text-text-primary mb-1">結果をシェア</h3>
      <p className="text-xs text-vivid-pink font-semibold mb-3">#あの人勝手に占っちゃおう診断</p>
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
        className="w-full py-2.5 rounded-full bg-vivid-pink text-white text-xs font-bold border-0 cursor-pointer hover:bg-coral-dark transition-colors"
        onClick={handleTwitterShare}
      >
        Xでシェアする
      </button>
    </div>
  );
}
