"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Music, HelpCircle } from "lucide-react";
import { MemoryGridBackground } from "@/components/ui/MemoryGridBackground";
import { HUDDecorations } from "@/components/ui/HUDDecorations";
import { MemoryTimelineCarousel } from "@/components/ui/MemoryTimelineCarousel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { portfolioData } from "@/data/portfolio";

// Stable UID derived from name length — purely decorative
function stableUID(name: string): string {
  let n = 0;
  for (let i = 0; i < name.length; i++) n = (n * 31 + name.charCodeAt(i)) >>> 0;
  return String(900000000 + (n % 99999999)).slice(0, 9);
}

export function MemoryArchive() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { profile } = portfolioData;
  const handle = profile.shortName || profile.name;
  const uid = stableUID(profile.name);

  // Parallax: pointer drives CSS variables on the section root
  useEffect(() => {
    if (reducedMotion) return;
    const el = rootRef.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.setProperty("--px", currentX.toFixed(3));
      el.style.setProperty("--py", currentY.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className="relative h-full w-full overflow-hidden"
      style={{ ["--px" as string]: "0", ["--py" as string]: "0" }}
    >
      <MemoryGridBackground />
      <HUDDecorations />

      {/* HUD top bar */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between border-b border-white/[0.07] bg-[#060b2a]/65 px-4 py-2.5 backdrop-blur-md md:px-8">
        {/* Left: back + avatar + handle + UID */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-1.5 rounded-full border border-white/18 px-2.5 py-1 font-mono text-[0.5rem] tracking-[0.28em] text-white/65 transition-all duration-200 hover:border-cyan-300/50 hover:text-cyan-200"
            aria-label="Return to portfolio"
          >
            <ArrowLeft
              size={10}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            <span className="hidden sm:inline">BACK</span>
          </Link>

          {/* Avatar circle */}
          <div
            className="h-7 w-7 shrink-0 rounded-full border border-cyan-300/55 bg-linear-to-br from-cyan-400/35 to-violet-500/35"
            style={{ boxShadow: "0 0 12px rgba(125,211,252,0.45)" }}
            aria-hidden
          />

          {/* Handle + UID */}
          <div className="hidden flex-col sm:flex">
            <span className="font-mono text-[0.58rem] tracking-[0.18em] text-white/88 leading-tight">
              {handle}
            </span>
            <span className="font-mono text-[0.44rem] tracking-[0.2em] text-white/38 leading-tight">
              UID: {uid}
            </span>
          </div>
        </div>

        {/* Right: clearance label + open-in-browser + music + help + ping */}
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <span className="hidden font-mono text-[0.44rem] tracking-[0.28em] text-white/38 lg:block">
            CLEARANCE: ARCHIVIST
          </span>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/22 px-3 py-1 font-mono text-[0.46rem] tracking-[0.24em] text-white/60 transition-all duration-200 hover:border-white/45 hover:text-white/85 md:block"
          >
            OPEN IN BROWSER
          </a>

          <button
            type="button"
            aria-label="Soundtrack — coming soon"
            title="Soundtrack — coming soon"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors duration-200 hover:text-cyan-200"
          >
            <Music size={13} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="Help"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/18 text-white/50 transition-all duration-200 hover:border-white/40 hover:text-white/80"
          >
            <HelpCircle size={12} strokeWidth={1.5} />
          </button>

          {/* Live ping dot */}
          <span className="relative flex h-2 w-2 shrink-0 items-center justify-center" aria-hidden>
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-fuchsia-400 opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_8px_rgba(244,114,182,0.95)]" />
          </span>
        </div>
      </header>

      {/* Title block — pushed down to clear the HUD bar */}
      <div className="absolute left-0 right-0 top-16 z-20 flex flex-col items-center px-4 text-center md:top-[4.5rem]">
        <span className="font-mono text-[0.56rem] tracking-[0.4em] text-cyan-200/75">
          ◆ MEMORY ARCHIVE PROGRAM ◆
        </span>
        <h1 className="mt-2.5 font-display text-[1.5rem] leading-[0.95] tracking-[0.08em] text-white drop-shadow-[0_2px_24px_rgba(125,211,252,0.42)] sm:text-[2.2rem] md:text-[2.8rem]">
          INTO THE MEMORY PROGRAM
        </h1>
        <p className="mt-2.5 max-w-lg font-serif text-[0.74rem] leading-relaxed text-white/60 sm:text-[0.82rem]">
          Recovered fragments of a forgotten era. Drag, swipe, or step through the archive to view each chapter restored from the static.
        </p>
      </div>

      {/* Carousel */}
      <div className="absolute left-0 right-0 top-1/2 z-10 -translate-y-[46%]">
        <MemoryTimelineCarousel />
      </div>

      {/* Footer hint */}
      <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-center md:bottom-5">
        <span className="font-mono text-[0.5rem] tracking-[0.32em] text-white/38">
          ◀ DRAG · SWIPE · ▶ · OR USE ARROW KEYS
        </span>
      </div>
    </section>
  );
}
