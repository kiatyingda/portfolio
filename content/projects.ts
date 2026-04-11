// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProjectMeta {
  slug: string
  title: string
  company: string
  year: string
  category: string
  summary: string
  coverImage: string
  splineUrl?: string
  heroVideo?: string
  accent?: string
}

export interface CaseStudySection {
  type:
    | 'text'
    | 'twocol'
    | 'stats'
    | 'columns'
    | 'grid'
    | 'quotes'
    | 'image'
    | 'phase'
    | 'comparison'
    | 'outcome'
  bg: 'dark' | 'light'
  label?: string
  heading?: string
  body?: string | string[]
  // type-specific fields below
  columns?: { heading: string; body: string }[]
  stats?: { value: string; label: string }[]
  insight?: string
  items?: { title: string; body: string; status?: 'winner' | 'tested' | ''; image?: string }[]
  quotes?: { text: string; context: string; source?: { name: string; logo?: string } }[]
  caption?: string
  number?: string
  result?: string
  image?: string
  imageAfter?: string
  impact?: { value: string; label: string }[]
  reflections?: { title: string; body: string }[]
  left?: { heading: string; body: string }
  right?: { heading: string; body: string }
  options?: { label: string; description: string; outcome?: string; image?: string }[]
  beforeAfter?: { before: string; after: string; beforeLabel?: string; afterLabel?: string; device?: 'ipad' | 'none' }
}

export interface CaseStudy {
  label: string
  role: string
  team: string
  duration: string
  impact: { value: string; label: string }[]
  sections: CaseStudySection[]
}

