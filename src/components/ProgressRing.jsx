import { useMemo } from "react";

const ProgressRing = ({
  percent = 0,
  color = "#5F33E1",
  trackColor = "#EEEEEE",
  size: sizeProp,
  stroke: strokeProp,
  className = "",
  ...props
}) => {
  let cssSize, cssStroke;
  if (typeof document !== "undefined") {
    const root = document.getElementById("root");
    if (root) {
      const cs = getComputedStyle(root);
      cssSize = Number(cs.getPropertyValue("--progress-ring-size")) || undefined;
      cssStroke = Number(cs.getPropertyValue("--progress-ring-stroke")) || undefined;
    }
  }
  const size = sizeProp ?? cssSize ?? 40;
  const stroke = strokeProp ?? cssStroke ?? 4;

  const { r, C, clamped, dash } = useMemo(() => {
    const r = (size - stroke) / 2;
    const C = 2 * Math.PI * r;
    const clamped = Math.min(100, Math.max(0, percent));
    const dash = C * (clamped / 100);
    return { r, C, clamped, dash };
  }, [size, stroke, percent]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`shrink-0 fill-light-text dark:fill-dark-text ${className}`}
      role="img"
      aria-label={`Progress ${Math.round(clamped)} percent`}
      {...props}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={trackColor}
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${C}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-700 ease-in-out"
      />
      <text
        className="text-small desktop:text-small-desktop"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {Math.round(clamped)}%
      </text>
    </svg>
  );
};

export default ProgressRing;
