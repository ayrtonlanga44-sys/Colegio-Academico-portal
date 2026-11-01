import { useId } from "react";

/** Selo oficial (réplica em SVG): anel burgundy, "A" verde entrelaçado, BEIRA em baixo. */
export function Logo({ size = 44 }: { size?: number }) {
  const arcId = `arc-${useId().replace(/:/g, "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Selo do Colégio Académico da Beira"
    >
      <defs>
        <path id={arcId} d="M 13,50 A 37,37 0 0 1 87,50" />
      </defs>

      <circle cx="50" cy="50" r="48" fill="#F7F1E3" stroke="#6B1D39" strokeWidth="3" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#00A651" strokeWidth="1.5" />

      <text
        fontFamily="Georgia, serif"
        fontSize="7.4"
        fontWeight="700"
        letterSpacing="1.1"
        fill="#6B1D39"
      >
        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
          COLÉGIO ACADÉMICO
        </textPath>
      </text>

      {/* "A" entrelaçado: traço burgundy por baixo, verde por cima */}
      <path
        d="M31 68 L49 26 L67 68"
        fill="none"
        stroke="#6B1D39"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 68 L53 26 L71 68 M42 55 H64"
        fill="none"
        stroke="#00A651"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="50"
        y="89"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="2"
        fill="#6B1D39"
      >
        BEIRA
      </text>
    </svg>
  );
}
