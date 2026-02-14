const labels = [
  'まったく当てはまらない',
  'あまり当てはまらない',
  'どちらでもない',
  'やや当てはまる',
  'とても当てはまる',
];

export default function ScaleSelector({ value, onChange }) {
  return (
    <div className="scale-selector">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          className={`scale-btn ${value === n ? 'active' : ''}`}
          onClick={() => onChange(n)}
          aria-label={labels[n - 1]}
        >
          <span className="scale-number">{n}</span>
          <span className="scale-label">{labels[n - 1]}</span>
        </button>
      ))}
    </div>
  );
}
