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
  '加工上手の': '🎭 自分の見せ方を熟知している策士タイプやねん。SNSでは完璧な自分を演出し、リアルでも「いい感じの自分」を無意識にプロデュース。加工と現実の境目がもはや本人にもわからんくなっとる。本音と建前の使い分けが異常にうまく、「あれ、この人いつも完璧やな」と思ったら、裏で相当な努力をしてるか、相当な嘘ついてるかのどっちかやで。知らんけど。\n\n📸 たとえばな、カフェ行っても飲む前にまず15分撮影会やねん。「自然光が〜」とか言うて席3回変えるし、ラテアートが崩れたら新しいの頼むし、もう何しに来たんかわからへん。プリクラの盛りは序の口、今や動画も画像も「ちょい調整」いう名の大工事や。友達との写真で自分だけ加工して「なんか私だけ顔ちっさない？」とか言い出すのもこのタイプ。本人のインスタと免許証見比べたら「誰？」ってなるやつやねん。',

  '鍵アカストーカーの': '🔍 気になる人のSNSは鍵アカまで徹底チェックする執念のタイプやねん。相手の行動パターンを無意識に把握しとって、「偶然だね！」っていう出会いは全部計算済みや。執着心が強くて、一度ロックオンしたら絶対離さへん。本人は「ちょっと気になっただけ」って言い張るけど、相手の3年前の投稿まで遡っとるからな。情報収集能力だけはCIA級やで。\n\n🕵️ あのな、このタイプの恐ろしさ舐めたらあかんで。好きな人ができたらまずフルネーム検索、次にインスタ・X・Facebook・TikTok全部特定。鍵アカは共通の友達経由で突破するし、相手のフォロー・フォロワーリストまで完全に把握しとんねん。「この子誰？最近いいね多いな」とか、もう探偵事務所開けるレベルや。相手が行ったレストランの場所を投稿の背景から特定して、翌週さりげなく「ここ気になってたんよね〜」って行くのも朝飯前。相手の元カレ・元カノの現在の交際状況まで調べ上げとるけど、本人は「なんとなく知ってた」で通すねん。知らんけど。',

  '即泣き地雷原な': '💣 感情の起伏が激しくて、些細なことで涙腺崩壊するタイプやねん。「え、そこで泣く？」っていう場面で泣いて、周囲を困惑させまくる。感情に正直すぎて自分でもコントロールできてへんくて、怒りも悲しみも嬉しさも全部120%で出力されんねん。一緒におると感情の渦に巻き込まれるけど、その分リアクションは最高にわかりやすいで。\n\n😭 具体的に言うたらな、LINEの返信が「。」で終わっただけで「怒ってる…？」って泣くし、レストランで注文間違えられても泣くし、犬の動画見ても泣くし、もうほんまに涙腺どうなっとんねん。飲み会では3杯目あたりから感情のダムが決壊して、「私のこと本当に友達と思ってる…？」って号泣タイム突入や。感動系のCM見ただけで鼻すすりだすし、卒業ソング聴いたら卒業関係なくても泣くし、天気予報の「明日は雨です」にすら「なんか切ない…」って目がウルウルするタイプやねん。周りは「またか…」って思いつつも、あの号泣を無視できへんから結局みんな振り回されとる。地雷の場所が毎日変わるから、もう歩くだけで爆発する感じやで。知らんけど。',

  'べらべら': '🗣️ 秘密を守れない口の軽さが致命的なタイプやねん。「ここだけの話やけど」を最低3人に話す。悪気はまったくないんやけど、情報の拡散力は天才的や。沈黙が苦手で、場を埋めるために余計なことまで喋る。本人は「コミュ力が高い」って思ってるけど、周囲は「あいつには秘密話すな」で一致団結しとるねん。\n\n🎤 もうな、このタイプと秘密を共有した時点で「公開情報」になったと思った方がええで。「絶対言わんといてな」って前置きした話が、翌日にはグループLINEで「みんなもう知ってると思うけど〜」って展開されてるから恐ろしいわ。飲み会では独壇場で、他人の恋愛事情を実況中継みたいに喋り散らかす。「あ、これ言うたらあかんやつやった」って気づく頃には全部喋り終わっとるし、「ごめん！でも面白いからつい〜」で済ますメンタルの強さよ。会議中でも関係ない話を挟んでくるし、電車の中で電話する声もデカい。静かにしろって言うても5分が限界で、すぐ「そういえばさ〜」って始まるねん。知らんけど。',

  '平凡な': '🌿 裏表が少なくて、見たままの人間やねん。特に隠された闇はないんやけど、逆に言えば「つかみどころがない」って思われがちやな。平和主義で波風立てへんし、どんなグループでもそこそこうまくやれる器用さがある。\n\n🏠 ぶっちゃけな、このタイプが一番レアかもしれへんで。だってSNS全盛期のこの時代に「普通でおれる」って実は相当すごいことやねん。周りがキラキラ投稿したり病みツイートしたりしてる中で、揺るがへんこの安定感。休日は家でNetflix観て、たまに友達とご飯行って、特に事件も起きず平和に過ごすタイプ。「最近なんかあった？」って聞いても「特にないなあ」で終わるから、ドラマチック好きの人からしたら物足りへんかもしれん。でもな、こういう人が一人おるだけでグループの空気がめちゃくちゃ安定するねん。嵐の中の灯台みたいなもんや。知らんけど。',

  '量産型の': '🏭 流行に乗りやすくて、周りに合わせるのが得意なタイプやねん。突出した個性は控えめやけど、どんな場にも馴染める適応力がある。良くも悪くも「普通」が最大の武器で、敵を作らへん処世術を無意識にマスターしとる。\n\n👯 このタイプの特徴はな、トレンドを追いかけるスピードが異常やねん。流行りのカフェは初週で行くし、バズったコスメは即購入、TikTokで話題のダンスも3日で習得する。友達グループ内では「あ、それ私も気になってた！」が口癖で、基本的に周りの好きなものに合わせていくスタイル。服のセンスもみんなと似てるから、集合写真撮ったら同じブランドのバッグが3つ並ぶとか日常茶飯事や。本人は「自分の好みで選んでる」って主張するけど、その「好み」がインフルエンサーの推し商品そのまんまやからバレバレやねん。でもな、この「空気を読んで合わせる能力」は社会生活においては最強のスキルやで。知らんけど。',

  '悟りを開いた': '🧘 人間関係のドロドロから一歩引いた超越者タイプやねん。執着が少なくて、達観しとる。周囲からは「大人やね」って言われるけど、本人は単にめんどくさいだけっていう可能性も高いで。感情に振り回されへん安定感はあるけど、逆に「何考えてるかわからん」って距離置かれることもあるねん。\n\n🏔️ このタイプはな、飲み会で周りが恋愛トークで盛り上がってても「へえ〜」で終わらせるし、職場の人間関係のゴタゴタも「まあそのうち収まるやろ」って達観しとる。誕生日忘れられても怒らへんし、LINEグループの会話に3日くらい参加せんでも平気やねん。友達が「あの子ムカつく！」って愚痴ってきても「そっかあ」「まあ人それぞれやしなあ」って返すから、愚痴りたい側からしたら「もうちょっと共感してくれん！？」ってなる。でもな、この人が本気で怒った時はマジでヤバいで。年に1回あるかないかやけど、その時の迫力は凄まじい。普段穏やかな分、ギャップで周囲が凍りつくねん。知らんけど。',

  '無害な': '🐑 毒にも薬にもならへん究極の安全牌タイプやねん。誰とも争わず、誰も傷つけへん。ただし本音を隠してるだけの可能性もあって、本当の自分は誰も知らんねん。一見穏やかやけど、水面下で何考えてるかは永遠の謎やで。\n\n🎭 このタイプの恐ろしさはな、「無害」の仮面の下に何があるか誰にもわからへんところやねん。会議では全員の意見に「いいと思います」って頷くし、ランチの場所も「どこでもいいよ」やし、友達の相談には「大変やったね」って寄り添うけど、自分の意見は絶対言わへん。「怒ったことある？」って聞いたら「うーん、あんまりないかな」って答えるけど、本当に怒らへんのか、怒りを完璧に隠してるのか、誰にもわからん。20年来の親友ですら「あいつの本音聞いたことない」って言うレベルやで。ある日突然キレたら、溜め込んだ分えげつない爆発力になるから、実は一番怖いのこのタイプかもしれへん。知らんけど。',
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

  if (maxScore >= 4) {
    return SPICE_MODIFIERS[maxAxis];
  }

  // 決定的に選択：全Spiceスコアの合計の絶対値を使う（同じ回答 → 同じ結果を保証）
  const totalSpice = Math.abs(SPICE_AXES.reduce((sum, axis) => sum + spiceScores[axis], 0));

  if (maxScore >= 0) {
    return NEUTRAL_MODIFIERS[totalSpice % NEUTRAL_MODIFIERS.length];
  }
  return CALM_MODIFIERS[totalSpice % CALM_MODIFIERS.length];
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
