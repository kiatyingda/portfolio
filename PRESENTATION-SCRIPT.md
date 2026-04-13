# Presentation Script — Kiat Yingda for Benjamin (OGP)

> Estimated time: 25–30 minutes
> Structure: Three acts + closing. Each act maps to a section of the deck.

---

## ACT 1: WHO I AM AND HOW I THINK (3–4 min)

**[DECK: Hero slide — "Clarity, Craft, and Business Impact"]**

Hi Benjamin, thanks for making time for this. I'm Yingda — I've been designing products for about eight years now, across consumer, healthcare, Web3, and enterprise.

The thread across all of it is this: I'm drawn to messy, high-stakes problems where design has to do more than make things pretty — it has to unlock business outcomes, build trust, or simplify something genuinely hard.

**[DECK: Experience timeline]**

Quick context on my path:

I started at **2359 Media**, a small studio in Singapore. I was the founding designer — literally building the design practice from scratch. No design system, no process, no handoff framework. I created all of that. Pitch decks, client reviews, prototyping workflows — I was prototyping interactive flows when most designers around me were still delivering static screens. We worked with DBS, Standard Chartered, F1, Apple — real clients, real stakes, real deadlines.

What that taught me: **when you don't have a process, you build one. When you don't have research, you develop instincts and validate fast.**

Then I spent three and a half years at **Grab**, leading design for ride-hailing — the core booking flow used by 50 million people. That's where I learned what it means to design at scale: phased rollouts, A/B testing frameworks, cross-functional alignment with product and engineering.

Now I'm at **OKX**, designing Web3 growth products. Completely different energy — fast, chaotic, no formal research infrastructure. You make decisions based on competitive analysis, design instinct, and shipping speed. In six months, the product I designed contributed to roughly $4 billion in trading volume.

So my range is: **startup scrappiness → large-scale consumer impact → fast-moving product-led growth.**

---

## ACT 2: DEEP DIVE — MULTIPLE RIDE TYPES AT GRAB (15–18 min)

**[DECK: Grab title slide — "Multiple Ride Types"]**

This is the case study I want to walk through in depth because it shows how I think about product design — not just the pixels, but the strategy, the constraints, and the decisions.

### The Problem

**[DECK: Context slide]**

Post-COVID, Grab had a supply crunch. Too many riders, not enough drivers. Users were getting frustrated — they'd book JustGrab, fail to get a match, cancel, try another ride type, fail again. Meanwhile, other ride types like GrabCar or Standard Taxi had idle drivers sitting around.

**[DECK: Stats — 78% / 90%]**

The data told a clear story: 78% of unfulfilled users rebooked within 30 seconds. And 90% of them rebooked at a similar price point. They were already willing to switch — they were just doing it manually, with a lot of friction.

The insight was: **this isn't a UX problem — it's a marketplace problem.** The system wasn't connecting supply with demand efficiently. My job was to make the allocation smarter through the interface.

### My Approach

**[DECK: Approach columns]**

I anchored everything in three things: the existing data (which confirmed willingness to switch), user research (six concepts tested across Singapore and Indonesia with a researcher and content designer), and competitive analysis — DiDi in China already had multi-select, but it added cognitive load. Southeast Asian users preferred more guidance.

### Strategy

**[DECK: Two-horizon thinking]**

I proposed a two-horizon strategy to get alignment with product and engineering. Short-term: let users select multiple ride types before booking — low risk, high learning. Long-term: move toward an intent-based experience where users choose by need — "Standard," "Economy," "Fastest" — not by service name.

This was important because engineering needed six months to rebuild the allocation engine. I couldn't wait. So I designed a phased approach that shipped value while the backend caught up.

### Concepts

**[DECK: Concepts grid — 6 concepts]**

I designed and tested six concepts, grouped into two themes. The first three were about explicit user control — manual selection, a fare slider, and pre-set bundles. The second three were about guided selection — post-booking prompts, intent-based categories, and needs-first grouping.

The winners from research were: manual selection (users wanted control), post-booking prompt (multi-select as a fallback, not the default), and intent-based categories (clearer mental model, less drop-off).

### Phased Rollout

**[DECK: Phased rollout — 3 phases]**

Phase 1 was a hack. We created one new service — "Any Nearby Ride" — that matched users to the first available driver across all ride types. No allocation engine change needed. It worked. Good adoption, improved fulfilment. UI wasn't polished, but the concept was validated.

