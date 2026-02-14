import questions from '../data/questions.json';
import types from '../data/types.json';

// MBTI axes
const MBTI_AXES = ['E_I', 'S_N', 'T_F', 'J_P'];
// Spice axes
const SPICE_AXES = ['Approval', 'Obsession', 'Emotion', 'Fickle'];
// All axes
const ALL_AXES = [...MBTI_AXES, ...SPICE_AXES];

// Spice軸ごとの高スコア修飾語（maxScore >= 3）
const SPICE_MODIFIERS = {
  Approval: '自撮り加工済みの',
  Obsession: 'カギアカ監視中の',
  Emotion: '即泣き地雷原な',
  Fickle: '沈黙が耐えられない',
};

// 中間スコア修飾語（maxScore 0〜2）
const NEUTRAL_MODIFIERS = ['平凡な', '量産型の'];

// 全軸マイナス修飾語（maxScore < 0）
const CALM_MODIFIERS = ['悟りを開いた', '無害な'];

/**
 * ボタン値(1-5)を内部スコア(+2〜-2)に変換
 * 1=+2(せやねんせやねん), 2=+1, 3=0, 4=-1, 5=-2(全然ちゃうわ)
 */
function buttonToScore(buttonValue) {
  return 3 - buttonValue; // 1→+2, 2→+1, 3→0, 4→-1, 5→-2
}

/**
 * Spiceスコアから修飾語（Modifier）を決定
 * @param {Object} spiceScores - { Approval, Obsession, Emotion, Fickle }
 * @returns {string} 修飾語
 */
function determineModifier(spiceScores) {
  let maxAxis = SPICE_AXES[0];
  let maxScore = spiceScores[maxAxis];

  for (const axis of SPICE_AXES) {
    if (spiceScores[axis] > maxScore) {
      maxScore = spiceScores[axis];
      maxAxis = axis;
    }
  }

  if (maxScore >= 3) {
    return SPICE_MODIFIERS[maxAxis];
  }
  if (maxScore >= 0) {
    return NEUTRAL_MODIFIERS[Math.floor(Math.random() * NEUTRAL_MODIFIERS.length)];
  }
  // 全軸マイナス
  return CALM_MODIFIERS[Math.floor(Math.random() * CALM_MODIFIERS.length)];
}

/**
 * 回答から全8軸のスコアを計算し、MBTIタイプキーと修飾語を返す
 * @param {Object} answers - { questionId: buttonValue(1-5) }
 * @returns {{ mbtiScores, spiceScores, typeKey, modifier, result }}
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
  // E_I: プラス→E, マイナス→I（0はデフォルトE）
  // S_N: プラス→S, マイナス→N（0はデフォルトS）
  // T_F: プラス→T, マイナス→F（0はデフォルトT）
  // J_P: プラス→J, マイナス→P（0はデフォルトJ）
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

  // 修飾語を決定
  const modifier = determineModifier(spiceScores);

  // タイプデータ取得（フォールバック: 必ず結果を返す）
  const result = types[typeKey] || types['ESTJ'];

  return { mbtiScores, spiceScores, typeKey, modifier, result };
}

/**
 * typeKeyからタイプ情報を取得（フォールバック付き: 絶対にnullを返さない）
 */
export function getTypeByKey(typeKey) {
  if (!typeKey) return { key: 'ESTJ', data: types['ESTJ'] };
  if (types[typeKey]) return { key: typeKey, data: types[typeKey] };
  // フォールバック: 万が一不正なキーでもデフォルト結果を返す
  return { key: 'ESTJ', data: types['ESTJ'] };
}

/**
 * 全問回答済みかチェック
 */
export function isAllAnswered(answers) {
  return questions.every((q) => answers[q.id] != null);
}
