"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SPARKLES = [
  { left: "8%",  top: "20%", size: 3, color: "rgba(125,211,252,0.9)" },
  { left: "91%", top: "17%", size: 2, color: "rgba(167,139,250,0.9)" },
  { left: "14%", top: "74%", size: 2, color: "rgba(244,114,182,0.9)" },
  { left: "86%", top: "70%", size: 3, color: "rgba(125,211,252,0.9)" },
  { left: "35%", top: "9%",  size: 2, color: "rgba(167,139,250,0.85)" },
  { left: "68%", top: "88%", size: 2, color: "rgba(125,211,252,0.85)" },
];

export function MemoryGridBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const sparkleLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const layer = sparkleLayerRef.current;
    if (!layer) return;
    const sparkles = layer.querySelectorAll<HTMLElement>("[data-sparkle]");
    if (!sparkles.length) return;

    const anim = animate(Array.from(sparkles), {
      opacity: [0.4, 1, 0.4],
      scale: [0.85, 1.05, 0.85],
      duration: 3200,
      ease: "inOutSine",
      loop: true,
      delay: stagger(180, { from: "random" }),
    });

    return () => { anim.pause(); };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        transform: "translate3d(calc(var(--px, 0) * 6px), calc(var(--py, 0) * 6px), 0)",
        transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Deep navy→indigo gradient halo behind the center card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(139,92,246,0.18) 0%, transparent 52%), radial-gradient(ellipse at 50% 30%, rgba(34,211,238,0.08) 0%, rgba(6,8,26,0) 50%)",
        }}
      />

      {/* Blueprint grid — main */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 50%, #000 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, #000 25%, transparent 75%)",
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Static sparkle stars — slow opacity pulse */}
      <div ref={sparkleLayerRef} className="absolute inset-0">
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            data-sparkle
            className="absolute"
            style={{
              left: s.left,
              top: s.top,
              width: s.size * 2,
              height: s.size * 2,
              opacity: 0.5,
            }}
          >
            {/* 4-pointed cross-star SVG */}
            <svg
              width={s.size * 2}
              height={s.size * 2}
              viewBox="0 0 8 8"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 0 L4.5 3.5 L8 4 L4.5 4.5 L4 8 L3.5 4.5 L0 4 L3.5 3.5 Z"
                fill={s.color}
                style={{ filter: `drop-shadow(0 0 ${s.size * 2}px ${s.color})` }}
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
