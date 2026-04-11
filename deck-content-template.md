# Kiat Yingda — Portfolio Deck Content Template
> Use this file as the single source of truth. Edit the text here, then sync to the HTML deck.
> Lines marked with `[VISUAL]` describe what goes on screen — not text to render.
> Lines marked with `[NOTE]` are presentation notes / what you say out loud.

---

## SLIDE 1 — Title

**Headline:** Kiat Yingda
**Subline:** Product Designer
**One-liner:** I design consumer products at scale — most recently at Grab, where I led product design for ride-hailing across Southeast Asia.
**Contact:** kiat.yingda@gmail.com · [portfolio URL]

[VISUAL] Clean, dark bg, light type. Professional headshot or avatar. Minimal.
[NOTE] Say your name and move on. 15 seconds max.

---

## SLIDE 2 — Quick context on me

**Body:**
Before Grab, I was a founding designer at a consultancy where I led projects for clients like ION Orchard. I've also co-founded a cooking media brand (The Meatmen), and designed for crypto (OKX) and healthcare (SingHealth).

Today I'll walk you through one project in depth.

[VISUAL] Text only. No timeline graphic. Dark bg.
[NOTE] 30 seconds. Establish range, then get into the work.

---

## SLIDE 3 — Project overview card

**Label:** CASE STUDY · 2021–2024
**Title:** Multiple Ride Types
**Company:** Grab

| Detail         | Value                                                    |
|----------------|----------------------------------------------------------|
| Role           | Lead Product Designer (sole designer)                    |
| Team           | 3 PMs, 2 UX Researchers, 1 Content Designer, 1 Analyst  |
| Cross-team     | Fulfillment, Payments, Offers                            |
| Duration       | Aug 2021 – Jan 2024                                      |

**Impact (large, visible):**
- +0.4pp fulfilment rate (matched rides across SE Asia)
- +$1M incremental revenue per year

[VISUAL] Grab logo top-left. Black bg. Impact numbers should be the biggest text on the slide.
[NOTE] 30 seconds. "Let me start with the results, then I'll show you how we got there."

---

## SLIDE 4 — The real problem

**Left column — Passengers:**
Hard to get a ride. Post-COVID supply crunch meant too many passengers, too few drivers. Users were constantly cancelling and rebooking different services trying to get a car.

**Right column — For Grab:**
Most users only booked JustGrab (the flagship service). Other services had idle drivers. Fulfillment was dropping.

**Key framing:**
This was a marketplace problem disguised as a UX problem.

[VISUAL] Two-column layout. Person icon left, Grab "G" icon right. Light bg.
[NOTE] 1 minute. Set up the tension between passenger pain and platform inefficiency.

---

## SLIDE 5 — What the data told me

**Stat 1:** 78% of users who couldn't get a ride rebooked within 30 minutes.
**Stat 2:** Among those, 90% booked a service at a similar price point.

**Insight:**
Users were already willing to switch — they were just doing it manually, with a lot of friction. The opportunity was to remove that friction.

[VISUAL] Large stat callouts on light bg. Numbers should dominate the slide.
[NOTE] 45 seconds. Let the data speak. "This told us the demand for switching was already there."

---

## SLIDE 6 — My approach

**Column 1 — Existing data**
The rebook behavior stats (78% / 90%) confirmed willingness to switch services.

**Column 2 — User research**
Partnered with a researcher and content designer to test 6 different concepts across Singapore and Indonesia.

**Column 3 — Competitive analysis**
DiDi (Chinese ride-hailing) lets users multi-select services, but adds cognitive load — more options = more overwhelm.

**Framing:**
I wanted to understand three things: what the data was already telling us, how users actually thought about choosing a ride, and what our peers had tried.

[VISUAL] Three-column layout with icons (chart, smiley, car). Light bg.
[NOTE] 1 minute.

---

## SLIDE 7 — Product strategy I proposed

**Short-term:**
User mental-model shift — change the way users book, from single-selection to multiple-selection.

**Long-term:**
An intent-based experience built on tradeoffs between price/time and user needs. Users choose by category, not by service name.

**Framing:**
I framed this as a two-horizon strategy to get alignment from product leadership.

[VISUAL] Two-column: Short-term (bold) / Long-term (lighter, aspirational). Light bg.
[NOTE] 45 seconds. Shows strategic thinking beyond screen-level design.

---

## SLIDE 8 — Concepts I explored

**Grid (2 rows × 3 columns):**

| Concept                      | Hypothesis                                           | Tested? |
|------------------------------|------------------------------------------------------|---------|
| Manual selection             | User wants maximum control and comparison             | ✅ Winner |
| Fare slider                  | User only cares about fare, not what's selected       |         |
| Bundles                      | User doesn't want to spend time choosing              |         |
| Post-booking prompt          | User won't multi-select until they've tried and failed| ✅ Winner |
| Intent-based (needs)         | User's mental model is needs-first (e.g. "I have kids") |       |
| Intent-based (categories)    | Simplifying options reduces drop-off                  | ✅ Winner |

