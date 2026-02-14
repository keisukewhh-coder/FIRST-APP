import questions from '../data/questions.json';
import types from '../data/types.json';

// 性格分析軸（内部用）
const PRIMARY_AXES = ['E_I', 'S_N', 'T_F', 'J_P'];
// 裏キャラ軸
const SPICE_AXES = ['Approval', 'Obsession', 'Emotion', 'Fickle'];
// 全軸
const ALL_AXES = [...PRIMARY_AXES, ...SPICE_AXES];

// タイプキー一覧（URL用ID変換）
const TYPE_KEYS_LIST = [
  'INTJ', 'INFJ', 'INTP', 'ISTP', 'ENTJ', 'ESTJ', 'ENTP', 'ENFP',
  'ISTJ', 'ISFJ', 'ISFP', 'INFP', 'ESTP', 'ESFP', 'ENFJ', 'ESFJ',
];

// Spice軸ごとの高スコア修飾語（maxScore >= 3）
const SPICE_MODIFIERS = {
  Approval: '加工上手の',
  Obsession: '鍵アカストーカーの',
  Emotion: '即泣き地雷原な',
  Fickle: 'べらべら',
};

// 中間スコア修飾語（maxScore 0〜2）
const NEUTRAL_MODIFIERS = ['平凡な', '量産型の'];

// 全軸マイナス修飾語（maxScore < 0）
const CALM_MODIFIERS = ['悟りを開いた', '無害な'];

// 修飾語ごとの解説テキスト（結果に自然に組み込む）
export const MODIFIER_DETAILS = {
  '加工上手の': '自分の見せ方を熟知している策士タイプ。SNSでは完璧な自分を演出し、リアルでも「いい感じの自分」を無意識にプロデュース。加工と現実の境目がもはや本人にもわからなくなっている。本音と建前の使い分けが異常にうまく、「あれ、この人いつも完璧だな」と思ったら、裏で相当な努力をしているか、相当な嘘をついているかのどちらか。',
  '鍵アカストーカーの': '気になる人のSNSは鍵アカまで徹底チェックするタイプ。相手の行動パターンを無意識に把握していて、「偶然だね！」という出会いは全部計算済み。執着心が強く、一度ロックオンしたら離さない。本人は「ちょっと気になっただけ」と言い張るが、相手の3年前の投稿まで遡っている。情報収集能力だけはCIA級。',
  '即泣き地雷原な': '感情の起伏が激しく、些細なことで涙腺崩壊するタイプ。「え、そこで泣く？」という場面で泣き、周囲を困惑させる。感情に正直すぎて自分でもコントロールできておらず、怒りも悲しみも嬉しさも全部120%で出力される。一緒にいると感情の渦に巻き込まれるが、その分リアクションは最高にわかりやすい。',
  'べらべら': '秘密を守れない口の軽さが致命的なタイプ。「ここだけの話」を最低3人に話す。悪気はまったくないが、情報の拡散力は天才的。沈黙が苦手で、場を埋めるために余計なことまで喋る。本人は「コミュ力が高い」と思っているが、周囲は「あいつには秘密を話すな」で一致団結している。',
  '平凡な': '裏表が少なく、見たままの人間。特に隠された闇はないが、逆に言えば「つかみどころがない」と思われがち。平和主義で波風を立てず、どんなグループでもそこそこうまくやれる器用さがある。',
  '量産型の': '流行に乗りやすく、周りに合わせるのが得意なタイプ。突出した個性は控えめだが、どんな場にも馴染める適応力がある。良くも悪くも「普通」が最大の武器で、敵を作らない処世術を無意識にマスターしている。',
  '悟りを開いた': '人間関係のドロドロから一歩引いた超越者タイプ。執着が少なく、達観している。周囲からは「大人だね」と言われるが、本人は単に面倒くさいだけという可能性も高い。感情に振り回されない安定感はあるが、逆に「何を考えているかわからない」と距離を置かれることも。',
  '無害な': '毒にも薬にもならない究極の安全牌タイプ。誰とも争わず、誰も傷つけない。ただし本音を隠しているだけの可能性もあり、本当の自分は誰も知らない。一見穏やかだが、水面下で何を考えているかは永遠の謎。',
};

/**
 * ボタン値(1-5)を内部スコア(+2〜-2)に変換
 * 1=+2(せやねんせやねん), 2=+1, 3=0, 4=-1, 5=-2(全然ちゃうわ)
 */
function buttonToScore(buttonValue) {
  return 3 - buttonValue;
}

/**
 * Spiceスコアから修飾語（Modifier）を決定
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
  return CALM_MODIFIERS[Math.floor(Math.random() * CALM_MODIFIERS.length)];
}

/**
 * 内部タイプキー → URL用数値ID
 */
export function typeKeyToId(key) {
  const idx = TYPE_KEYS_LIST.indexOf(key);
  return idx >= 0 ? idx : 0;
}

/**
 * URL用数値ID → 内部タイプキー
 */
export function idToTypeKey(id) {
  const n = parseInt(id, 10);
  return TYPE_KEYS_LIST[n] || TYPE_KEYS_LIST[0];
}

/**
 * 回答から全軸のスコアを計算し、タイプキーと修飾語を返す
 * @param {Object} answers - { questionId: buttonValue(1-5) }
 */
export function calculateResult(answers) {
  const scores = {};
  for (const axis of ALL_AXES) {
    scores[axis] = 0;
  }

  questions.forEach((q) => {
    const raw = answers[q.id];
    if (raw == null) return;

    const answerScore = buttonToScore(raw);

    for (const [axis, weight] of Object.entries(q.axes)) {
      if (scores[axis] !== undefined) {
        scores[axis] += answerScore * weight;
      }
    }
  });

  const ei = scores.E_I >= 0 ? 'E' : 'I';
  const sn = scores.S_N >= 0 ? 'S' : 'N';
  const tf = scores.T_F >= 0 ? 'T' : 'F';
  const jp = scores.J_P >= 0 ? 'J' : 'P';

  const typeKey = `${ei}${sn}${tf}${jp}`;
  const modifier = determineModifier({
    Approval: scores.Approval,
    Obsession: scores.Obsession,
    Emotion: scores.Emotion,
    Fickle: scores.Fickle,
  });

  const result = types[typeKey] || types['ESTJ'];

  return { typeKey, modifier, result };
}

/**
 * タイプキーからタイプ情報を取得（フォールバック付き）
 */
export function getTypeByKey(typeKey) {
  if (!typeKey) return { key: 'ESTJ', data: types['ESTJ'] };
  if (types[typeKey]) return { key: typeKey, data: types[typeKey] };
  return { key: 'ESTJ', data: types['ESTJ'] };
}

/**
 * 全問回答済みかチェック
 */
export function isAllAnswered(answers) {
  return questions.every((q) => answers[q.id] != null);
}
