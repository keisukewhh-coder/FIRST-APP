import ScaleSelector from './ScaleSelector';

export default function QuestionCard({ question, value, onChange, index, total, highlighted, cardRef, popped }) {
  return (
    <div
      ref={cardRef}
      className={`bg-card rounded-3xl p-6 shadow-sm mb-4 min-h-[200px] flex flex-col transition-all duration-500 ${
        highlighted ? 'ring-3 ring-green-500 shadow-lg shadow-green-900/30' : ''
      } ${popped ? 'answer-pop' : ''}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
          highlighted ? 'bg-green-500/20 text-green-400' : 'bg-vivid-pink/20 text-vivid-pink'
        }`}>
          {index}
        </span>
        <span className="text-xs text-text-secondary">/ {total}</span>
        {highlighted && (
          <span className="text-xs font-bold text-green-400 ml-auto">未回答</span>
        )}
      </div>
      <p className="text-base font-semibold leading-relaxed mb-6 flex-1 text-text-primary">
        {question.text}
      </p>
      <ScaleSelector value={value} onChange={onChange} />
    </div>
  );
}
