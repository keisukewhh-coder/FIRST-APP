// Flat-design anthropomorphized animal/character illustrations (16 MBTI types)
// Enhanced with CSS animations, expressive eyes, background effects, and easter eggs

const ANIM_STYLES = `
@keyframes eyeGlow {
  0%, 100% { filter: drop-shadow(0 0 2px currentColor); opacity: 0.9; }
  50% { filter: drop-shadow(0 0 6px currentColor); opacity: 1; }
}
@keyframes floatElement {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
@keyframes blink {
  0%, 42%, 44%, 100% { transform: scaleY(1); }
  43% { transform: scaleY(0.1); }
}
@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
@keyframes twinkle {
  0%, 100% { opacity: 0.3; r: 1; }
  50% { opacity: 1; r: 2; }
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(12px) rotate(180deg); opacity: 0; }
}
@keyframes wagTail {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}
@keyframes ledBlink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
@keyframes heartFloat {
  0% { transform: translateY(0) scale(1); opacity: 0.7; }
  100% { transform: translateY(-10px) scale(0.5); opacity: 0; }
}
@keyframes boltFlash {
  0%, 70%, 100% { opacity: 0.15; }
  75% { opacity: 0.9; }
}
@keyframes dollarDrift {
  0%, 100% { transform: translateY(0); opacity: 0.15; }
  50% { transform: translateY(-3px); opacity: 0.35; }
}
@keyframes petalDrift {
  0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
  100% { transform: translateY(8px) rotate(45deg); opacity: 0; }
}
`;

function AnimDefs() {
  return <style>{ANIM_STYLES}</style>;
}

function NightCat() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="ncBg" cx="50%" cy="50%"><stop offset="0%" stopColor="#3A2E5C" /><stop offset="100%" stopColor="#1A1230" /></radialGradient>
        <radialGradient id="ncEyeGlow" cx="50%" cy="50%"><stop offset="0%" stopColor="#C8FF00" /><stop offset="100%" stopColor="#C8FF00" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#ncBg)" />
      {/* Stars that twinkle */}
      <circle cx="30" cy="40" r="1.5" fill="#FFD700"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="85" cy="25" r="1" fill="#FFD700"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" /></circle>
      <circle cx="150" cy="35" r="1.5" fill="#FFD700"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.7s" repeatCount="indefinite" /></circle>
      <circle cx="170" cy="55" r="1" fill="#FFD700"><animate attributeName="opacity" values="0.6;0.2;0.6" dur="3.1s" repeatCount="indefinite" /></circle>
      <circle cx="55" cy="22" r="0.8" fill="#FFD700"><animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.3s" repeatCount="indefinite" /></circle>
      <circle cx="120" cy="18" r="1.2" fill="#FFD700"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" /></circle>
      {/* City skyline with lit windows */}
      <rect x="20" y="130" width="16" height="50" rx="2" fill="#2A1E48" />
      <rect x="40" y="115" width="12" height="65" rx="2" fill="#2A1E48" />
      <rect x="56" y="125" width="18" height="55" rx="2" fill="#2A1E48" />
      <rect x="130" y="120" width="14" height="60" rx="2" fill="#2A1E48" />
      <rect x="148" y="110" width="16" height="70" rx="2" fill="#2A1E48" />
      <rect x="168" y="130" width="12" height="50" rx="2" fill="#2A1E48" />
      {/* Windows */}
      <rect x="24" y="135" width="3" height="3" rx="0.5" fill="#FFD700" opacity="0.5"><animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" /></rect>
      <rect x="44" y="122" width="3" height="3" rx="0.5" fill="#FFD700" opacity="0.3" />
      <rect x="152" y="118" width="3" height="3" rx="0.5" fill="#FFD700" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite" /></rect>
      {/* Body */}
      <rect x="70" y="115" width="60" height="45" rx="16" fill="#2C2C2C" />
      <rect x="85" y="115" width="30" height="40" rx="8" fill="#1A1A1A" />
      {/* Head */}
      <ellipse cx="100" cy="82" rx="32" ry="28" fill="#2C2C2C" />
      {/* Ears */}
      <polygon points="72,62 78,38 88,58" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="2" />
      <polygon points="128,62 122,38 112,58" fill="#2C2C2C" stroke="#1A1A1A" strokeWidth="2" />
      <polygon points="75,60 80,44 86,58" fill="#3A3A3A" />
      <polygon points="125,60 120,44 114,58" fill="#3A3A3A" />
      {/* Eye glow aura */}
      <circle cx="88" cy="80" r="8" fill="url(#ncEyeGlow)" opacity="0.4"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="112" cy="80" r="8" fill="url(#ncEyeGlow)" opacity="0.4"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" /></circle>
      {/* Eyes - narrow calculating slits with glow */}
      <ellipse cx="88" cy="80" rx="5.5" ry="3" fill="#C8FF00"><animate attributeName="ry" values="3;2.5;3" dur="4s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="112" cy="80" rx="5.5" ry="3" fill="#C8FF00"><animate attributeName="ry" values="3;2.5;3" dur="4s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="88" cy="80" rx="1.5" ry="3" fill="#1A1A1A" />
      <ellipse cx="112" cy="80" rx="1.5" ry="3" fill="#1A1A1A" />
      {/* Evil eyebrows */}
      <path d="M80 74 L93 77" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M120 74 L107 77" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="3" ry="2" fill="#555" />
      {/* Smirk */}
      <path d="M95 92 Q100 97 108 90" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="75" y1="88" x2="58" y2="85" stroke="#555" strokeWidth="1" />
      <line x1="75" y1="92" x2="58" y2="95" stroke="#555" strokeWidth="1" />
      <line x1="125" y1="88" x2="142" y2="85" stroke="#555" strokeWidth="1" />
      <line x1="125" y1="92" x2="142" y2="95" stroke="#555" strokeWidth="1" />
      {/* Moon with glow */}
      <circle cx="160" cy="40" r="14" fill="#FFD700" opacity="0.15" />
      <circle cx="160" cy="40" r="12" fill="#FFD700" opacity="0.8" />
      <circle cx="165" cy="37" r="10" fill="#2A1E48" />
      {/* Easter egg: tiny chess piece silhouette (strategist) */}
      <g opacity="0.25">
        <rect x="28" y="152" width="4" height="6" fill="#555" />
        <circle cx="30" cy="150" r="3" fill="#555" />
      </g>
    </svg>
  );
}

