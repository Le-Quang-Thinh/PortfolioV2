"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EQ_BAR_COUNT = 14;

export function HUDDecorations() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const eqBarsLeft = root.querySelectorAll<HTMLElement>("[data-eq-left]");
    const eqBarsRight = root.querySelectorAll<HTMLElement>("[data-eq-right]");

    const a1 = animate(Array.from(eqBarsLeft), {
      scaleY: [0.4, 0.8, 0.4, 0.65, 0.4],
      duration: 1800,
      loop: true,
      ease: "inOutSine",
      delay: stagger(90, { from: "center" }),
    });

    const a2 = animate(Array.from(eqBarsRight), {
      scaleY: [0.4, 0.75, 0.45, 0.8, 0.4],
      duration: 1900,
      loop: true,
      ease: "inOutSine",
      delay: stagger(100, { from: "last" }),
    });

    return () => {
      a1.pause();
      a2.pause();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        transform: "translate3d(calc(var(--px, 0) * 4px), calc(var(--py, 0) * 4px), 0)",
        transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Equalizer left — scoped to the left ~18vw side column */}
      <div className="absolute left-1 top-1/2 hidden -translate-y-1/2 items-end gap-0.75 opacity-60 md:flex">
        {Array.from({ length: EQ_BAR_COUNT }).map((_, i) => (
          <span
            key={`eq-l-${i}`}
            data-eq-left
            className="block w-0.75 origin-bottom rounded-sm bg-linear-to-t from-cyan-500/25 via-cyan-300/65 to-violet-300/65"
            style={{ height: `${18 + ((i * 17) % 52)}px` }}
          />
        ))}
      </div>

      {/* Equalizer right — scoped to the right ~18vw side column */}
      <div className="absolute right-1 top-1/2 hidden -translate-y-1/2 items-end gap-0.75 opacity-60 md:flex">
        {Array.from({ length: EQ_BAR_COUNT }).map((_, i) => (
          <span
            key={`eq-r-${i}`}
            data-eq-right
            className="block w-0.75 origin-bottom rounded-sm bg-linear-to-t from-violet-500/25 via-violet-300/65 to-cyan-300/65"
            style={{ height: `${20 + ((i * 23) % 48)}px` }}
          />
        ))}
      </div>
    </div>
  );
}
