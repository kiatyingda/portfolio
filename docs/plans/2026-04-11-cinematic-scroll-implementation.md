# Cinematic Scroll Portfolio — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the portfolio into a cinematic slide-by-slide presentation using CSS scroll-snap, with each section filling the viewport.

**Architecture:** CSS `scroll-snap-type: y proximity` on page containers. Every major section becomes `min-h-screen` with vertically centered content. No new dependencies — pure CSS + existing FadeIn component with bumped threshold.

**Tech Stack:** Next.js 15, Tailwind CSS, CSS Scroll Snap

---

### Task 1: Add scroll-snap utility classes to globals.css

**Files:**
- Modify: `app/globals.css`

**Step 1: Add snap utilities inside the `@layer utilities` block**

Add these classes after the existing utilities in `app/globals.css`:

```css
.snap-container {
  scroll-snap-type: y proximity;
}

.snap-slide {
  scroll-snap-align: start;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

Note: `100dvh` is the dynamic viewport height that handles mobile browser chrome correctly. The `100vh` fallback is for older browsers.

**Step 2: Verify CSS compiles**

Run: `npx tsc --noEmit`
Expected: no errors

**Step 3: Commit**

```
feat: add scroll-snap utility classes
```

---

### Task 2: Update FadeIn threshold

**Files:**
- Modify: `components/ui/FadeIn.tsx`

**Step 1: Bump IntersectionObserver threshold from 0.08 to 0.2**

In `components/ui/FadeIn.tsx` line 33, change:
```tsx
{ threshold: 0.08 }
```
to:
```tsx
{ threshold: 0.15 }
```

This triggers the fade slightly earlier in the viewport — better for full-screen slides where 8% of a tall section may not be visible yet.

**Step 2: Verify no type errors**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```
feat: bump FadeIn threshold for slide-based layout
```

---

### Task 3: Convert homepage to snap container

**Files:**
- Modify: `app/page.tsx`

**Step 1: Add snap-container class to the page wrapper**

Change the wrapper `<div>` from:
```tsx
<div className="relative">
```
to:
```tsx
<div className="relative snap-container h-screen overflow-y-auto">
```

The `h-screen overflow-y-auto` makes this div the scroll container (scroll-snap requires a defined scroll container, not the body).

**Step 2: Verify page loads**

Open `localhost:3000` in browser. Page should still render normally.

**Step 3: Commit**

```
feat: make homepage a scroll-snap container
```

---

### Task 4: Make Hero a snap slide

**Files:**
- Modify: `components/sections/Hero.tsx`

**Step 1: Add snap-slide alignment to the Hero section**

Change:
```tsx
<section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
```
to:
```tsx
<section className="relative min-h-screen flex flex-col justify-between overflow-hidden scroll-snap-align-start" style={{ scrollSnapAlign: 'start' }}>
```

Actually, since the Hero already has `min-h-screen` and the parent is the snap container, we just need `scroll-snap-align: start`. Use inline style since this is a one-off:

```tsx
<section className="relative min-h-screen flex flex-col justify-between overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
```

**Step 2: Verify Hero snaps**

Open browser, scroll down slightly on homepage — should gently snap to the next section.

**Step 3: Commit**

```
feat: Hero section as snap slide
```

---

### Task 5: Rewrite Work section — one project per full-screen slide

**Files:**
- Modify: `components/sections/Work.tsx`

**Step 1: Replace entire Work component**

Replace the contents of `components/sections/Work.tsx` with:

```tsx
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import FadeIn from '@/components/ui/FadeIn'
import { projects } from '@/content/projects'

export default function Work() {
  return (
    <section id="work">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="min-h-screen flex items-center bg-th-bg border-t border-th-bsub"
          style={{ scrollSnapAlign: 'start' }}
        >
          <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 md:gap-12 items-center">
                {/* Text */}
                <div>
                  <span className="font-mono text-[12px] text-th-text3 mb-6 block">
                    {String(i + 1).padStart(2, '0')} — {project.category}
                  </span>
                  <Link href={`/work/${project.slug}`}>
                    <h2
                      className="font-display font-bold text-[36px] md:text-[52px] text-th-text leading-[1.12] mb-4 hover:opacity-70 transition-opacity duration-200"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {project.title}
                    </h2>
                  </Link>
                  <p className="font-sans text-[14px] text-th-text3 mb-6">
                    {project.company} · {project.year}
                  </p>
                  <p className="font-sans text-[16px] text-th-text2 leading-[1.5] mb-8 max-w-[420px]">
                    {project.summary}
                  </p>
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center px-5 py-2.5 rounded-pill bg-th-text text-th-bg font-sans text-[14px] font-medium hover:opacity-80 transition-opacity duration-200"
                  >
                    View case study
                  </Link>
                </div>

                {/* Cover image */}
                <Link href={`/work/${project.slug}`} className="block group">
                  <div className="overflow-hidden rounded-card-lg shadow-card">
                    <ImagePlaceholder
                      aspect="4/3"
                      device="mobile"
                      src={project.coverImage}
                      className="group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </div>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      ))}
    </section>
  )
}
```

**Step 2: Verify in browser**

Each project should be its own full-screen slide with text left, image right.

**Step 3: Commit**

```
feat: Work section as full-screen project slides
```

---

### Task 6: Make About section a snap slide

**Files:**
- Modify: `components/sections/About.tsx`

**Step 1: Add snap and min-height to About section**

Change:
```tsx
<section id="about" className="bg-th-bg2 border-t border-th-bsub">
  <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-24 md:py-32">