function HighFlower() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="hfBg" cx="50%" cy="40%"><stop offset="0%" stopColor="#F8EEF8" /><stop offset="100%" stopColor="#E0D0E8" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#hfBg)" />
      {/* Floating petals */}
      <ellipse cx="35" cy="48" rx="4" ry="2.5" fill="#E8B0D4" opacity="0.5" transform="rotate(20,35,48)"><animateTransform attributeName="transform" type="translate" values="0,0;2,-3;0,0" dur="4s" repeatCount="indefinite" additive="sum" /></ellipse>
      <ellipse cx="165" cy="42" rx="3" ry="2" fill="#D4A0C8" opacity="0.4" transform="rotate(-15,165,42)"><animateTransform attributeName="transform" type="translate" values="0,0;-1,-4;0,0" dur="5s" repeatCount="indefinite" additive="sum" /></ellipse>
      <ellipse cx="28" cy="125" rx="3" ry="2" fill="#E8B0D4" opacity="0.35" transform="rotate(40,28,125)"><animateTransform attributeName="transform" type="translate" values="0,0;1,-3;0,0" dur="3.5s" repeatCount="indefinite" additive="sum" /></ellipse>
      <ellipse cx="172" cy="118" rx="3.5" ry="2" fill="#D4A0C8" opacity="0.4" transform="rotate(-30,172,118)"><animateTransform attributeName="transform" type="translate" values="0,0;-2,-2;0,0" dur="4.5s" repeatCount="indefinite" additive="sum" /></ellipse>
      {/* Body */}
      <rect x="70" y="118" width="60" height="48" rx="18" fill="#C87DAA" />
      <rect x="82" y="118" width="36" height="42" rx="12" fill="#D898BC" />
      {/* Pearl necklace with shimmer */}
      <circle cx="90" cy="120" r="2.5" fill="#FFF5EE"><animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="97" cy="118" r="2.5" fill="#FFF5EE"><animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="104" cy="118" r="2.5" fill="#FFF5EE"><animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="111" cy="120" r="2.5" fill="#FFF5EE"><animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" /></circle>
      {/* Head */}
      <circle cx="100" cy="80" r="30" fill="#FFE4E1" />
      {/* Hair */}
      <ellipse cx="100" cy="60" rx="34" ry="22" fill="#4A3040" />
      <ellipse cx="68" cy="75" rx="8" ry="18" fill="#4A3040" />
      <ellipse cx="132" cy="75" rx="8" ry="18" fill="#4A3040" />
      {/* Eyes - narrowed, judging */}
      <ellipse cx="88" cy="80" rx="6" ry="2.5" fill="#4A3040" />
      <ellipse cx="112" cy="80" rx="6" ry="2.5" fill="#4A3040" />
      <circle cx="87" cy="80" r="1" fill="#fff" />
      <circle cx="111" cy="80" r="1" fill="#fff" />
      {/* Eyelashes */}
      <path d="M81 78 L79 74" stroke="#4A3040" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M84 77 L83 73" stroke="#4A3040" strokeWidth="1" strokeLinecap="round" />
      <path d="M119 78 L121 74" stroke="#4A3040" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M116 77 L117 73" stroke="#4A3040" strokeWidth="1" strokeLinecap="round" />
      {/* Evil eyebrows */}
      <path d="M82 74 L92 77" stroke="#4A3040" strokeWidth="2" strokeLinecap="round" />
      <path d="M118 74 L108 77" stroke="#4A3040" strokeWidth="2" strokeLinecap="round" />
      {/* Smirk */}
      <path d="M93 92 Q100 96 108 91" stroke="#C08080" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Flower crown with shimmer */}
      <circle cx="80" cy="58" r="5" fill="#FF6B81" opacity="0.8"><animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="92" cy="52" r="4" fill="#FFB6C1" />
      <circle cx="108" cy="52" r="4" fill="#FF6B81" opacity="0.7"><animate attributeName="opacity" values="0.6;0.85;0.6" dur="3.5s" repeatCount="indefinite" /></circle>
      <circle cx="120" cy="58" r="5" fill="#FFB6C1" opacity="0.8" />
      <circle cx="100" cy="50" r="4.5" fill="#FF8FA0"><animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite" /></circle>
      {/* Easter egg: small mirror (narcissism) */}
      <g opacity="0.3">
        <ellipse cx="168" cy="145" rx="6" ry="8" fill="#DDD" stroke="#C87DAA" strokeWidth="1" />
        <line x1="168" y1="153" x2="168" y2="162" stroke="#C87DAA" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function RobotFace() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <linearGradient id="rbScreen" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1A2030" /><stop offset="100%" stopColor="#0A1520" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#E0E8F0" />
      {/* Circuit board lines */}
      <line x1="20" y1="60" x2="50" y2="60" stroke="#B0C4DE" strokeWidth="1.5" />
      <line x1="50" y1="60" x2="50" y2="90" stroke="#B0C4DE" strokeWidth="1.5" />
      <line x1="150" y1="50" x2="180" y2="50" stroke="#B0C4DE" strokeWidth="1.5" />
      <line x1="150" y1="50" x2="150" y2="80" stroke="#B0C4DE" strokeWidth="1.5" />
      <line x1="25" y1="140" x2="55" y2="140" stroke="#B0C4DE" strokeWidth="1" opacity="0.5" />
      <line x1="145" y1="145" x2="175" y2="145" stroke="#B0C4DE" strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="60" r="3" fill="#B0C4DE"><animate attributeName="fill" values="#B0C4DE;#4CAF50;#B0C4DE" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="150" cy="50" r="3" fill="#B0C4DE"><animate attributeName="fill" values="#B0C4DE;#FF5252;#B0C4DE" dur="4s" repeatCount="indefinite" /></circle>
      {/* Body */}
      <rect x="70" y="120" width="60" height="45" rx="10" fill="#A8B8C8" />
      <rect x="82" y="125" width="36" height="20" rx="4" fill="#78909C" />
      {/* LED sequence lights */}
      <circle cx="87" cy="135" r="3" fill="#4CAF50"><animate attributeName="opacity" values="1;0.2;0.2;0.2;1" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="97" cy="135" r="3" fill="#FF9800"><animate attributeName="opacity" values="0.2;1;0.2;0.2;0.2" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="107" cy="135" r="3" fill="#2196F3"><animate attributeName="opacity" values="0.2;0.2;1;0.2;0.2" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="117" cy="135" r="3" fill="#F44336"><animate attributeName="opacity" values="0.2;0.2;0.2;1;0.2" dur="2s" repeatCount="indefinite" /></circle>
      {/* Head */}
      <rect x="65" y="50" width="70" height="65" rx="12" fill="#B0BEC5" />
      {/* Antenna with pulsing tip */}
      <line x1="100" y1="50" x2="100" y2="32" stroke="#90A4AE" strokeWidth="3" />
      <circle cx="100" cy="28" r="5" fill="#FF5252"><animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite" /></circle>
      <circle cx="100" cy="28" r="3" fill="#FF8A80"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" /></circle>
      {/* Screen face */}
      <rect x="72" y="58" width="56" height="48" rx="6" fill="url(#rbScreen)" />
      {/* Scan line */}
      <rect x="72" y="58" width="56" height="2" rx="1" fill="#00E5FF" opacity="0.15"><animate attributeName="y" values="58;104;58" dur="4s" repeatCount="indefinite" /></rect>
      {/* Digital eyes - glowing slits */}
      <rect x="80" y="72" width="12" height="4" rx="1" fill="#FF1744"><animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" /></rect>
      <rect x="108" y="72" width="12" height="4" rx="1" fill="#FF1744"><animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" /></rect>
      {/* Eye glow */}
      <rect x="78" y="70" width="16" height="8" rx="2" fill="#FF1744" opacity="0.15"><animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" /></rect>
      <rect x="106" y="70" width="16" height="8" rx="2" fill="#FF1744" opacity="0.15"><animate attributeName="opacity" values="0.1;0.25;0.1" dur="2s" repeatCount="indefinite" /></rect>
      {/* Digital eyebrows */}
      <path d="M80 68 L92 71" stroke="#FF1744" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M120 68 L108 71" stroke="#FF1744" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Sinister mouth */}
      <path d="M88 92 Q95 96 102 92 Q108 88 112 92" stroke="#00E5FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Bolts */}
      <circle cx="68" cy="82" r="4" fill="#90A4AE" />
      <circle cx="68" cy="82" r="2" fill="#78909C" />
      <circle cx="132" cy="82" r="4" fill="#90A4AE" />
      <circle cx="132" cy="82" r="2" fill="#78909C" />
      {/* Easter egg: binary (data nerd) */}
      <text x="75" y="102" fontSize="5" fill="#00E5FF" opacity="0.35" fontFamily="monospace">10110</text>
    </svg>
  );
}