export interface Project extends ProjectMeta {
  caseStudy: CaseStudy
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── 1. Multiple Ride Types — Grab ─────────────────────────────────────────
  {
    slug: 'grab-multiple-ride-types',
    title: 'Multiple Ride Types',
    company: 'Grab',
    year: '2021–2024',
    category: 'Consumer · Marketplace',
    summary: '+0.4pp fulfilment rate and +$1M incremental revenue per year across Southeast Asia.',
    coverImage: '/images/grab-cover.png',
    heroVideo: '/videos/base-new.webm',
    accent: '#00B14F',
    caseStudy: {
      label: 'Case Study · 2021–2024',
      role: 'Lead Product Designer (sole designer)',
      team: '3 PMs · 2 UX Researchers · 1 Content Designer · 1 Analyst · Cross-team: Fulfillment, Payments, Offers',
      duration: 'Aug 2021 – Jan 2024',
      impact: [
        { value: '+0.4pp', label: 'Fulfilment rate across SE Asia' },
        { value: '+$1M', label: 'Est. incremental revenue per year' },
      ],
      sections: [
        {
          type: 'twocol',
          bg: 'light',
          label: 'The Problem',
          heading: 'A marketplace problem disguised as a UX problem.',
          left: {
            heading: 'For passengers',
            body: 'Post-COVID supply crunch. Too many riders, too few drivers — users kept cancelling and rebooking to find a car.',
          },
          right: {
            heading: 'For Grab',
            body: 'Most users only booked JustGrab. Other services had idle drivers. Fulfilment was dropping.',
          },
        },
        {
          type: 'stats',
          bg: 'dark',
          label: 'What the data told us',
          stats: [
            { value: '78%', label: 'of unfulfilled users rebooked within 30 min' },
            { value: '90%', label: 'rebooked at a similar price point' },
          ],
          insight:
            'Users were already willing to switch — they just did it manually, with a lot of friction.',
        },
        {
          type: 'columns',
          bg: 'light',
          label: 'My approach',
          heading: 'I wanted to understand three things.',
          columns: [
            {
              heading: 'Existing data',
              body: 'Rebook behavior (78% / 90%) confirmed willingness to switch. This anchored everything.',
            },
            {
              heading: 'User research',
              body: '6 concepts tested across Singapore and Indonesia with a researcher and content designer.',
            },
            {
              heading: 'Competitive analysis',
              body: 'DiDi lets users multi-select, but adds overwhelm. More options, more cognitive load.',
            },
          ],
        },
        {
          type: 'twocol',
          bg: 'dark',
          label: 'Product strategy I proposed',
          heading: 'Two-horizon thinking to get alignment.',
          left: {
            heading: 'Short-term',
            body: 'Change the booking model from single to multi-select. Low risk, high learning.',
          },
          right: {
            heading: 'Long-term',
            body: 'Intent-based experience: users choose by need (Standard, Economy, Fastest) — not service name.',
          },
        },
        {
          type: 'grid',
          bg: 'light',
          label: 'Concepts I explored',
          heading: 'I designed and tested 6 concepts.',
          items: [
            {
              title: 'Manual selection',
              body: 'User wants maximum control and comparison.',
              status: 'winner',
              image: '/images/grab-concept-1.png',
            },
            {
              title: 'Fare slider',
              body: 'User only cares about fare.',
              status: 'tested',
              image: '/images/grab-concept-2.png',
            },
            {
              title: 'Bundles',
              body: 'User doesn\'t want to choose.',
              status: 'tested',
              image: '/images/grab-concept-3.png',
            },
            {
              title: 'Post-booking prompt',
              body: 'Multi-select as fallback, not default.',
              status: 'winner',
              image: '/images/grab-concept-4.png',
            },
            {
              title: 'Intent-based (needs)',
              body: 'Needs-first mental model.',
              status: 'tested',
              image: '/images/grab-concept-5.png',
            },
            {
              title: 'Intent-based (categories)',
              body: 'Fewer options, less drop-off.',
              status: 'winner',
              image: '/images/grab-concept-6.png',
            },
          ],
        },
        {
          type: 'quotes',
          bg: 'dark',
          label: 'From users',
          heading: 'They told us exactly what to build.',
          quotes: [
            {
              text: '"I\'m more used to seeing the list of services over just categories."',
              context: 'Familiar patterns > novel abstractions.',
            },
            {
              text: '"I will only book my regular service, and won\'t add more unless I really can\'t get a car."',
              context: 'Multi-select is fallback, not default.',
            },
            {
              text: '"I don\'t like horizontal scrolling. I want to scroll and compare prices of all the services."',
              context: 'Vertical list with price comparison — essential.',
            },
          ],
        },
        {
          type: 'text',
          bg: 'light',
          label: 'The constraint',
          heading: 'Engineering needed 6 months to rebuild the allocation engine.',
          body: 'I worked closely with product and engineering to ship in phases — low-cost MVPs to validate while the backend caught up.',
        },
        {
          type: 'phase',
          bg: 'dark',
          label: 'Phase 1 · 2021',
          number: '01',
          heading: '"Any Nearby Ride" — the hacky experiment.',
          body: 'One new service matching users to the first available driver across ride types. No allocation engine change needed. User books → system searches → first match → user told via chat.',
          result: 'Good adoption, increased fulfilment. Pre-design-system — UI wasn\'t polished, but the concept worked.',
          image: '/images/grab-phase-1.png',
        },
        {
          type: 'phase',
          bg: 'light',
          label: 'Phase 2',
          number: '02',
          heading: 'Post-booking prompt — what shipped and what broke.',
          body: 'Bottom sheet prompted users to add more ride types when drivers were scarce. Three things broke: trust violation, inconsistent triggering, 0.8% user freeze rate.',
          result: 'Replaced opaque bundles with explicit ride types. Rewrote copy with content designer. Added timer-based auto-proceed CTA.',
          image: '/images/grab-phase-2.png',
        },
        {
          type: 'image',
          bg: 'dark',
          label: 'Phase 2 — Before / After',
          caption: 'Left: bundled options. Right: explicit ride types, better copy, timer button.',
          image: '/images/grab-before.png',
          imageAfter: '/images/grab-after.png',
        },
        {
          type: 'text',
          bg: 'light',
          label: 'Design system contribution',
          heading: 'Timer button — reused across Grab.',
          body: 'Contributed three variants to the design system: Primary, Secondary, Alert. Spotted the reuse opportunity early.',
        },
        {
          type: 'phase',
          bg: 'dark',
          label: 'Phase 3 · Full solution',
          number: '03',
          heading: 'Pre-booking multi-select.',
          body: 'Checkboxes on the ride type list. Users explicitly choose which services to accept before booking. Required the rebuilt allocation engine.',
          result: 'Smaller icons, right-aligned checkboxes, improved density.',
          image: '/images/grab-phase-3.png',
        },
        {
          type: 'comparison',
          bg: 'light',
          label: 'Navigating stakeholders',
          heading: 'Pushing back on the modal.',
          options: [
            {
              label: 'Option A — my proposal',
              description: 'Contextually disable GrabShare checkbox. No modal, no interruption.',
              outcome: 'Shipped ✓',
              image: '/images/grab-option-a.png',
            },
            {
              label: 'Option B — rejected',
              description: 'Modal popup asking to unselect. Extra step that breaks momentum.',
              image: '/images/grab-option-b.png',
            },
          ],
        },
        {
          type: 'text',
          bg: 'dark',
          label: 'The vision I was driving toward',
          heading: 'Intent-based experience.',
          body: 'Services grouped by need — Standard, Economy, Fastest. Users choose a category; the system matches them. I\'d been advocating for this since early research.',
        },
        {
          type: 'outcome',
          bg: 'light',
          label: 'Results',
          impact: [
            { value: '+0.4pp', label: 'Fulfilment rate' },
            { value: '+$1M', label: 'Revenue per year' },
          ],
          reflections: [
            {
              title: 'Marketplace design',
              body: 'The biggest UX lever was often a backend decision. I made the phased approach feel intentional, even when it was a constraint.',
            },
            {
              title: 'Copy = UI',
              body: 'The content rewrite in Phase 2 drove as much improvement as the interface changes.',
            },
            {
              title: 'Transparency > control',
              body: 'Explicit ride types instead of opaque bundles — trust went up, same ask.',
            },
          ],
        },
      ],
    },
  },

