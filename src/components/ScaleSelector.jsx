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
const colors = ['#8B1A2B', '#5A1520', '#2A1818', '#5A1520', '#8B1A2B'];
const selectedColors = ['#CC1133', '#8B1A2B', '#4A2A30', '#8B1A2B', '#CC1133'];

export default function ScaleSelector({ value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-2 px-2">
      {[1, 2, 3, 4, 5].map((n, i) => {
        const isSelected = value === n;
        const size = sizes[i];
        return (
          <div key={n} className="flex flex-col items-center gap-1.5">
            <button
              className="scale-option rounded-full border-0 cursor-pointer flex items-center justify-center transition-all"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: isSelected ? selectedColors[i] : colors[i],
                opacity: isSelected ? 1 : 0.6,
                boxShadow: isSelected ? `0 0 0 3px ${selectedColors[i]}40, 0 2px 8px ${selectedColors[i]}30` : 'none',
              }}
              onClick={() => onChange(n)}
              aria-label={labels[i].replace('\n', '')}
            >
              {isSelected && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <span className="text-[0.55rem] leading-tight text-center text-text-secondary whitespace-pre-line font-bold">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
