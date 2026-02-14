import { useNavigate } from 'react-router-dom';

export default function StartCard() {
  const navigate = useNavigate();

  return (
    <div className="text-center pt-6 pb-4">
      {/* Hero illustration */}
      <div className="mb-6">
        <svg viewBox="0 0 200 120" width="240" height="144" className="mx-auto">
          {/* Hearts floating */}
          <path d="M30 40 C30 35 37 32 37 38 C37 32 44 35 44 40 C44 46 37 50 37 50 C37 50 30 46 30 40Z" fill="#FFB6C1" opacity="0.6" />
          <path d="M155 30 C155 26 160 24 160 28 C160 24 165 26 165 30 C165 34 160 37 160 37 C160 37 155 34 155 30Z" fill="#FF99AA" opacity="0.5" />
          <path d="M80 15 C80 12 84 10 84 13 C84 10 88 12 88 15 C88 18 84 20 84 20 C84 20 80 18 80 15Z" fill="#FFB6C1" opacity="0.4" />
          {/* Cat silhouette */}
          <g transform="translate(40,35)">
            <ellipse cx="20" cy="40" rx="16" ry="18" fill="#FFB6C1" />
            <circle cx="20" cy="22" r="14" fill="#FFB6C1" />
            <polygon points="8,14 6,0 16,10" fill="#FFB6C1" />
            <polygon points="32,14 34,0 24,10" fill="#FFB6C1" />
            <ellipse cx="14" cy="22" rx="2" ry="2.5" fill="#fff" />
            <ellipse cx="26" cy="22" rx="2" ry="2.5" fill="#fff" />
          </g>
          {/* Panda silhouette */}
          <g transform="translate(85,30)">
            <ellipse cx="20" cy="45" rx="18" ry="20" fill="#2C2C2C" opacity="0.15" />
            <circle cx="20" cy="25" r="16" fill="#2C2C2C" opacity="0.15" />
            <circle cx="8" cy="12" r="8" fill="#2C2C2C" opacity="0.15" />
            <circle cx="32" cy="12" r="8" fill="#2C2C2C" opacity="0.15" />
          </g>
          {/* Lion silhouette */}
          <g transform="translate(130,32)">
            <ellipse cx="20" cy="42" rx="16" ry="18" fill="#FFD4A0" opacity="0.5" />
            <circle cx="20" cy="22" r="20" fill="#FFD4A0" opacity="0.5" />
            <circle cx="20" cy="22" r="14" fill="#FFD4A0" opacity="0.7" />
          </g>
        </svg>
      </div>

      <h1 className="text-2xl font-extrabold text-text-primary mb-2">
        アニマル恋愛攻略診断
      </h1>
      <p className="text-sm text-text-secondary mb-6 leading-relaxed">
        あの人の「日常のしぐさ」から動物タイプを判定。<br />
        タイプ別の攻略法をお届けします。
      </p>

      <div className="flex justify-center gap-6 mb-5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">所要時間</span>
          <span className="text-base font-bold text-coral-dark">約3分</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">質問数</span>
          <span className="text-base font-bold text-coral-dark">15問</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">タイプ</span>
          <span className="text-base font-bold text-coral-dark">8種</span>
        </div>
      </div>

      <p className="text-sm text-text-primary mb-2 leading-relaxed">
        好きな人の行動を思い出しながら、<br />
        15問の質問に答えてみてください。
      </p>
      <p className="text-xs text-text-secondary mb-6">
        ※ エンタメ目的の診断です。性格を断定するものではありません。
      </p>

      <button
        className="pulse-gentle w-full max-w-xs mx-auto py-3.5 px-8 rounded-full bg-coral-dark text-white font-bold text-base border-0 cursor-pointer shadow-md hover:bg-coral transition-colors"
        onClick={() => navigate('/quiz')}
      >
        診断をはじめる
      </button>
    </div>
  );
}