```
to:
```tsx
<section id="about" className="min-h-screen bg-th-bg2 border-t border-th-bsub flex items-center" style={{ scrollSnapAlign: 'start' }}>
  <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
```

**Step 2: Verify About section fills viewport and content is centered**

**Step 3: Commit**

```
feat: About section as snap slide
```

---

### Task 7: Convert case study page to snap container

**Files:**
- Modify: `app/work/[slug]/page.tsx`

**Step 1: Add snap container to page wrapper**

Change the outer `<div>`:
```tsx
<div className="overflow-x-hidden">
```
to:
```tsx
<div className="overflow-x-hidden snap-container h-screen overflow-y-auto">
```

**Step 2: Add snap-align to hero section**

The hero `<section>` already has `min-h-screen`. Add snap align:
```tsx
<section className="min-h-screen bg-th-bg flex flex-col justify-between pt-16 overflow-x-hidden overflow-y-visible" style={{ scrollSnapAlign: 'start' }}>
```

**Step 3: Add snap-align to cover image section**

Change:
```tsx
<div className="bg-th-bg px-8 md:px-12">
```
to:
```tsx
<div className="min-h-screen bg-th-bg flex items-center px-8 md:px-12" style={{ scrollSnapAlign: 'start' }}>
```

**Step 4: Add snap-align to overview strip**

Change:
```tsx
<div className="bg-th-bg2 border-t border-th-bsub">
  <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-12 ...">
```
to:
```tsx
<div className="min-h-screen bg-th-bg2 border-t border-th-bsub flex items-center" style={{ scrollSnapAlign: 'start' }}>
  <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16 ...">
```

**Step 5: Add snap-align to next project section**

Change:
```tsx
<div className="bg-th-bg border-t border-th-bsub">
  <div className="max-w-[1136px] mx-auto px-8 md:px-12 py-16 ...">
```
to:
```tsx
<div className="min-h-screen bg-th-bg border-t border-th-bsub flex items-center" style={{ scrollSnapAlign: 'start' }}>
  <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16 ...">
```

**Step 6: Remove the separate "Back to work" section** — fold the back link into the next project slide.

Delete:
```tsx
{/* Back */}
<div className="bg-th-bg border-t border-th-bsub pb-16">
  <div className="max-w-[1136px] mx-auto px-8 md:px-12 pt-8">
    <Link href="/" ...>← Back to work</Link>
  </div>
</div>
```

Add back link into the next project section instead.

**Step 7: Commit**

```
feat: case study page as snap container with slide sections
```

---

### Task 8: Convert all 10 section types to snap slides

**Files:**
- Modify: `app/work/[slug]/page.tsx` (section components)

**Step 1: Create a shared slide wrapper**

Add this component near the top of the file (after the existing primitives):

```tsx
function SlideSection({ bg, children }: { bg: 'dark' | 'light'; children: React.ReactNode }) {
  return (
    <FadeIn>
      <div
        className={`${wrap(bg)} min-h-screen flex items-center border-t border-th-bsub`}
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="max-w-[1136px] mx-auto w-full px-8 md:px-12 py-16">
          {children}
        </div>
      </div>
    </FadeIn>
  )
}
```

**Step 2: Refactor each section type to use SlideSection**

For each of the 10 section types (TextSection, TwoColSection, StatsSection, ColumnsSection, GridSection, QuotesSection, ImageSection, PhaseSection, ComparisonSection, OutcomeSection), replace the outer wrapper.

Example — TextSection before:
```tsx
function TextSection({ s }: { s: CaseStudySection & { type: 'text' } }) {
  return (
    <FadeIn><div className={`${wrap(s.bg)} py-24 md:py-32 border-t border-th-bsub`}>
      <div className="max-w-[1136px] mx-auto px-8 md:px-12">
        <SLabel label={s.label} />
        <SHeading heading={s.heading} />
        <SBody body={s.body} />
      </div>
    </div></FadeIn>
  )
}
```

After:
```tsx
function TextSection({ s }: { s: CaseStudySection & { type: 'text' } }) {
  return (
    <SlideSection bg={s.bg}>
      <SLabel label={s.label} />
      <SHeading heading={s.heading} />
      <SBody body={s.body} />
    </SlideSection>
  )
}
```

Apply this pattern to ALL 10 section types. Special notes:
- **ImageSection**: use `min-h-screen` but allow image to be larger — keep `py-12` and add `flex items-center`
- **PhaseSection**: keep the watermark number positioning — it needs `relative overflow-hidden` on the slide wrapper instead of `SlideSection`

**Step 3: Verify all sections render as full-screen slides**

**Step 4: Commit**

```
feat: all case study sections as snap slides
```

---

### Task 9: Final polish — verify scroll behavior

**Step 1: Test homepage flow**

Open `localhost:3000`. Verify:
- Hero → Project 1 → Project 2 → Project 3 → About → Footer
- Each section gently snaps into place
- FadeIn triggers as each slide enters
- DotMatrix visible behind Hero
- No horizontal scrollbar

**Step 2: Test case study flow**

Open `localhost:3000/work/grab-multiple-ride-types`. Verify:
- Hero with Spline → Cover image → Overview → Sections → Next project
- Each section snaps
- Spline mockup loads without blue flash
- No horizontal scrollbar
- "Next project" slide has link to next case study

**Step 3: Test mobile (resize browser to 375px)**

Verify:
- Sections stack naturally
- Snap works without jank
- Content doesn't overflow

**Step 4: Final commit**

```
feat: cinematic scroll portfolio complete
```
