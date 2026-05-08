# Memory Timeline Carousel — Anime Memory Archive

## Context

Build a fullscreen, cinematic "AAA anime-game memory archive" UI modeled on the in-game memory archive screens of Wuthering Waves / Honkai: Star Rail (per the reference screenshot the user supplied). The scene is a horizontal draggable slider with **one dominant portrait-oriented active card** vertically centered on stage, and side cards reduced to heavily blurred, darkened slabs that only barely peek in from the far edges. The active card has a thin cyan→violet neon border with a soft purple outer glow, a window-chrome (□ □ ✕) pinned inside the top, a gradient title strip pinned inside the bottom (carrying the chapter title and a small `▪ INTO THE MEMORY PROGRAM ▪` mono subtitle), a single glass description panel anchored upper-right of the frame, a `✦`-prefixed date pill at upper-left, and a holographic disc peeking ~30% from behind the right edge. The background is a deep navy→indigo→near-black radial gradient with a faint blueprint grid, a soft purple radial halo behind the active card, a sparse handful of sparkle stars, and very faded equalizer bars confined to the side-card columns only. A thin minimal top HUD strip carries the back arrow, avatar, handle, UID, "Open in browser" pill, music-note icon, and "?" help icon. A centered display title and mono subtitle sit between the HUD and the carousel. Mid-left and mid-right chevron arrows flank the active card; a slim progress line + dots sit at the bottom center.

The aesthetic is neon blue/purple glassmorphism that deliberately departs from the existing vintage cream/rust portfolio identity, so it lives on its own route `/memory-archive` and never touches the homepage. Slide content comes from a `MemoryChapter[]` data array; artwork is referenced from `/public/images/memory/*.jpg` (user-supplied later).

The codebase already uses anime.js v4 with `createTimeline` / `animate` / `stagger`, plus a custom drag-free carousel pattern in [FeaturedProjectsCarousel.tsx](../src/components/ui/FeaturedProjectsCarousel.tsx). The new component reuses those patterns and the `usePrefersReducedMotion` hook, which we extract for sharing.

---

## Layout architecture

Four stacked layers at the route:

```
┌─────────────────────────────────────────────────────────┐
│ Layer 0 — Background                                    │
│   • radial gradient (navy → indigo → near-black)        │
│   • faint blueprint grid (CSS linear-gradients)         │
│   • soft purple/cyan radial halo behind active card     │
│   • equalizer bars CONFINED to ~20vw side columns only  │
│   • ~6 static sparkle SVGs (slow opacity pulse)         │
│   • parallax via --px / --py CSS vars (reduced mag.)    │
├─────────────────────────────────────────────────────────┤
│ Layer 1 — Top HUD strip (thin, ~48px, mounted once)     │
│   • Left: back arrow / avatar / handle / UID            │
│   • Right: "Open in browser" pill / music / "?"         │
│   • No corner brackets, no scattered HUD sparkles       │
├─────────────────────────────────────────────────────────┤
│ Layer 1.5 — Title block (between HUD and carousel)      │
│   • Centered display title (font-display, large)        │
│   • Centered mono subtitle below                        │
├─────────────────────────────────────────────────────────┤
│ Layer 2 — Carousel stage (cinematic centerpiece)        │
│   • Horizontal track: one dominant portrait active card │
│     + side cards heavily clipped, blurred, darkened.    │
│   • Single glass description panel anchored upper-right │
│     of the active card (one panel total, not per side). │
│   • Date pill (`✦` + ISO date) at upper-left of frame.  │
│   • Holographic disc behind ACTIVE card only (~30% peek)│
│   • Mid-left / mid-right chevron arrows.                │
│   • Bottom: slim progress line + minimal dots.          │
└─────────────────────────────────────────────────────────┘
```

---

## Files to create