**Framing:**
I designed and tested 6 distinct concepts, each testing a different hypothesis about how users make ride choices.

[VISUAL] 2×3 grid of small phone mockups from the existing concept explorations. Green checkmarks on the 3 winners. Light bg.
[NOTE] 1.5 minutes. Walk through the hypotheses, not the pixels.

---

## SLIDE 9 — What I learned from users

**Takeaway 1:** "I'm more used to seeing the list of services over just categories."
→ Users prefer familiar patterns over novel abstractions.

**Takeaway 2:** "I will only book my regular service, and won't add more unless I really can't get a car."
→ Multi-select is a fallback behavior, not a default one.

**Takeaway 3:** "I don't like horizontal scrolling. I want to scroll and compare prices of all the services."
→ Vertical list with price comparison is essential.

**What this killed:**
The intent-based categories concept I was most excited about didn't resonate. Users wanted control, not abstraction.

[VISUAL] Text-focused, light bg. Three takeaways with clear structure.
[NOTE] 1 minute. Emphasize "I was wrong about X" — shows intellectual honesty.

---

## SLIDE 10 — The constraint that shaped everything

**Problem:**
Engineering needed at least 6 months to rebuild the allocation engine for true multi-selection.

**My move:**
I worked closely with product and engineering to implement the feature in phases — rolling out low-cost MVPs to validate product-market fit and get learnings while the backend caught up.

**Framing:**
This decision — to phase the rollout instead of waiting — shaped the entire project trajectory.

[VISUAL] Text-heavy. "Problem" + "Solution" blocks. Light bg.
[NOTE] 1 minute. This is senior-level signal. You influenced the execution roadmap.

---

## SLIDE 11 — Phase 1: Hacky experiment (2021)

**What we shipped:**
"Any Nearby Ride" — a single new service that matched users to the first available driver across multiple ride types. No allocation engine change needed.

**How it worked:**
User books → system searches across ride types → first available driver is matched → user is told which ride type they got via chat message.

**Result:**
Good adoption rate and increased fulfillment rates. Validated product-market fit.

**Caveat:**
This was pre-design-system. The UI wasn't polished, but the concept worked.

[VISUAL] 3 phone screens: booking screen with "Any Nearby Ride" → searching/looking for ride → driver chat explaining the ride type. Dark bg. Label: "2021 (pre design system)".
[NOTE] 1.5 minutes. "It was hacky, but it proved the concept."

---

## SLIDE 12 — Phase 2: Post-booking prompt + what broke

**What we shipped:**
When drivers were scarce after booking, a bottomsheet prompted users to add more ride types to increase their odds.

**What went wrong:**
1. [Real users] complained they got allocated a service they did not book — trust violation.
2. [Internal beta] the feature sometimes didn't appear when they needed it.
3. 0.8% of users did nothing when the bottomsheet appeared — they froze.

**What I did about it:**
- Replaced opaque "2 ride types" bundles with explicit individual ride types (Standard Taxi, GrabCar Premium) so users could see exactly what they were opting into.
- Rewrote the copy with the content designer: "Few drivers now. Add other ride types to your search?"
- Added a timer-based auto-proceed CTA so users who hesitated would be moved forward automatically.

[VISUAL] Before/after comparison. Left: original bottomsheet ("Book this instead" with bundled options). Right: improved version (explicit ride types, better copy, timer button). Dark bg with annotated callouts.
[NOTE] 2 minutes. This is the heart of the presentation. Ship → break → diagnose → fix.

---

## SLIDE 13 — Design system contribution

**What I did:**
The timer button pattern was going to be reused across Grab. I contributed the design specs to the design system for broader team adoption.

**Variants:**
- Primary (green) — default action with countdown
- Secondary (light green) — alternative action with countdown
- Alert (red) — urgent/destructive action with countdown

[VISUAL] Timer button spec showing 3 variants. Light bg. Small, focused slide.
[NOTE] 30 seconds. "I spotted this would be reused and contributed it to the system."

---

## SLIDE 14 — Phase 3: The full solution

**What shipped:**
Pre-booking multi-select: checkboxes on the ride type list. Users explicitly choose which services they'll accept before booking. Combined with the refined post-booking prompt as a safety net.

**What changed:**
This was the version that required the rebuilt allocation engine. True user control + system flexibility.

**Visual refinements:**
- Smaller service icons for tighter density
- Checkbox moved to the right for better scannability
- Overall information density improved

