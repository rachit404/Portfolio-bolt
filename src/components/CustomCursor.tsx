import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 10;
const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, label, [role='button']";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    setEnabled(true);
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const target = { x: -100, y: -100 };
    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }));
    let hovering = false;
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const interactive = (event.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR);
      hovering = Boolean(interactive);
    };

    const tick = () => {
      points.forEach((point, i) => {
        const leader = i === 0 ? target : points[i - 1];
        const ease = i === 0 ? 0.55 : 0.32 - i * 0.012;
        point.x += (leader.x - point.x) * ease;
        point.y += (leader.y - point.y) * ease;

        const el = dotRefs.current[i];
        if (!el) return;
        const scale = (1 - i / TRAIL_LENGTH) * (hovering ? 1.8 : 1);
        const size = i === 0 ? 8 : 6;
        el.style.transform = `translate3d(${point.x - size / 2}px, ${point.y - size / 2}px, 0) scale(${scale})`;
        el.style.opacity = String(hovering && i === 0 ? 0.35 : 0.9 - i * 0.075);
      });
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120]">
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className={`absolute top-0 left-0 rounded-full bg-primary ${i === 0 ? "h-2 w-2 shadow-[0_0_10px_rgb(var(--primary-rgb))]" : "h-1.5 w-1.5"}`}
        />
      ))}
    </div>
  );
}