| Path | Role |
|---|---|
| [src/app/memory-archive/page.tsx](../src/app/memory-archive/page.tsx) | New route. Server component. Fullscreen dark wrapper that obscures the global grain/paper-lines and mounts `MemoryArchive`. No Sidebar/Topbar — clean fullscreen scene. |
| [src/components/sections/MemoryArchive.tsx](../src/components/sections/MemoryArchive.tsx) | `"use client"`. Composes the background, HUD strip, **inline centered title block** (display title + mono subtitle, between HUD and carousel), the carousel, mid-flank arrows, bottom progress dots. Owns parallax mouse-tracking + the shared `activeIndex` state. |
| [src/components/ui/MemoryTimelineCarousel.tsx](../src/components/ui/MemoryTimelineCarousel.tsx) | Main carousel. Horizontal drag/snap, dominantly-centered active card with side cards heavily clipped, infinite loop, mid-flank arrow buttons, keyboard nav, autoplay (pauses on hover/drag). |
| [src/components/ui/MemorySlideCard.tsx](../src/components/ui/MemorySlideCard.tsx) | One slide. Accepts an `isActive` prop and gates chrome/disc/description-panel/decor on it. Composes the portrait artwork frame (with inside-top window chrome and inside-bottom title strip), holographic disc (active only), description glass panel (active only), date pill, sparkle decorations. |
| [src/components/ui/MemoryHUDFrame.tsx](../src/components/ui/MemoryHUDFrame.tsx) | Thin (~48px) glass top strip: back-arrow / avatar / handle / UID on the left; "Open in browser" pill / music / "?" on the right. No corner brackets, no scattered sparkles, no persistent pulse loop. |
| [src/components/ui/MemoryGridBackground.tsx](../src/components/ui/MemoryGridBackground.tsx) | Background layer: faint blueprint grid (CSS linear-gradients), soft purple/cyan radial halo behind active card, equalizer bars **scoped to left/right ~20vw side columns**, ~6 static sparkle SVGs with slow opacity pulse. Accepts a parallax offset. |
| [src/components/ui/HolographicDisc.tsx](../src/components/ui/HolographicDisc.tsx) | Reusable disc: SVG with conic-gradient holographic foil, slow rotation loop, accent-tinted shadow. **Rendered behind the active slide only.** |
| [src/hooks/usePrefersReducedMotion.ts](../src/hooks/usePrefersReducedMotion.ts) | Extracted from FeaturedProjectsCarousel.tsx so both carousels share it. |

## Files to modify

| Path | Change |
|---|---|
| [src/data/portfolio.ts](../src/data/portfolio.ts) | Add `MemoryChapter` interface + `memoryArchive: MemoryChapter[]` (≥5 entries with anime-game framing). Export both. No changes to existing exports. |
| [src/components/ui/FeaturedProjectsCarousel.tsx](../src/components/ui/FeaturedProjectsCarousel.tsx) | Replace inline `usePrefersReducedMotion` with import from `@/hooks/usePrefersReducedMotion`. Pure refactor. |

No changes to `globals.css`, `layout.tsx`, the homepage `page.tsx`, or any other section.

---

## Data shape

```ts
// src/data/portfolio.ts
export interface MemoryChapter {
  id: string;
  index: string;                // "01" — chapter ordinal
  title: string;                // e.g. "TANGLED TRUTH IN INVERTED TOWER"
  banner: string;               // bottom-strip subtitle, default "INTO THE MEMORY PROGRAM"
  date: string;                 // "2025-03-28" — ISO so we can format/sort
  description: string;          // 2–4 sentences, anime-game tone
  image: string;                // "/images/memory/01.jpg"
  accent: 'cyan' | 'magenta' | 'amber' | 'lime' | 'violet';
}

export const memoryArchive: MemoryChapter[] = [ /* ≥5 entries */ ];
```

`accent` drives per-slide neon hue via an explicit class map in `MemorySlideCard.tsx` (no Tailwind safelist needed). The description glass panel always floats upper-right of the active card — placement is no longer per-slide configurable, so no `panelPlacement` field is needed.

---

## Component structure

### `MemoryArchive` (section root)
- Owns parallax `mousemove` handler → writes `--px`, `--py` CSS vars on the section.
- Renders, in z-order: `MemoryGridBackground` (parallax-aware), `MemoryHUDFrame` (persistent), `MemoryTimelineCarousel`.
- Owns shared `activeIndex` state, passes it down to the carousel and the bottom progress bar / dots.

### `MemoryHUDFrame`
A single thin (~48px tall) glass strip pinned to the top of the viewport. Subtle 1px bottom hairline border, low-opacity backdrop-blur, no neon pulse loop.
- **Left cluster**: 24×24 back-arrow chevron pill (links to `/`) → 28×28 circular avatar with thin neon ring → handle text in `font-mono` lowercase (`personalInfo.name.toLowerCase()` — falls back to `"florestina"`) → `UID: <stable-9-digit hash of handle>` in `font-mono` at 11px, opacity 0.7.
- **Right cluster**: outlined "Open in browser" pill (links to live deployment) → music-note `<button>` (decorative; no audio) → "?" help `<button>` (decorative).
- No corner brackets. No scattered HUD sparkles. No persistent pulse loop. Cluster spacing ~16px between elements; horizontal padding ~20px.

