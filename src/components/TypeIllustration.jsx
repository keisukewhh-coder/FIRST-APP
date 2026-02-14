const COLORS = {
  'F+I+C+': { bg: '#ffecd2', accent: '#ff9a56', hair: '#e07340' },
  'F+I+C-': { bg: '#e8daef', accent: '#9b59b6', hair: '#7d3c98' },
  'F+I-C+': { bg: '#d4efdf', accent: '#27ae60', hair: '#1e8449' },
  'F+I-C-': { bg: '#d6eaf8', accent: '#2e86c1', hair: '#1a5276' },
  'F-I+C+': { bg: '#fdebd0', accent: '#e67e22', hair: '#ca6f1e' },
  'F-I+C-': { bg: '#fadbd8', accent: '#e74c3c', hair: '#c0392b' },
  'F-I-C+': { bg: '#d5f5e3', accent: '#1abc9c', hair: '#148f77' },
  'F-I-C-': { bg: '#eaecee', accent: '#566573', hair: '#2c3e50' },
};

// 冒険者タイプ: リュック・コンパス
function Adventurer({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair */}
      <ellipse cx="80" cy="55" rx="28" ry="16" fill={hair} />
      <rect x="52" y="50" width="56" height="10" rx="5" fill={hair} />
      {/* Eyes */}
      <circle cx="70" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="3" fill="#2c2c2c" />
      {/* Eye shine */}
      <circle cx="71" cy="71" r="1" fill="#fff" />
      <circle cx="91" cy="71" r="1" fill="#fff" />
      {/* Mouth - big smile */}
      <path d="M72 82 Q80 90 88 82" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="62" cy="80" r="5" fill="#f5b7b1" opacity="0.6" />
      <circle cx="98" cy="80" r="5" fill="#f5b7b1" opacity="0.6" />
      {/* Backpack strap */}
      <line x1="62" y1="100" x2="62" y2="115" stroke="#d4a84b" strokeWidth="3" strokeLinecap="round" />
      <line x1="98" y1="100" x2="98" y2="115" stroke="#d4a84b" strokeWidth="3" strokeLinecap="round" />
      {/* Compass */}
      <circle cx="120" cy="55" r="12" fill="#fff" stroke="#d4a84b" strokeWidth="2" />
      <polygon points="120,46 117,55 120,53 123,55" fill="#e74c3c" />
      <polygon points="120,64 117,55 120,57 123,55" fill="#95a5a6" />
    </svg>
  );
}

// 開拓者タイプ: 旗・マント
function Pioneer({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Cape */}
      <path d="M55 105 L40 135 Q55 128 55 130" fill={accent} opacity="0.5" />
      <path d="M105 105 L120 135 Q105 128 105 130" fill={accent} opacity="0.5" />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair - spiky */}
      <polygon points="55,60 60,38 68,55" fill={hair} />
      <polygon points="65,55 72,35 78,52" fill={hair} />
      <polygon points="78,52 85,32 92,52" fill={hair} />
      <polygon points="88,55 95,38 105,60" fill={hair} />
      <rect x="52" y="52" width="56" height="12" rx="5" fill={hair} />
      {/* Eyes - determined */}
      <circle cx="70" cy="72" r="3.5" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="3.5" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="1.2" fill="#fff" />
      <circle cx="91" cy="71" r="1.2" fill="#fff" />
      {/* Determined eyebrows */}
      <line x1="65" y1="64" x2="74" y2="66" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
      <line x1="95" y1="64" x2="86" y2="66" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" />
      {/* Mouth - grin */}
      <path d="M73 82 Q80 88 87 82" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="62" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      <circle cx="98" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      {/* Flag */}
      <line x1="125" y1="30" x2="125" y2="75" stroke="#8B7355" strokeWidth="2.5" />
      <polygon points="125,30 145,38 125,46" fill={accent} />
    </svg>
  );
}

// リーダータイプ: 星バッジ・メガホン
function Leader({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair - neat */}
      <ellipse cx="80" cy="52" rx="30" ry="18" fill={hair} />
      <rect x="50" y="50" width="60" height="8" rx="4" fill={hair} />
      {/* Eyes */}
      <circle cx="70" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="1" fill="#fff" />
      <circle cx="91" cy="71" r="1" fill="#fff" />
      {/* Confident smile */}
      <path d="M70 83 Q80 90 90 83" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="62" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      <circle cx="98" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      {/* Star badge */}
      <polygon points="80,98 82,104 88,104 83,108 85,114 80,110 75,114 77,108 72,104 78,104" fill="#d4a84b" />
      {/* Megaphone */}
      <polygon points="125,60 140,50 140,75 125,68" fill={accent} opacity="0.8" />
      <rect x="118" y="60" width="8" height="8" rx="2" fill="#aaa" />
    </svg>
  );
}

