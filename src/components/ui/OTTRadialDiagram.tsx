"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import type { OttNode } from "@/data/portfolio";
import { Icon, type IconName } from "@/components/ui/Icon";
import { onIntroDone } from "@/lib/introSignal";

// SVG viewBox 400×280, center ≈ (200, 140)
const LINE_DEFS: Record<OttNode["position"], { x1: number; y1: number; x2: number; y2: number }> = {
  top:         { x1: 200, y1: 104, x2: 200, y2: 46 },
  left:        { x1: 150, y1: 128, x2: 76,  y2: 118 },
  right:       { x1: 250, y1: 128, x2: 324, y2: 118 },
  bottomLeft:  { x1: 156, y1: 163, x2: 84,  y2: 218 },
  bottom:      { x1: 200, y1: 172, x2: 200, y2: 230 },
  bottomRight: { x1: 244, y1: 163, x2: 316, y2: 218 },
};

const NODE_POSITIONS: Record<OttNode["position"], string> = {
  top:         "top-0 left-1/2 -translate-x-1/2",
  left:        "top-1/3 left-0",
  right:       "top-1/3 right-0",
  bottomLeft:  "bottom-0 left-0",
  bottom:      "bottom-0 left-1/2 -translate-x-1/2",
  bottomRight: "bottom-0 right-0",
};

function lineLen(d: { x1: number; y1: number; x2: number; y2: number }) {
  return Math.ceil(Math.hypot(d.x2 - d.x1, d.y2 - d.y1)) + 6;
}

interface OTTRadialDiagramProps {
  title: string;
  nodes: OttNode[];
}

export function OTTRadialDiagram({ title, nodes }: OTTRadialDiagramProps) {
  const contentRef    = useRef<HTMLDivElement>(null);
  const cloudInnerRef = useRef<HTMLDivElement>(null);
  const lineRefs      = useRef<(SVGLineElement | null)[]>([]);
  const nodeInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const content = contentRef.current;
    const cloud   = cloudInnerRef.current;
    if (!content || !cloud) return;

    // ── initial states ──────────────────────────────────────────────────────
    content.style.opacity = "0";
    cloud.style.opacity   = "0";
    cloud.style.transform = "translateY(8px) scale(0.82)";

    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      const pos = nodes[i]?.position;
      if (!pos) return;
      const len = lineLen(LINE_DEFS[pos]);
      line.style.opacity          = "0";
      line.style.strokeDasharray  = String(len);
      line.style.strokeDashoffset = String(len);
    });

    nodeInnerRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity   = "0";
      el.style.transform = "translateY(10px) scale(0.88)";
    });

    // ── build & run timeline ────────────────────────────────────────────────
    let tl: ReturnType<typeof createTimeline> | null = null;
    let cancelIntro: (() => void) | undefined;
    let started = false;

    function runAnimation() {
      if (started) return;
      started = true;

      tl = createTimeline({ defaults: { ease: "easeOutExpo" } });

      tl.add(content!, { opacity: [0, 1], duration: 320 });

      tl.add(
        cloud!,
        {
          opacity:    [0, 1],
          scale:      [0.82, 1],
          translateY: [8, 0],
          duration:   750,
          ease:       "easeOutElastic(1, 0.55)",
        },
        ">-80",
      );

      nodes.forEach((node, i) => {
        const line   = lineRefs.current[i];
        const nodeEl = nodeInnerRefs.current[i];
        if (!line || !nodeEl) return;

        const len     = lineLen(LINE_DEFS[node.position]);
        const linePos = i === 0 ? ">180" : ">-60";

        tl!.add(
          line,
          {
            opacity:          [0, 1],
            strokeDashoffset: [len, 0],
            duration:         380,
            ease:             "easeInOutQuad",
          },
          linePos,
        );

        tl!.add(
          nodeEl,
          {
            opacity:    [0, 1],
            translateY: [10, 0],
            scale:      [0.88, 1],
            duration:   300,
            ease:       "easeOutExpo",
          },
          ">-90",
        );
      });
    }

    // Start only when both: intro is done AND this card is in the viewport.
    // Body scroll is locked during the intro so the About section can't be
    // in view while the video is playing — onIntroDone is a safety net for
    // edge cases (dev skips, SSR hydration timing, etc.).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        cancelIntro = onIntroDone(runAnimation);
      },
      { threshold: 0.1 },
    );

    observer.observe(content);

    return () => {
      observer.disconnect();
      cancelIntro?.();
      tl?.pause();
    };
  }, [nodes]);

  return (
    <div className="relative bg-cream border-[1.5px] border-ink-soft/[0.18] rounded-md px-4 pt-5 pb-[18px] shadow-card">
      {/* vintage paper tab accent */}
      <span
        className="absolute -top-[9px] right-[38px] w-[50px] h-[18px] -rotate-[1.5deg] bg-khaki/40 border-x border-khaki/[0.22]"
        aria-hidden="true"
      />

      <div ref={contentRef}>
        <h3 className="font-serif italic text-[1.05rem] text-ink text-center leading-[1.4] mb-3 whitespace-pre-line">
          {title}
        </h3>

        <div className="relative h-70">
          {/* ── connection lines ──────────────────────────────────────────── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 400 280"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arr-ott"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="rgba(58,47,37,0.35)" />
              </marker>
            </defs>

            {nodes.map((n, i) => {
              const d   = LINE_DEFS[n.position];
              const len = lineLen(d);
              return (
                <line
                  key={n.position}
                  ref={(el) => { lineRefs.current[i] = el; }}
                  x1={d.x1} y1={d.y1}
                  x2={d.x2} y2={d.y2}
                  stroke="rgba(58,47,37,0.30)"
                  strokeWidth="1.4"
                  strokeDasharray={len}
                  strokeDashoffset={len}
                  opacity={0}
                  markerEnd="url(#arr-ott)"
                />
              );
            })}
          </svg>

          {/* ── central cloud ─────────────────────────────────────────────── */}
          {/* wrapper handles centering; inner div is the animation target */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2">
            <div
              ref={cloudInnerRef}
              style={{ opacity: 0 }}
              className="organic-shape w-27 h-17 flex items-center justify-center text-center font-heading text-[0.62rem] font-semibold tracking-widest uppercase text-ink leading-[1.3] bg-white/92 border-[1.8px] border-ink-soft shadow-[0_3px_12px_rgba(0,0,0,0.1)]"
            >
              OTT
              <br />
              PLATFORM
            </div>
          </div>

          {/* ── ecosystem nodes ───────────────────────────────────────────── */}
          {nodes.map((n, i) => (
            <div
              key={n.name}
              className={`absolute z-3 w-21.5 ${NODE_POSITIONS[n.position]}`}
            >
              {/* wrapper handles absolute position; inner div is the animation target */}
              <div
                ref={(el) => { nodeInnerRefs.current[i] = el; }}
                style={{ opacity: 0 }}
                className="text-center"
              >
                <span className="flex justify-center mb-px text-ink" aria-hidden="true">
                  <Icon name={n.icon as IconName} size={24} />
                </span>
                <div className="font-heading text-[0.6rem] font-medium uppercase tracking-[0.04em] text-ink leading-[1.2]">
                  {n.name}
                </div>
                <div className="font-mono text-[0.46rem] text-khaki mt-px leading-[1.3]">
                  {n.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
