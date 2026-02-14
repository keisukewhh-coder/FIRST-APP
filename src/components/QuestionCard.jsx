import ScaleSelector from './ScaleSelector';

export default function QuestionCard({ question, value, onChange }) {
  return (
    <div className="question-card">
      <p className="question-number">Q{question.id}</p>
      <p className="question-text">{question.text}</p>
      <ScaleSelector value={value} onChange={onChange} />
    </div>
  );
}