### `MemoryArchiveHeader` (inline in `MemoryArchive.tsx`, not a separate file)
Centered title block sitting between the HUD and the carousel:
- Display title in `font-display` uppercase, large (clamp 32px → 56px), `tracking-[0.22em]`, faint cyan→violet text-shadow. Default: `"MEMORY ARCHIVE"`.
- Mono subtitle below in `font-mono`, ~12px, `tracking-[0.32em]`, opacity 0.7. Default: `"▪ INTO THE MEMORY PROGRAM ▪"`.
- Total block height ~80–110px on `lg`, scales down with the viewport.

### `MemoryTimelineCarousel`
- State: `activeIndex` (mod N), `dragOffsetX` (transient ref, no re-render during drag).
- Each slide rendered absolutely. Position computed by `relative = ((i - activeIndex + N/2 + N) % N) - N/2` so the order is always `[-⌊N/2⌋, ⌈N/2⌉)` — infinite loop without DOM clones.
- **Position table — dominant active + clipped slabs (matches reference image):**

  | Relative | Scale | x-offset | Opacity | Blur | Brightness | Pointer events |
  |---|---|---|---|---|---|---|
  | `0` (active) | 1.0 | 0 | 1.0 | 0px | 1.0 | auto |
  | `±1` | 0.92 | ±62vw (heavily clipped by viewport) | 0.45 | 6px | 0.55 | none (click region only) |
  | beyond | — | — | 0 | — | — | hidden |

  The `±2` band is gone — only the active slide and its two immediate neighbors are mounted. Side cards function as darkened, blurred background slabs, not "preview cards": they render only the artwork frame + the bottom title strip. No window chrome, no holographic disc, no description panel, no decoration sparkles on side cards (gated by `isActive` in `MemorySlideCard`).
