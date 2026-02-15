export default function StartCard({ onStart }) {
  return (
    <div className="text-center pt-6 pb-4">
      {/* 挑発的なアイコン */}
      <div className="mb-5">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-vivid-pink/15 border-2 border-vivid-pink/30">
          <span className="text-5xl">👿</span>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-text-primary mb-2 leading-tight">
        あいつの裏の顔、<br />
        <span className="text-vivid-pink">暴いたろか？</span>
      </h1>
      <p className="text-xs text-vivid-pink font-bold mb-4 tracking-wider">― 勝手に丸裸エディション ―</p>

      <div className="bg-card rounded-2xl p-4 mb-5 border border-vivid-pink/20 text-left">
        <p className="text-sm text-text-primary leading-relaxed">
          あの人が<span className="text-vivid-pink font-extrabold">必死に隠してる</span>
          ダメなとこ、ヤバいクセ、黒い本性…<br /><br />
          本人の許可？<span className="text-vivid-pink font-bold">んなもん要らん。</span><br />
          <span className="text-vivid-pink font-extrabold">勝手に丸裸にして動物に例えて<br />
          本人に送りつけたれ。</span>
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-5">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">所要時間</span>
          <span className="text-base font-bold text-vivid-pink">約3分</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">質問数</span>
          <span className="text-base font-bold text-vivid-pink">30問</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-text-secondary">結果</span>
          <span className="text-base font-bold text-vivid-pink">128通り</span>
        </div>
      </div>

      <div className="bg-vivid-pink/10 rounded-2xl p-4 mb-5 border border-vivid-pink/15">
        <p className="text-sm text-text-primary leading-relaxed">
          あいつの行動を思い出しながら<br />
          30問答えるだけで<span className="text-vivid-pink font-bold">裏の顔が丸見え</span>。<br />
          <span className="text-vivid-pink font-extrabold">バレへんうちにこっそりやったれ。</span>
        </p>
      </div>

      <button
        className="pulse-gentle w-full max-w-xs mx-auto py-4 px-8 rounded-full bg-vivid-pink text-white font-extrabold text-lg border-0 cursor-pointer shadow-lg hover:bg-coral-dark transition-colors"
        onClick={onStart}
      >
        裏の顔を暴く
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