function AlleyChihuahua() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="acSparkle" cx="50%" cy="50%"><stop offset="0%" stopColor="#FFF" /><stop offset="100%" stopColor="#FFF" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#FFE4B5" />
      {/* Alley background */}
      <rect x="15" y="100" width="30" height="80" rx="2" fill="#E8D5B5" />
      <rect x="155" y="95" width="30" height="85" rx="2" fill="#E8D5B5" />
      {/* Floating hearts (emotional type) */}
      <g opacity="0.5">
        <path d="M32 55 C32 52, 36 50, 36 53 C36 50, 40 52, 40 55 C40 58, 36 62, 36 62 C36 62, 32 58, 32 55Z" fill="#FF6B81"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="3s" repeatCount="indefinite" /></path>
        <path d="M162 45 C162 42, 166 40, 166 43 C166 40, 170 42, 170 45 C170 48, 166 52, 166 52 C166 52, 162 48, 162 45Z" fill="#FF6B81" opacity="0.3"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" /><animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="4s" repeatCount="indefinite" /></path>
      </g>
      {/* Body */}
      <rect x="72" y="118" width="56" height="42" rx="16" fill="#FF6B81" />
      {/* Sneakers */}
      <ellipse cx="82" cy="162" rx="10" ry="6" fill="#FFFFFF" />
      <ellipse cx="118" cy="162" rx="10" ry="6" fill="#FFFFFF" />
      <line x1="76" y1="160" x2="88" y2="160" stroke="#FF6B81" strokeWidth="1" />
      <line x1="112" y1="160" x2="124" y2="160" stroke="#FF6B81" strokeWidth="1" />
      {/* Head */}
      <circle cx="100" cy="82" r="30" fill="#F5DEB3" />
      {/* Big ears */}
      <ellipse cx="65" cy="58" rx="14" ry="22" fill="#F5DEB3" transform="rotate(-15,65,58)" />
      <ellipse cx="135" cy="58" rx="14" ry="22" fill="#F5DEB3" transform="rotate(15,135,58)" />
      <ellipse cx="65" cy="58" rx="8" ry="14" fill="#FFB6C1" transform="rotate(-15,65,58)" />
      <ellipse cx="135" cy="58" rx="8" ry="14" fill="#FFB6C1" transform="rotate(15,135,58)" />
      {/* Big sparkly eyes that blink */}
      <g>
        <circle cx="88" cy="78" r="9" fill="#2C1810">
          <animate attributeName="ry" values="9;1;9" dur="4s" repeatCount="indefinite" keyTimes="0;0.03;1" />
        </circle>
        <circle cx="112" cy="78" r="9" fill="#2C1810">
          <animate attributeName="ry" values="9;1;9" dur="4s" repeatCount="indefinite" keyTimes="0;0.03;1" />
        </circle>
        {/* Sparkle highlights */}
        <circle cx="91" cy="75" r="3" fill="#fff" />
        <circle cx="85" cy="80" r="1.5" fill="#fff" opacity="0.7" />
        <circle cx="115" cy="75" r="3" fill="#fff" />
        <circle cx="109" cy="80" r="1.5" fill="#fff" opacity="0.7" />
        {/* Star sparkle in eyes */}
        <circle cx="92" cy="74" r="1" fill="#FFF"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" /></circle>
        <circle cx="116" cy="74" r="1" fill="#FFF"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" /></circle>
      </g>
      {/* Evil eyebrows */}
      <path d="M78 68 L92 73" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M122 68 L108 73" stroke="#8B4513" strokeWidth="2.5" strokeLinecap="round" />
      {/* Nose */}
      <circle cx="100" cy="90" r="3.5" fill="#2C1810" />
      {/* Scheming grin */}
      <path d="M90 96 Q100 103 110 96" stroke="#C08060" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M92 96 L90 98" stroke="#C08060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="78" cy="88" r="6" fill="#FFB6C1" opacity="0.4" />
      <circle cx="122" cy="88" r="6" fill="#FFB6C1" opacity="0.4" />
      {/* Star accessory - animated sparkle */}
      <polygon points="100,48 102,54 108,54 103,58 105,64 100,60 95,64 97,58 92,54 98,54" fill="#FFD700"><animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" /></polygon>
      {/* Easter egg: smartphone (SNS addict) */}
      <g opacity="0.35">
        <rect x="145" y="142" width="8" height="12" rx="1.5" fill="#333" />
        <rect x="146" y="144" width="6" height="8" rx="0.5" fill="#87CEEB" />
      </g>
    </svg>
  );
}

function ChargingLion() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="clMane" cx="50%" cy="50%"><stop offset="0%" stopColor="#E8B840" /><stop offset="100%" stopColor="#B08020" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#1A3A5C" />
      {/* Lightning bolts (energetic type) */}
      <polygon points="38,30 42,42 48,38 44,52 40,48 36,58 34,44" fill="#FFD700" opacity="0.15"><animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" /></polygon>
      <polygon points="158,28 162,38 166,35 163,46 160,43 157,50 155,38" fill="#FFD700" opacity="0.12"><animate attributeName="opacity" values="0.08;0.4;0.08" dur="4s" repeatCount="indefinite" /></polygon>
      {/* Skyscrapers */}
      <rect x="15" y="120" width="20" height="60" rx="2" fill="#2A5080" />
      <rect x="40" y="100" width="15" height="80" rx="2" fill="#2A5080" />
      <rect x="145" y="110" width="18" height="70" rx="2" fill="#2A5080" />
      <rect x="168" y="125" width="14" height="55" rx="2" fill="#2A5080" />
      {/* Windows */}
      <rect x="19" y="125" width="4" height="4" rx="1" fill="#FFD700" opacity="0.5" />
      <rect x="27" y="125" width="4" height="4" rx="1" fill="#FFD700" opacity="0.3" />
      <rect x="19" y="135" width="4" height="4" rx="1" fill="#FFD700" opacity="0.4" />
      {/* Body */}
      <rect x="68" y="118" width="64" height="45" rx="14" fill="#2C3E50" />
      <polygon points="97,118 103,118 101,145 100,148 99,145" fill="#CC1133" />
      {/* Mane */}
      <circle cx="100" cy="78" r="42" fill="url(#clMane)" />
      <circle cx="70" cy="60" r="12" fill="#C09030" />
      <circle cx="130" cy="60" r="12" fill="#C09030" />
      <circle cx="58" cy="78" r="10" fill="#C09030" />
      <circle cx="142" cy="78" r="10" fill="#C09030" />
      <circle cx="65" cy="100" r="10" fill="#C09030" />
      <circle cx="135" cy="100" r="10" fill="#C09030" />
      {/* Head */}
      <circle cx="100" cy="80" r="30" fill="#E8C060" />
      {/* Eyes - fierce */}
      <ellipse cx="88" cy="76" rx="5" ry="3" fill="#2C1810" />
      <ellipse cx="112" cy="76" rx="5" ry="3" fill="#2C1810" />
      <circle cx="90" cy="75" r="1.2" fill="#FF4444" opacity="0.7"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="114" cy="75" r="1.2" fill="#FF4444" opacity="0.7"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" /></circle>
      {/* Angry eyebrows */}
      <path d="M80 66 L93 72" stroke="#8B6914" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M120 66 L107 72" stroke="#8B6914" strokeWidth="3.5" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="84" rx="5" ry="3.5" fill="#C09030" />
      {/* Fanged smirk */}
      <path d="M88 92 Q100 100 112 92" stroke="#8B5A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M90 94 L89 98" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M110 94 L111 98" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smartphone */}
      <rect x="138" y="130" width="12" height="20" rx="3" fill="#333" />
      <rect x="140" y="133" width="8" height="14" rx="1" fill="#4488CC"><animate attributeName="fill" values="#4488CC;#66AAEE;#4488CC" dur="3s" repeatCount="indefinite" /></rect>
    </svg>
  );
}

function BigMom() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <linearGradient id="bmThrone" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#C02020" /><stop offset="100%" stopColor="#6B0000" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#8B0000" />
      {/* Throne */}
      <rect x="55" y="40" width="90" height="130" rx="12" fill="url(#bmThrone)" />
      <rect x="60" y="45" width="80" height="10" rx="5" fill="#DAA520"><animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" /></rect>
      {/* Body */}
      <rect x="65" y="115" width="70" height="50" rx="18" fill="#1C1C1C" />
      <rect x="80" y="115" width="40" height="45" rx="12" fill="#2C2C2C" />
      {/* Gold chain */}
      <circle cx="92" cy="122" r="3" fill="#DAA520" />
      <circle cx="100" cy="120" r="3" fill="#DAA520" />
      <circle cx="108" cy="122" r="3" fill="#DAA520" />
      {/* Head */}
      <circle cx="100" cy="82" r="30" fill="#F5DEB3" />
      {/* Hair */}
      <ellipse cx="100" cy="58" rx="36" ry="20" fill="#1C1C1C" />
      <ellipse cx="68" cy="72" rx="10" ry="16" fill="#1C1C1C" />
      <ellipse cx="132" cy="72" rx="10" ry="16" fill="#1C1C1C" />
      {/* Crown with shimmer */}
      <polygon points="80,48 85,32 90,45 95,28 100,42 105,28 110,45 115,32 120,48" fill="#DAA520" />
      <polygon points="80,48 85,32 90,45 95,28 100,42 105,28 110,45 115,32 120,48" fill="#FFF" opacity="0"><animate attributeName="opacity" values="0;0.3;0" dur="4s" repeatCount="indefinite" /></polygon>
      <circle cx="95" cy="42" r="2.5" fill="#CC1133"><animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" /></circle>
      <circle cx="105" cy="42" r="2.5" fill="#CC1133"><animate attributeName="opacity" values="1;0.7;1" dur="2.5s" repeatCount="indefinite" /></circle>
      {/* Eyes - intimidating sharp */}
      <ellipse cx="88" cy="80" rx="6" ry="2" fill="#2C1810" />
      <ellipse cx="112" cy="80" rx="6" ry="2" fill="#2C1810" />
      <circle cx="90" cy="80" r="1" fill="#CC1133" opacity="0.6"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="114" cy="80" r="1" fill="#CC1133" opacity="0.6"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" /></circle>
      {/* Heavy V-shape eyebrows */}
      <path d="M78 72 L94 77" stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M122 72 L106 77" stroke="#1C1C1C" strokeWidth="3.5" strokeLinecap="round" />
      {/* Evil red lips */}
      <path d="M91 92 Q100 98 109 90" stroke="#CC1133" strokeWidth="2.5" fill="#CC1133" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="78" cy="88" r="5" fill="#FFB6C1" opacity="0.3" />
      <circle cx="122" cy="88" r="5" fill="#FFB6C1" opacity="0.3" />
      {/* Easter egg: dollar signs (power) */}
      <text x="42" y="165" fontSize="8" fill="#DAA520" opacity="0.2" fontFamily="sans-serif">$</text>
      <text x="152" y="160" fontSize="7" fill="#DAA520" opacity="0.15" fontFamily="sans-serif">$</text>
    </svg>
  );
}

