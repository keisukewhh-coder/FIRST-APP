export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="text-center text-sm text-text-secondary mb-2 font-semibold">
        {current} / {total}
      </div>
      <div className="w-full h-2 bg-coral-light/50 rounded-full overflow-hidden">
        <div
          className="progress-fill h-full rounded-full"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #FFB6C1, #FF99AA)',
          }}
        />
      </div>
    </div>
  );
}
