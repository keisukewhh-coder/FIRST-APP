/**
 * 六角形レーダーチャート（SVG）
 * typeKey と modifier から6軸の値を算出し、ヘキサゴンで描画する
 */
export default function RadarChart({ typeKey, modifier }) {
  if (!typeKey || typeKey.length < 4) return null;

  // modifier から承認欲求・情緒不安定度を算出
  const modifierMap = {
    '加工上手の':       { approval: 4.5, emotion: 2 },
    '鍵アカストーカーの': { approval: 3,   emotion: 4.5 },
    '即泣き地雷原な':   { approval: 2.5, emotion: 5 },
    'べらべら':         { approval: 3.5, emotion: 3 },
    '平凡な':           { approval: 2.5, emotion: 2.5 },
    '量産型の':         { approval: 2.5, emotion: 2.5 },
    '悟りを開いた':     { approval: 1.5, emotion: 1.5 },
    '無害な':           { approval: 1.5, emotion: 1.5 },
  };
  const spice = modifierMap[modifier] || { approval: 2, emotion: 2 };

  // 6軸の定義
  const axes = [
    { label: '支配欲',     value: typeKey[0] === 'E' ? 4 : 1.5 },
    { label: '計算高さ',   value: typeKey[2] === 'T' ? 4 : 1.5 },
    { label: '束縛力',     value: typeKey[3] === 'J' ? 4 : 1.5 },
    { label: '裏表度',     value: typeKey[1] === 'N' ? 4 : 2 },
    { label: '承認欲求',   value: spice.approval },
    { label: '情緒不安定', value: spice.emotion },
  ];

  const cx = 100;
  const cy = 105;
  const radius = 65;
  const total = 6;
  const maxValue = 5;

  function getPoint(centerX, centerY, r, index) {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  }

  // グリッド線（3段階: 33%, 66%, 100%）
  const gridLevels = [0.33, 0.66, 1.0];
  const gridPolygons = gridLevels.map((level) => {
    const points = [];
    for (let i = 0; i < total; i++) {
      const p = getPoint(cx, cy, radius * level, i);
      points.push(`${p.x},${p.y}`);
    }
    return points.join(' ');
  });

  // 骨格線（中心から各頂点）
  const spokes = [];
  for (let i = 0; i < total; i++) {
    const p = getPoint(cx, cy, radius, i);
    spokes.push({ x1: cx, y1: cy, x2: p.x, y2: p.y });
  }

  // データ領域のポリゴン
  const dataPoints = axes.map((axis, i) => {
    const ratio = Math.min(axis.value, maxValue) / maxValue;
    const p = getPoint(cx, cy, radius * ratio, i);
    return { x: p.x, y: p.y };
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // ラベル位置（六角形の外側）
  const labelRadius = radius + 26;
  const labels = axes.map((axis, i) => {
    const p = getPoint(cx, cy, labelRadius, i);
    return { ...axis, x: p.x, y: p.y };
  });

  return (
    <div className="w-full max-w-[260px] mx-auto">
      <svg viewBox="0 0 200 210" xmlns="http://www.w3.org/2000/svg">
        {/* グリッド線（3段階） */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke="rgba(204,17,51,0.15)"
            strokeWidth="0.8"
          />
        ))}

        {/* 骨格線（中心から頂点） */}
        {spokes.map((s, i) => (
          <line
            key={`spoke-${i}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="rgba(204,17,51,0.15)"
            strokeWidth="0.8"
          />
        ))}

        {/* データ領域 */}
        <polygon
          points={dataPolygon}
          fill="rgba(204,17,51,0.25)"
          stroke="rgba(204,17,51,0.7)"
          strokeWidth="1.5"
        />

        {/* 各頂点のドット */}
        {dataPoints.map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#CC1133"
          />
        ))}

        {/* 軸ラベルと値 */}
        {labels.map((label, i) => {
          let textAnchor = 'middle';
          if (label.x < cx - 10) textAnchor = 'end';
          else if (label.x > cx + 10) textAnchor = 'start';

          const displayValue = Number.isInteger(label.value)
            ? label.value
            : label.value.toFixed(1);

          return (
            <g key={`label-${i}`}>
              <text
                x={label.x}
                y={label.y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fill="#A88888"
                fontSize="8.5"
                fontWeight="500"
              >
                {label.label}
                <tspan fill="#CC1133" fontSize="7.5" dx="2">
                  {displayValue}
                </tspan>
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