Phase 2 was the post-booking prompt. A bottom sheet that appeared when drivers were scarce, asking users to expand their ride type selection. Three things broke: trust violation (users felt they were allocated a ride type they didn't choose), inconsistent triggering, and 0.8% of users froze and did nothing when the sheet appeared.

**[DECK: Iteration slide — before/after]**

So I iterated. Replaced opaque bundles with explicit ride types. Rewrote the copy with a content designer — the rewrite drove as much improvement as the UI changes. Added a timer-based CTA that auto-proceeded after a countdown. That timer button pattern was picked up by the design system and reused across Grab.

Phase 3 was the full solution — pre-booking multi-select with checkboxes on the ride type list. Required the rebuilt allocation engine. I pushed back on a modal popup that product wanted (it broke booking momentum) and shipped contextual inline controls instead.

### Results

**[DECK: Outcome — +0.4pp / +$1M]**

The result: +0.4 percentage points in fulfilment rate across Southeast Asia. Roughly +$1 million in incremental revenue per year. And a design pattern — the timer button — that became part of Grab's system library.

The biggest takeaway for me: **the largest UX lever was often a backend decision.** I made the phased approach feel intentional even when it was a constraint. Copy was as powerful as interface. And transparency beat control — explicit ride types instead of opaque bundles built more trust.

---

## ACT 3: BREADTH — SINGHEALTH + OKX (5–6 min)

**[DECK: "Other works" divider]**

I want to briefly touch on two other projects because they show the range of contexts I've worked in — and how my approach adapts.

### SingHealth

**[DECK: ION/SingHealth overview — mention SingHealth specifically]**

At 2359, I worked on **MyCare** for SingHealth — Singapore's largest public healthcare cluster, 4 million patients. This was designing for public good. The app let inpatients track vitals, request services, and communicate with nurses — reducing physical contact during COVID.

What's different about healthcare design: **the user is vulnerable.** An elderly patient on a bedside iPad isn't the same as a 25-year-old booking a Grab. You design for anxiety reduction, for accessibility (larger fonts, higher contrast, multi-language), for trust.

The emotional feedback from patients — "Seeing my child's vitals in real-time gave me relief" — that's a different kind of impact than revenue metrics. Both matter. But the design instincts are different.

### OKX Boost

**[DECK: OKX Boost slides]**

And then there's OKX — the opposite end of the spectrum. Web3 growth products. No formal research team. No user testing infrastructure. You're designing staking interfaces, reward mechanics, trading leaderboards — inherently complex financial products.

My design principle here was: **clarity is the primary weapon.** Every non-essential element is a liability in financial UI. Progressive disclosure — surface the most important thing first. Trust signals — does this make the user more confident or less?

The result: Boost became a core Web3 growth pillar. ~$4B in trading volume, ~$17.7M in revenue, ~60% of DEX volume attributed to the product.

What I learned: when you don't have research, you develop sharper instincts. You look at competitors harder, you ship smaller, you iterate faster. It's a different muscle than Grab's data-rich environment, but it's equally valid.

---

## CLOSING: THE THREAD (2 min)

**[DECK: Return to hero or thank you slide]**

So the thread across all of this:

**2359** taught me how to build from zero — process, standards, craft discipline. **Grab** taught me how to design at scale — phased rollouts, stakeholder alignment, data-informed decisions that affect millions. **SingHealth** taught me that design can serve people who have no voice in the product conversation. **OKX** taught me speed and instinct — when the data isn't there, your design judgment has to be.

For a role at OGP, I think what I bring is: someone who's operated across the full spectrum — startup to superapp to Web3 — and who cares deeply about the quality of the work and the impact it has on real people. Whether that's a rider stuck in the rain, a patient in a hospital bed, or a citizen interacting with government services.

I'd love to hear more about what you're working on and where you think this kind of thinking fits.

---

## NOTES FOR DELIVERY

- **Pace**: Slow down on the stats slides. Let the numbers land.
- **Grab deep dive**: This is the meat. Don't rush the phased rollout — the constraint-driven design story is compelling for OGP (government = constraints).
- **SingHealth**: Lean into the public good angle. OGP builds for citizens. Draw the parallel explicitly.
- **OKX contrast**: Use it to show range, not as a primary story. The chaos → instinct narrative differentiates you.
- **Body language**: When talking about user quotes, pause. Let the words breathe.
- **Transitions**: Use "So the question became..." or "What that taught me was..." to bridge sections naturally.