// 探求者タイプ: メガネ・本
function Researcher({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair */}
      <ellipse cx="80" cy="50" rx="28" ry="16" fill={hair} />
      <rect x="52" y="48" width="56" height="10" rx="5" fill={hair} />
      {/* Glasses */}
      <circle cx="70" cy="72" r="8" fill="none" stroke="#555" strokeWidth="2" />
      <circle cx="90" cy="72" r="8" fill="none" stroke="#555" strokeWidth="2" />
      <line x1="78" y1="72" x2="82" y2="72" stroke="#555" strokeWidth="2" />
      <line x1="62" y1="72" x2="52" y2="68" stroke="#555" strokeWidth="2" />
      <line x1="98" y1="72" x2="108" y2="68" stroke="#555" strokeWidth="2" />
      {/* Eyes behind glasses */}
      <circle cx="70" cy="72" r="2.5" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="2.5" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="0.8" fill="#fff" />
      <circle cx="91" cy="71" r="0.8" fill="#fff" />
      {/* Thinking smile */}
      <path d="M75 83 Q80 86 85 83" stroke="#c0392b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Book */}
      <rect x="115" y="90" width="22" height="28" rx="2" fill={accent} />
      <rect x="116" y="91" width="20" height="26" rx="1" fill="#fff" />
      <line x1="126" y1="91" x2="126" y2="117" stroke={accent} strokeWidth="1" />
      <line x1="120" y1="97" x2="132" y2="97" stroke="#ccc" strokeWidth="1" />
      <line x1="120" y1="101" x2="132" y2="101" stroke="#ccc" strokeWidth="1" />
      <line x1="120" y1="105" x2="132" y2="105" stroke="#ccc" strokeWidth="1" />
    </svg>
  );
}

// 調和者タイプ: ハート
function Harmonizer({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair - soft wavy */}
      <ellipse cx="80" cy="52" rx="30" ry="18" fill={hair} />
      <circle cx="55" cy="60" r="8" fill={hair} />
      <circle cx="105" cy="60" r="8" fill={hair} />
      <rect x="50" y="50" width="60" height="8" rx="4" fill={hair} />
      {/* Eyes - warm */}
      <ellipse cx="70" cy="72" rx="3" ry="3.5" fill="#2c2c2c" />
      <ellipse cx="90" cy="72" rx="3" ry="3.5" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="1" fill="#fff" />
      <circle cx="91" cy="71" r="1" fill="#fff" />
      {/* Warm smile */}
      <path d="M70 82 Q80 92 90 82" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Big cheeks */}
      <circle cx="60" cy="80" r="6" fill="#f5b7b1" opacity="0.5" />
      <circle cx="100" cy="80" r="6" fill="#f5b7b1" opacity="0.5" />
      {/* Hearts */}
      <path d="M30 50 C30 45 37 42 37 48 C37 42 44 45 44 50 C44 56 37 60 37 60 C37 60 30 56 30 50Z" fill="#e74c3c" opacity="0.7" />
      <path d="M120 40 C120 36 125 34 125 38 C125 34 130 36 130 40 C130 44 125 47 125 47 C125 47 120 44 120 40Z" fill="#e74c3c" opacity="0.5" />
      <path d="M118 75 C118 72 122 70 122 73 C122 70 126 72 126 75 C126 78 122 80 122 80 C122 80 118 78 118 75Z" fill="#e74c3c" opacity="0.6" />
    </svg>
  );
}

// 職人タイプ: 筆・ベレー帽
function Craftsman({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Beret hat */}
      <ellipse cx="80" cy="48" rx="32" ry="12" fill={accent} />
      <ellipse cx="75" cy="42" rx="22" ry="14" fill={accent} />
      <circle cx="75" cy="32" r="4" fill={accent} />
      {/* Hair under beret */}
      <rect x="52" y="50" width="56" height="8" rx="4" fill={hair} />
      {/* Eyes - focused */}
      <circle cx="70" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="1" fill="#fff" />
      <circle cx="91" cy="71" r="1" fill="#fff" />
      {/* Slight smile */}
      <path d="M74 83 Q80 87 86 83" stroke="#c0392b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="62" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      <circle cx="98" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      {/* Paintbrush */}
      <line x1="125" y1="55" x2="135" y2="95" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="124" cy="53" rx="5" ry="8" fill={accent} transform="rotate(-10, 124, 53)" />
      {/* Paint palette */}
      <ellipse cx="35" cy="115" rx="14" ry="10" fill="#ddd" />
      <circle cx="30" cy="112" r="3" fill="#e74c3c" />
      <circle cx="37" cy="110" r="3" fill="#3498db" />
      <circle cx="40" cy="117" r="3" fill="#f1c40f" />
    </svg>
  );
}

