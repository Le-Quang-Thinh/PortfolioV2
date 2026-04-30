# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
npm run dev    # Start dev server at http://localhost:3000
npm run build  # Production build
npm start      # Start production server
npm run lint   # Run ESLint
```

No test framework is configured.

## Architecture

This is a Next.js (App Router) portfolio site with a vintage/retro visual identity.

**Path alias**: `@/*` maps to `./src/*`

### Data layer

`src/data/portfolio.ts` is the single source of truth for all portfolio content. It exports a `portfolioData` object and all TypeScript interfaces (`PersonalInfo`, `Project`, `Experience`, `SkillCategory`, etc.). All content changes go here — no content is hardcoded in components.

Projects use a "case file" metaphor with a `classification` field typed as `"SECRET" | "CONFIDENTIAL" | "INTERNAL" | "PUBLIC"`.

### Component structure

```
src/components/
├── layout/    # Header, Sidebar (Sidebar is "use client" — interactive)
├── sections/  # Page sections: Hero, About, TechnicalExpertise, Projects,
│              # CMSArchitecture, CareerJourney, Education, Contact
└── ui/        # Reusable: VintageCard, TechBadge, RetroTV, AnalogMeter,
               # Timeline, CaseFileCard
```

`src/app/page.tsx` assembles sections in order. Sections are server components by default; only components needing interactivity use `"use client"`.

### Styling

Tailwind CSS v4 with a vintage aesthetic: antique white, burnt brown, vintage gold, deep olive, dusty navy. Fonts: Playfair Display (headings), Source Serif 4 (body), IBM Plex Mono (code). Film grain overlay and paper texture are applied globally. Animations use framer-motion.
