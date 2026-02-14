import questions from '../data/questions.json';
import types from '../data/types.json';

// MBTI axes
const MBTI_AXES = ['E_I', 'S_N', 'T_F', 'J_P'];
// Spice axes
const SPICE_AXES = ['Approval', 'Obsession', 'Emotion', 'Fickle'];
// All axes
const ALL_AXES = [...MBTI_AXES, ...SPICE_AXES];

/**
 * ボタン値(1-5)を内部スコア(+2〜-2)に変換
 * 1=+2(せやねんせやねん), 2=+1, 3=0, 4=-1, 5=-2(全然ちゃうわ)
 */
function buttonToScore(buttonValue) {
  return 3 - buttonValue; // 1→+2, 2→+1, 3→0, 4→-1, 5→-2
}

/**
 * 回答から全8軸のスコアを計算し、MBTIタイプキーと結果を返す
 * @param {Object} answers - { questionId: buttonValue(1-5) }
 * @returns {{ mbtiScores, spiceScores, typeKey, result }}
 */
export function calculateResult(answers) {
  // 初期化: 全軸0
  const scores = {};
  for (const axis of ALL_AXES) {
    scores[axis] = 0;
  }

  // 各質問の回答を集計
  questions.forEach((q) => {
    const raw = answers[q.id];
    if (raw == null) return;

    const answerScore = buttonToScore(raw);

    // axes内の各軸に weight * answerScore を加算
    for (const [axis, weight] of Object.entries(q.axes)) {
      if (scores[axis] !== undefined) {
        scores[axis] += answerScore * weight;
      }
    }
  });

  // MBTI 4文字のタイプキーを生成
  // E_I: プラス→E, マイナス→I
  // S_N: プラス→S, マイナス→N
  // T_F: プラス→T, マイナス→F
  // J_P: プラス→J, マイナス→P
  const ei = scores.E_I >= 0 ? 'E' : 'I';
  const sn = scores.S_N >= 0 ? 'S' : 'N';
  const tf = scores.T_F >= 0 ? 'T' : 'F';
  const jp = scores.J_P >= 0 ? 'J' : 'P';

  const typeKey = `${ei}${sn}${tf}${jp}`;

  // MBTI / Spice を分離して返す
  const mbtiScores = {
    E_I: scores.E_I,
    S_N: scores.S_N,
    T_F: scores.T_F,
    J_P: scores.J_P,
  };
  const spiceScores = {
    Approval: scores.Approval,
    Obsession: scores.Obsession,
    Emotion: scores.Emotion,
    Fickle: scores.Fickle,
  };

  const result = types[typeKey] || null;

  return { mbtiScores, spiceScores, typeKey, result };
}

/**
 * typeKeyからタイプ情報を取得
 */
export function getTypeByKey(typeKey) {
  if (!typeKey) return null;
  if (types[typeKey]) return { key: typeKey, data: types[typeKey] };
  return null;
}

/**
 * 全問回答済みかチェック
 */
export function isAllAnswered(answers) {
  return questions.every((q) => answers[q.id] != null);
}
