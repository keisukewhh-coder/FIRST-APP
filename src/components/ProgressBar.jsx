import { useState, useEffect, useRef } from 'react';

const milestones = [25, 50, 75, 100];

export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [particles, setParticles] = useState([]);
  const prevPercent = useRef(0);
  const particleId = useRef(0);

  // Animate percentage text on change
  useEffect(() => {
    if (percentage !== prevPercent.current) {
      setIsPulsing(true);
      const pulseTimer = setTimeout(() => setIsPulsing(false), 300);

      // Spawn a particle on the progress bar edge
      if (percentage > prevPercent.current && percentage > 0) {
        const newParticleId = ++particleId.current;
        setParticles((prev) => [...prev, { id: newParticleId, y: Math.random() * 100 }]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticleId));
        }, 800);
      }

      prevPercent.current = percentage;

      // Smooth number count-up
      const diff = percentage - displayPercent;
      const steps = Math.abs(diff);
      if (steps === 0) return () => clearTimeout(pulseTimer);

      let step = 0;
      const interval = setInterval(() => {
        step++;
        setDisplayPercent((prev) => prev + Math.sign(diff));
        if (step >= steps) clearInterval(interval);
      }, 20);

      return () => {
        clearTimeout(pulseTimer);
        clearInterval(interval);
      };
    }
  }, [percentage]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-sm text-text-secondary font-semibold">
          {current} / {total}
        </span>
        <span className={`text-sm font-bold text-vivid-pink transition-all ${isPulsing ? 'percent-pulse' : ''}`}>
          {displayPercent}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-coral-light/50 rounded-full overflow-hidden relative">
        {/* Milestone markers */}
        {milestones.map((ms) => (
          <div
            key={ms}
            className={`progress-milestone ${percentage >= ms ? 'passed' : ''}`}
            style={{ left: `${ms}%` }}
          />
        ))}

        {/* Progress fill with enhanced gradient */}
        <div
          className="progress-fill-enhanced h-full rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          {/* Particle trail */}
          {particles.map((p) => (
            <span
              key={p.id}
              className="progress-particle"
              style={{ top: `${p.y}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