[VISUAL] "After" phone mockup with checkbox-based ride list (green checkmark on JustGrab, empty checkboxes on others). Dark bg. Annotations showing icon size and checkbox position changes.
[NOTE] 1 minute. "This was the version we'd been building toward."

---

## SLIDE 15 — Navigating constraints + stakeholders

**Challenge:**
GrabShare (carpooling) technically couldn't support multi-selection. The PM wanted a disruptive modal dialog to block users from selecting it with other types.

**My proposal (Option A):**
Simply show GrabShare in the list but prevent it from being checked alongside other services — disable checkboxes contextually. No modal, no interruption to the flow.

**vs. Option B (rejected):**
A modal popup: "GrabShare cannot be selected with other ride types. Proceed to unselect?" — an extra step that breaks the booking momentum.

**Outcome:**
Option A shipped. Less friction, same constraint enforced.

[VISUAL] Side-by-side: Option A (proposed, highlighted) vs Option B (modal dialog). Light bg.
[NOTE] 1 minute. "I pushed back on the modal. Same constraint, less friction."

---

## SLIDE 16 — The vision I was driving toward

**Headline:** The Ride-Hailing Vision

**Description:**
An intent-based booking experience where services are grouped by user need — Standard, Economy, Fastest — rather than internal product names. Users choose a category, and the system matches them to the best available option.

**Framing:**
I'd been advocating for this since early research. The phased approach was always designed to move users toward this model over time.

[VISUAL] Vision mockup: phone screen with horizontal category cards (Standard, Economy, Fastest) with car images, prices, and pickup times. Dark bg.
[NOTE] 45 seconds. "This is where I was pushing the product."

---

## SLIDE 17 — Results + what I learned

**Results:**
- +0.4pp fulfilment rate (matched rides)
- +$1M revenue per year

**Reflections:**

1. **Marketplace design insight:** The biggest UX lever was often a backend architecture decision. My job was to make the phased approach feel intentional to users, even when it was a constraint.

2. **Copy matters as much as UI:** The content rewrite in Phase 2 drove as much improvement as the interface changes. I should have invested in copy testing earlier instead of treating it as a polish step.

3. **Users accept less control if you give more transparency:** When we showed explicit ride types instead of opaque bundles, trust went up even though we were asking for the same thing.

[VISUAL] Left: big impact numbers. Right: reflection text. Light bg.
[NOTE] 1.5 minutes. The reflection separates L5 from L6 at FAANG.

---

## SLIDE 18 — Other works

**Card 1 — ION Orchard (2359 Media, 2018–2019)**
Role: Lead Designer
Problem: Poorly organized IA, dated UI, 70% of receipt submissions rejected, only 40% of loyalty members active.
What I did: Redesigned information architecture, simplified receipt scanning, personalized store directory.
Result: +239% active users.

**Card 2 — OKX Boost (2024)**
Role: Product Designer
Problem: Designed a Web3 growth product for OKX exchange.
Result: ~$4B trading volume, ~$17.7M revenue.

**Card 3 (optional) — SingHealth MyCare**
Role: Product Designer
Problem: COVID-era contactless patient request system.
Result: Reduced nurse admin time ~30%.

[VISUAL] 2-3 cards side by side. One product screenshot per card. Dark bg.
[NOTE] 30 seconds. "Happy to go deeper on any of these."

---

## SLIDE 19 — Thank you

**Text:** Thank you.
**Contact:** kiat.yingda@gmail.com · [portfolio URL]
**Personal note (optional):** Also co-founded The Meatmen — a cooking channel with [X] subscribers. I like building things people use.

[VISUAL] Clean, dark bg. Confident close.
[NOTE] 10 seconds. Done.

---

# APPENDIX — Asset reference

These are the visuals to pull from the existing decks:

| Slide | Asset needed | Source |
|-------|-------------|--------|
| 3 | Grab logo | Full deck slide 13 |
| 4 | Person + Grab G icons | Full deck slide 17 |
| 5 | — (text only) | — |
| 6 | Chart, smiley, car icons | Full deck slide 16 |
| 7 | — (text only) | — |
| 8 | 6 concept phone mockups | Full deck slides 25-30 |
| 9 | — (text only) | — |
| 10 | — (text only) | — |
| 11 | 3 phone screens (Any Nearby Ride flow) | Full deck slide 34 |
| 12 | Before/after bottomsheet comparison | Full deck slide 38 |
| 13 | Timer button spec (3 variants) | Full deck slide 39 |
| 14 | After mockup (checkbox ride list) | Full deck slide 41, 46 |
| 15 | Option A vs B (GrabShare constraint) | Full deck slide 43 |
| 16 | Vision mockup (category cards) | Full deck slide 47 |
| 18 | ION Orchard before/after + OKX screenshot | Full deck slides 52-53, email deck |
