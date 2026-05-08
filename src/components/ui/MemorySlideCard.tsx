"use client";

import { forwardRef } from "react";
import type { MemoryChapter, MemoryAccent } from "@/data/portfolio";

interface AccentTokens {
  ring: string;
  glow: string;
  activeGlow: string;
  text: string;
  rgba: string;
}

const ACCENTS: Record<MemoryAccent, AccentTokens> = {
  cyan: {
    ring: "border-cyan-300/55",
    glow: "shadow-[0_0_80px_rgb(139_92_246/0.45),0_0_24px_rgb(34_211_238/0.35),inset_0_0_32px_rgb(34_211_238/0.18)]",
    activeGlow: "hover:shadow-[0_0_100px_rgb(139_92_246/0.6),0_0_32px_rgb(34_211_238/0.5),inset_0_0_32px_rgb(34_211_238/0.25)]",
    text: "text-cyan-200",
    rgba: "56,189,248",
  },
  magenta: {
    ring: "border-fuchsia-300/55",
    glow: "shadow-[0_0_80px_rgb(139_92_246/0.45),0_0_24px_rgb(217_70_239/0.35),inset_0_0_32px_rgb(217_70_239/0.18)]",
    activeGlow: "hover:shadow-[0_0_100px_rgb(139_92_246/0.6),0_0_32px_rgb(217_70_239/0.5),inset_0_0_32px_rgb(217_70_239/0.25)]",
    text: "text-fuchsia-200",
    rgba: "217,70,239",
  },
  amber: {
    ring: "border-amber-300/55",
    glow: "shadow-[0_0_80px_rgb(139_92_246/0.45),0_0_24px_rgb(251_191_36/0.35),inset_0_0_32px_rgb(251_191_36/0.18)]",
    activeGlow: "hover:shadow-[0_0_100px_rgb(139_92_246/0.6),0_0_32px_rgb(251_191_36/0.5),inset_0_0_32px_rgb(251_191_36/0.25)]",
    text: "text-amber-200",
    rgba: "251,191,36",
  },
  lime: {
    ring: "border-lime-300/55",
    glow: "shadow-[0_0_80px_rgb(139_92_246/0.45),0_0_24px_rgb(163_230_53/0.35),inset_0_0_32px_rgb(163_230_53/0.18)]",
    activeGlow: "hover:shadow-[0_0_100px_rgb(139_92_246/0.6),0_0_32px_rgb(163_230_53/0.5),inset_0_0_32px_rgb(163_230_53/0.25)]",
    text: "text-lime-200",
    rgba: "163,230,53",
  },
  violet: {
    ring: "border-violet-300/55",
    glow: "shadow-[0_0_80px_rgb(139_92_246/0.45),0_0_24px_rgb(167_139_250/0.38),inset_0_0_32px_rgb(167_139_250/0.18)]",
    activeGlow: "hover:shadow-[0_0_100px_rgb(139_92_246/0.6),0_0_32px_rgb(167_139_250/0.5),inset_0_0_32px_rgb(167_139_250/0.25)]",
    text: "text-violet-200",
    rgba: "167,139,250",
  },
};

interface MemorySlideCardProps {
  chapter: MemoryChapter;
  isActive: boolean;
}

