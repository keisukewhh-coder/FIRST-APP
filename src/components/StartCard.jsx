import { useNavigate } from 'react-router-dom';

export default function StartCard() {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-6 pb-4">
      {/* Hero illustration */}
      <div className="mb-6">
        <svg viewBox="0 0 200 120" width="240" height="144" className="mx-auto">
          {/* Mask icons */}
          <g transform="translate(30,25)">
            <circle cx="20" cy="25" r="18" fill="#FF6B81" opacity="0.2" />
            <circle cx="20" cy="25" r="14" fill="#FF6B81" opacity="0.4" />
            {/* Happy mask */}
            <path d="M12 22 Q20 30 28 22" stroke="#FF3355" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="14" cy="20" r="2" fill="#FF3355" />
            <circle cx="26" cy="20" r="2" fill="#FF3355" />
          </g>
          {/* Question mark */}
          <g transform="translate(85,15)">
            <circle cx="15" cy="30" r="22" fill="#FFD4A0" opacity="0.3" />
            <text x="7" y="38" fontSize="28" fontWeight="bold" fill="#FF3355" opacity="0.6">?</text>
          </g>
          {/* Sad mask */}
          <g transform="translate(140,25)">
            <circle cx="20" cy="25" r="18" fill="#2C2C2C" opacity="0.1" />
            <circle cx="20" cy="25" r="14" fill="#2C2C2C" opacity="0.15" />
            {/* Sad mask */}
            <path d="M12 28 Q20 22 28 28" stroke="#666" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="14" cy="20" r="2" fill="#666" />
            <circle cx="26" cy="20" r="2" fill="#666" />
          </g>
          {/* Floating elements */}
          <path d="M60 10 L63 16 L57 16 Z" fill="#FF3355" opacity="0.3" />
          <path d="M145 12 L148 18 L142 18 Z" fill="#FF6B81" opacity="0.25" />
          <circle cx="75" cy="90" r="3" fill="#FF3355" opacity="0.2" />
          <circle cx="130" cy="85" r="2" fill="#FF6B81" opacity="0.3" />
        </svg>
      </div>

      <h1 className="text-2xl font-extrabold text-text-primary mb-1">
        あの人の裏の顔診断
      </h1>
      <p className="text-xs text-vivid-pink font-bold mb-3">（ちょいゲス）</p>
      <p className="text-sm text-text-secondary mb-6 leading-relaxed">
        あの人の「ちょっとダメなところ」や<br />
        「日常のクセ」を観察。その裏の顔を<br />
        <span className="text-vivid-pink font-bold">動物に例えてこっそり暴く</span>、<br />
        ちょいゲスな人間観察エンタメ。
      </p>

      <div className="flex justify-center gap-6 mb-5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">所要時間</span>
          <span className="text-base font-bold text-vivid-pink">約3分</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">質問数</span>
          <span className="text-base font-bold text-vivid-pink">28問</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">タイプ</span>
          <span className="text-base font-bold text-vivid-pink">16種</span>
        </div>
      </div>

      <p className="text-sm text-text-primary mb-2 leading-relaxed">
        あの人の行動を思い出しながら、<br />
        28問の質問に答えてみてください。
      </p>
      <p className="text-xs text-text-secondary mb-6">
        ※ エンタメ目的の診断です。性格を断定するものではありません。
      </p>

      <button
        className="pulse-gentle w-full max-w-xs mx-auto py-3.5 px-8 rounded-full bg-vivid-pink text-white font-bold text-base border-0 cursor-pointer shadow-md hover:bg-coral-dark transition-colors"
        onClick={() => navigate('/quiz')}
      >
        あの人の裏の顔を暴く
      </button>

      <p className="mt-4 text-xs text-text-secondary">
        <span className="text-vivid-pink font-semibold">#あの人の裏の顔診断</span>
      </p>
    </div>
  );
}
