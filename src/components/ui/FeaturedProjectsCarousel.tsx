"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate, createTimeline, stagger } from "animejs";
import { portfolioData, type Project } from "@/data/portfolio";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const AUTOPLAY_MS = 5500;

const slideConfig: Record<
  Project["thumbType"],
  { title: string; subtitle: (n: number) => string; accent: string }
> = {
  tv: {
    title: "SMART TV APPLICATIONS",
    subtitle: (n) => `${n} Released Applications`,
    accent: "bg-[linear-gradient(135deg,#1a2a4a_0%,#0d1830_100%)]",
  },
  web: {
    title: "WEB PLATFORMS",
    subtitle: (n) => `${n} Delivered Products`,
    accent: "bg-[linear-gradient(135deg,#0d3a2a_0%,#062018_100%)]",
  },
  cms: {
    title: "CMS PRODUCTS",
    subtitle: () => "Content & Admin Platforms",
    accent: "bg-[linear-gradient(135deg,#3a1a0d_0%,#201008_100%)]",
  },
  cast: {
    title: "OTT STREAMING PRODUCTS",
    subtitle: () => "Multi-Platform Streaming Experiences",
    accent: "bg-[linear-gradient(135deg,#0d1a3a_0%,#060d28_100%)]",
  },
};

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

      // Reset DOM opacity since React won't re-apply style={{ opacity:0 }} when its vdom hasn't changed
      [eyebrow, title, subtitle, device].forEach((el) => { if (el) el.style.opacity = "0"; });
      cards.forEach((el) => { el.style.opacity = "0"; });

      const tl = createTimeline({ defaults: { ease: "easeOutQuad" } });

      if (eyebrow) tl.add(eyebrow, { opacity: [0, 1], translateY: [10, 0], duration: 200 });
      if (title) tl.add(title, { opacity: [0, 1], translateY: [24, 0], duration: 320 }, "-=120");
      if (subtitle) tl.add(subtitle, { opacity: [0, 1], translateY: [16, 0], duration: 260 }, "-=180");
      if (device) tl.add(device, { opacity: [0, 1], scale: [0.92, 1], duration: 380 }, "-=160");
      if (cards.length) {
        tl.add(
          cards,
          { opacity: [0, 1], translateY: [18, 0], scale: [0.96, 1], duration: 300, delay: stagger(70) },
          "-=180"
        );
      }

      tl.then(() => { isAnimatingRef.current = false; });
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
        animate(currentEl, { opacity: [1, 0], duration: 200, ease: "easeInQuad" }).then(() => {
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

  // Animate in when activeSlide changes (including mount)
  useEffect(() => {
    animateSlideIn(activeSlide);
  }, [activeSlide, animateSlideIn]);

  // Autoplay
  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reducedMotion, isPaused, next]);

  // Keyboard nav
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
        Slide {activeSlide + 1} of {total}: {slideConfig[projects[activeSlide].thumbType].title}.{" "}
        {projects[activeSlide].releases?.length ?? 0} releases.
      </div>

      {/* Slides */}
      <div className="relative min-h-[560px]">
        {projects.map((project, i) => {
          const cfg = slideConfig[project.thumbType];
          const releases = project.releases ?? [];
          const isActive = i === activeSlide;

          return (
            <div
              key={project.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              aria-hidden={!isActive}
              className={`absolute inset-0 flex flex-col ${isActive ? "pointer-events-auto" : "pointer-events-none opacity-0"}`}
            >
              {/* Eyebrow */}
              <div
                data-anime="eyebrow"
                className="flex items-center gap-3 mb-6"
                style={{ opacity: 0 }}
              >
                <span className="font-mono text-[0.55rem] tracking-[0.22em] text-rust uppercase">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="flex-1 h-px bg-[repeating-linear-gradient(90deg,#C8643A_0,#C8643A_3px,transparent_3px,transparent_6px)] opacity-30" aria-hidden="true" />
                <span className="font-mono text-[0.55rem] tracking-[0.22em] text-khaki uppercase">
                  {reducedMotion ? "Manual" : isPaused ? "Paused" : "Auto"}
                </span>
              </div>

              {/* Title */}
              <h3
                data-anime="title"
                className="font-display text-[3rem] md:text-[4.2rem] xl:text-[5rem] leading-[0.92] tracking-[0.03em] text-ink mb-3"
                style={{ opacity: 0 }}
              >
                {cfg.title}
              </h3>

              {/* Subtitle */}
              <p
                data-anime="subtitle"
                className="font-heading text-[0.85rem] tracking-[0.14em] uppercase text-khaki mb-8"
                style={{ opacity: 0 }}
              >
                {cfg.subtitle(releases.length)}
              </p>

              {/* Device visual */}
              <div
                data-anime="device"
                className={`relative self-center w-full max-w-[380px] h-[200px] rounded-xl overflow-hidden mb-8 ${cfg.accent}`}
                style={{ opacity: 0 }}
              >
                <div className="absolute inset-0 opacity-[0.12]">
                  <BlueprintSchematic thumbType={project.thumbType} className="w-full h-full" />
                </div>
                <span className="absolute bottom-3 right-4 font-mono text-[0.55rem] tracking-[0.2em] text-white/50 uppercase">
                  {project.thumbLabel}
                </span>
              </div>

              {/* Release cards */}
              {releases.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {releases.map((release) => (
                    <article
                      key={release.name}
                      data-anime="card"
                      className="flex flex-col items-center gap-1.5 bg-cream border border-ink-soft/12 rounded-md px-5 py-4 min-w-[120px] shadow-card hover:-translate-y-[2px] hover:shadow-lift transition-transform transition-shadow duration-200"
                      style={{ opacity: 0 }}
                    >
                      <span className="font-heading text-[0.78rem] tracking-[0.06em] text-ink text-center leading-snug">
                        {release.name}
                      </span>
                      {release.platform && (
                        <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-khaki border border-khaki/30 px-[7px] py-[2px] rounded-sm">
                          {release.platform}
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Nav strip */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-ink-soft/10">
        <button
          type="button"
          aria-label="Previous project"
          onClick={prev}
          className="w-8 h-8 flex items-center justify-center rounded-sm text-ink-soft hover:text-rust hover:bg-rust/10 transition-colors duration-150"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((p, i) => {
            const isActive = i === activeSlide;
            return (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${slideConfig[p.thumbType].title}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  isActive ? "w-8 bg-rust" : "w-1.5 bg-ink-soft/25 hover:bg-ink-soft/45"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={next}
          className="w-8 h-8 flex items-center justify-center rounded-sm text-ink-soft hover:text-rust hover:bg-rust/10 transition-colors duration-150"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
