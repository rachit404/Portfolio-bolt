type Corner = "tl" | "tr" | "bl" | "br";

const cornerClasses: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0 -scale-x-100",
  bl: "bottom-0 left-0 -scale-y-100",
  br: "bottom-0 right-0 -scale-x-100 -scale-y-100",
};

const rings = [24, 48, 72, 96, 120, 144];
const spokes = [0, 18, 36, 54, 72, 90];

export function SpiderWeb({ corner = "tl", className = "" }: { corner?: Corner; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute h-28 w-28 text-primary opacity-40 sm:h-40 sm:w-40 ${cornerClasses[corner]} ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        {spokes.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return <line key={deg} x1="0" y1="0" x2={Math.cos(rad) * 160} y2={Math.sin(rad) * 160} />;
        })}
        {rings.map((r) => (
          <path
            key={r}
            d={spokes
              .map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
              })
              .join(" ")}
          />
        ))}
      </g>
    </svg>
  );
}
