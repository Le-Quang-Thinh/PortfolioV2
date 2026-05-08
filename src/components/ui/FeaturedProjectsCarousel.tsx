"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Tv, Globe, Settings, Cast } from "lucide-react";
import Image from "next/image";
import { animate, createTimeline, stagger } from "animejs";
import { portfolioData, type Project } from "@/data/portfolio";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const AUTOPLAY_MS = 5500;

// Icon container width and gap for the release cards (px, matching Tailwind values)
const ICON_W = 96;
const ICON_GAP = 40;
const SVG_W = 480;
const SVG_H = 52;

function iconCenters(count: number): number[] {
  const total = count * ICON_W + (count - 1) * ICON_GAP;
  const left = (SVG_W - total) / 2;
  return Array.from({ length: count }, (_, i) => left + i * (ICON_W + ICON_GAP) + ICON_W / 2);
}

const SLIDE_CONFIG: Record<
  Project["thumbType"],
  {
    title: string;
    subtitle: (n: number) => string;
    description: string;
    iconColors: string[];
  }
> = {
  tv: {
    title: "SMART TV",
    subtitle: (n) => `${n} Released Applications`,
    description:
      "Delivering seamless entertainment experiences across all Smart TV platforms.",
    iconColors: ["#1a2f5e", "#3a1860", "#1a4a3a"],
  },
  web: {
    title: "WEB PLATFORMS",
    subtitle: (n) => `${n} Delivered Products`,
    description:
      "Multi-tenant streaming web applications for millions of users worldwide.",
    iconColors: ["#0d3a2a", "#1a2a58", "#3a280e"],
  },
  cms: {
    title: "CMS PRODUCTS",
    subtitle: () => "Content & Admin Platforms",
    description:
      "Powering content operations for OTT teams with modular, role-based tooling.",
    iconColors: ["#4a200e", "#30103e", "#2a300e"],
  },
  cast: {
    title: "OTT STREAMING",
    subtitle: () => "Multi-Platform Streaming Experiences",
    description:
      "Cast receiver apps enabling seamless streaming across all connected devices.",
    iconColors: ["#0d1a4a", "#1a0d38", "#0d2828"],
  },
};

