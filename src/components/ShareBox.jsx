import { useState } from 'react';

export default function ShareBox({ typeId, modifier, resultName, targetName }) {
  const [copied, setCopied] = useState(false);

  const nameLabel = targetName || 'あの人';
  const shareUrl = `${window.location.origin}/result?t=${encodeURIComponent(typeId)}&m=${encodeURIComponent(modifier || '')}${targetName ? `&n=${encodeURIComponent(targetName)}` : ''}`;
  const displayName = modifier ? `${modifier}${resultName}` : resultName;
  const shareText = `#あの人の裏の顔診断\n${nameLabel}の裏の顔は「${displayName}」だった…！\n${shareUrl}`;

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

  const handleXShare = () => {
    const text = encodeURIComponent(`#あの人の裏の顔診断\n${nameLabel}の裏の顔を暴いた結果…！`);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleLineShare = () => {
    const text = encodeURIComponent(`${nameLabel}の裏の顔を暴いた結果…「${displayName}」だった！\n${shareUrl}`);
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${text}`, '_blank');
  };

  return (
    <div className="bg-card rounded-3xl p-5 sm:p-6 shadow-lg mb-6 border border-vivid-pink/25">
      <h3 className="text-sm sm:text-base font-extrabold text-text-primary mb-1 [text-wrap:balance]">{targetName ? `${targetName}の` : 'この'}裏の顔、みんなに暴露する？</h3>
      <p className="text-xs text-vivid-pink font-semibold mb-4">#あの人の裏の顔診断</p>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          aria-label="共有URL"
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
      <div className="flex gap-2">
        <button
          className="btn-primary flex-1 py-3 rounded-full bg-vivid-pink text-white text-sm font-bold border-0 cursor-pointer hover:bg-coral-dark"
          onClick={handleXShare}
        >
          Xでシェア
        </button>
        <button
          className="btn-primary flex-1 py-3 rounded-full bg-[#06C755] text-white text-sm font-bold border-0 cursor-pointer hover:brightness-90"
          onClick={handleLineShare}
        >
          LINEでシェア
        </button>
      </div>
    </div>
  );
}
