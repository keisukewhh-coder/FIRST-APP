import { useState, useMemo } from 'react';

// あるあるアイテムデータベース（各軸の特徴から3つずつ）
const ARUARU_ITEMS = {
  // E vs I
  E: [
    '飲み会では常にセンターポジション',
    '沈黙が3秒続くと不安になる',
    '「とりあえず集合」が口癖',
  ],
  I: [
    '休日の予定は「何もしない」がベスト',
    'LINEの返信は3日後がデフォルト',
    '大人数の飲み会は3次会より先にフェードアウト',
  ],
  // N vs S
  N: [
    '妄想だけで小説一本書けるレベル',
    '「もしも〇〇だったら」が止まらない',
    '現実より脳内世界のほうが充実してる',
  ],
  S: [
    'レシピは分量きっちり守る派',
    '「で、結局どうすればいい？」が口癖',
    '理想論より現実的な話が好き',
  ],
  // T vs F
  T: [
    '「それ、論理的におかしくない？」が口癖',
    '感動映画より考察系YouTubeが好き',
    '相談されても解決策しか出てこない',
  ],
  F: [
    '他人の話を聞いてなぜか自分が泣く',
    '空気を読みすぎて自分の意見が行方不明',
    '「みんな仲良く」に命かけてる',
  ],
  // J vs P
  J: [
    '旅行の予定は3ヶ月前から分刻み',
    '散らかった机を見ると落ち着かない',
    'やることリストが生きがい',
  ],
  P: [
    '締め切り前日が本気モード',
    '「まぁなんとかなるやろ」精神の権化',
    '計画は立てるけど守ったことがない',
  ],
};

/**
 * typeKeyの4文字から5つのあるあるアイテムを選出する
 * - 各文字から1つずつ（計4つ）
 * - 1文字目（最も支配的な軸）からもう1つ追加（計5つ）
 */
function selectItems(typeKey) {
  if (!typeKey || typeKey.length !== 4) return [];

  const letters = typeKey.split('');
  const items = [];

  // 各軸から1つ目を取得
  letters.forEach((letter) => {
    const pool = ARUARU_ITEMS[letter];
    if (pool) {
      items.push(pool[0]);
    }
  });

  // 1文字目（支配的な軸）から2つ目を追加してボーナス枠
  const dominantPool = ARUARU_ITEMS[letters[0]];
  if (dominantPool && dominantPool.length > 1) {
    items.push(dominantPool[1]);
  }

  return items.slice(0, 5);
}

/** チェック数に応じたリアクションメッセージ */
function getReactionMessage(count, total, nameLabel) {
  if (count === 0) return 'まだ何もチェックしてへんやん';
  if (count === 1) return 'ほーん、まだ序の口やな';
  if (count === 2) return 'ちょっとずつバレてきたな…';
  if (count === 3) return 'あかん、結構当たっとるやん';
  if (count === 4) return `ほぼ${nameLabel}やん…怖っ`;
  return `完全に${nameLabel}やん！逃げられへんで`;
}

export default function AruAruChecklist({ typeKey, targetName }) {
  const items = useMemo(() => selectItems(typeKey), [typeKey]);
  const [checked, setChecked] = useState({});

  const nameLabel = targetName || 'あの人';
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const isPerfectMatch = checkedCount >= 4;

  const toggleCheck = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (items.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl shadow-lg overflow-hidden border border-vivid-pink/20">
      {/* ヘッダー */}
      <div className="bg-coral/25 px-5 py-4 flex items-center gap-3">
        <span className="text-2xl">🔍</span>
        <h3 className="text-xl font-bold text-text-primary">
          {nameLabel}あるあるチェック
        </h3>
        <span className="text-xs text-text-secondary ml-auto">心当たり、あるやろ？</span>
      </div>

      {/* チェックリスト */}
      <div className="px-5 py-5 space-y-3">
        {items.map((item, index) => {
          const isChecked = !!checked[index];
          return (
            <button
              key={index}
              onClick={() => toggleCheck(index)}
              className="w-full text-left group"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.4s ease-out ${0.15 + index * 0.1}s forwards`,
              }}
            >
              <div
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3.5
                  transition-all duration-300 cursor-pointer
                  ${isChecked
                    ? 'bg-vivid-pink/15 border border-vivid-pink/40 shadow-[0_0_15px_rgba(204,17,51,0.15)]'
                    : 'bg-coral/10 border border-transparent hover:border-vivid-pink/20 hover:bg-coral/20'
                  }
                `}
              >
                {/* カスタムチェックボックス（丸型） */}
                <div
                  className={`
                    w-7 h-7 rounded-full shrink-0 flex items-center justify-center
                    transition-all duration-300
                    ${isChecked
                      ? 'bg-vivid-pink shadow-[0_0_10px_rgba(204,17,51,0.4)] scale-110'
                      : 'bg-coral/30 border-2 border-vivid-pink/30 group-hover:border-vivid-pink/50'
                    }
                  `}
                >
                  {isChecked && (
                    <svg
                      className="w-4 h-4 text-text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* テキスト */}
                <span
                  className={`
                    text-sm font-medium leading-relaxed transition-colors duration-300
                    ${isChecked ? 'text-vivid-pink font-bold' : 'text-text-primary'}
                  `}
                >
                  {item}
                </span>

                {/* チェック時のリアクション */}
                {isChecked && (
                  <span className="ml-auto text-xs text-vivid-pink/70 shrink-0 font-bold">
                    ビンゴ
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* カウンター＆リアクション */}
      <div className="px-5 pb-5">
        <div
          className={`
            rounded-xl px-4 py-4 text-center transition-all duration-500
            ${isPerfectMatch
              ? 'bg-vivid-pink/20 border-2 border-vivid-pink/50 shadow-[0_0_25px_rgba(204,17,51,0.25)]'
              : 'bg-coral/15 border border-vivid-pink/15'
            }
          `}
        >
          {/* カウント表示 */}
          <p className="text-sm font-bold text-text-primary mb-1">
            <span className="text-vivid-pink text-xl">{checkedCount}</span>
            <span className="text-text-secondary">つ中</span>
            <span className="text-vivid-pink text-xl">{items.length}</span>
            <span className="text-text-secondary">つ当てはまった！</span>
          </p>

          {/* リアクションメッセージ */}
          <p
            className={`
              text-xs font-bold transition-all duration-300
              ${isPerfectMatch ? 'text-vivid-pink' : 'text-text-secondary'}
            `}
          >
            {getReactionMessage(checkedCount, items.length, nameLabel)}
          </p>

          {/* 完全一致の演出 */}
          {isPerfectMatch && (
            <div
              className="mt-3 pt-3 border-t border-vivid-pink/30"
              style={{
                opacity: 0,
                animation: 'fadeInUp 0.5s ease-out 0.2s forwards',
              }}
            >
              <p className="text-lg font-extrabold text-vivid-pink result-title-glow tracking-wider">
                {checkedCount === items.length ? '完全一致！' : 'ほぼ完全一致！'}
              </p>
              <p className="text-xs text-vivid-pink/70 font-bold mt-1">
                やっぱりそうやんな…知ってたわ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
