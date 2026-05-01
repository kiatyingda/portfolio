# Cinematic Scroll Portfolio — Design Doc

## Goal
Convert the portfolio from a standard scrolling website into a cinematic slide-by-slide presentation, while keeping it functional as an online portfolio.

## Approach
CSS-only. `scroll-snap-type: y proximity` with `min-h-screen` sections. No external libraries. Soft snap — free scroll that gently settles into each section.

---

## Homepage — 4+ slides

| Slide | Content |
|-------|---------|
| Hero | Title + subtitle + CTA + dot matrix. Already full-screen. |
| Project 1–N | One project per slide. Title + company left, cover image right. Full-bleed. Pill CTA. |
| About | Bio left, details right. Stretched to 100vh. |
| Footer | Compact strip. NOT full-screen. |

### Project card slide layout
- Grid: 55% text / 45% cover image
- Project number, title, company, one-line summary
- Pill CTA: "View case study"
- FadeIn on content when slide enters view
- Replaces current stacked list

### Scroll behavior
- `scroll-snap-type: y proximity` on page wrapper
- Each slide: `min-h-screen scroll-snap-align: start`
- Dot matrix stays fixed behind everything

---

## Case Study Page — slide per section

| Slide | Content |
|-------|---------|
| Hero | Title + company + Spline mockup (unchanged) |
| Cover image | Full-bleed, fills viewport |
| Overview | Role / Team / Duration + impact stats |
| Sections 4–N | Each case study section = one slide |
| Next project | Full-screen card linking to next case study |

### Section slides
- `min-h-screen` with `flex items-center` for vertical centering
- Content stays `max-w-[1136px]` centered
- One idea per slide: heading + body + one visual max
- Image sections go full-bleed
- Stats: oversized numbers centered
- Phase sections: watermark number stays

### What changes from current
- Sections: `py-24 md:py-32` → `min-h-screen flex items-center`
- "Next project" becomes full-screen slide
- "Back to work" folds into next project slide

### What stays the same
- All 10 section types keep internal layout
- Spline hero layout unchanged
- `overflow-x-hidden` on page wrapper

---

## Animations

- FadeIn threshold bumped to 0.2 for snappier trigger
- Staggered children: heading → body → image → CTA, 80ms apart
- Duration: 700ms ease-out (unchanged)
- No parallax, no scroll-linked transforms
- Confident restraint, hard cuts > swoopy effects

---

## Unchanged
- Content data, routing, URLs
- Dark/light theme toggle
- DotMatrix (homepage only)
- Nav (absolute, non-sticky)
- Spline 3D integration
- All TypeScript types / project structure

---

## Files to modify
1. `app/globals.css` — add scroll-snap utilities
2. `app/page.tsx` — add snap container class
3. `components/sections/Hero.tsx` — add snap-align
4. `components/sections/Work.tsx` — rewrite to one-project-per-slide
5. `components/sections/About.tsx` — add min-h-screen + snap-align
6. `components/ui/FadeIn.tsx` — bump threshold, add stagger support
7. `app/work/[slug]/page.tsx` — all section wrappers become min-h-screen snap slides