function MountParrot() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <circle cx="100" cy="100" r="95" fill="#FFE0B2" />
      {/* Animated speech bubbles */}
      <ellipse cx="40" cy="45" rx="20" ry="14" fill="#FFF" opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="3s" repeatCount="indefinite" /></ellipse>
      <text x="30" y="50" fontSize="12" fill="#FF6B81" opacity="0.7" fontWeight="bold">!</text>
      <ellipse cx="165" cy="55" rx="18" ry="12" fill="#FFF" opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="3.5s" repeatCount="indefinite" /></ellipse>
      <text x="158" y="60" fontSize="11" fill="#FF6B81" opacity="0.6" fontWeight="bold">!</text>
      {/* Extra speech effect */}
      <ellipse cx="30" cy="100" rx="12" ry="8" fill="#FFF" opacity="0.25"><animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="4s" repeatCount="indefinite" /></ellipse>
      {/* Body */}
      <rect x="70" y="118" width="60" height="45" rx="16" fill="#4CAF50" />
      <rect x="82" y="118" width="36" height="40" rx="10" fill="#66BB6A" />
      {/* Wings */}
      <ellipse cx="60" cy="135" rx="14" ry="22" fill="#FF9800" transform="rotate(15,60,135)" />
      <ellipse cx="140" cy="135" rx="14" ry="22" fill="#FF9800" transform="rotate(-15,140,135)" />
      {/* Head */}
      <circle cx="100" cy="78" r="30" fill="#4CAF50" />
      {/* Crest with gentle wave */}
      <g><animateTransform attributeName="transform" type="rotate" values="-2,100,48;2,100,48;-2,100,48" dur="3s" repeatCount="indefinite" />
        <ellipse cx="90" cy="48" rx="6" ry="16" fill="#FF5722" transform="rotate(-15,90,48)" />
        <ellipse cx="100" cy="46" rx="5" ry="18" fill="#FF9800" />
        <ellipse cx="110" cy="48" rx="6" ry="16" fill="#FFC107" transform="rotate(15,110,48)" />
      </g>
      {/* White face patch */}
      <circle cx="100" cy="82" r="20" fill="#FFFFFF" />
      {/* Eyes */}
      <ellipse cx="90" cy="78" rx="5" ry="3" fill="#2C1810" />
      <ellipse cx="110" cy="78" rx="5" ry="3" fill="#2C1810" />
      <circle cx="92" cy="77" r="1.5" fill="#fff" />
      <circle cx="112" cy="77" r="1.5" fill="#fff" />
      {/* Evil eyebrows */}
      <path d="M83 72 L95 76" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M117 72 L105 76" stroke="#2C1810" strokeWidth="2.5" strokeLinecap="round" />
      {/* Beak */}
      <path d="M95 88 L100 98 L105 88 Z" fill="#FF5722" />
      <line x1="95" y1="88" x2="105" y2="88" stroke="#E64A19" strokeWidth="1.5" />
      {/* Blush */}
      <circle cx="80" cy="85" r="5" fill="#FFB6C1" opacity="0.4" />
      <circle cx="120" cy="85" r="5" fill="#FFB6C1" opacity="0.4" />
      {/* Megaphone with sound waves */}
      <g transform="translate(142,100) rotate(-20)">
        <polygon points="0,5 20,0 20,15 0,10" fill="#FFC107" />
        <rect x="-5" y="3" width="6" height="9" rx="2" fill="#FF9800" />
        {/* Sound waves */}
        <path d="M22 3 Q28 7 22 12" stroke="#FF9800" strokeWidth="1.5" fill="none" opacity="0.5"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="1s" repeatCount="indefinite" /></path>
        <path d="M26 0 Q34 7 26 15" stroke="#FF9800" strokeWidth="1" fill="none" opacity="0.3"><animate attributeName="opacity" values="0.1;0.4;0.1" dur="1s" repeatCount="indefinite" /></path>
      </g>
    </svg>
  );
}

function IronVault() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <linearGradient id="ivMetal" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#95A5A6" /><stop offset="100%" stopColor="#7F8C8D" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="#D5DDE5" />
      {/* Office background */}
      <rect x="20" y="140" width="160" height="40" rx="2" fill="#B0BEC5" />
      <rect x="25" y="90" width="30" height="50" rx="2" fill="#C0C8D0" />
      <rect x="145" y="95" width="30" height="45" rx="2" fill="#C0C8D0" />
      {/* Body */}
      <rect x="65" y="105" width="70" height="65" rx="14" fill="#78909C" />
      <rect x="72" y="110" width="56" height="52" rx="8" fill="url(#ivMetal)" />
      {/* Vault door - spinning combo lock */}
      <circle cx="100" cy="140" r="12" fill="#607D8B" />
      <circle cx="100" cy="140" r="8" fill="#78909C" />
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0,100,140;360,100,140" dur="8s" repeatCount="indefinite" />
        <line x1="94" y1="140" x2="106" y2="140" stroke="#546E7A" strokeWidth="2" />
        <line x1="100" y1="134" x2="100" y2="146" stroke="#546E7A" strokeWidth="2" />
        <line x1="95" y1="135" x2="105" y2="145" stroke="#546E7A" strokeWidth="1.5" />
        <line x1="105" y1="135" x2="95" y2="145" stroke="#546E7A" strokeWidth="1.5" />
      </g>
      {/* Tick marks around dial */}
      <circle cx="100" cy="140" r="11" fill="none" stroke="#546E7A" strokeWidth="0.5" strokeDasharray="1 3" />
      {/* Head */}
      <rect x="68" y="48" width="64" height="58" rx="16" fill="#90A4AE" />
      {/* Eyes - menacing */}
      <rect x="80" y="70" width="12" height="4" rx="2" fill="#37474F" />
      <rect x="108" y="70" width="12" height="4" rx="2" fill="#37474F" />
      <circle cx="88" cy="72" r="1" fill="#CC1133" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="116" cy="72" r="1" fill="#CC1133" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" /></circle>
      {/* Heavy eyebrows */}
      <path d="M78 63 L94 68" stroke="#546E7A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M122 63 L106 68" stroke="#546E7A" strokeWidth="3.5" strokeLinecap="round" />
      {/* Disapproving mouth */}
      <path d="M90 88 Q100 84 110 88" stroke="#546E7A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Lock on forehead with keyhole */}
      <rect x="93" y="49" width="14" height="12" rx="3" fill="#DAA520"><animate attributeName="opacity" values="0.85;1;0.85" dur="4s" repeatCount="indefinite" /></rect>
      <circle cx="100" cy="56" r="2" fill="#8B6914" />
      <rect x="99" y="56" width="2" height="3" fill="#8B6914" />
    </svg>
  );
}

