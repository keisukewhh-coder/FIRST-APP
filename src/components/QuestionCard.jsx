import ScaleSelector from './ScaleSelector';

export default function QuestionCard({ question, value, onChange, index, total }) {
  return (
    <div className="animate-slide-in bg-white rounded-3xl p-6 shadow-sm mb-5 min-h-[220px] flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-coral/20 text-coral-dark text-sm font-bold">
          {index}
        </span>
        <span className="text-xs text-text-secondary">/ {total}</span>
      </div>
      <p className="text-base font-semibold leading-relaxed mb-6 flex-1 text-text-primary">
        {question.text}
      </p>
      <ScaleSelector value={value} onChange={onChange} />
    </div>
  );
}
