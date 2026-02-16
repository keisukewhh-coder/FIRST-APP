import { useState, useRef, useCallback } from 'react';

// +2=せやねんせやねん！ +1=まあ、そうやと思うわ 0=どっちとも言えん -1=それはちゃう気する -2=全然ちゃうわ！
// ボタン値: 1(+2), 2(+1), 3(0), 4(-1), 5(-2)
const labels = [
  'せやねん\nせやねん！',
  'まあ、そうやと\n思うわ',
  'どっちとも\n言えん',
  'それはちゃう\n気する',
  '全然\nちゃうわ！',
];

const sizes = [44, 36, 30, 36, 44];
const emojiSizes = [24, 20, 16, 20, 24];
const colors = ['#9B2030', '#6B2028', '#3A2020', '#6B2028', '#9B2030'];
const selectedColors = ['#CC1133', '#9B2030', '#5A3035', '#9B2030', '#CC1133'];

// Different flash emoji per button position
const flashEmojis = ['\u{1F525}', '\u{1F44D}', '\u{1F914}', '\u{1F612}', '\u{1F4A2}'];

export default function ScaleSelector({ value, onChange }) {
  const [ripples, setRipples] = useState([]);
  const [flashEmoji, setFlashEmoji] = useState(null);
  const buttonRefs = useRef({});

  const handleClick = useCallback((n, i, e) => {
    // Ripple effect
    const button = buttonRefs.current[n];
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height);
      const rippleId = Date.now();

      setRipples((prev) => [...prev, { id: rippleId, x, y, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 500);
    }

    // Emoji flash
    setFlashEmoji({ index: i, emoji: flashEmojis[i], id: Date.now() });
    setTimeout(() => setFlashEmoji(null), 600);

    onChange(n);
  }, [onChange]);

  return (
    <div className="flex items-center justify-between gap-2 px-2">
      {[1, 2, 3, 4, 5].map((n, i) => {
        const isSelected = value === n;
        const size = sizes[i];
        return (
          <div key={n} className="flex flex-col items-center gap-1.5 relative">
            <button
              ref={(el) => { buttonRefs.current[n] = el; }}
              className={`scale-option rounded-full border-0 cursor-pointer flex items-center justify-center relative overflow-hidden ${
                isSelected ? 'selected' : ''
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: isSelected ? selectedColors[i] : colors[i],
                opacity: isSelected ? 1 : 0.75,
                boxShadow: isSelected ? `0 0 0 3px ${selectedColors[i]}40, 0 2px 8px ${selectedColors[i]}30` : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s ease',
              }}
              onClick={(e) => handleClick(n, i, e)}
              aria-label={labels[i].replace('\n', '')}
            >
              {isSelected && (
                <span
                  className="leading-none select-none"
                  style={{ fontSize: `${emojiSizes[i]}px` }}
                  role="img"
                  aria-label="selected"
                >😏</span>
              )}
              {/* Ripple effects */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="scale-ripple"
                  style={{
                    left: ripple.x - ripple.size / 2,
                    top: ripple.y - ripple.size / 2,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </button>
            {/* Emoji flash */}
            {flashEmoji && flashEmoji.index === i && (
              <span
                key={flashEmoji.id}
                className="emoji-flash"
                style={{ top: '-8px', left: '50%', transform: 'translateX(-50%)' }}
              >
                {flashEmoji.emoji}
              </span>
            )}
            <span className="text-[0.55rem] leading-tight text-center text-text-secondary whitespace-pre-line font-bold">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