function SunnyRetriever() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <circle cx="100" cy="100" r="95" fill="#C5E8B7" />
      {/* Park background */}
      <ellipse cx="100" cy="170" rx="80" ry="20" fill="#A8D890" />
      <circle cx="45" cy="110" r="25" fill="#90C878" />
      <circle cx="155" cy="105" r="28" fill="#90C878" />
      <rect x="42" y="110" width="6" height="30" rx="3" fill="#8B7355" />
      <rect x="152" y="105" width="6" height="35" rx="3" fill="#8B7355" />
      {/* Floating hearts */}
      <g opacity="0.4">
        <path d="M38 42 C38 39, 42 37, 42 40 C42 37, 46 39, 46 42 C46 45, 42 49, 42 49 C42 49, 38 45, 38 42Z" fill="#FF8FA0"><animateTransform attributeName="transform" type="translate" values="0,0;0,-4;0,0" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" /></path>
      </g>
      {/* Body */}
      <rect x="68" y="118" width="64" height="42" rx="16" fill="#E8A060" />
      <path d="M75 130 Q85 125 95 130 Q105 135 115 130 Q125 125 130 130" stroke="#D08040" strokeWidth="1.5" fill="none" />
      <path d="M75 138 Q85 133 95 138 Q105 143 115 138 Q125 133 130 138" stroke="#D08040" strokeWidth="1.5" fill="none" />
      {/* Wagging tail */}
      <g style={{ transformOrigin: '135px 125px' }}>
        <animateTransform attributeName="transform" type="rotate" values="-15,135,125;15,135,125;-15,135,125" dur="0.6s" repeatCount="indefinite" />
        <path d="M130 125 Q145 110 150 115" stroke="#D4A850" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* Head */}
      <circle cx="100" cy="80" r="32" fill="#E8C878" />
      {/* Floppy ears */}
      <ellipse cx="65" cy="82" rx="16" ry="24" fill="#D4A850" transform="rotate(-10,65,82)" />
      <ellipse cx="135" cy="82" rx="16" ry="24" fill="#D4A850" transform="rotate(10,135,82)" />
      {/* Eye patches */}
      <circle cx="88" cy="78" r="10" fill="#F0D888" />
      <circle cx="112" cy="78" r="10" fill="#F0D888" />
      {/* Eyes */}
      <ellipse cx="88" cy="76" rx="5" ry="4" fill="#5C3A1E" />
      <ellipse cx="112" cy="76" rx="5" ry="4" fill="#5C3A1E" />
      <circle cx="90" cy="75" r="1.5" fill="#fff" />
      <circle cx="114" cy="75" r="1.5" fill="#fff" />
      {/* Subtly evil eyebrows */}
      <path d="M80 70 L92 73" stroke="#5C3A1E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M120 70 L108 73" stroke="#5C3A1E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="88" rx="5" ry="3.5" fill="#5C3A1E" />
      {/* Knowing grin */}
      <path d="M86 94 Q100 106 114 94" stroke="#5C3A1E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="100" rx="6" ry="5" fill="#FF8FA0" />
      {/* Blush */}
      <circle cx="76" cy="88" r="7" fill="#FFB6C1" opacity="0.4" />
      <circle cx="124" cy="88" r="7" fill="#FFB6C1" opacity="0.4" />
      {/* Cafe latte with steam */}
      <rect x="140" y="135" width="16" height="18" rx="3" fill="#FFFFFF" />
      <ellipse cx="148" cy="135" rx="8" ry="3" fill="#D4A060" />
      <path d="M156 140 Q162 143 156 148" stroke="#DDD" strokeWidth="2" fill="none" />
      {/* Steam */}
      <path d="M144 132 Q146 128 144 124" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.4"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" /></path>
      <path d="M150 131 Q152 126 150 122" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.3"><animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.5s" repeatCount="indefinite" /></path>
    </svg>
  );
}

function StrategyPenguin() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <linearGradient id="spIce" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#D0E8F8" /><stop offset="100%" stopColor="#A0C4D8" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#spIce)" />
      {/* Station platform */}
      <rect x="10" y="155" width="180" height="8" rx="2" fill="#8899AA" />
      <rect x="10" y="163" width="180" height="20" rx="0" fill="#778899" />
      <rect x="10" y="155" width="180" height="2" fill="#FFD700" />
      {/* Dollar signs (calculating type) */}
      <text x="25" y="50" fontSize="10" fill="#607D8B" opacity="0.15" fontFamily="sans-serif">$</text>
      <text x="170" y="45" fontSize="8" fill="#607D8B" opacity="0.12" fontFamily="sans-serif">$</text>
      <text x="30" y="130" fontSize="7" fill="#607D8B" opacity="0.1" fontFamily="sans-serif">$</text>
      {/* Body */}
      <ellipse cx="100" cy="130" rx="32" ry="35" fill="#2C3E50" />
      <ellipse cx="100" cy="135" rx="20" ry="25" fill="#FFFFFF" />
      {/* Shirt collar */}
      <path d="M85 115 L100 125 L115 115" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      {/* Backpack straps */}
      <line x1="78" y1="110" x2="73" y2="135" stroke="#6B8E23" strokeWidth="3" strokeLinecap="round" />
      <line x1="122" y1="110" x2="127" y2="135" stroke="#6B8E23" strokeWidth="3" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="100" cy="78" rx="28" ry="26" fill="#2C3E50" />
      <ellipse cx="100" cy="82" rx="18" ry="16" fill="#FFFFFF" />
      {/* Eyes - calculating */}
      <ellipse cx="92" cy="78" rx="4.5" ry="2.5" fill="#2C3E50" />
      <ellipse cx="108" cy="78" rx="4.5" ry="2.5" fill="#2C3E50" />
      <circle cx="94" cy="77.5" r="1" fill="#fff" />
      <circle cx="110" cy="77.5" r="1" fill="#fff" />
      {/* Eyebrows */}
      <path d="M86 73 L97 76" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      <path d="M114 73 L103 76" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      {/* Beak */}
      <polygon points="95,88 100,95 105,88" fill="#E8A030" />
      <path d="M94 90 Q100 94 107 89" stroke="#C08020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="85" cy="86" r="4" fill="#FFB6C1" opacity="0.4" />
      <circle cx="115" cy="86" r="4" fill="#FFB6C1" opacity="0.4" />
      {/* Flippers */}
      <ellipse cx="65" cy="130" rx="8" ry="18" fill="#2C3E50" transform="rotate(15,65,130)" />
      <ellipse cx="135" cy="130" rx="8" ry="18" fill="#2C3E50" transform="rotate(-15,135,130)" />
      {/* Feet */}
      <ellipse cx="88" cy="165" rx="10" ry="4" fill="#E8A030" />
      <ellipse cx="112" cy="165" rx="10" ry="4" fill="#E8A030" />
      {/* Easter egg: tiny spreadsheet (rule follower) */}
      <g opacity="0.3">
        <rect x="155" y="130" width="14" height="10" rx="1" fill="#FFF" />
        <line x1="155" y1="134" x2="169" y2="134" stroke="#CCC" strokeWidth="0.5" />
        <line x1="155" y1="137" x2="169" y2="137" stroke="#CCC" strokeWidth="0.5" />
        <line x1="160" y1="130" x2="160" y2="140" stroke="#CCC" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function ShelterRabbit() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="srBg" cx="50%" cy="50%"><stop offset="0%" stopColor="#F0E0F0" /><stop offset="100%" stopColor="#D8C0D8" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#srBg)" />
      {/* Cherry blossom tree */}
      <rect x="145" y="90" width="8" height="70" rx="3" fill="#8B6B5A" />
      <circle cx="155" cy="75" r="20" fill="#FFB6C1" opacity="0.6" />
      <circle cx="145" cy="65" r="15" fill="#FFB6C1" opacity="0.5" />
      <circle cx="165" cy="68" r="12" fill="#FFB6C1" opacity="0.4" />
      {/* Animated falling petals */}
      <ellipse cx="120" cy="40" rx="3" ry="2" fill="#FFB6C1" opacity="0.6" transform="rotate(30,120,40)">
        <animateTransform attributeName="transform" type="translate" values="0,0;5,15" dur="4s" repeatCount="indefinite" additive="sum" />
        <animate attributeName="opacity" values="0.6;0" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="50" cy="50" rx="3" ry="2" fill="#FFB6C1" opacity="0.5" transform="rotate(-20,50,50)">
        <animateTransform attributeName="transform" type="translate" values="0,0;3,12" dur="5s" repeatCount="indefinite" additive="sum" />
        <animate attributeName="opacity" values="0.5;0" dur="5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="80" cy="30" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.4" transform="rotate(45,80,30)">
        <animateTransform attributeName="transform" type="translate" values="0,0;4,10" dur="3.5s" repeatCount="indefinite" additive="sum" />
        <animate attributeName="opacity" values="0.4;0" dur="3.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="140" cy="35" rx="2.5" ry="1.5" fill="#FFB6C1" opacity="0.5" transform="rotate(15,140,35)">
        <animateTransform attributeName="transform" type="translate" values="0,0;2,14" dur="4.5s" repeatCount="indefinite" additive="sum" />
        <animate attributeName="opacity" values="0.5;0" dur="4.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Body */}
      <ellipse cx="100" cy="132" rx="28" ry="30" fill="#F0E6F0" />
      {/* Head */}
      <circle cx="100" cy="85" r="28" fill="#FFFFFF" />
      {/* Long ears */}
      <ellipse cx="78" cy="45" rx="10" ry="28" fill="#FFFFFF" transform="rotate(-10,78,45)" />
      <ellipse cx="122" cy="45" rx="10" ry="28" fill="#FFFFFF" transform="rotate(10,122,45)" />
      <ellipse cx="78" cy="45" rx="5" ry="18" fill="#FFB6C1" transform="rotate(-10,78,45)" />
      <ellipse cx="122" cy="45" rx="5" ry="18" fill="#FFB6C1" transform="rotate(10,122,45)" />
      {/* Eyes - sad doe eyes */}
      <ellipse cx="90" cy="82" rx="6" ry="6.5" fill="#8B4060" />
      <ellipse cx="110" cy="82" rx="6" ry="6.5" fill="#8B4060" />
      <circle cx="87" cy="80" r="2.5" fill="#fff" />
      <circle cx="107" cy="80" r="2.5" fill="#fff" />
      <circle cx="92" cy="84" r="1" fill="#fff" opacity="0.5" />
      <circle cx="112" cy="84" r="1" fill="#fff" opacity="0.5" />
      {/* Tear drops */}
      <ellipse cx="82" cy="92" rx="1.5" ry="2.5" fill="#87CEEB" opacity="0.5"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" /></ellipse>
      {/* Slightly worried eyebrows */}
      <path d="M84 74 L95 78" stroke="#8B4060" strokeWidth="2" strokeLinecap="round" />
      <path d="M116 74 L105 78" stroke="#8B4060" strokeWidth="2" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="92" rx="3" ry="2" fill="#FFB6C1" />
      {/* Pouty smirk */}
      <path d="M95 95 Q100 98 107 94" stroke="#C0A0A0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="80" cy="90" r="6" fill="#FFB6C1" opacity="0.3" />
      <circle cx="120" cy="90" r="6" fill="#FFB6C1" opacity="0.3" />
      {/* Umbrella */}
      <line x1="40" y1="50" x2="40" y2="140" stroke="#8B6B8B" strokeWidth="2.5" />
      <path d="M15 75 Q40 40 65 75" fill="#C8A0C8" stroke="#B090B0" strokeWidth="2" />
      <path d="M40 140 Q43 145 46 140" stroke="#8B6B8B" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

