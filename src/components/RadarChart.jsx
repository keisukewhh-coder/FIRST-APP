/**
 * 五角形レーダーチャート（SVG）
 * typeKey と modifier から5軸の値を算出し、五角形で描画する
 */
export default function RadarChart({ typeKey, modifier }) {
  if (!typeKey || typeKey.length < 4) return null;

  // ゲス度を modifier から算出
  const spiceModifiers = {
    '加工上手の': 4.5,
    '鍵アカストーカーの': 5,
    '即泣き地雷原な': 4,
    'べらべら': 3.5,
  };
  const gesudoValue = spiceModifiers[modifier] || 2;

  // 5軸の定義
  const axes = [
    { label: '支配欲', value: typeKey[0] === 'E' ? 4 : 1 },
    { label: '計算高さ', value: typeKey[2] === 'T' ? 4 : 1.5 },
    { label: '束縛力', value: typeKey[3] === 'J' ? 4 : 1 },
    { label: '裏表度', value: typeKey[1] === 'N' ? 4 : 2 },
    { label: 'ゲス度', value: gesudoValue },
  ];

  const cx = 100;
  const cy = 100;
  const radius = 70;
  const total = 5;
  const maxValue = 5;

  // 上が0度から時計回り
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

  // ラベル位置（五角形の外側）
  const labelRadius = radius + 24;
  const labels = axes.map((axis, i) => {
    const p = getPoint(cx, cy, labelRadius, i);
    return { ...axis, x: p.x, y: p.y };
  });

  return (
    <div className="w-full max-w-[240px] mx-auto">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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
          fill="rgba(204,17,51,0.3)"
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
          // テキストアンカーを位置に応じて調整
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
                fontSize="9"
                fontWeight="500"
              >
                {label.label}
                <tspan fill="#CC1133" fontSize="8" dx="2">
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