  // ── 2. OKX Boost ─────────────────────────────────────────────────────────
  {
    slug: 'okx-boost',
    title: 'OKX Boost',
    company: 'OKX',
    year: '2024',
    category: 'Web3 · Growth',
    summary: '~$4B trading volume and ~$17.7M revenue through a new Web3 growth product.',
    coverImage: '/images/okx-cover.png',
    caseStudy: {
      label: 'Case Study · 2024',
      role: 'Product Designer',
      team: 'Product manager, frontend engineers, growth team',
      duration: '2024',
      impact: [
        { value: '~$4B', label: 'Trading volume facilitated' },
        { value: '~$17.7M', label: 'Revenue generated' },
      ],
      sections: [
        {
          type: 'text',
          bg: 'light',
          label: 'The Problem',
          heading: 'Making complex financial incentives feel simple.',
          body: 'Staking, boosts, multipliers, lock-ups — inherently complex mechanics. Most competitors default to information overload.',
        },
        {
          type: 'columns',
          bg: 'dark',
          label: 'Approach',
          heading: 'Clarity as the primary design principle.',
          columns: [
            {
              heading: 'Progressive disclosure',
              body: 'Surface the most important information first. Never front-load complexity.',
            },
            {
              heading: 'Trust signals',
              body: 'Does this make the user feel more confident, or less? Uncertainty kills conversion.',
            },
            {
              heading: 'Incentive mechanics',
              body: 'Translated complex growth mechanics into UI patterns that were honest and easy to reason about.',
            },
          ],
        },
        {
          type: 'outcome',
          bg: 'light',
          impact: [
            { value: '~$4B', label: 'Trading volume' },
            { value: '~$17.7M', label: 'Revenue' },
          ],
          reflections: [
            {
              title: 'Restraint in financial UI',
              body: 'Every non-essential element was a liability. The final product was far simpler than the first draft.',
            },
            {
              title: 'Jargon vs. clarity',
              body: 'Defaulted to plain language with optional depth.',
            },
          ],
        },
      ],
    },
  },

