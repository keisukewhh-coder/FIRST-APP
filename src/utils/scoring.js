import questions from '../data/questions.json';
import types from '../data/types.json';

/**
 * 回答配列からスコアを計算し、タイプキーと結果を返す
 * @param {Object} answers - { questionId: value(1-5) }
 * @returns {{ scores: Object, typeKey: string, result: Object }}
 */
export function calculateResult(answers) {
  const scores = {
    freedom: 0,
    intuition: 0,
    connection: 0,
  };

  questions.forEach((q) => {
    const raw = answers[q.id];
    if (raw == null) return;

    // 中央3を基準に -2〜+2 に正規化
    const normalized = raw - 3;

    // direction=left → そのまま加算（左寄り=+）
    // direction=right → 符号反転して加算（右寄りの質問は反転）
    const value = q.direction === 'left' ? normalized : -normalized;

    scores[q.axis] += value;
  });

  // 0以上なら「+」(左)、0未満なら「-」(右)
  const fSign = scores.freedom >= 0 ? '+' : '-';
  const iSign = scores.intuition >= 0 ? '+' : '-';
  const cSign = scores.connection >= 0 ? '+' : '-';

  const typeKey = `F${fSign}I${iSign}C${cSign}`;
  const result = types[typeKey] || null;

  return { scores, typeKey, result };
}

/**
 * typeKeyからタイプ情報を取得
 * @param {string} typeKey
 * @returns {Object|null}
 */
export function getTypeByKey(typeKey) {
  return types[typeKey] || null;
}

/**
 * 全問回答済みかチェック
 * @param {Object} answers
 * @returns {boolean}
 */
export function isAllAnswered(answers) {
  return questions.every((q) => answers[q.id] != null);
}