function TofuMental() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <circle cx="100" cy="100" r="95" fill="#FFF8E1" />
      {/* Dreamy clouds floating */}
      <ellipse cx="40" cy="40" rx="20" ry="12" fill="#FFF" opacity="0.6"><animateTransform attributeName="transform" type="translate" values="0,0;3,-2;0,0" dur="6s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="55" cy="38" rx="15" ry="10" fill="#FFF" opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0,0;2,-1;0,0" dur="6s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="155" cy="50" rx="18" ry="10" fill="#FFF" opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0,0;-2,-1;0,0" dur="7s" repeatCount="indefinite" /></ellipse>
      {/* Floating hearts (emotional) */}
      <g opacity="0.3">
        <path d="M25 78 C25 76, 28 74, 28 76 C28 74, 31 76, 31 78 C31 80, 28 83, 28 83 C28 83, 25 80, 25 78Z" fill="#FF8FA0"><animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" /></path>
        <path d="M168 85 C168 83, 171 81, 171 83 C171 81, 174 83, 174 85 C174 87, 171 90, 171 90 C171 90, 168 87, 168 85Z" fill="#FF8FA0"><animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.15;0.4;0.15" dur="5s" repeatCount="indefinite" /></path>
      </g>
      {/* Body */}
      <rect x="65" y="100" width="70" height="70" rx="18" fill="#FFF5E0" stroke="#F0E0C0" strokeWidth="2" />
      <path d="M70 140 Q80 137 90 140 Q100 143 110 140 Q120 137 130 140" stroke="#F0D890" strokeWidth="1" fill="none"><animate attributeName="d" values="M70 140 Q80 137 90 140 Q100 143 110 140 Q120 137 130 140;M70 141 Q80 138 90 141 Q100 144 110 141 Q120 138 130 141;M70 140 Q80 137 90 140 Q100 143 110 140 Q120 137 130 140" dur="3s" repeatCount="indefinite" /></path>
      {/* Head */}
      <circle cx="100" cy="78" r="32" fill="#FFF5E0" stroke="#F0E0C0" strokeWidth="2" />
      {/* Eyes - sad with resentment */}
      <ellipse cx="88" cy="76" rx="5" ry="4.5" fill="#5C4033" />
      <ellipse cx="112" cy="76" rx="5" ry="4.5" fill="#5C4033" />
      <circle cx="86" cy="75" r="1.5" fill="#fff" />
      <circle cx="110" cy="75" r="1.5" fill="#fff" />
      {/* Tears */}
      <ellipse cx="82" cy="86" rx="2" ry="3" fill="#87CEEB" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="120" cy="87" rx="1.5" ry="2.5" fill="#87CEEB" opacity="0.3"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="4s" repeatCount="indefinite" /></ellipse>
      {/* Eyebrows */}
      <path d="M82 68 L92 72" stroke="#C0A080" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M118 68 L108 72" stroke="#C0A080" strokeWidth="2.5" strokeLinecap="round" />
      {/* Passive-aggressive pout */}
      <path d="M93 90 Q100 86 107 90" stroke="#C0A080" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="78" cy="84" r="6" fill="#FFB6C1" opacity="0.3" />
      <circle cx="122" cy="84" r="6" fill="#FFB6C1" opacity="0.3" />
      {/* Book */}
      <rect x="140" y="118" width="18" height="24" rx="2" fill="#8B7355" />
      <rect x="142" y="120" width="14" height="20" rx="1" fill="#F5DEB3" />
      <line x1="149" y1="118" x2="149" y2="142" stroke="#7B6345" strokeWidth="1.5" />
      {/* Easter egg: poem lines on page */}
      <line x1="144" y1="126" x2="154" y2="126" stroke="#C0A080" strokeWidth="0.5" opacity="0.4" />
      <line x1="144" y1="129" x2="152" y2="129" stroke="#C0A080" strokeWidth="0.5" opacity="0.4" />
      <line x1="144" y1="132" x2="153" y2="132" stroke="#C0A080" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function CraftsmanWolf() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="cwBg" cx="50%" cy="50%"><stop offset="0%" stopColor="#55556A" /><stop offset="100%" stopColor="#3A3A4A" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#cwBg)" />
      {/* Workshop background */}
      <rect x="15" y="140" width="170" height="40" rx="2" fill="#2E2E3E" />
      {/* Tools on wall */}
      <line x1="30" y1="110" x2="30" y2="140" stroke="#666" strokeWidth="2" />
      <line x1="40" y1="115" x2="40" y2="140" stroke="#666" strokeWidth="2" />
      <rect x="26" y="108" width="8" height="4" rx="1" fill="#888" />
      {/* Body */}
      <rect x="68" y="118" width="64" height="45" rx="14" fill="#3C2A1A" />
      <line x1="100" y1="118" x2="100" y2="155" stroke="#2A1A0A" strokeWidth="1.5" />
      <circle cx="95" cy="130" r="2" fill="#888" />
      <circle cx="95" cy="140" r="2" fill="#888" />
      {/* Head */}
      <ellipse cx="100" cy="78" rx="28" ry="26" fill="#8B8B9B" />
      {/* Pointed ears */}
      <polygon points="72,62 68,30 88,55" fill="#8B8B9B" />
      <polygon points="128,62 132,30 112,55" fill="#8B8B9B" />
      <polygon points="74,58 72,38 85,54" fill="#6B6B7B" />
      <polygon points="126,58 128,38 115,54" fill="#6B6B7B" />
      {/* Snout */}
      <ellipse cx="100" cy="88" rx="14" ry="10" fill="#A0A0B0" />
      {/* Eyes - predatory slit pupils with glow */}
      <ellipse cx="88" cy="76" rx="6" ry="3" fill="#DAA520"><animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="112" cy="76" rx="6" ry="3" fill="#DAA520"><animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="88" cy="76" rx="1.5" ry="3" fill="#2C2C2C" />
      <ellipse cx="112" cy="76" rx="1.5" ry="3" fill="#2C2C2C" />
      {/* Eye glow */}
      <ellipse cx="88" cy="76" rx="8" ry="5" fill="#DAA520" opacity="0.1"><animate attributeName="opacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="112" cy="76" rx="8" ry="5" fill="#DAA520" opacity="0.1"><animate attributeName="opacity" values="0.05;0.15;0.05" dur="3s" repeatCount="indefinite" /></ellipse>
      {/* Predator eyebrows */}
      <path d="M80 69 L92 74" stroke="#6B6B7B" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 69 L108 74" stroke="#6B6B7B" strokeWidth="3" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="86" rx="5" ry="3.5" fill="#4A4A5A" />
      {/* Fanged smirk */}
      <path d="M92 93 Q100 98 108 93" stroke="#5A5A6A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M94 95 L93 99" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M106 95 L107 99" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Laptop with screen glow */}
      <g transform="translate(140,130)">
        <rect x="0" y="5" width="24" height="16" rx="2" fill="#444" />
        <rect x="2" y="7" width="20" height="12" rx="1" fill="#5588AA"><animate attributeName="fill" values="#5588AA;#77AACC;#5588AA" dur="4s" repeatCount="indefinite" /></rect>
        <rect x="-2" y="21" width="28" height="2" rx="1" fill="#555" />
        {/* Code lines */}
        <line x1="4" y1="10" x2="14" y2="10" stroke="#88CCEE" strokeWidth="0.5" opacity="0.5" />
        <line x1="4" y1="13" x2="18" y2="13" stroke="#88CCEE" strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="16" x2="12" y2="16" stroke="#88CCEE" strokeWidth="0.5" opacity="0.3" />
      </g>
    </svg>
  );
}