// 司令塔タイプ: クリップボード・チェス
function Commander({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Tie */}
      <polygon points="77,100 83,100 82,118 80,120 78,118" fill="#d4a84b" />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair - short neat */}
      <ellipse cx="80" cy="50" rx="28" ry="16" fill={hair} />
      <rect x="52" y="48" width="56" height="10" rx="5" fill={hair} />
      {/* Eyes */}
      <circle cx="70" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="1" fill="#fff" />
      <circle cx="91" cy="71" r="1" fill="#fff" />
      {/* Confident smile */}
      <path d="M72 82 Q80 89 88 82" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="62" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      <circle cx="98" cy="80" r="4" fill="#f5b7b1" opacity="0.5" />
      {/* Clipboard */}
      <rect x="118" y="55" width="22" height="30" rx="2" fill="#ddd" />
      <rect x="126" y="52" width="6" height="5" rx="1.5" fill="#999" />
      <line x1="122" y1="64" x2="136" y2="64" stroke="#aaa" strokeWidth="1.5" />
      <line x1="122" y1="69" x2="136" y2="69" stroke="#aaa" strokeWidth="1.5" />
      <line x1="122" y1="74" x2="136" y2="74" stroke="#aaa" strokeWidth="1.5" />
      <path d="M123 78 L127 82 L134 74" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// 戦略家タイプ: ギア・チェス駒
function Strategist({ bg, accent, hair }) {
  return (
    <svg viewBox="0 0 160 160" width="140" height="140">
      <circle cx="80" cy="80" r="75" fill={bg} />
      {/* Body */}
      <rect x="55" y="100" width="50" height="35" rx="12" fill={accent} />
      {/* Head */}
      <circle cx="80" cy="72" r="30" fill="#fce4c8" />
      {/* Hair - slicked */}
      <ellipse cx="80" cy="48" rx="29" ry="16" fill={hair} />
      <rect x="51" y="46" width="58" height="12" rx="5" fill={hair} />
      {/* Eyes - analytical */}
      <circle cx="70" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="90" cy="72" r="3" fill="#2c2c2c" />
      <circle cx="71" cy="71" r="1" fill="#fff" />
      <circle cx="91" cy="71" r="1" fill="#fff" />
      {/* Subtle knowing smile */}
      <path d="M74 82 Q80 86 86 82" stroke="#c0392b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="62" cy="80" r="4" fill="#f5b7b1" opacity="0.4" />
      <circle cx="98" cy="80" r="4" fill="#f5b7b1" opacity="0.4" />
      {/* Gear */}
      <g transform="translate(125, 50)">
        <circle cx="0" cy="0" r="10" fill="none" stroke={accent} strokeWidth="3" />
        <circle cx="0" cy="0" r="4" fill={accent} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 12;
          const y = Math.sin(rad) * 12;
          return <circle key={i} cx={x} cy={y} r="2.5" fill={accent} />;
        })}
      </g>
      {/* Chess piece - king */}
      <g transform="translate(30, 108)">
        <rect x="-6" y="12" width="12" height="4" rx="1" fill="#999" />
        <rect x="-4" y="4" width="8" height="10" rx="2" fill="#bbb" />
        <rect x="-2" y="-2" width="4" height="6" rx="1" fill="#bbb" />
        <line x1="0" y1="-6" x2="0" y2="-1" stroke="#999" strokeWidth="2" />
        <line x1="-3" y1="-4" x2="3" y2="-4" stroke="#999" strokeWidth="2" />
      </g>
    </svg>
  );
}

const TYPE_COMPONENTS = {
  'F+I+C+': Adventurer,
  'F+I+C-': Pioneer,
  'F+I-C+': Leader,
  'F+I-C-': Researcher,
  'F-I+C+': Harmonizer,
  'F-I+C-': Craftsman,
  'F-I-C+': Commander,
  'F-I-C-': Strategist,
};

export default function TypeIllustration({ typeKey }) {
  const Component = TYPE_COMPONENTS[typeKey];
  const colors = COLORS[typeKey];

  if (!Component || !colors) return null;

  return <Component bg={colors.bg} accent={colors.accent} hair={colors.hair} />;
}