  // ── 3. SingHealth ─────────────────────────────────────────────────────────
  {
    slug: 'singhealth',
    title: 'SingHealth Patient App',
    company: 'SingHealth',
    year: '2017–2018',
    category: 'Healthcare · Consumer',
    summary: 'Redesigned the patient-facing app serving 3,000 patients daily across Singapore\'s largest healthcare cluster.',
    coverImage: '/images/singhealth-cover.png',
    accent: '#E85D26',
    caseStudy: {
      label: 'Case Study · 2017–2018',
      role: 'UI/UX Designer',
      team: 'Product owner, mobile engineers, clinical stakeholders',
      duration: '2017 – 2018',
      impact: [
        { value: '4M+', label: 'Patients served across cluster' },
        { value: '↓40%', label: 'Appointment booking time reduced' },
      ],
      sections: [
        {
          type: 'text',
          bg: 'light',
          label: 'The Problem',
          heading: 'Nurses were drowning in paperwork.',
          body: [
            'Nurses spent significant time on manual documentation — recording medication times, tracking meal intake, logging stool output, and flagging anything out of the norm. This took them away from direct patient care.',
            'During COVID, the challenge intensified: physical contact between staff and patients carried infection risk. MyCare and the nurse companion app enabled safer distancing while maintaining care quality.',
          ],
        },
        {
          type: 'columns',
          bg: 'dark',
          label: 'Approach',
          heading: 'Reduce friction at every clinical touchpoint.',
          columns: [
            {
              heading: 'Appointment booking',
              body: 'Flattened 5-step booking to 2 steps. Surfaced next available slots upfront.',
            },
            {
              heading: 'Lab results',
              body: 'Redesigned results view with plain-language explanations and trend indicators.',
            },
            {
              heading: 'Wayfinding',
              body: 'Integrated indoor maps for hospital navigation — reducing missed appointments.',
            },
          ],
        },
        {
          type: 'quotes',
          bg: 'light',
          label: 'Patient & caregiver feedback',
          heading: 'What users said about MyCare.',
          quotes: [
            {
              text: 'Being able to monitor my own vital signs and test results in real-time — without waiting for a doctor\'s ward round — made me feel more in control.',
              context: 'Empowerment through information',
            },
            {
              text: 'Requesting a hot drink or extra pillow through the app is so much easier than pressing the call bell and waiting.',
              context: 'Convenience & efficiency',
            },
            {
              text: 'Seeing continuous improvements in my child\'s vitals on the tablet gave me significant relief and reassurance.',
              context: 'Anxiety reduction for caregivers',
            },
            {
              text: 'Knowing my medical data is automatically wiped from the iPad when I\'m discharged — that matters.',
              context: 'Privacy & security',
            },
          ],
        },
        {
          type: 'outcome',
          bg: 'dark',
          impact: [
            { value: '↓40%', label: 'Booking time reduced' },
            { value: '4M+', label: 'Patients served' },
            { value: 'Top 10', label: 'World\'s Best Smart Hospitals 2026 — Newsweek (SGH & CGH)' },
          ],
        },
        {
          type: 'comparison',
          bg: 'light',
          label: 'If I redesigned it today',
          heading: 'Better accessibility for elderly patients.',
          body: 'User feedback confirmed that font sizes and contrast weren\'t sufficient for older patients with weaker eyesight. I\'d push harder on WCAG AAA contrast, larger default type, and multi-language support beyond English and Chinese.',
          beforeAfter: {
            before: '/images/singhealth-before.png',
            after: '/images/singhealth-after.png',
            beforeLabel: 'Original',
            afterLabel: 'Redesign',
            device: 'ipad',
          },
        },
        {
          type: 'comparison',
          bg: 'dark',
          heading: 'Richer feedback signals for every action.',
          body: 'The app relied on visual confirmation alone. Adding audio cues and haptic feedback for key actions — like confirming a request was sent — would reduce uncertainty, especially for users less comfortable with tablets.',
          beforeAfter: {
            before: '/images/singhealth-before-2.png',
            after: '/images/singhealth-after-2.png',
            beforeLabel: 'Original',
            afterLabel: 'Redesign',
            device: 'ipad',
          },
        },
      ],
    },
  },

  // ── 4. ION Orchard ────────────────────────────────────────────────────────
  {
    slug: 'ion-orchard',
    title: 'ION Orchard',
    company: '2359 Media',
    year: '2018–2019',
    category: 'Consumer · Retail',
    summary: '+239% active loyalty members through redesigned IA and simplified receipt scanning.',
    coverImage: '/images/ion-cover.png',
    accent: '#C4A265',
    caseStudy: {
      label: 'Case Study · 2018–2019',
      role: 'Lead Designer',
      team: 'Product manager, iOS & Android engineers, QA',
      duration: '2018 – 2019',
      impact: [
        { value: '+239%', label: 'Active loyalty members' },
        { value: '70% → ↓', label: 'Receipt rejection rate reduced' },
      ],
      sections: [
        {
          type: 'text',
          bg: 'light',
          label: 'The Problem',
          heading: 'A loyalty app failing its core job.',
          body: 'Confusing IA, dated UI, 70% receipt rejection rate. Only 40% of members active.',
        },
        {
          type: 'columns',
          bg: 'dark',
          label: 'Approach',
          heading: 'Three focused interventions.',
          columns: [
            {
              heading: 'Information architecture',
              body: 'Restructured navigation via card sorting and tree testing.',
            },
            {
              heading: 'Receipt scanning',
              body: '7 steps → 3. Improved error states so users knew why submissions failed.',
            },
            {
              heading: 'Store directory',
              body: 'Personalized recommendations based on behavior and loyalty tier.',
            },
          ],
        },
        {
          type: 'outcome',
          bg: 'light',
          impact: [
            { value: '+239%', label: 'Active loyalty members' },
          ],
          reflections: [
            {
              title: 'IA before aesthetics',
              body: 'Users didn\'t need a prettier app — they needed to find things.',
            },
            {
              title: 'Error states are features',
              body: 'Better error messaging drove rejection rate down more than any flow change.',
            },
          ],
        },
      ],
    },
  },

]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

