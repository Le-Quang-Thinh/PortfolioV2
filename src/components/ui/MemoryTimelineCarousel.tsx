"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animate, createTimeline, stagger } from "animejs";
import { memoryArchive } from "@/data/portfolio";
import { MemorySlideCard } from "./MemorySlideCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const AUTOPLAY_MS = 9000;
const DRAG_THRESHOLD = 80;

type Viewport = "sm" | "md" | "lg";

function getViewport(): Viewport {
  if (typeof window === "undefined") return "lg";
  if (window.innerWidth < 640) return "sm";
  if (window.innerWidth < 1024) return "md";
  return "lg";
}

interface SlotConfig {
  x: number;
  z: number;
  scale: number;
  opacity: number;
  blur: number;
  brightness: number;
  zIndex: number;
}

// Compute side offset so only ~15% of the side card peeks in from the edge.
// cardHalfWidth is the scaled half-width of the card at ±1 (scale 0.92).
function computeSideOffset(vw: number, cardHalfWidth: number, peekPx: number): number {
  return vw / 2 + cardHalfWidth - peekPx;
}

function slotForRelative(relative: number, viewport: Viewport, vw: number): SlotConfig {
  const sign = Math.sign(relative) || 1;
  const abs = Math.abs(relative);

  if (abs === 0) {
    return { x: 0, z: 0, scale: 1, opacity: 1, blur: 0, brightness: 1, zIndex: 10 };
  }

  if (abs === 1) {
    // Card widths: sm=240, md=280, lg=320. At scale 0.92 half-widths: 110, 129, 147
    const cardHalfWidth = viewport === "sm" ? 110 : viewport === "md" ? 129 : 147;
    const peekPx = viewport === "sm" ? 24 : 48;
    const x = sign * computeSideOffset(vw, cardHalfWidth, peekPx);
    const opacity = viewport === "sm" ? 0.3 : 0.45;
    const blur = viewport === "sm" ? 3 : 6;
    return { x, z: -60, scale: 0.92, opacity, blur, brightness: 0.55, zIndex: 7 };
  }

  // Beyond ±1: invisible
  return { x: sign * 9999, z: -200, scale: 0.8, opacity: 0, blur: 8, brightness: 0.3, zIndex: 1 };
}

function buildFilterStr(blur: number, brightness: number): string {
  const parts: string[] = [];
  if (blur > 0) parts.push(`blur(${blur}px)`);
  if (brightness !== 1) parts.push(`brightness(${brightness})`);
  return parts.length > 0 ? parts.join(" ") : "none";
}

function applyTransformImmediate(el: HTMLElement, slot: SlotConfig, dragX: number) {
  const x = slot.x + dragX;
  el.style.transform = `translate3d(${x}px, 0, ${slot.z}px) scale(${slot.scale})`;
  el.style.opacity = String(slot.opacity);
  el.style.filter = buildFilterStr(slot.blur, slot.brightness);
  el.style.zIndex = String(slot.zIndex);
  el.style.pointerEvents = slot.opacity > 0.9 ? "auto" : "none";
}

interface MemoryTimelineCarouselProps {
  onActiveChange?: (i: number) => void;
}

