import questions from '../data/questions.json';
import types from '../data/types.json';

/**
 * 回答配列からスコアを計算し、タイプキーと結果を返す
 * @param {Object} answers - { questionId: value(1-5) }
 * @param {string} ageGroup - "teens" or "twenties"
 * @returns {{ scores: Object, typeKey: string, result: Object }}
 */
export function calculateResult(answers, ageGroup) {
  const scores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  const positiveDirection = {
    EI: 'E',
    SN: 'S',
    TF: 'T',
    JP: 'J',
  };

  questions.forEach((q) => {
    const raw = answers[q.id];
    if (raw == null) return;

    // 中央3を基準に -2〜+2 に正規化
    const normalized = raw - 3;

    // direction が軸の正方向（E, S, T, J）と一致 → そのまま加算
    // direction が軸の負方向（I, N, F, P）→ 符号反転して加算
    const value = q.direction === positiveDirection[q.axis] ? normalized : -normalized;

    scores[q.axis] += value;
  });

  // スコアから4文字のタイプキーを生成
  const ei = scores.EI >= 0 ? 'E' : 'I';
  const sn = scores.SN >= 0 ? 'S' : 'N';
  const tf = scores.TF >= 0 ? 'T' : 'F';
  const jp = scores.JP >= 0 ? 'J' : 'P';

  const typeKey = `${ei}${sn}${tf}${jp}`;
  const result = types[typeKey] || null;

  return { scores, typeKey, result, ageGroup };
}

/**
 * typeKeyからタイプ情報を取得
 * @param {string} typeKey
 * @returns {{ key: string, data: Object } | null}
 */
export function getTypeByKey(typeKey) {
  if (!typeKey) return null;
  if (types[typeKey]) return { key: typeKey, data: types[typeKey] };
  return null;
}

/**
 * 全問回答済みかチェック
 * @param {Object} answers
 * @returns {boolean}
 */
export function isAllAnswered(answers) {
  return questions.every((q) => answers[q.id] != null);
}
