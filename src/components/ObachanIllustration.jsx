/**
 * ObachanIllustration — ザ・関西のおばちゃん SVGイラスト
 *
 * サングラス・ヒョウ柄・パーマ・やかましい全身キャラ。
 * size prop でアバター（小）から全身表示（大）まで対応。
 */
export default function ObachanIllustration({ size = 48 }) {
  return (
    <svg
      viewBox="0 0 120 160"
      width={size}
      height={Math.round(size * (160 / 120))}
      aria-label="関西のおばちゃん"
    >
      {/* ========== パーマヘア ========== */}
      {/* ベースの髪（もこもこパーマ） */}
      <ellipse cx="60" cy="32" rx="32" ry="28" fill="#5B2D8E" />
      <circle cx="35" cy="24" r="12" fill="#5B2D8E" />
      <circle cx="85" cy="24" r="12" fill="#5B2D8E" />
      <circle cx="30" cy="36" r="10" fill="#6B3D9E" />
      <circle cx="90" cy="36" r="10" fill="#6B3D9E" />
      <circle cx="42" cy="14" r="9" fill="#6B3D9E" />
      <circle cx="60" cy="10" r="10" fill="#5B2D8E" />
      <circle cx="78" cy="14" r="9" fill="#6B3D9E" />
      <circle cx="35" cy="46" r="8" fill="#5B2D8E" />
      <circle cx="85" cy="46" r="8" fill="#5B2D8E" />

      {/* ========== 顔 ========== */}
      <ellipse cx="60" cy="48" rx="22" ry="20" fill="#F5D0A9" />
      {/* ほっぺた（赤み） */}
      <circle cx="42" cy="52" r="5" fill="#E88" opacity="0.5" />
      <circle cx="78" cy="52" r="5" fill="#E88" opacity="0.5" />

      {/* ========== サングラス ========== */}
      {/* フレーム */}
      <rect x="36" y="39" width="20" height="14" rx="5" fill="#1A1A1A" />
      <rect x="64" y="39" width="20" height="14" rx="5" fill="#1A1A1A" />
      {/* ブリッジ */}
      <path d="M56 45 Q60 42 64 45" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
      {/* テンプル（つる） */}
      <line x1="36" y1="44" x2="28" y2="42" stroke="#1A1A1A" strokeWidth="2" />
      <line x1="84" y1="44" x2="92" y2="42" stroke="#1A1A1A" strokeWidth="2" />
      {/* レンズのハイライト */}
      <ellipse cx="46" cy="44" rx="6" ry="4" fill="#333" />
      <ellipse cx="74" cy="44" rx="6" ry="4" fill="#333" />
      <path d="M41 42 L44 41" stroke="#666" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M69 42 L72 41" stroke="#666" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* ========== 口（ガハハ笑い） ========== */}
      <path d="M48 58 Q60 70 72 58" stroke="#C44" strokeWidth="2" fill="#C44" />
      <path d="M50 58 Q60 66 70 58" fill="#FFF" opacity="0.9" />
      {/* 歯 */}
      <line x1="56" y1="58" x2="56" y2="63" stroke="#F5D0A9" strokeWidth="1" />
      <line x1="60" y1="58" x2="60" y2="64" stroke="#F5D0A9" strokeWidth="1" />
      <line x1="64" y1="58" x2="64" y2="63" stroke="#F5D0A9" strokeWidth="1" />

      {/* ========== ボディ（ヒョウ柄トップス） ========== */}
      {/* 胴体ベース */}
      <path d="M35 68 Q30 75 28 100 L92 100 Q90 75 85 68 Q72 62 60 65 Q48 62 35 68Z" fill="#D4A017" />
      {/* ヒョウ柄ドット */}
      <circle cx="45" cy="78" r="4" fill="#8B6914" opacity="0.7" />
      <circle cx="75" cy="78" r="4" fill="#8B6914" opacity="0.7" />
      <circle cx="60" cy="85" r="3.5" fill="#8B6914" opacity="0.7" />
      <circle cx="38" cy="90" r="3" fill="#8B6914" opacity="0.6" />
      <circle cx="82" cy="90" r="3" fill="#8B6914" opacity="0.6" />
      <circle cx="50" cy="95" r="3.5" fill="#8B6914" opacity="0.7" />
      <circle cx="70" cy="95" r="3.5" fill="#8B6914" opacity="0.7" />
      <circle cx="55" cy="74" r="2.5" fill="#8B6914" opacity="0.5" />
      <circle cx="68" cy="74" r="2.5" fill="#8B6914" opacity="0.5" />
      {/* ヒョウ柄の輪郭 */}
      <circle cx="45" cy="78" r="4" fill="none" stroke="#6B4F10" strokeWidth="0.8" opacity="0.5" />
      <circle cx="75" cy="78" r="4" fill="none" stroke="#6B4F10" strokeWidth="0.8" opacity="0.5" />
      <circle cx="60" cy="85" r="3.5" fill="none" stroke="#6B4F10" strokeWidth="0.8" opacity="0.5" />

      {/* ========== 腕（腰に手を当てるポーズ） ========== */}
      {/* 左腕 */}
      <path d="M35 72 Q18 82 20 100 L28 100 Q26 86 35 80Z" fill="#D4A017" />
      <circle cx="20" cy="100" r="5" fill="#F5D0A9" />
      {/* 右腕（指差し） */}
      <path d="M85 72 Q102 78 108 72" stroke="#D4A017" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M85 72 Q102 78 108 72" stroke="#D4A017" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* 指差しの手 */}
      <circle cx="108" cy="70" r="4" fill="#F5D0A9" />
      <path d="M108 70 L116 66" stroke="#F5D0A9" strokeWidth="3" strokeLinecap="round" />

      {/* ========== スカート ========== */}
      <path d="M28 100 Q26 110 20 135 L100 135 Q94 110 92 100Z" fill="#CC1133" />
      {/* スカートのプリーツ線 */}
      <line x1="45" y1="100" x2="40" y2="135" stroke="#AA0E2A" strokeWidth="0.8" opacity="0.4" />
      <line x1="60" y1="100" x2="60" y2="135" stroke="#AA0E2A" strokeWidth="0.8" opacity="0.4" />
      <line x1="75" y1="100" x2="80" y2="135" stroke="#AA0E2A" strokeWidth="0.8" opacity="0.4" />

      {/* ========== 脚＆靴 ========== */}
      <rect x="38" y="135" width="10" height="15" rx="2" fill="#F5D0A9" />
      <rect x="72" y="135" width="10" height="15" rx="2" fill="#F5D0A9" />
      {/* 靴 */}
      <ellipse cx="43" cy="153" rx="9" ry="5" fill="#CC1133" />
      <ellipse cx="77" cy="153" rx="9" ry="5" fill="#CC1133" />
      {/* ヒール */}
      <rect x="39" y="153" width="3" height="5" rx="1" fill="#AA0E2A" />
      <rect x="73" y="153" width="3" height="5" rx="1" fill="#AA0E2A" />

      {/* ========== アクセサリー ========== */}
      {/* ネックレス */}
      <path d="M42 67 Q60 75 78 67" stroke="#FFD700" strokeWidth="1.5" fill="none" />
      <circle cx="60" cy="73" r="3" fill="#FFD700" />
      {/* イヤリング */}
      <circle cx="33" cy="50" r="2.5" fill="#FFD700" />
      <circle cx="87" cy="50" r="2.5" fill="#FFD700" />
    </svg>
  );
}