export function MemoryTimelineCarousel({ onActiveChange }: MemoryTimelineCarouselProps) {
  const chapters = memoryArchive;
  const total = chapters.length;
  const half = Math.floor(total / 2);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewport, setViewport] = useState<Viewport>("lg");
  const [viewportWidth, setViewportWidth] = useState(1440);
  const reducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dragXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const draggingRef = useRef(false);
  const isFirstLayoutRef = useRef(true);

  useEffect(() => {
    const update = () => {
      setViewport(getViewport());
      setViewportWidth(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getRelative = useCallback(
    (i: number, active: number) => ((i - active + total + half) % total) - half,
    [total, half]
  );

  const layoutSlides = useCallback(
    (active: number, dragX: number, animated: boolean) => {
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const rel = getRelative(i, active);
        const slot = slotForRelative(rel, viewport, viewportWidth);
        if (!animated || reducedMotion) {
          applyTransformImmediate(el, slot, dragX);
        } else {
          animate(el, {
            translateX: slot.x + dragX,
            translateZ: slot.z,
            scale: slot.scale,
            opacity: slot.opacity,
            filter: buildFilterStr(slot.blur, slot.brightness),
            duration: 760,
            ease: "inOutQuint",
          });
          el.style.zIndex = String(slot.zIndex);
          el.style.pointerEvents = slot.opacity > 0.9 ? "auto" : "none";
        }
      });
    },
    [getRelative, viewport, viewportWidth, reducedMotion]
  );

  const animateActiveEntrance = useCallback(
    (idx: number) => {
      const slideEl = slideRefs.current[idx];
      if (!slideEl) return;

      const frame = slideEl.querySelector<HTMLElement>("[data-anime='frame']");
      const titleStrip = slideEl.querySelector<HTMLElement>("[data-anime='title-strip']");
      const date = slideEl.querySelector<HTMLElement>("[data-anime='date']");
      const description = slideEl.querySelector<HTMLElement>("[data-anime='description']");
      const decor = slideEl.querySelectorAll<HTMLElement>("[data-anime='decor']");
      const disc = slideEl.querySelector<HTMLElement>("[data-anime='disc']");

      if (reducedMotion) {
        [frame, titleStrip, date, description, disc].forEach((el) => {
          if (el) el.style.opacity = "1";
        });
        decor.forEach((el) => (el.style.opacity = "1"));
        return;
      }

      // Reset before animating — React won't re-apply unchanged inline styles
      [frame, titleStrip, date, description, disc].forEach((el) => {
        if (el) el.style.opacity = "0";
      });
      decor.forEach((el) => (el.style.opacity = "0"));

      const tl = createTimeline({ defaults: { ease: "inOutQuint" } });
      if (frame) tl.add(frame, { opacity: [0, 1], scale: [0.97, 1], duration: 620 });
      if (titleStrip) tl.add(titleStrip, { opacity: [0, 1], translateY: [10, 0], duration: 560 }, "-=380");
      if (date) tl.add(date, { opacity: [0, 1], duration: 440 }, "-=340");
      if (description) tl.add(description, { opacity: [0, 1], translateX: [24, 0], duration: 520 }, "-=300");
      if (decor.length) {
        tl.add(decor, { opacity: [0, 1], scale: [0, 1], duration: 360, delay: stagger(50) }, "-=380");
      }
      if (disc) tl.add(disc, { opacity: [0, 0.9], rotate: [-15, 0], duration: 680 }, "-=360");
    },
    [reducedMotion]
  );

  // Ensure non-active slides have their content fully shown (no entrance animation on them)
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el || i === activeIndex) return;
      el.querySelectorAll<HTMLElement>("[data-anime]").forEach((child) => {
        child.style.opacity = "1";
      });
    });
  }, [activeIndex]);

  // Layout on active or viewport change
  useEffect(() => {
    layoutSlides(activeIndex, 0, !isFirstLayoutRef.current);
    isFirstLayoutRef.current = false;
  }, [activeIndex, viewport, viewportWidth, layoutSlides]);

  // Entrance animation on active change
  useEffect(() => {
    const id = requestAnimationFrame(() => animateActiveEntrance(activeIndex));
    onActiveChange?.(activeIndex);
    return () => cancelAnimationFrame(id);
  }, [activeIndex, animateActiveEntrance, onActiveChange]);

  const goTo = useCallback(
    (idx: number) => {
      const normalized = ((idx % total) + total) % total;
      if (normalized === activeIndex) return;
      setActiveIndex(normalized);
    },
    [activeIndex, total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

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

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragXRef.current = 0;
    setIsPaused(true);
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* ignore */ }
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      dragXRef.current = dx;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const rel = getRelative(i, activeIndex);
        const slot = slotForRelative(rel, viewport, viewportWidth);
        applyTransformImmediate(el, slot, dx);
      });
    },
    [getRelative, activeIndex, viewport, viewportWidth]
  );

  const finishDrag = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
      const dx = dragXRef.current;
      dragXRef.current = 0;
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        if (dx < 0) next();
        else prev();
      } else {
        layoutSlides(activeIndex, 0, !reducedMotion);
      }
      setIsPaused(false);
    },
    [next, prev, layoutSlides, activeIndex, reducedMotion]
  );

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Memory archive"
      className="relative w-full focus:outline-none"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { if (!draggingRef.current) setIsPaused(false); }}
    >
      <div className="sr-only" aria-live="polite">
        Chapter {activeIndex + 1} of {total}: {chapters[activeIndex].title}
      </div>

      {/* Stage */}
      <div
        className="relative flex h-120 items-center justify-center sm:h-135 md:h-150"
        style={{ perspective: "1600px", transformStyle: "preserve-3d" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {chapters.map((chapter, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={chapter.id}
              ref={(el) => { slideRefs.current[i] = el; }}
              aria-hidden={!isActive}
              aria-label={chapter.title}
              className="absolute will-change-transform"
              style={{ transformStyle: "preserve-3d", opacity: 0 }}
            >
              <MemorySlideCard chapter={chapter} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* Mid-flank arrow buttons — visible on md+ */}
      <button
        type="button"
        aria-label="Previous chapter"
        onClick={prev}
        className="absolute left-4 top-1/2 z-50 hidden -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-[#06081a]/60 p-3 text-cyan-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-300/70 hover:bg-cyan-500/15 hover:shadow-[0_0_24px_rgba(125,211,252,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 md:flex"
      >
        <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next chapter"
        onClick={next}
        className="absolute right-4 top-1/2 z-50 hidden -translate-y-1/2 items-center justify-center rounded-full border border-violet-300/40 bg-[#06081a]/60 p-3 text-violet-200 backdrop-blur-md transition-all duration-300 hover:border-violet-300/70 hover:bg-violet-500/15 hover:shadow-[0_0_24px_rgba(167,139,250,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 md:flex"
      >
        <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
      </button>

      {/* Pagination dots */}
      <div className="mt-2 flex items-center justify-center gap-2.5">
        {chapters.map((c, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={c.id}
              type="button"
              aria-label={`Go to chapter ${i + 1}: ${c.title}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${
                isActive
                  ? "w-8 bg-linear-to-r from-cyan-400 to-violet-400 shadow-[0_0_10px_rgba(125,211,252,0.8)]"
                  : "w-1.5 bg-white/22 hover:bg-white/40"
              }`}
            />
          );
        })}
      </div>

      {/* Progress line */}
      <div className="mx-auto mt-3 flex max-w-sm items-center gap-3 px-8">
        <span className="font-mono text-[0.5rem] tracking-[0.3em] text-cyan-200/60">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <div className="relative h-px flex-1 bg-white/10">
          <div
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-linear-to-r from-cyan-300 to-violet-300 shadow-[0_0_8px_rgba(125,211,252,0.6)] transition-all duration-700"
            style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[0.5rem] tracking-[0.3em] text-violet-200/60">
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