export const MemorySlideCard = forwardRef<HTMLDivElement, MemorySlideCardProps>(
  function MemorySlideCard({ chapter, isActive }, ref) {
    const tokens = ACCENTS[chapter.accent];
    const rgba = tokens.rgba;

    return (
      <div
        ref={ref}
        className={`relative w-[240px] sm:w-[280px] md:w-[320px] select-none ${
          isActive ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Description glass panel — upper-right of frame, active only */}
        {isActive && (
          <div
            data-anime="description"
            className="absolute z-20 hidden w-[200px] rounded-xl border bg-[#080d28]/80 p-3.5 backdrop-blur-xl md:block lg:w-[240px]"
            style={{
              left: "calc(100% + 16px)",
              top: "0px",
              borderColor: `rgba(${rgba},0.32)`,
              boxShadow: `0 0 24px rgba(${rgba},0.10), inset 0 0 20px rgba(${rgba},0.05)`,
              opacity: 0,
            }}
          >
            <p className={`mb-2 font-mono text-[0.54rem] tracking-[0.28em] uppercase ${tokens.text}`}>
              {chapter.description}
            </p>
          </div>
        )}

        {/* Date pill — upper-left, active only */}
        {isActive && (
          <div
            data-anime="date"
            className="absolute z-20 -top-7 left-0 flex items-center gap-1.5 rounded-full border border-white/18 bg-[#080d28]/70 px-2.5 py-1 backdrop-blur-md"
            style={{ opacity: 0 }}
          >
            <span className={`font-mono text-[0.44rem] tracking-[0.28em] ${tokens.text}`}>✦</span>
            <span className="font-mono text-[0.44rem] tracking-[0.22em] text-white/75">{chapter.date}</span>
          </div>
        )}

        {/* Holographic disc — peeks behind right edge, active only */}
        {isActive && (
          <div
            data-anime="disc"
            className="pointer-events-none absolute -right-[22%] top-[8%] hidden h-[80%] w-[80%] md:block"
            style={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, rgba(${rgba},0.6), rgba(125,211,252,0.45), rgba(244,114,182,0.55), rgba(251,191,36,0.45), rgba(${rgba},0.6))`,
                filter: "blur(1.5px)",
                opacity: 0.75,
              }}
            />
            <div className="absolute inset-5 rounded-full border border-white/18 bg-[#06081a]/72 backdrop-blur-sm" />
            <div className="absolute inset-12 rounded-full border border-white/14" />
            <div className="absolute inset-[72px] rounded-full border border-white/12" />
            <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/22 bg-[#06081a]" />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 28% 28%, rgba(255,255,255,0.48) 0%, transparent 38%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        )}

        {/* Card frame */}
        <div
          className={`relative overflow-hidden rounded-2xl border ${tokens.ring} ${isActive ? `${tokens.glow} ${tokens.activeGlow}` : ""} bg-[#06081a]/82 backdrop-blur-md transition-shadow duration-500`}
        >
          {/* Window chrome header — active only */}
          {isActive && (
            <div
              data-anime="window-chrome"
              className="flex items-center justify-end border-b px-3 py-[6px]"
              style={{
                borderColor: `rgba(${rgba},0.26)`,
                background: `rgba(6,8,26,0.55)`,
              }}
            >
              <div className="flex items-center gap-[5px]" aria-hidden>
                {(["─", "□", "✕"] as const).map((sym, i) => (
                  <span
                    key={sym}
                    className={`flex h-[12px] w-[12px] items-center justify-center border text-[0.38rem] leading-none ${
                      i === 2
                        ? "border-fuchsia-300/40 text-fuchsia-300/65"
                        : "border-white/18 text-white/38"
                    }`}
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Artwork area — portrait 3/4 */}
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            {/* Artwork + overlays — fades in as "frame" */}
            <div
              data-anime="frame"
              className="absolute inset-0"
              style={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${chapter.image})` }}
                aria-hidden
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(140deg, rgba(${rgba},0.28) 0%, rgba(6,8,26,0.65) 55%, rgba(2,3,8,0.95) 100%)`,
                  mixBlendMode: "screen",
                }}
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)",
                }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#06081a] via-[#06081a]/60 to-transparent" />
            </div>

            {/* Decorative corner brackets — active only */}
            {isActive && (
              <>
                <span
                  data-anime="decor"
                  className="absolute left-3 top-3 h-4 w-4 border-l border-t"
                  style={{ borderColor: `rgba(${rgba},0.9)`, opacity: 0 }}
                />
                <span
                  data-anime="decor"
                  className="absolute right-3 top-3 h-4 w-4 border-r border-t"
                  style={{ borderColor: `rgba(${rgba},0.9)`, opacity: 0 }}
                />
                <span
                  data-anime="decor"
                  className="absolute right-5 top-7 h-1.5 w-1.5 rounded-full"
                  style={{
                    background: `rgba(${rgba},1)`,
                    boxShadow: `0 0 10px rgba(${rgba},1)`,
                    opacity: 0,
                  }}
                />
              </>
            )}

            {/* Bottom title strip — inside the frame, always visible */}
            <div
              data-anime="title-strip"
              className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8"
              style={{
                background: `linear-gradient(to top, rgba(6,8,26,0.96) 0%, rgba(6,8,26,0.80) 60%, transparent 100%)`,
                opacity: 0,
              }}
            >
              <h3 className="font-display text-[0.95rem] sm:text-[1.1rem] md:text-[1.25rem] leading-[0.95] tracking-[0.06em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
                {chapter.title}
              </h3>
              <p className={`mt-1 font-mono text-[0.4rem] tracking-[0.3em] uppercase ${tokens.text} opacity-80`}>
                ▪ {chapter.banner} ▪
              </p>
            </div>
          </div>
        </div>

        {/* Bottom corner brackets — active only */}
        {isActive && (
          <>
            <span
              data-anime="decor"
              className="absolute -bottom-1 left-3 h-4 w-4 border-b border-l"
              style={{ borderColor: `rgba(${rgba},0.9)`, opacity: 0 }}
            />
            <span
              data-anime="decor"
              className="absolute -bottom-1 right-3 h-4 w-4 border-b border-r"
              style={{ borderColor: `rgba(${rgba},0.9)`, opacity: 0 }}
            />
          </>
        )}
      </div>
    );
  }
);
