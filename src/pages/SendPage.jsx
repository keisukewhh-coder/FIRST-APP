import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { idToTypeKey, getTypeByKey, MODIFIER_DETAILS } from '../utils/scoring';
import sendMessagesData from '../data/sendMessages.json';
import ObachanBubble from '../components/ObachanBubble';

/**
 * 送信設定ページ
 * URL: /send?t={typeId}&m={modifier}
 * 結果画面から「この結果を送りつける」ボタンを押した後に遷移する送信設定画面
 */
export default function SendPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawTypeId = searchParams.get('t');
  const rawModifier = searchParams.get('m');

  // --- バリデーション ---
  if (rawTypeId == null) {
    return <Navigate to="/" replace />;
  }

  const typeId = parseInt(rawTypeId, 10);
  if (isNaN(typeId) || typeId < 0 || typeId > 15) {
    return <Navigate to="/" replace />;
  }

  const validModifiers = Object.keys(MODIFIER_DETAILS);
  const modifier = rawModifier && validModifiers.includes(rawModifier)
    ? rawModifier
    : null;

  if (!modifier) {
    return <Navigate to="/" replace />;
  }

  // --- タイプ情報の取得 ---
  const typeKey = idToTypeKey(typeId);
  const found = getTypeByKey(typeKey);
  const result = found.data;
  const displayName = `${modifier}${result.name}`;

  // --- ランダムにティーザーメッセージ3つを選択（初回マウント時のみ） ---
  const randomTeasers = useMemo(() => {
    const allTeasers = [...sendMessagesData.sendMessages.teaser];
    const selected = [];
    while (selected.length < 3 && allTeasers.length > 0) {
      const idx = Math.floor(Math.random() * allTeasers.length);
      selected.push(allTeasers.splice(idx, 1)[0]);
    }
    return selected;
  }, []);

  // --- State ---
  const [senderName, setSenderName] = useState('');
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(0);

  // 選択中のメッセージ
  const selectedMessage = randomTeasers[selectedMessageIndex] || '';

  // プレビュー用の送信者表示
  const senderDisplay = senderName.trim() || '名無しの誰かさん';

  // --- 送信処理 ---
  const handleSend = () => {
    const expiresAt = Date.now() + 48 * 60 * 60 * 1000;
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    params.set('m', modifier);
    params.set('from', senderName.trim());
    params.set('msg', selectedMessage);
    params.set('exp', String(expiresAt));
    navigate(`/send-complete?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  // --- キャンセル（結果画面に戻る） ---
  const handleCancel = () => {
    const params = new URLSearchParams();
    params.set('t', String(typeId));
    params.set('m', modifier);
    navigate(`/result?${params.toString()}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-6 animate-fade-in-up">

      {/* ============================================ */}
      {/* ヘッダーセクション */}
      {/* ============================================ */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-extrabold text-text-primary mb-2">
          裏の顔、叩きつけたる
        </h1>
        <p className="text-sm text-vivid-pink font-semibold">
          逃げ場なんかあらへんで？
        </p>
      </div>

      <div className="mb-5">
        <ObachanBubble variant="shout">
          ほな送りつけるで！名前入れて、えげつないメッセージ選んだれ！知らんぷりはさせへんで！
        </ObachanBubble>
      </div>

      {/* ============================================ */}
      {/* 結果プレビュー（小さなカード） */}
      {/* ============================================ */}
      <div className="bg-card rounded-2xl p-4 mb-6 border border-vivid-pink/20 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-vivid-pink/15 flex items-center justify-center shrink-0">
          <span className="text-lg">👿</span>
        </div>
        <div className="min-w-0">
          <p className="text-[0.65rem] text-text-secondary mb-0.5">叩きつける診断結果</p>
          <p className="text-sm font-bold text-text-primary truncate">
            {displayName}
          </p>
        </div>
      </div>

      {/* ============================================ */}
      {/* 送信設定フォーム */}
      {/* ============================================ */}
      <div className="bg-card rounded-2xl p-5 mb-6 border border-coral/20">

        {/* 送信者名入力 */}
        <div className="mb-5">
          <label className="block text-sm font-bold text-text-primary mb-1.5">
            あなたの名前
          </label>
          <p className="text-xs text-text-secondary mb-2">
            入力しなければ「名無しの誰かさん」として届くで
          </p>
          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-full bg-sakura border border-coral/30 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-vivid-pink/50 transition-colors"
            placeholder="例: まさお"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            maxLength={20}
          />
        </div>

        {/* メッセージ選択 */}
        <div className="mb-5">
          <p className="text-sm font-bold text-text-primary mb-3">えげつないメッセージを選べ</p>
          <div className="space-y-2">
            {randomTeasers.map((msg, i) => (
              <button
                key={i}
                type="button"
                className={`w-full text-left px-4 py-3 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedMessageIndex === i
                    ? 'bg-vivid-pink/15 border-vivid-pink/40 shadow-[0_0_12px_rgba(204,17,51,0.12)]'
                    : 'bg-sakura/50 border-coral/20 hover:border-coral/40'
                }`}
                onClick={() => setSelectedMessageIndex(i)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      selectedMessageIndex === i
                        ? 'border-vivid-pink bg-vivid-pink'
                        : 'border-text-secondary/40 bg-transparent'
                    }`}
                  >
                    {selectedMessageIndex === i && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </span>
                  <p className={`text-xs leading-relaxed ${
                    selectedMessageIndex === i ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {msg}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 送信プレビュー */}
        <div className="mb-2">
          <p className="text-xs text-text-secondary mb-2 font-semibold">相手に届く爆弾のプレビュー</p>
          <div className="bg-sakura rounded-xl p-4 border border-coral/15">
            <p className="text-[0.65rem] text-text-secondary mb-2">
              From: {senderDisplay}
            </p>
            <p className="text-xs leading-relaxed text-text-primary whitespace-pre-line mb-3">
              {selectedMessage}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-coral/15">
              <span className="text-sm">👿</span>
              <p className="text-xs font-bold text-vivid-pink">{displayName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* 送信ボタンセクション */}
      {/* ============================================ */}
      <div className="bg-card rounded-2xl p-5 mb-6 border border-vivid-pink/25 text-center">
        <p className="text-[0.65rem] text-text-secondary mb-4">
          裏の顔を本人にぶつけたる
        </p>
        <button
          type="button"
          className="btn-primary w-full py-4 rounded-full bg-vivid-pink text-white font-extrabold text-base border-0 cursor-pointer hover:bg-coral-dark pulse-gentle"
          onClick={handleSend}
        >
          叩きつけたる！
        </button>
      </div>

      {/* ============================================ */}
      {/* 注意事項 */}
      {/* ============================================ */}
      <div className="px-2 mb-6">
        <ul className="space-y-1.5 text-[0.65rem] text-text-secondary/70">
          <li className="flex items-start gap-1.5">
            <span className="shrink-0 mt-px">*</span>
            <span>有効期限: 送信から48時間</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="shrink-0 mt-px">*</span>
            <span>
              <a href="/legal" className="underline text-text-secondary/70 hover:text-text-secondary transition-colors">特商法に基づく表記</a>
              {' / '}
              <a href="/privacy" className="underline text-text-secondary/70 hover:text-text-secondary transition-colors">プライバシーポリシー</a>
            </span>
          </li>
        </ul>
      </div>

      {/* ============================================ */}
      {/* キャンセルボタン */}
      {/* ============================================ */}
      <div className="mb-8">
        <button
          type="button"
          className="btn-secondary w-full py-3.5 rounded-full bg-card text-text-secondary font-semibold text-sm border border-coral/30 cursor-pointer"
          onClick={handleCancel}
        >
          やっぱやめとく
        </button>
      </div>
    </div>
  );
}
