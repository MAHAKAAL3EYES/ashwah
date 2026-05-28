/**
 * Procedural SVG fabric swatch — placeholder when no product image is uploaded.
 * Deterministic pattern by index so the same product always looks the same.
 */
export function FabricSwatch({ index }: { index: number }) {
  const patterns = [
    { stroke: "rgba(17,17,17,0.08)", gap: 5, angle: 45, fill: "#F5F4F1" },
    { stroke: "rgba(17,17,17,0.06)", gap: 4, angle: 0, fill: "#EFEEEA" },
    { stroke: "rgba(17,17,17,0.07)", gap: 6, angle: 90, fill: "#F2F1ED" },
    { stroke: "rgba(17,17,17,0.05)", gap: 5, angle: 135, fill: "#F3F2EE" },
  ];
  const p = patterns[index % patterns.length];
  const id = `weave-${index}`;

  return (
    <svg
      viewBox="0 0 200 250"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="200" height="250" fill={p.fill} />
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          width={p.gap}
          height={p.gap}
          patternTransform={`rotate(${p.angle})`}
        >
          <path
            d={`M0,${p.gap / 2} L${p.gap},${p.gap / 2} M${p.gap / 2},0 L${p.gap / 2},${p.gap}`}
            stroke={p.stroke}
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="200" height="250" fill={`url(#${id})`} />
      <ellipse cx="60" cy="55" rx="110" ry="70" fill="white" opacity="0.22" />
    </svg>
  );
}
