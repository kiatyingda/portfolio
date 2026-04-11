# Spline 3D Mockup in Case Study Hero

## Summary

Add a 3D phone mockup (via Spline iframe embed) to the case study hero section. The mockup sits beside the title text on desktop and stacks below the title on mobile. A skeleton placeholder shows while the Spline scene loads, then crossfades to the 3D.

## Data Model

Add `splineUrl?: string` to `ProjectMeta`. When absent, hero renders text-only (current behavior).

## New Component

`components/ui/SplineMockup.tsx` — client component.

- Renders `PhoneSketch` skeleton initially
- Loads Spline iframe in background (`opacity-0`)
- On iframe `onLoad`, crossfades skeleton out / iframe in (~600ms)
- iframe has `pointer-events-none` (visual only, no scroll hijack)

## Hero Layout Change

`app/work/[slug]/page.tsx` — cover section.

When `splineUrl` exists:
- Desktop: two-column grid (55% text / 45% mockup)
- Mobile: mockup stacks below title+company, above stats, capped ~300px height

When `splineUrl` absent: current single-column layout unchanged.

## Files Changed

1. `content/projects.ts` — add `splineUrl?` to interface, add URL to Grab project
2. `components/ui/SplineMockup.tsx` — new file
3. `app/work/[slug]/page.tsx` — hero section conditional two-column layout

## Not Changed

- No new npm dependencies
- Home page work grid
- Cover image block below hero (stays)
- All other case study sections
