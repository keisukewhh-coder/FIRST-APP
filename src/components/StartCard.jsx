import { useState, useEffect } from 'react';

/** タイピング風テキスト表示 */
function TypingText({ text, delayMs = 0, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delayMs);
    return () => clearTimeout(startTimer);
  }, [delayMs]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="typing-cursor" />
      )}
    </span>
  );
}

/** ランダム実績バッジ */
const FAKE_STATS = [
  '今日だけで 2,847人 の裏の顔が暴かれました',
  '直近1時間で 1,312人 が丸裸にされました',
  '累計 128万人 が診断済み — 今も増殖中',
  '今この瞬間も 189人 が誰かを暴き中…',
  'X（旧Twitter）で #あの人の裏の顔診断 が拡散中',
];

export default function StartCard({ onStart }) {
  const [targetName, setTargetName] = useState('');
  const [fakeStat] = useState(() => FAKE_STATS[Math.floor(Math.random() * FAKE_STATS.length)]);

  const handleStart = () => {
    onStart(targetName.trim());
  };

  return (
    <div className="text-center pt-6 pb-4">
      {/* 挑発的なアイコン（浮遊アニメーション付き） */}
      <div className="mb-5">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-vivid-pink/15 border-2 border-vivid-pink/30 hero-glow">
          <span className="text-6xl float-bob">👿</span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2 leading-tight">
        あの人の裏の顔、<br />
        <span className="text-vivid-pink result-title-glow">バレたら終わりやで？</span>
      </h1>
      <p className="text-xs text-vivid-pink font-bold mb-1 tracking-wider">
        <TypingText text="― 暴いて・晒して・送りつける診断 ―" delayMs={400} speed={80} />
      </p>

      {/* ライブ感のある統計バッジ */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-text-secondary/60 bg-card/50 px-3 py-1 rounded-full border border-coral/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {fakeStat}
        </span>
      </div>

      <div className="bg-card rounded-2xl p-4 mb-5 border border-vivid-pink/20 text-left card-shine">
        <p className="text-sm text-text-primary leading-relaxed">
          あの人が<span className="text-vivid-pink font-extrabold">必死に隠してる黒い本性</span>、<br />
          ヤバいクセ、恋愛の地雷ポイント…<br />
          全部、<span className="text-vivid-pink font-extrabold">たった45問で丸裸</span>にしたるわ。<br /><br />
          本人の許可？<span className="text-vivid-pink font-bold">んなもん要らん。</span><br />
          診断結果は<span className="text-vivid-pink font-extrabold">LINEで本人に<br />
          叩きつけたれ。</span><br />
          <span className="text-xs text-text-secondary">（バレたらやばい度 ★★★★★）</span>
        </p>
      </div>

      {/* 相手の名前入力 */}
      <div className="bg-card rounded-2xl p-5 mb-5 border border-vivid-pink/20 text-left">
        <label className="block text-sm font-bold text-text-primary mb-1">
          暴きたいあの人の名前
        </label>
        <p className="text-xs text-text-secondary mb-3">
          ニックネームでもOK。入れると結果がもっとオモロくなるで
        </p>
        <input
          type="text"
          className="w-full px-4 py-3 rounded-full bg-sakura border border-coral/30 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-vivid-pink/50 transition-colors text-center"
          placeholder="例: たかし、推しの名前、元カレ…"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
          maxLength={20}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        />
      </div>

      {/* 診断でわかること */}
      <div className="bg-card rounded-2xl p-4 mb-5 border border-vivid-pink/20 text-left">
        <p className="text-xs font-bold text-vivid-pink mb-3">この診断でバレること</p>
        <div className="space-y-2">
          {[
            { emoji: '😇', label: '表の顔', desc: 'みんなに見せてる仮面' },
            { emoji: '👿', label: '裏の顔', desc: '本人が必死に隠してる黒い本性' },
            { emoji: '📖', label: 'トリセツ', desc: '攻略法と絶対やったらあかんNG行動' },
            { emoji: '💕', label: '恋愛傾向', desc: '付き合ったらどうなるか丸わかり' },
            { emoji: '💘', label: 'キラーフレーズ', desc: '一発で落ちる殺し文句' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg shrink-0">{item.emoji}</span>
              <div>
                <span className="text-xs font-bold text-text-primary">{item.label}</span>
                <span className="text-xs text-text-secondary ml-1.5">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-5">
        <div className="flex flex-col items-center gap-1 bg-card/50 rounded-xl px-4 py-2 border border-coral/15">
          <span className="text-xs text-text-secondary">所要時間</span>
          <span className="text-base font-bold text-vivid-pink">約5分</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-card/50 rounded-xl px-4 py-2 border border-coral/15">
          <span className="text-xs text-text-secondary">質問数</span>
          <span className="text-base font-bold text-vivid-pink">45問</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-card/50 rounded-xl px-4 py-2 border border-coral/15">
          <span className="text-xs text-text-secondary">結果</span>
          <span className="text-base font-bold text-vivid-pink">192通り</span>
        </div>
      </div>

      <div className="bg-vivid-pink/10 rounded-2xl p-4 mb-5 border border-vivid-pink/15">
        <p className="text-sm text-text-primary leading-relaxed">
          あいつの行動を思い出しながら<br />
          45問答えるだけで<span className="text-vivid-pink font-bold">裏の顔が丸見え</span>。<br />
          <span className="text-vivid-pink font-extrabold">バレへんうちにこっそりやったれ。</span>
        </p>
      </div>

      <button
        className="pulse-gentle w-full max-w-xs mx-auto py-4 px-8 rounded-full bg-vivid-pink text-white font-extrabold text-lg border-0 cursor-pointer shadow-lg hover:bg-coral-dark transition-colors"
        onClick={handleStart}
      >
        {targetName.trim() ? `${targetName.trim()}の裏の顔を暴く` : '裏の顔を暴く'}
      </button>

      <p className="mt-3 text-xs text-text-secondary/50">
        ※ 悪趣味エンタメです。本気にしないでね。
      </p>
      <p className="mt-2 text-xs">
        <span className="text-vivid-pink font-semibold">#あの人の裏の顔診断</span>
      </p>
    </div>
  );
}