- 3D depth is flat — no `rotateY`. Depth comes from blur + opacity + brightness only.
- Parent: `perspective: 1600px` (kept solely for the disc's subtle tilt).
- On `activeIndex` change: per slide, `animate(slideEl, { translateX, scale, opacity, filter, duration: 760, ease: 'inOutQuint' })`. `dragOffsetX` adds on top during drag.

### `MemorySlideCard` — anatomy
The slide accepts an `isActive` prop. Items marked **(active only)** are gated on it, so side cards stay clean and slab-like.

1. **Frame** (always): portrait `aspect-[3/4]` container holding `next/image` `object-cover`. Thin 1.5px gradient border (`bg-gradient-to-br from-cyan-300/70 via-indigo-300/40 to-violet-300/70` masked via `padding + clip`), soft outer purple glow `shadow-[0_0_64px_rgb(139_92_246/0.35)]`, soft inner cyan glow `inset 0 0 32px rgb(34 211 238 / 0.18)`. `priority` flag on `next/image` only for the active slide.
2. **Window chrome** *(active only)*: small glass strip pinned **inside** the top of the frame (absolute `top-2 right-2`), three 10×10 pixel squares (□ □ ✕) in the accent hue. No left-side ordinal text — just the chrome buttons.
3. **Bottom title strip** *(always — but only the active version is fully readable; side versions are blurred along with the frame)*: full-width gradient strip pinned inside the bottom of the frame (`from-cyan-300/40 via-indigo-300/55 to-violet-300/40`, ~56px tall). Centered uppercase `{title}` in `font-display` and a smaller `▪ {banner} ▪` mono subtitle underneath. This **replaces** the old separate footer banner — title and banner now live together inside the frame.
4. **Description glass panel** *(active only)*: floats absolutely at `top-0 right-[-340px]` on `lg` (offset to upper-right outside the frame). Width ~320px, backdrop-blur-md, `bg-white/6`, `border-white/18`, faint accent text-shadow. Holds the 2–4-sentence description in `font-serif`, ~14px, line-height 1.65.
5. **Date pill** *(active only)*: small glass pill with a leading `✦` glyph and the formatted ISO date (`YYYY-MM-DD`) in `font-mono`, placed at `top-[-28px] left-0` (upper-left, just outside the frame). Letter-spacing tween on slide-in.
6. **Holographic disc** (`HolographicDisc`) *(active only)*: absolutely positioned at `right-[-22%] top-[8%]`, ~30% visible peeking behind the right edge of the frame, sized to ~80% of frame height. Slow `rotate` loop (16s, linear, infinite). Skipped under reduced-motion and below 768px.
7. **Decorative sparkles** *(active only)*: 4–6 inline SVG stars positioned around the frame edges, anime.js stagger entrance.

### Drag / snap (Pointer Events)
- `onPointerDown`: capture pointer, store startX, set `grabbing` cursor, pause autoplay.
- `onPointerMove`: update `dragOffsetX` ref → write inline `translateX` to all slides via direct style mutation, `requestAnimationFrame`-throttled.
- `onPointerUp` / `Cancel`: if `|dragOffsetX| > 80px` → commit `next()` / `prev()`. Otherwise `animate(slides, { translateX: <resting>, duration: 280 })` to snap back.
- Touch: `touch-action: pan-y` so vertical scroll still works on mobile.

---

## Animation flow (anime.js v4)

### On slide change — timeline per active slide
Query descendants of the newly-active card by `data-anime` attributes and run a single timeline. Durations slowed ~25% for premium cinematic motion; eased with `inOutQuint`.

| Target | Animation | Duration | Offset |
|---|---|---|---|
| `data-anime="frame"` | opacity 0→1, scale 0.96→1, blur 6→0 px | 620ms | start |
| `data-anime="title-strip"` | opacity 0→1, translateY 12→0, letterSpacing -0.2em→0.22em | 560ms | -380 |
| `data-anime="date"` | opacity 0→1, letterSpacing -0.4em→0.22em | 440ms | -340 |
| `data-anime="description"` | opacity 0→1, translateX 40→0 | 520ms | -300 |
| `data-anime="disc"` | opacity 0→0.9, rotate -15→0 | 680ms | -360 |

Notes:
- Window chrome and decoration sparkles fade with the parent frame — they don't have their own timeline rows anymore (less HUD spam, simpler tween).
- Reset opacities on every change (same trick as FeaturedProjectsCarousel.tsx:77 — React won't re-apply unchanged inline styles).

### Always-on background loops (mount once, stop under reduced-motion)
- **Sparkle stars** (replaces the old particle drift): static scatter of ~6 SVGs across the background, `animate(sparkles, { opacity: [0.4, 1, 0.4], scale: [0.85, 1, 0.85], duration: 3200, loop: true, ease: 'inOutSine', delay: stagger(180, { from: 'random' }) })`. No translation drift.
- **Equalizer bars** (scoped to side regions only — left and right ~20vw columns, never full-width): `animate(bars, { scaleY: [0.4, 0.8, 0.4], duration: 1800, loop: true, delay: stagger(120, { from: 'center' }) })`. Lower amplitude than before, slower cadence.
- **Active-card neon pulse**: `animate(activeBorder, { opacity: [0.7, 1, 0.7], duration: 3200, loop: true, ease: 'inOutSine' })`.
- **Holographic disc rotation** (active slide only): `animate(disc, { rotate: '360deg', duration: 16000, loop: true, ease: 'linear' })`.

The old "HUD sparkles" loop is gone — the HUD is now a clean thin strip with no decorative pulse.

### Parallax
`MemoryArchive` listens to `mousemove` on its root, normalizes the pointer to `[-1, 1]` per axis, and writes `--px`, `--py` CSS custom properties. Background grid + halo consume them via `transform: translate3d(calc(var(--px) * 6px), calc(var(--py) * 6px), 0)` — magnitude reduced from 12px to 6px for a more cinematic, less floaty feel. Side cards consume them at half magnitude, the active card at zero. Cheap and 60fps without rAF loops.

---

## Visual design system

### Color tokens (inline, no globals.css edits)
| Token | Value | Use |
|---|---|---|
| `bg-base` | `radial-gradient(ellipse at 50% 30%, #2a3a8a 0%, #16225e 35%, #0a1030 65%, #04060f 100%)` | Route wrapper background — biased lighter at top to match the screenshot |
| `glow.center` | `radial-gradient(ellipse at 50% 55%, rgba(139,92,246,0.18) 0%, transparent 55%)` | Soft purple halo behind the active card |
| `accent.cyan` | `#7DD3FC` / `#22D3EE` | Default neon hue |
| `accent.magenta` | `#F0ABFC` / `#D946EF` | Alt slide hue |
| `accent.violet` | `#C4B5FD` / `#8B5CF6` | Alt slide hue (default frame border companion) |
| `accent.amber` | `#FCD34D` / `#F59E0B` | Reserved variant |
| `accent.lime` | `#BEF264` / `#84CC16` | Reserved variant |
| `glass.surface` | `rgba(255,255,255,0.06)` over `backdrop-blur-md` | Description panel / HUD strip / date pill |
| `glass.border` | `rgba(255,255,255,0.18)` + `inset 0 0 24px <accent>/0.25` | Panel & frame edges |
| `text.primary` | `#E0E7FF` | Body copy on glass |
| `text.muted` | `#A5B4FC` | Date / banner subtitle |

Active card glow: `box-shadow: 0 0 80px rgb(139 92 246 / 0.45), 0 0 24px rgb(34 211 238 / 0.35), inset 0 0 32px rgb(34 211 238 / 0.18)` — bigger, softer, dual-tone purple+cyan. Hover: scale outer purple to `0.6` opacity (from `0.45`).

Side card filter: `blur(6px) brightness(0.55) saturate(0.9)`. They lose the inset cyan glow entirely (the glow is part of the active-only treatment).

### Typography (no new fonts)
- **Card title / banner**: existing `font-display` (Playfair) — uppercase, `tracking-[0.18em]`, `text-shadow: 0 0 12px <accent>/0.6`.
- **Body / description**: existing `font-serif` (Source Serif 4) — preserves tonal continuity with the rest of the portfolio.
- **HUD chrome / date / UID / "INTO THE MEMORY PROGRAM"**: existing `font-mono` (IBM Plex Mono) — small caps, `tracking-[0.22em]`, opacity 0.85.

### Iconography
- Sparkle / cross-stars: inline SVG, mix of 4-pointed and 8-pointed, neon stroke + soft glow. Used sparingly (~6 in background, 4–6 around active card).
- Window-chrome buttons: pixel squares (□ □ ✕), 10×10, no real click behavior.
- Mid-flank arrows: thin chevron SVGs in 32×32 glass pills, vertically centered with the active card.
- Bottom progress: 4–6 small dots (~6px) flanked by a slim 1px line; active dot fills with accent hue.

### Style isolation
The route wrapper covers the global grain/paper texture with a fullscreen dark layer:

```tsx
// src/app/memory-archive/page.tsx
export default function MemoryArchivePage() {
  return (
    <div className="fixed inset-0 isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#2a3a8a_0%,#16225e_35%,#0a1030_65%,#04060f_100%)]">
      <MemoryArchive />
    </div>
  );
}
```

`fixed inset-0` covers the body grain; `isolate` creates a stacking context so neon shadows/blurs don't bleed out. All neon styling stays inline (Tailwind utilities + arbitrary values such as `shadow-[0_0_24px_rgb(56_189_248/0.6)]`, `backdrop-blur-md`, `border-cyan-300/40`).

The route does not import the homepage's `Sidebar` / `MobileTopbar` / `IntroVideo`.

---

## User interaction

| Input | Behavior |
|---|---|
| Mouse drag horizontal | Cards translate in real time; release > 80px → commit, else snap back |
| Touch swipe | Same as drag; `touch-action: pan-y` preserves vertical scroll |
| Click `←` / `→` arrow (mid-flank) | Smooth 760ms transition to neighbor |
| Click pagination dot | Jump-cut animation to that index |
| Click side-card region | `next` / `prev` based on which side |
| `←` / `→` keys (carousel focused) | Same as arrow buttons |
| Hover active card | Outer purple glow scales to 0.6 opacity, autoplay pauses (no card lift — keeps it cinematic) |
| Click "Open in browser" pill | Opens live deployment URL in a new tab |
| Idle 8s | Autoplay resumes, advances every 9s until next interaction |

Edge behavior: navigating past last → wraps to first, past first → wraps to last, no flash (modulo arithmetic in the position table).

---

## Responsive strategy

Read `window.innerWidth` once + on resize, store in a `viewport` state (`'lg' | 'md' | 'sm-tablet' | 'sm'`), use it to pick the position table.

| Breakpoint | Visible cards | Side x-offset | Description panel | Disc | HUD top bar | Equalizer |
|---|---|---|---|---|---|---|
| ≥1280 (lg) | 3 (active + 2 clipped slabs) | ±62vw | floats upper-right of active, ~320px wide | yes, ~30% peek | full | scoped to side regions |
| 1024–1279 (md) | 3, sides barely visible | ±58vw | floats upper-right, narrower (~280px) | yes, reduced peek | condensed (no UID) | scoped, fewer bars |
| 768–1023 (sm-tablet) | 1 dominant + edge slivers | ±55vw | **stacks below** active card | hidden | minimal: avatar + back arrow | hidden |
| <768 (sm) | 1 dominant only | sides hidden | stacks below active card, full width | hidden | minimal: avatar + back arrow | hidden |

- Below 1024px: hide mid-flank arrow buttons (rely on swipe + dots).
- Below 1024px: floating description panel becomes a stacked panel beneath the artwork.
- Below 768px: side slivers fully hide — only one card on screen at a time.
- Date pill position is constant: always upper-left, just outside the frame.
- Holographic disc disabled below 1024px and under reduced-motion.

---

## Reduced motion

Via the extracted `usePrefersReducedMotion` hook:
- Skip sparkle pulse, side-region equalizer pulse, active-border neon pulse, disc rotation.
- Slide change becomes a plain opacity swap (no transforms, no stagger timeline).
- Parallax disabled.
- Drag still works (intentional input).
- Autoplay disabled.

---

## Accessibility

- Carousel root: `role="region" aria-roledescription="carousel" aria-label="Memory archive"`.
- `aria-live="polite"` region announces "Slide N of M: <title>" on every active change.
- Each slide: `aria-hidden={!isActive}`, `aria-label={title}`.
- Buttons: `aria-label="Previous chapter"` / `"Next chapter"`, `aria-current="true"` on active dot.
- Keyboard: ←/→ when the region contains focus (matches FeaturedProjectsCarousel.tsx:138-148).
- All interactive elements get `:focus-visible` rings (cyan, 2px, 4px offset).
- Decorative SVGs (sparkles, equalizer bars, disc, mid-flank arrows' inner chevron paths) marked `aria-hidden="true"`.
- Music / help icons in the HUD are `<button>` elements with `aria-label`s — keeps the keyboard tab order coherent even though they're decorative.

---

## Verification

1. `npm run dev` → open http://localhost:3000/memory-archive.
2. Thin top HUD strip: back arrow + small avatar + handle + UID on left; "Open in browser" pill + music + "?" on right. No corner brackets, no scattered HUD sparkles.
3. Centered display title (`MEMORY ARCHIVE`) + mono subtitle sit between HUD and carousel.
4. Background: navy → indigo → near-black radial gradient (lighter at top), faint blueprint grid, soft purple halo behind active card, ~6 sparkle stars only, equalizer bars confined to ~20vw side columns.
5. Active card is portrait (3/4), vertically centered, dominant on screen with thin cyan→violet border and soft purple+cyan glow. Side cards are heavily blurred + darkened slabs barely peeking from the edges — no chrome, no disc, no panel.
6. Active card has window-chrome (□ □ ✕) inside the top, a gradient title strip inside the bottom carrying the title and `▪ INTO THE MEMORY PROGRAM ▪`, a single description glass panel anchored upper-right, a `✦` date pill upper-left, and a holographic disc peeking ~30% behind the right edge.
7. Drag horizontally → neighbors translate in real time; release short → snap back; release > 80px → commit with smooth tween.
8. Touch (Chrome devtools device mode) → swipe behavior matches.
9. Click mid-flank ← / → arrows → smooth ~760ms horizontal transition.
10. Click pagination dots → jumps directly.
11. ←/→ keys with carousel focused → same.
12. Loop edges: past last → wraps to first; past first → wraps to last; no flash.
13. Hover active card → outer purple glow intensifies, autoplay pauses (no card lift).
14. On every slide change: frame → title-strip → date → description → disc fade/stagger in via the timeline (slower, ~620–680ms steps).
15. Resize 1440 → 1024 → 768 → 375 — at ≥1024 you get 3 visible cards, below 1024 mid-flank arrows hide and description panel stacks below, below 768 only the active card is visible.
16. macOS Reduce Motion on → reload → all loops stop, slide changes are instant opacity swaps, parallax off, autoplay off.
17. Tab into carousel → screen reader announces "Slide 2 of N: <title>".
18. Visit `/` — homepage looks identical (only change there is the hook import refactor in `FeaturedProjectsCarousel`).
19. `npm run build` → passes with no TS errors and no SSR errors (carousel is `"use client"`).
20. `npm run lint` → clean.

---

## Out of scope

- Real anime artwork (user provides under `/public/images/memory/`).
- Audio playback for the music icon / equalizer (decorative only).
- Editing `globals.css`, the homepage, `layout.tsx`, or any other existing section.
- Adding swiper.js or any new dep — anime.js v4 (already installed) is sufficient.
- Real auth / UID — the HUD top bar is pure scenery, the UID is a stable hashed string.