function FestivalPanda() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <radialGradient id="fpBg" cx="50%" cy="50%"><stop offset="0%" stopColor="#FFE8E4" /><stop offset="100%" stopColor="#FFDAD4" /></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#fpBg)" />
      {/* Festival lanterns */}
      <line x1="20" y1="20" x2="180" y2="20" stroke="#FF6B6B" strokeWidth="1.5" />
      <g transform="translate(40,20)">
        <rect x="-6" y="0" width="12" height="16" rx="6" fill="#FF4444" opacity="0.7"><animate attributeName="opacity" values="0.6;0.8;0.6" dur="2s" repeatCount="indefinite" /></rect>
        <line x1="0" y1="16" x2="0" y2="20" stroke="#FF4444" strokeWidth="1" />
      </g>
      <g transform="translate(80,20)">
        <rect x="-6" y="0" width="12" height="16" rx="6" fill="#FF6644" opacity="0.7"><animate attributeName="opacity" values="0.7;0.5;0.7" dur="2.5s" repeatCount="indefinite" /></rect>
        <line x1="0" y1="16" x2="0" y2="20" stroke="#FF6644" strokeWidth="1" />
      </g>
      <g transform="translate(120,20)">
        <rect x="-6" y="0" width="12" height="16" rx="6" fill="#FF4444" opacity="0.7"><animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" /></rect>
        <line x1="0" y1="16" x2="0" y2="20" stroke="#FF4444" strokeWidth="1" />
      </g>
      <g transform="translate(160,20)">
        <rect x="-6" y="0" width="12" height="16" rx="6" fill="#FF6644" opacity="0.7" />
        <line x1="0" y1="16" x2="0" y2="20" stroke="#FF6644" strokeWidth="1" />
      </g>
      {/* Confetti particles */}
      <rect x="30" y="50" width="3" height="3" rx="0.5" fill="#FF6B81" opacity="0.6" transform="rotate(30,30,50)"><animateTransform attributeName="transform" type="translate" values="0,0;2,8" dur="3s" repeatCount="indefinite" additive="sum" /><animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" /></rect>
      <rect x="170" y="55" width="3" height="3" rx="0.5" fill="#4CAF50" opacity="0.5" transform="rotate(-20,170,55)"><animateTransform attributeName="transform" type="translate" values="0,0;-1,7" dur="3.5s" repeatCount="indefinite" additive="sum" /><animate attributeName="opacity" values="0.5;0" dur="3.5s" repeatCount="indefinite" /></rect>
      <rect x="60" y="42" width="2" height="4" rx="0.5" fill="#FFD700" opacity="0.4" transform="rotate(45,60,42)"><animateTransform attributeName="transform" type="translate" values="0,0;1,6" dur="4s" repeatCount="indefinite" additive="sum" /><animate attributeName="opacity" values="0.4;0" dur="4s" repeatCount="indefinite" /></rect>
      <circle cx="145" cy="48" r="1.5" fill="#2196F3" opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0,0;-1,5" dur="3.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.5;0" dur="3.2s" repeatCount="indefinite" /></circle>
      {/* Body */}
      <rect x="68" y="118" width="64" height="45" rx="16" fill="#FF6B81" />
      <polygon points="85,130 87,135 92,135 88,138 89,143 85,140 81,143 82,138 78,135 83,135" fill="#FFD700" />
      <polygon points="115,128 116,131 119,131 117,133 118,136 115,134 112,136 113,133 111,131 114,131" fill="#FFD700" />
      {/* Head */}
      <circle cx="100" cy="80" r="34" fill="#FFFFFF" />
      {/* Ear patches */}
      <circle cx="70" cy="55" r="16" fill="#2C2C2C" />
      <circle cx="130" cy="55" r="16" fill="#2C2C2C" />
      {/* Eye patches */}
      <ellipse cx="85" cy="78" rx="12" ry="10" fill="#2C2C2C" transform="rotate(-10,85,78)" />
      <ellipse cx="115" cy="78" rx="12" ry="10" fill="#2C2C2C" transform="rotate(10,115,78)" />
      {/* Eyes */}
      <circle cx="85" cy="78" r="5" fill="#FFFFFF" />
      <circle cx="115" cy="78" r="5" fill="#FFFFFF" />
      <circle cx="87" cy="78" r="3" fill="#2C2C2C" />
      <circle cx="117" cy="78" r="3" fill="#2C2C2C" />
      <circle cx="88" cy="77" r="1" fill="#fff" />
      <circle cx="118" cy="77" r="1" fill="#fff" />
      {/* Sneaky eyelids */}
      <path d="M79 74 Q85 72 91 76" fill="#2C2C2C" />
      <path d="M109 76 Q115 72 121 74" fill="#2C2C2C" />
      {/* Nose */}
      <ellipse cx="100" cy="90" rx="4" ry="3" fill="#2C2C2C" />
      {/* Scheming grin */}
      <path d="M86 96 Q100 108 114 96" stroke="#2C2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="102" rx="6" ry="5" fill="#FF8FA0" />
      {/* Blush */}
      <circle cx="74" cy="90" r="6" fill="#FFB6C1" opacity="0.5" />
      <circle cx="126" cy="90" r="6" fill="#FFB6C1" opacity="0.5" />
      {/* Takoyaki */}
      <line x1="35" y1="100" x2="35" y2="150" stroke="#8B6B4A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="35" cy="98" r="7" fill="#D4A060" />
      <circle cx="35" cy="98" r="5" fill="#C09050" />
      {/* Steam from takoyaki */}
      <path d="M32 90 Q34 86 32 82" stroke="#DDD" strokeWidth="0.8" fill="none" opacity="0.3"><animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" /></path>
    </svg>
  );
}

