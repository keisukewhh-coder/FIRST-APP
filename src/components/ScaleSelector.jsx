const labels = [
  'まったく\n当てはまらない',
  'あまり\n当てはまらない',
  'どちらでも\nない',
  'やや\n当てはまる',
  'とても\n当てはまる',
];

const sizes = [44, 36, 30, 36, 44];
const colors = ['#FF99AA', '#FFB6C1', '#E0D0D5', '#FFB6C1', '#FF99AA'];
const selectedColors = ['#FF6B81', '#FF8FA0', '#C0A8B0', '#FF8FA0', '#FF6B81'];

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
            <span className="text-[0.6rem] leading-tight text-center text-text-secondary whitespace-pre-line">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