const THUMB_ICONS: Record<Project["thumbType"], React.ReactNode> = {
  tv: <Tv size={38} strokeWidth={1.1} />,
  web: <Globe size={38} strokeWidth={1.1} />,
  cms: <Settings size={38} strokeWidth={1.1} />,
  cast: <Cast size={38} strokeWidth={1.1} />,
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function TreeConnector({ count }: { count: number }) {
  if (count === 0) return null;

  const centers = iconCenters(count);
  const stemX = SVG_W / 2;
  const diamondY = 2;
  const diamondH = 12;
  const horizY = 32;
  const dropY = SVG_H - 4;

  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="max-w-full mx-auto block text-ink-soft/35"
      aria-hidden="true"
    >
      {/* Diamond */}
      <polygon
        points={`${stemX},${diamondY} ${stemX + 5},${diamondY + diamondH / 2} ${stemX},${diamondY + diamondH} ${stemX - 5},${diamondY + diamondH / 2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Vertical stem */}
      <line
        x1={stemX}
        y1={diamondY + diamondH}
        x2={stemX}
        y2={count === 1 ? dropY : horizY}
        stroke="currentColor"
        strokeWidth="0.8"
      />
      {count > 1 && (
        <>
          {/* Horizontal bar */}
          <line
            x1={centers[0]}
            y1={horizY}
            x2={centers[centers.length - 1]}
            y2={horizY}
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Vertical drops */}
          {centers.map((cx, i) => (
            <line
              key={i}
              x1={cx}
              y1={horizY}
              x2={cx}
              y2={dropY}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          ))}
        </>
      )}
      {/* Endpoint circles */}
      {centers.map((cx, i) => (
        <circle key={i} cx={cx} cy={dropY} r="2" fill="currentColor" />
      ))}
    </svg>
  );
}

function CircularStamp() {
  return (
    <div className="relative w-[78px] h-[78px] flex items-center justify-center opacity-40 select-none">
      <svg
        viewBox="0 0 78 78"
        className="absolute inset-0 w-full h-full text-rust"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="39" cy="39" r="36" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.5 2" />
        <circle cx="39" cy="39" r="28" stroke="currentColor" strokeWidth="0.7" />
      </svg>
      <div className="flex flex-col items-center z-10 text-center gap-0.5">
        <span className="font-mono text-[0.34rem] tracking-[0.2em] text-rust uppercase">
          ★ ★ ★
        </span>
        <span className="font-mono text-[0.36rem] tracking-[0.14em] text-rust uppercase leading-[1.4]">
          PRODUCT{"\n"}DELIVERY
        </span>
      </div>
    </div>
  );
}

export function FeaturedProjectsCarousel() {
  const projects = portfolioData.projects;
  const total = projects.length;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimatingRef = useRef(false);

  const animateSlideIn = useCallback(
    (idx: number) => {
      if (reducedMotion) return;
      const slideEl = slideRefs.current[idx];
      if (!slideEl) return;

      isAnimatingRef.current = true;
      slideEl.style.opacity = "1";

      const eyebrow = slideEl.querySelector<HTMLElement>("[data-anime='eyebrow']");
      const title = slideEl.querySelector<HTMLElement>("[data-anime='title']");
      const subtitle = slideEl.querySelector<HTMLElement>("[data-anime='subtitle']");
      const device = slideEl.querySelector<HTMLElement>("[data-anime='device']");
      const cards = slideEl.querySelectorAll<HTMLElement>("[data-anime='card']");

      [eyebrow, title, subtitle, device].forEach((el) => {
        if (el) el.style.opacity = "0";
      });
      cards.forEach((el) => {
        el.style.opacity = "0";
      });

      const tl = createTimeline({ defaults: { ease: "easeOutQuad" } });

      if (eyebrow) tl.add(eyebrow, { opacity: [0, 1], translateY: [8, 0], duration: 220 });
      if (title) tl.add(title, { opacity: [0, 1], translateY: [24, 0], duration: 320 }, "-=140");
      if (subtitle) tl.add(subtitle, { opacity: [0, 1], translateY: [12, 0], duration: 240 }, "-=180");
      if (device) tl.add(device, { opacity: [0, 1], duration: 280 }, "-=160");
      if (cards.length) {
        tl.add(
          cards,
          { opacity: [0, 1], translateY: [16, 0], scale: [0.95, 1], duration: 280, delay: stagger(60) },
          "-=200"
        );
      }

      tl.then(() => {
        isAnimatingRef.current = false;
      });
    },
    [reducedMotion]
  );

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimatingRef.current) return;
      const normalized = ((idx % total) + total) % total;
      if (normalized === activeSlide) return;

      if (reducedMotion) {
        setActiveSlide(normalized);
        return;
      }

      const currentEl = slideRefs.current[activeSlide];
      if (currentEl) {
        animate(currentEl, { opacity: [1, 0], duration: 180, ease: "easeInQuad" }).then(() => {
          setActiveSlide(normalized);
        });
      } else {
        setActiveSlide(normalized);
      }
    },
    [activeSlide, total, reducedMotion]
  );

  const next = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo]);
  const prev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo]);

  useEffect(() => {
    animateSlideIn(activeSlide);
  }, [activeSlide, animateSlideIn]);

  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reducedMotion, isPaused, next]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (!node.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const activeProject = projects[activeSlide];
  const activeCfg = SLIDE_CONFIG[activeProject.thumbType];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured product showcase"
      className="relative w-full mt-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      <div className="sr-only" aria-live="polite">
        Slide {activeSlide + 1} of {total}: {activeCfg.title}.{" "}
        {activeProject.releases?.length ?? 0} releases.
      </div>

      {/* Top navigation bar */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-[0.56rem] tracking-[0.22em] text-rust uppercase shrink-0">
          {String(activeSlide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="font-mono text-[0.56rem] tracking-[0.22em] text-ink uppercase shrink-0">
          {activeCfg.title}
        </span>

        {/* Progress line with moving dot */}
        <div className="relative flex-1 h-px bg-ink-soft/20 mx-1">
          <span
            className="absolute w-[7px] h-[7px] rounded-full bg-ink -top-[3px] -translate-x-1/2 transition-[left] duration-500"
            style={{ left: `${((activeSlide + 1) / total) * 100}%` }}
          />
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={next}
          className="shrink-0 font-mono text-[0.56rem] tracking-[0.22em] text-rust uppercase hover:opacity-60 transition-opacity duration-150 cursor-pointer"
        >
          NEXT →
        </button>
      </div>

      {/* Blueprint side decorations (constant, behind slides) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 opacity-[0.07]" aria-hidden="true">
        <BlueprintSchematic thumbType={activeProject.thumbType} className="w-full h-full" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 opacity-[0.07] scale-x-[-1]" aria-hidden="true">
        <BlueprintSchematic thumbType={activeProject.thumbType} className="w-full h-full" />
      </div>

      {/* Slides */}
      <div className="relative min-h-[480px]">
        {projects.map((project, i) => {
          const cfg = SLIDE_CONFIG[project.thumbType];
          const releases = project.releases ?? [];
          const isActive = i === activeSlide;

          return (
            <div
              key={project.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              aria-hidden={!isActive}
              className={`absolute inset-0 flex flex-col items-center text-center ${
                isActive ? "pointer-events-auto" : "pointer-events-none opacity-0"
              }`}
            >
              {/* Thumb icon */}
              <div
                data-anime="eyebrow"
                className="text-ink/30 mb-5"
                style={{ opacity: 0 }}
              >
                {THUMB_ICONS[project.thumbType]}
              </div>

              {/* Title */}
              <h3
                data-anime="title"
                className="font-display text-[3.2rem] md:text-[4.5rem] leading-none tracking-[0.04em] text-ink font-black"
                style={{ opacity: 0 }}
              >
                {cfg.title}
              </h3>

              {/* Subtitle with decorative lines */}
              <div
                data-anime="subtitle"
                className="flex items-center gap-4 mt-3"
                style={{ opacity: 0 }}
              >
                <div className="h-px w-10 bg-ink-soft/30" />
                <span className="font-mono text-[0.56rem] tracking-[0.22em] text-khaki uppercase">
                  {cfg.subtitle(releases.length)}
                </span>
                <div className="h-px w-10 bg-ink-soft/30" />
              </div>

              {/* Tree connector SVG */}
              {releases.length > 0 && (
                <div
                  data-anime="device"
                  className="w-full mt-7"
                  style={{ opacity: 0 }}
                >
                  <TreeConnector count={releases.length} />
                </div>
              )}

              {/* Release icon cards */}
              {releases.length > 0 && (
                <div
                  className="flex justify-center mt-0"
                  style={{ gap: ICON_GAP, width: SVG_W, maxWidth: "100%" }}
                >
                  {releases.map((release, ri) => (
                    <article
                      key={release.name}
                      data-anime="card"
                      className="flex flex-col items-center gap-2 shrink-0"
                      style={{ width: ICON_W, opacity: 0 }}
                    >
                      {/* App icon box */}
                      <div
                        className={`rounded-2xl overflow-hidden flex items-center justify-center ${release.image ? "" : "shadow-card"}`}
                        style={{
                          width: ICON_W,
                          height: ICON_W,
                          backgroundColor: release.image ? undefined : cfg.iconColors[ri % cfg.iconColors.length],
                        }}
                      >
                        {release.image ? (
                          <Image
                            src={release.image}
                            alt={release.name}
                            width={ICON_W}
                            height={ICON_W}
                            className="w-full h-full object-contain"
                            draggable={false}
                          />
                        ) : (
                          <span className="font-mono text-[1.15rem] font-bold tracking-wide text-white/75 select-none">
                            {getInitials(release.name)}
                          </span>
                        )}
                      </div>
                      {/* Name */}
                      <span className="font-heading text-[0.8rem] tracking-[0.04em] text-ink leading-snug text-center">
                        {release.name}
                      </span>
                      {/* Platform badge */}
                      {release.platform && (
                        <span className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-khaki">
                          {release.platform}
                        </span>
                      )}
                      <div className="w-5 h-px bg-ink-soft/25" />
                    </article>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between mt-6 pt-4">
        {/* Italic description */}
        <p className="font-serif italic text-[0.72rem] leading-[1.6] text-ink-soft/60 max-w-[170px]">
          {activeCfg.description}
        </p>

        {/* Dot pagination */}
        <div className="flex items-center gap-2">
          {projects.map((p, i) => {
            const isActive = i === activeSlide;
            return (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${SLIDE_CONFIG[p.thumbType].title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-200 ${
                  isActive ? "w-6 h-[7px] bg-ink" : "w-[7px] h-[7px] bg-ink-soft/25 hover:bg-ink-soft/45"
                }`}
              />
            );
          })}
        </div>

        {/* Circular stamp */}
        <CircularStamp />
      </div>
    </div>
  );
}