function SeaTurtle() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <linearGradient id="stOcean" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#B8EEF4" /><stop offset="100%" stopColor="#88D8E8" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#stOcean)" />
      {/* Animated ocean waves */}
      <path d="M0 160 Q25 150 50 160 Q75 170 100 160 Q125 150 150 160 Q175 170 200 160 L200 200 L0 200 Z" fill="#80DEEA" opacity="0.5"><animate attributeName="d" values="M0 160 Q25 150 50 160 Q75 170 100 160 Q125 150 150 160 Q175 170 200 160 L200 200 L0 200 Z;M0 162 Q25 172 50 162 Q75 152 100 162 Q125 172 150 162 Q175 152 200 162 L200 200 L0 200 Z;M0 160 Q25 150 50 160 Q75 170 100 160 Q125 150 150 160 Q175 170 200 160 L200 200 L0 200 Z" dur="4s" repeatCount="indefinite" /></path>
      <path d="M0 170 Q25 162 50 170 Q75 178 100 170 Q125 162 150 170 Q175 178 200 170 L200 200 L0 200 Z" fill="#4DD0E1" opacity="0.4"><animate attributeName="d" values="M0 170 Q25 162 50 170 Q75 178 100 170 Q125 162 150 170 Q175 178 200 170 L200 200 L0 200 Z;M0 172 Q25 178 50 172 Q75 164 100 172 Q125 178 150 172 Q175 164 200 172 L200 200 L0 200 Z;M0 170 Q25 162 50 170 Q75 178 100 170 Q125 162 150 170 Q175 178 200 170 L200 200 L0 200 Z" dur="5s" repeatCount="indefinite" /></path>
      {/* Bubbles */}
      <circle cx="35" cy="130" r="4" fill="#FFF" opacity="0.3"><animateTransform attributeName="transform" type="translate" values="0,0;0,-8" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="45" cy="120" r="2.5" fill="#FFF" opacity="0.25"><animateTransform attributeName="transform" type="translate" values="0,0;0,-6" dur="4s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.25;0" dur="4s" repeatCount="indefinite" /></circle>
      <circle cx="160" cy="125" r="3" fill="#FFF" opacity="0.3"><animateTransform attributeName="transform" type="translate" values="0,0;0,-7" dur="3.5s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.3;0" dur="3.5s" repeatCount="indefinite" /></circle>
      {/* Shell */}
      <ellipse cx="100" cy="125" rx="42" ry="35" fill="#4CAF50" />
      <ellipse cx="100" cy="125" rx="38" ry="31" fill="#66BB6A" />
      {/* Shell pattern */}
      <path d="M80 105 Q100 95 120 105" stroke="#388E3C" strokeWidth="2" fill="none" />
      <path d="M72 118 Q100 105 128 118" stroke="#388E3C" strokeWidth="2" fill="none" />
      <path d="M70 132 Q100 120 130 132" stroke="#388E3C" strokeWidth="2" fill="none" />
      <line x1="100" y1="95" x2="100" y2="148" stroke="#388E3C" strokeWidth="1.5" />
      <line x1="85" y1="98" x2="78" y2="145" stroke="#388E3C" strokeWidth="1" />
      <line x1="115" y1="98" x2="122" y2="145" stroke="#388E3C" strokeWidth="1" />
      {/* Flippers */}
      <ellipse cx="55" cy="125" rx="14" ry="8" fill="#4CAF50" transform="rotate(-30,55,125)" />
      <ellipse cx="145" cy="125" rx="14" ry="8" fill="#4CAF50" transform="rotate(30,145,125)" />
      {/* Head */}
      <circle cx="100" cy="80" r="26" fill="#66BB6A" />
      <circle cx="100" cy="82" r="20" fill="#A5D6A7" />
      {/* Eyes - sly */}
      <circle cx="90" cy="78" r="6" fill="#FFF" />
      <circle cx="110" cy="78" r="6" fill="#FFF" />
      <circle cx="87" cy="78" r="3.5" fill="#2E7D32" />
      <circle cx="107" cy="78" r="3.5" fill="#2E7D32" />
      <circle cx="86" cy="77" r="1.5" fill="#fff" />
      <circle cx="106" cy="77" r="1.5" fill="#fff" />
      {/* Eyebrows */}
      <path d="M83 72 L96 76" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
      <path d="M117 72 L104 76" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
      {/* Fake smile */}
      <path d="M90 90 Q100 97 110 88" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="80" cy="86" r="5" fill="#FFB6C1" opacity="0.3" />
      <circle cx="120" cy="86" r="5" fill="#FFB6C1" opacity="0.3" />
      {/* Halo with shimmer */}
      <ellipse cx="100" cy="52" rx="18" ry="5" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.5"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" /></ellipse>
      <ellipse cx="100" cy="52" rx="18" ry="5" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.2"><animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" /></ellipse>
    </svg>
  );
}

function BusybodyAlpaca() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180">
      <AnimDefs />
      <defs>
        <linearGradient id="baFlower" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#FFF0F5" /><stop offset="100%" stopColor="#FFE0EB" /></linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#baFlower)" />
      {/* Sparkles */}
      <circle cx="30" cy="40" r="2" fill="#FFD700" opacity="0.4"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="170" cy="50" r="2.5" fill="#FFD700" opacity="0.3"><animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.5s" repeatCount="indefinite" /></circle>
      <circle cx="160" cy="160" r="2" fill="#FFD700" opacity="0.3"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" /></circle>
      {/* Fluffy body */}
      <ellipse cx="100" cy="145" rx="40" ry="35" fill="#FFFAF0" />
      <ellipse cx="100" cy="140" rx="36" ry="30" fill="#FFF5E6" />
      {/* Curly wool puffs */}
      <circle cx="70" cy="130" r="12" fill="#FFFAF0" />
      <circle cx="80" cy="120" r="10" fill="#FFF8F0" />
      <circle cx="120" cy="120" r="10" fill="#FFF8F0" />
      <circle cx="130" cy="130" r="12" fill="#FFFAF0" />
      {/* Long neck */}
      <rect x="88" y="70" width="24" height="55" rx="12" fill="#FFFAF0" />
      <rect x="90" y="72" width="20" height="50" rx="10" fill="#FFF5E6" />
      {/* Head */}
      <ellipse cx="100" cy="62" rx="28" ry="25" fill="#FFFAF0" />
      <ellipse cx="100" cy="64" rx="24" ry="20" fill="#FFF5E6" />
      {/* Fluffy head puff */}
      <circle cx="90" cy="42" r="10" fill="#FFFAF0" />
      <circle cx="100" cy="38" r="11" fill="#FFF8F0" />
      <circle cx="110" cy="42" r="10" fill="#FFFAF0" />
      {/* Ears */}
      <ellipse cx="72" cy="50" rx="8" ry="14" fill="#FFFAF0" transform="rotate(-15,72,50)" />
      <ellipse cx="74" cy="50" rx="5" ry="10" fill="#FFD1DC" transform="rotate(-15,74,50)" />
      <ellipse cx="128" cy="50" rx="8" ry="14" fill="#FFFAF0" transform="rotate(15,128,50)" />
      <ellipse cx="126" cy="50" rx="5" ry="10" fill="#FFD1DC" transform="rotate(15,126,50)" />
      {/* Eyes - looking at you with judgment */}
      <circle cx="90" cy="62" r="5" fill="#FFF" />
      <circle cx="110" cy="62" r="5" fill="#FFF" />
      <circle cx="91" cy="63" r="3" fill="#4A2C2A" />
      <circle cx="111" cy="63" r="3" fill="#4A2C2A" />
      <circle cx="92" cy="62" r="1" fill="#FFF" />
      <circle cx="112" cy="62" r="1" fill="#FFF" />
      {/* Judgmental eyelids */}
      <path d="M84 59 Q90 57 96 60" fill="#FFFAF0" />
      <path d="M104 60 Q110 57 116 59" fill="#FFFAF0" />
      {/* Snout */}
      <ellipse cx="100" cy="74" rx="8" ry="5" fill="#FFD1DC" />
      <circle cx="97" cy="73" r="1.5" fill="#CC8899" />
      <circle cx="103" cy="73" r="1.5" fill="#CC8899" />
      {/* Sly smile */}
      <path d="M93 79 Q100 84 107 79" stroke="#CC8899" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <circle cx="80" cy="70" r="5" fill="#FFB6C1" opacity="0.35" />
      <circle cx="120" cy="70" r="5" fill="#FFB6C1" opacity="0.35" />
      {/* Apron strings (world's most helpful apron) */}
      <path d="M75 130 Q100 145 125 130" stroke="#FF69B4" strokeWidth="2" fill="none" strokeDasharray="4,3" />
      {/* Heart on apron */}
      <path d="M100 138 L96 133 Q92 128 96 125 Q100 122 100 126 Q100 122 104 125 Q108 128 104 133 Z" fill="#FF69B4" opacity="0.4"><animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" /></path>
      {/* Legs */}
      <line x1="85" y1="170" x2="85" y2="188" stroke="#FFFAF0" strokeWidth="6" strokeLinecap="round" />
      <line x1="115" y1="170" x2="115" y2="188" stroke="#FFFAF0" strokeWidth="6" strokeLinecap="round" />
      {/* Gentle bobbing animation */}
      <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="4s" repeatCount="indefinite" />
    </svg>
  );
}

const TYPE_COMPONENTS = {
  INTJ: NightCat,
  INFJ: HighFlower,
  INTP: RobotFace,
  ISTP: CraftsmanWolf,
  ENTJ: BigMom,
  ESTJ: ChargingLion,
  ENTP: MountParrot,
  ENFP: AlleyChihuahua,
  ISTJ: IronVault,
  ISFJ: StrategyPenguin,
  ISFP: ShelterRabbit,
  INFP: TofuMental,
  ESTP: FestivalPanda,
  ESFP: SeaTurtle,
  ENFJ: SunnyRetriever,
  ESFJ: SeaTurtle,
};

export default function AnimalIllustration({ typeKey }) {
  const Component = TYPE_COMPONENTS[typeKey];
  if (!Component) return null;
  return <Component />;
}
