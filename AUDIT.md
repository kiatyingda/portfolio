# Portfolio Audit Report
**Date:** 2026-04-12
**Target:** OGP Senior Product Designer interview (Benjamin Bowes)

---

## 1. Information Architecture

- Two of four case studies are stubs. OKX and ION Orchard have 3 sections each — they will not hold up in an interview walkthrough.
- Grab is the only deep case study (15 sections, specific data, full narrative arc).
- SingHealth is medium depth (6 sections, user quotes, before/after concept) but missing all 4 images.
- No mobile navigation menu. Below 640px, users can only scroll — no way to jump to Work or About sections.
- "All projects" link from case study pages goes to `/` (homepage top), not `/#work`.

**Decision needed:** Either flesh out OKX and ION to 6-8 sections each, or remove them and ship a focused 2-project portfolio. Two strong case studies > four where half are hollow.

---

## 2. Visual

### Light mode is broken
Multiple components have hardcoded dark-mode colors:
- DotMatrix — white dots, invisible on white background
- Nav border — `border-white/[0.06]`, invisible in light mode
- Quote cards — hardcoded `background: '#ffffff'`, blends into light mode
- ConceptLightbox — hardcoded dark overlay colors
- BeforeAfter labels — hardcoded `bg-black/50 text-white/70`

**Decision needed:** Fix light mode or remove the theme toggle entirely.

### Career timeline is backwards
Currently reads 2011 → now (oldest first). Interviewers care about recent work. Should be reversed: current role at top.

### Date inconsistencies
- Career timeline: Grab 2021–2025, OKX 2025–now
- Project cards: Grab 2021–2024, OKX 2024
- OG meta description says "most recently at Grab" but career shows OKX as current

---

## 3. Motion

Current state is appropriate:
- FadeIn on scroll is restrained and professional
- Hero stagger animation is clean
- No excessive motion

**No changes needed.** Don't add more.

---

## 4. Storytelling

### SingHealth framing gap
The problem statement says "nurses drowning in paperwork" but the approach section discusses appointment booking and lab results (patient-facing features). The narrative pivots from nursing workflow to patient-facing UX without explaining the connection.

### OKX has no story
"$4B trading volume" is a large claim with zero process behind it. No research, no design decisions, no tradeoffs documented. An interviewer asking "walk me through your process" will find nothing to walk through.

### Forward-dated attribution
"Top 10 World's Best Smart Hospitals 2026 — Newsweek" for work done in 2017–2018 needs context or it reads as misleading.

---

## 5. Content

### Hero copy
- Headline is strong: "Clarity, craft, and business impact."
- Body is generic: "Product designer turning complex problems into confident experiences." Every portfolio says this.

### Bio
Template-level phrases: "thoughtful digital experiences," "strong product logic," "refined execution." These are filler. Say something only you could say.

### Resume link
Points to `#`. Dead button. Either add the actual PDF or remove the button.

---

## 6. Interaction

### Before/after sliders are empty
Four referenced image files are missing. The component works but shows empty black panels:
- `/images/singhealth-before.png`
- `/images/singhealth-after.png`
- `/images/singhealth-before-2.png`
- `/images/singhealth-after-2.png`

### Quote card theming
White background is hardcoded, ignoring the theme system. Minor but shows inconsistency in craft.

---

## 7. Workflow / Code Cleanup

### Dead code
- `SplineMockup` — imported in case study page, no project defines `splineUrl`. Never renders.
- `.grain` CSS utility — defined, never used
- `.nav-link` CSS utility — defined, never used
- `.ring-accent-hover` CSS utility — defined, never used
- `.snap-container` CSS class — defined (empty), never used
- `scrollSnapAlign: 'start'` — set on Hero, Work items, About sections but scroll-snap-type is never set on any parent container. Dead inline styles.

### Unused video assets
- `assets/` folder has 3 large video files (~168MB total) not referenced anywhere
- `public/videos/base-new.mp4` exists but only the `.webm` is referenced in code

---

## 8. Visuals to Add

### Must-have (blocking)
- 4 SingHealth before/after images (sliders are currently empty)
- OKX product screenshots (at least 3-4 key screens) if keeping the case study
- ION Orchard product screenshots if keeping the case study

### High-impact
- Real cover images for SingHealth and ION Orchard
- A hero video or visual for OKX (Grab has one, the asymmetry is noticeable)

### Don't add
More motion, more components, more sections. The system is built. It needs content, not features.

---

## 9. OGP Interview Fit

### The framing problem
OGP explicitly removes revenue and DAUs as success metrics. They design for public good. The portfolio currently leads with:
- Grab: "+$1M revenue"
- OKX: "$4B trading volume, $17.7M revenue"
- ION: "+239% loyalty members"

Benjamin Bowes gave a Figma Singapore talk specifically about designing without commercial metrics. He will notice this framing.

### What Ben will look for
He's ex-Pivotal Labs — build/measure/learn, pragmatic, process-oriented:
- **Why** you made decisions, not just what you shipped
- End-to-end ownership and research methodology
- How you work with engineers and PMs
- Willingness to challenge the status quo
- User outcomes over business outcomes

### The irony
SingHealth is the strongest card for OGP — healthcare, public good, serving patients. But it's the least developed case study. Grab (the deepest case study) leads with commercial metrics that don't resonate with OGP's mission.

### Recommended reframing
1. **SingHealth → Lead project.** Government-adjacent healthcare. "If I redesigned it today" shows growth mindset. Needs images and narrative fix.
2. **Grab → Reframe metrics.** Instead of "+$1M revenue," lead with "78% of unfulfilled users were rebooking manually." The user problem is compelling. Revenue was a byproduct.
3. **OKX and ION → Flesh out or demote.** Thin crypto/retail case studies with no process are worse than not showing them.
4. **Reorder to:** SingHealth → Grab → ION → OKX. Lead with public impact.

---

## Project Status Summary

| # | Project | Sections | Depth | Cover | Case Study Images | Status |
|---|---------|----------|-------|-------|-------------------|--------|
| 1 | Grab Multiple Ride Types | 15 | Deep | ✅ | 14 images, all present | Ready |
| 2 | OKX Boost | 3 | Stub | ✅ | 0 images | Needs work |
| 3 | SingHealth Patient App | 6 | Medium | ✅ | 0 of 4 present | Needs images + narrative fix |
| 4 | ION Orchard | 3 | Stub | ✅ | 0 images | Needs work |
