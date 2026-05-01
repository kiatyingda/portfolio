// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProjectMeta {
  slug: string
  title: string
  company: string
  year: string
  category: string
  summary: string
  coverImage?: string
  splineUrl?: string
  heroVideo?: string
  /** How to size the hero video. 'contain' (default) fits inside the viewport; 'actual' renders at a fixed 1500px width; 'fill' fills the viewport height at native resolution; 'phone' wraps it in a phone device frame. */
  heroVideoFit?: 'contain' | 'actual' | 'fill' | 'phone'
  /** Whether the hero video should loop. Default true. */
  heroVideoLoop?: boolean
  /** Hide from the home grid and case-study prev/next nav (but keep data + direct URL working). */
  hidden?: boolean
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
    | 'chapter'
  bg: 'dark' | 'light'
  label?: string
  heading?: string
  body?: string | string[]
  // type-specific fields below
  columns?: { heading: string; body: string }[]
  stats?: { value: string; label: string }[]
  insight?: string
  items?: { title: string; body: string; status?: 'winner' | 'tested' | ''; image?: string; video?: string; animation?: 'ride-type-select' }[]
  quotes?: { text: string; context: string; source?: { name: string; logo?: string } }[]
  caption?: string
  number?: string
  result?: string
  image?: string
  video?: string
  device?: 'mobile' | 'desktop' | 'none'
  imageAfter?: string
  impact?: { value: string; label: string }[]
  reflections?: { title: string; body: string }[]
  left?: { heading: string; body: string }
  right?: { heading: string; body: string }
  options?: { label: string; description: string; outcome?: string; image?: string }[]
  cols?: number
  beforeAfter?: { before: string; after: string; beforeLabel?: string; afterLabel?: string; device?: 'ipad' | 'phone' | 'none' }
  imageHint?: string
  imageHintLeft?: string
  imageHintRight?: string
  /** Break the primary image out to full viewport width (phase type). One per case study max. */
  fullBleed?: boolean
  /** Render the image at its natural intrinsic size (no max-height cap). */
  imageNatural?: boolean
  /** Place the side image on the LEFT instead of the default right (phase type). */
  imageLeft?: boolean
  /** Override the section's top gap. 'tight' cuddles to previous section (same thought). 'wide' pauses (new thought). */
  gap?: 'tight' | 'standard' | 'wide'
  /** Chapter position-in-set marker (chapter type only). E.g., '1 of 4'. Renders as `[ 1 OF 4 ]` above the chapter number. */
  position?: string
  /** When true on an `image` section, render with pan/zoom controls instead of a static image. For large annotated frames where readers need to inspect details. */
  pannable?: boolean
  /** Container height for pannable image (e.g. '78vh'). Defaults to '78vh' if pannable is true. */
  pannableHeight?: string
  /** Static image thumbnail for a lightbox section. Click opens `image` (or PDF) in a fullscreen modal. */
  thumbnailImage?: string
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
    summary: 'Post-COVID driver crunch. Broken marketplace. Led the ride selection system redesign — defined the information architecture, structured how users compare options. +$1M revenue, +0.4pp fulfilment.',
    coverImage: '/images/grab-cover.jpg',
    heroVideo: '/videos/grab/mtt raw.mov',
    heroVideoFit: 'actual',
    accent: '#00B14F',
    caseStudy: {
      label: 'Case Study · 2021–2024',
      role: 'Lead Product Designer',
      team: '1 PM · 1 Researcher · 1 Content Designer · 1 Analyst',
      duration: 'Aug 2021 – Jan 2024',
      impact: [
        { value: '+0.4pp', label: 'Fulfilment rate across SE Asia' },
        { value: '+$1M', label: 'Est. incremental revenue per year' },
      ],
      sections: [
        {
          type: 'twocol',
          bg: 'light',
          gap: 'wide',
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
          bg: 'light',
          gap: 'tight',
          stats: [
            { value: '78%', label: 'of unfulfilled users cancelled and rebooked within 30 min' },
            { value: '90%', label: 'rebooked at a similar price' },
          ],
          insight:
            'Users were already switching manually — cancel, wait, rebook. My goal was to make this feel frictionless.',
        },
        {
          type: 'grid',
          bg: 'light',
          label: 'Next steps',
          heading: 'I designed and tested 6 concepts.',
          items: [
            {
              title: 'Manual selection',
              body: 'User wants maximum control and comparison.',
              status: 'winner',
              image: '/images/grab-concept-1.png',
              video: '/videos/grab/grab-concept-1.mp4',
            },
            {
              title: 'Fare slider',
              body: 'User only cares about fare.',
              status: 'tested',
              image: '/images/grab-concept-2.png',
              video: '/videos/grab/grab-concept-2.mp4',
            },
            {
              title: 'Bundles',
              body: 'User doesn\'t want to choose.',
              status: 'tested',
              image: '/images/grab-concept-3.png',
              video: '/videos/grab/grab-concept-3.mp4',
            },
            {
              title: 'Post-booking prompt',
              body: 'Multi-select as fallback, not default.',
              status: 'winner',
              image: '/images/grab-concept-4.png',
              video: '/videos/grab/grab-concept-4.mp4',
            },
            {
              title: 'Intent-based (needs)',
              body: 'Needs-first mental model.',
              status: 'tested',
              image: '/images/grab-concept-5.png',
              video: '/videos/grab/grab-concept-5.mp4',
            },
            {
              title: 'Intent-based (categories)',
              body: 'Fewer options, less drop-off.',
              status: 'winner',
              image: '/images/grab-concept-6.png',
              video: '/videos/grab/grab-concept-6.mp4',
            },
          ],
        },
        {
          type: 'quotes',
          bg: 'light',
          label: 'From users',
          heading: 'They told us exactly what to build.',
          quotes: [
            {
              text: 'I\'m more used to seeing the list of services over just categories.',
              context: 'Familiar patterns > novel abstractions.',
            },
            {
              text: 'I will only book my regular service, and won\'t add more unless I really can\'t get a car.',
              context: 'Multi-select is fallback, not default.',
            },
            {
              text: 'I don\'t like horizontal scrolling. I want to scroll and compare prices of all the services.',
              context: 'Vertical list with price comparison — essential.',
            },
          ],
        },
        {
          type: 'comparison',
          bg: 'light',
          label: 'Product strategy I proposed',
          heading: 'A wedge toward a new booking model.',
          body: 'The immediate fix had to ship in weeks. The model it pointed to would take years. I designed both — so the short-term decision would compound, not constrain.',
          beforeAfter: {
            before: '/images/grab-short.png',
            after: '/images/grab-long.png',
            beforeLabel: 'Short-term',
            afterLabel: 'Long-term',
            device: 'phone',
          },
        },
        {
          type: 'text',
          bg: 'light',
          gap: 'wide',
          label: 'The constraint',
          heading: 'Engineering needed 6 months to rebuild the allocation engine.',
          body: 'That rebuild was the path to the long-term vision. I designed three phased wedges toward it — each validating a piece of the intent-based model while engineering caught up.',
        },
        {
          type: 'phase',
          bg: 'light',
          gap: 'wide',
          label: 'Phase 1 · 2021',
          number: '01',
          heading: '"Any Ride, Any Price" — the hacky experiment.',
          body: 'One new service matching users to the first available driver across ride types. No allocation engine change needed. User books → system searches → first match → user told via chat.',
          result: 'Good adoption, increased fulfilment. Pre-design-system — UI wasn\'t polished, but the concept worked.',
          image: '/images/grab-phase-1.png',
        },
        {
          type: 'phase',
          bg: 'light',
          gap: 'wide',
          label: 'Phase 2',
          number: '02',
          heading: 'Post-booking prompt — what shipped and what broke.',
          body: 'Bottom sheet prompted users to add more ride types when drivers were scarce. Three things broke: trust violation, inconsistent triggering, 0.8% user freeze rate.',
          result: 'Rewrote copy with a content designer — "Add other ride types to your search?" instead of "Book from more ride types?" to frame it as helping, not upselling. Replaced the opaque bundle (hidden fare range) with each ride type and its own fare shown explicitly. Added a timer-based CTA so users who hesitated got moved forward automatically.',
          beforeAfter: {
            before: '/images/grab-phase-2-before.png',
            after: '/images/grab-phase-2-after.png',
            beforeLabel: 'Shipped',
            afterLabel: 'Fixed',
            device: 'phone',
          },
          imageLeft: true,
        },
        {
          type: 'phase',
          bg: 'light',
          gap: 'wide',
          label: 'Phase 3 · Full solution',
          number: '03',
          heading: 'Pre-booking multi-select.',
          body: 'Checkboxes on the ride type list. Users explicitly choose which services to accept before booking. Required the rebuilt allocation engine.',
          result: 'Smaller icons, right-aligned checkboxes, improved density.',
          imageLeft: true,
          beforeAfter: {
            before: '/images/grab-phase-3-before.png',
            after: '/images/grab-phase-3-after.png',
            beforeLabel: 'Pre-booking',
            afterLabel: 'Post-booking',
            device: 'phone',
          },
        },
        {
          type: 'grid',
          bg: 'light',
          gap: 'wide',
          label: 'Details',
          heading: 'Interaction + UI details.',
          cols: 2,
          items: [
            {
              title: 'Using motion for delight',
              body: 'Single ride type selected → checkmark → multiple ride types. Motion communicates the state change without a word.',
              video: '/videos/grab/grab-mtt.mov',
            },
            {
              title: 'Auto-proceed timer',
              body: 'Countdown CTA that auto-advances users who freeze on the bottom sheet. Contributed the button specs to the design system so other teams could reuse the pattern.',
              image: '/images/grab-glossary-timer.png',
            },
          ],
        },
        {
          type: 'outcome',
          bg: 'dark',
          gap: 'wide',
          label: 'Results',
          impact: [
            { value: '+0.4pp', label: 'Fulfilment rate' },
            { value: '+$1M', label: 'Revenue per year' },
          ],
          reflections: [
            {
              title: 'The biggest UX call wasn\'t in the UI',
              body: 'It was choosing which engineering constraint to design around. Phased shipping was the design — not a compromise.',
            },
            {
              title: 'Copy is UI',
              body: 'The Phase 2 content rewrite moved metrics as much as the interface changes did. Pair with a content designer early, not at QA.',
            },
            {
              title: 'Show the options, don\'t bundle them',
              body: 'Users picked explicit ride types over opaque smart bundles. When a PM asks for a smart bundle, the un-bundled version usually wins.',
            },
            {
              title: 'Phase 1 shipped while Phase 3 was the goal',
              body: '3 phases over 3 years became a 5-year product direction. Each phase shipped on its own merits but pointed at the same end state.',
            },
            {
              title: 'It served the ride-hailing vision',
              body: 'Fewer services. Simpler experience. Lower operational cost. Multiple ride types collapsed parallel offerings into one decision point — one change that solved a UX, an ops, and a business problem at once.',
            },
          ],
        },
      ],
    },
  },

  // ── 2. Company-Wide Influence — Grab ────────────────────────────────────
  {
    slug: 'grab-influence',
    title: 'Company-Wide Influence',
    company: 'Grab',
    year: '2021–2024',
    category: 'Design Organisation · Frameworks',
    summary: '1 of 6 designers from over 120, handpicked to shape Grab\'s product direction across PODs. Four contributions, three years.',
    coverImage: '/images/company-cover.jpg',
    accent: '#00B14F',
    caseStudy: {
      label: 'Frameworks · 2021–2024',
      role: 'Lead Product Designer · Org-Level Initiative',
      team: 'Cross-functional · Ads · Payments · Loyalty · Safety · Comms · Design Org',
      duration: '2021 – 2024 (rolling)',
      impact: [
        { value: '1 of 6', label: 'Selected from 120+ designers for org-level initiatives' },
        { value: '−4pp', label: 'Cancellation rate from visual overhaul experiment' },
        { value: '40+', label: 'Cross-vertical issues identified · 10+ Jira tickets with ready solutions' },
      ],
      sections: [
        // Four equal chapters following the deck structure (slides 90–110).
        // Each chapter = compact chapter open (number + title + tagline + rule)
        // followed by ONE content section. Wide gap before each chapter open,
        // tight gap to its content. Single dark Reflections close.

        // ── 01 · Company-wide design influence ────────────────────────────
        {
          type: 'chapter',
          bg: 'light',
          gap: 'wide',
          position: '1 of 4',
          number: '01',
          heading: 'Company-wide design influence',
        },
        {
          type: 'text',
          bg: 'light',
          gap: 'tight',
          label: 'Cross-vertical quality drive',
          heading: 'Led the design effort. Weekly readouts to Head of Design, CPO, senior leaders.',
          body: [
            '40+ issues identified. 10+ shipped as Jira tickets with ready design solutions.',
            'Ran a company-wide quality drive — "Let\'s Make a Difference Together" — inviting designers across verticals to flag inconsistencies in flows they didn\'t own. Friendly competition with bubble tea on the line. Each surfaced issue came back not as a complaint but as a Jira ticket with the fix already designed. Turned a quality chore into a team ritual.',
          ],
        },
        {
          type: 'image',
          bg: 'light',
          gap: 'tight',
          video: '/videos/grab/grab-broken-window.mp4',
          fullBleed: true,
        },

        // ── 02 · Visual direction contribution ────────────────────────────
        {
          type: 'chapter',
          bg: 'light',
          gap: 'wide',
          position: '2 of 4',
          number: '02',
          heading: 'Visual direction contribution',
        },
        // Item 1 of 3 — Visual harmony GIF (mobile-format animation)
        {
          type: 'image',
          bg: 'light',
          gap: 'tight',
          label: 'Visual harmony',
          image: '/images/visual-harmony.gif',
          device: 'mobile',
          caption: 'Cohesive visual rhythm across the whole app — colour, type, and elevation tuned to feel like one product instead of stitched-together teams.',
        },
        // Item 2 of 3 — Design system PDF deck (thumbnail click opens PDF lightbox)
        {
          type: 'image',
          bg: 'light',
          gap: 'wide',
          label: 'Design systems · 3 components',
          image: '/images/Bottomsheets.pdf',
          thumbnailImage: '/images/Grab_bottomsheet_screen.png',
          device: 'mobile',
          caption: 'As a Duxton Ambassador, I coached two senior designers. Shipped Bottomsheet, Snackbar, and Avatar — used across the platform. (Bottomsheet shown.)',
        },
        // ── 03 · Ride-hailing vision ──────────────────────────────────────
        {
          type: 'chapter',
          bg: 'light',
          gap: 'wide',
          position: '3 of 4',
          number: '03',
          heading: 'Ride-hailing vision',
        },
        {
          type: 'comparison',
          bg: 'light',
          gap: 'tight',
          label: 'Future-state foundation',
          heading: 'Users overwhelmed by services → simplified by intent.',
          body: 'The ride-hailing surface had grown into a wall of categories. The shift: stop listing services, start asking the user\'s intent ("I need a child seat because I have my child with me"). Two-designer team — I explored solutions and set the design foundation; my partner took it through prototyping and delivery. Built the scalable framework from discovery workshops with stakeholders and user-research learnings.',
          beforeAfter: {
            before: '/videos/grab-overwhelm.mp4',
            after: '/videos/grab/grab-vision.mov',
            beforeLabel: 'Current',
            afterLabel: 'Vision',
            device: 'phone',
          },
        },

        // ── 04 · Cross-sell and ads playbook ──────────────────────────────
        {
          type: 'chapter',
          bg: 'light',
          gap: 'wide',
          position: '4 of 4',
          number: '04',
          heading: 'Cross-sell and ads playbook',
        },
        // Banner video plays as the thumbnail (teases one element of the framework —
        // the endemic ad slot). Click opens the full annotated framework SVG in a
        // fullscreen pan/zoom lightbox for detail inspection.
        {
          type: 'image',
          bg: 'light',
          gap: 'tight',
          label: 'In-transit Ads playbook',
          image: '/images/Grab%20allocation%20experience.svg',
          video: '/videos/grab/grab-banner.mov',
          caption: 'I designed two scalable playbooks — one for ad types, one for cross-selling services. The Ads team could sell map and bottom-sheet banner slots, and the Food team could cross-sell while the user was on a ride. Continuous revenue for Grab since 2024.',
          pannable: true,
          pannableHeight: '81vh',
        },

      ],
    },
  },

  // ── 3. OKX Boost ─────────────────────────────────────────────────────────
  {
    slug: 'okx-boost',
    title: 'OKX Boost',
    company: 'OKX',
    year: '2023–2025',
    category: 'Web3 · Growth',
    summary: 'Led Boost end-to-end — defined a unified on-chain incentives system that replaced fragmented growth campaigns with one scalable architecture. Shipped across 50+ Web3 projects. ~$4B trading volume, ~75% of Web3 growth revenue.',
    coverImage: '/images/okx-cover.png',
    heroVideo: '/videos/okx-cover.mov',
    heroVideoFit: 'fill',
    heroVideoLoop: false,
    caseStudy: {
      label: 'Case Study · 2023–2025',
      role: 'Lead Product Designer → Interim Team Lead',
      team: '1 PM · 2 Designers · Frontend Engineers · Growth Team',
      duration: '2023 – 2025',
      impact: [
        { value: '70%', label: 'of overall Web3 gross revenue' },
        { value: '~$4B', label: 'Trading volume facilitated' },
      ],
      sections: [
        {
          type: 'twocol',
          bg: 'light',
          gap: 'standard',
          label: 'A growth system, not a feature',
          heading: 'A growth system, not a feature.',
          left: {
            heading: 'For traders',
            body: 'Everyday DEX traders wanted rewards for trading they were already doing. Not exclusive access. Not early listings. Just value back for normal behaviour.',
          },
          right: {
            heading: 'For OKX',
            body: 'Binance launched a competitor. Their model was wrong for our user — crypto-native power users hunting new listings. Ours was different. We designed for clarity, not discovery.',
          },
        },
        {
          type: 'image',
          bg: 'light',
          gap: 'standard',
          image: '/images/okx-boost-overview.png',
          label: 'Overview',
          caption: 'The landing surface — the entry point into the rewards system.',
          imageNatural: true,
        },
        {
          type: 'text',
          bg: 'light',
          gap: 'standard',
          label: 'The Problem',
          heading: 'Making complex incentives feel instantly legible.',
          body: 'Staking, boosts, multipliers, lock-ups — inherently complex financial mechanics. Most competitors dump everything on the user. The design challenge was deciding what to surface first, and what to hide until needed.',
        },
        {
          type: 'image',
          bg: 'light',
          gap: 'standard',
          image: '/images/okx-boost-complexity.png',
          imageNatural: true,
          label: 'X Launch — event states',
          caption: 'One event, five states — each requiring a different layout, CTA, and information priority. Designing for state meant the UI had to work at every point in the timeline, not just when the event was live.',
        },
        {
          type: 'columns',
          bg: 'dark',
          gap: 'standard',
          label: 'Design Principles',
          heading: 'Three lenses I applied to every screen.',
          columns: [
            {
              heading: 'Clarity as the primary lens',
              body: 'Surface the most important information first. Never front-load complexity.',
            },
            {
              heading: 'Trust signals matter',
              body: 'Does this make the user feel more confident, or less? Uncertainty kills conversion.',
            },
            {
              heading: 'Modular by design',
              body: '50+ Web3 projects. Multiple campaign types. The system had to be fast to produce, consistent enough to trust, flexible enough for anything.',
            },
          ],
        },
        {
          type: 'columns',
          bg: 'light',
          gap: 'standard',
          label: 'What I Built',
          heading: 'Two products, one modular system.',
          columns: [
            {
              heading: 'Boost Web · MVP',
              body: 'Designed the core product from scratch. Pushed for balance — progressive disclosure for secondary detail, critical information kept upfront to earn trust.',
            },
            {
              heading: 'Campaign system',
              body: 'X Launch · X Campaign · X Stake — a modular system for campaigns with different mechanics, user intents, and information needs.',
            },
          ],
        },
        {
          type: 'image',
          bg: 'light',
          gap: 'wide',
          fullBleed: true,
          image: '/images/okx-campaign-system.png',
          label: 'Campaign system',
          caption: 'X Launch · X Campaign · X Stake — one modular system, different mechanics, user intents, and information needs.',
        },
        {
          type: 'outcome',
          bg: 'dark',
          gap: 'wide',
          label: 'Results',
          impact: [
            { value: '70%', label: 'of overall Web3 gross revenue' },
            { value: '+60%', label: 'first-time traders from Boost' },
            { value: '+50%', label: 'first-time active users from Boost' },
            { value: '64%', label: 'DAT from Boost' },
            { value: '~$4B', label: 'Token trading volume' },
            { value: '~$17.7M', label: 'Revenue' },
            { value: '440K', label: 'Unique devices across 50+ Web3 projects' },
          ],
          reflections: [
            {
              title: 'A system, not a campaign',
              body: 'Growth teams default to one-off campaigns. Designing Boost as a unified incentives system meant we shipped one architecture instead of 50 fragmented features. The compounding came from the system, not any single launch.',
            },
            {
              title: 'Restraint in financial UI',
              body: 'Every non-essential element was a liability. The final product was far simpler than the first draft. It should have been simpler still — and that bias is now my default.',
            },
            {
              title: 'Architecture before aesthetics',
              body: 'Modularity (X Launch · X Campaign · X Stake) wasn\'t a styling decision. It was the architecture call that let the team ship 50+ Web3 projects on the same chassis without redesigning each time.',
            },
            {
              title: 'Progressive disclosure as hypothesis',
              body: 'We never validated it experimentally. That\'s the gap I own — next time the design hypothesis goes into the experiment plan, not the design review.',
            },
          ],
        },
      ],
    },
  },

  // ── 3. SingHealth ─────────────────────────────────────────────────────────
  {
    hidden: true, // remove this line to show
    slug: 'singhealth',
    title: 'SingHealth MyCare',
    company: 'SingHealth',
    year: '2018–2019',
    category: 'Healthcare · Consumer',
    summary: 'Nurses drowning in paperwork. Designed the patient-facing app for Singapore\'s largest healthcare cluster from IA through launch — 4M+ patients.',
    coverImage: '/images/singhealth-cover.png',
    accent: '#E85D26',
    caseStudy: {
      label: 'Case Study · 2018–2019',
      role: 'Lead Designer',
      team: '1 PM · Engineering · SingHealth Cluster',
      duration: '2018 – 2019',
      impact: [
        { value: '−40%', label: 'Waiting time reduction' },
        { value: '4M+', label: 'Patients served' },
      ],
      sections: [
        {
          type: 'text',
          bg: 'light',
          gap: 'standard',
          label: 'The User',
          heading: 'One app. Nurses, patients, caregivers — all of them.',
          body: 'Not a homogeneous group — elderly patients who may be anxious and unwell. Young caregivers tracking vitals remotely. Clinical staff under time pressure.',
          image: '/images/singhealth-home.png',
        },
        {
          type: 'text',
          bg: 'light',
          gap: 'standard',
          label: 'The Challenge',
          heading: 'Design for the most vulnerable — the rest follow.',
          body: 'No direct access to patients during research — our primary touchpoint was nursing staff. That gap shaped every decision: design for the most vulnerable user, and the rest will follow.',
        },
        {
          type: 'text',
          bg: 'light',
          gap: 'standard',
          label: 'The Constraint',
          heading: 'Clinical precision without clinical coldness.',
          body: 'Clinical information is inherently complex — test results, medication schedules, appointment history. The design challenge was delivering clinical precision without clinical coldness.',
        },
        {
          type: 'columns',
          bg: 'dark',
          gap: 'standard',
          label: 'Design Principles',
          heading: 'Designing for bedside use.',
          columns: [
            {
              heading: 'Design for the most vulnerable user',
              body: 'If an anxious, unwell elderly patient can use it confidently — everyone can.',
            },
            {
              heading: 'Information before action',
              body: 'Patients need to understand before they act. Clarity over efficiency.',
            },
            {
              heading: 'Trust through familiarity',
              body: 'Novel patterns have no place in healthcare. Familiar interactions. Predictable flows. No surprises.',
            },
          ],
        },
        {
          type: 'image',
          bg: 'light',
          gap: 'standard',
          label: 'The app',
          caption: 'MyCare onboarding — explaining the My Care tab to patients, showing vitals, test results, and medications at a glance.',
          image: '/images/singhealth-onboarding.png',
        },
        {
          type: 'text',
          bg: 'light',
          gap: 'standard',
          label: 'What Shipped',
          heading: 'Appointments, records, test results, medication, care team.',
          body: 'Appointment management · Medical records · Test results · Medication tracking · Care team communication — unified into a single bedside app.',
          image: '/images/singhealth-request.png',
        },
        {
          type: 'image',
          bg: 'light',
          gap: 'standard',
          label: 'Illustration system',
          caption: 'Custom food illustrations for the intake tracking feature — designed to be friendly and universally understood across age groups.',
          image: '/images/singhealth-illustrations.png',
        },
        {
          type: 'outcome',
          bg: 'dark',
          gap: 'wide',
          label: 'Results',
          impact: [
            { value: '−40%', label: 'Waiting time reduction' },
            { value: '4M+', label: 'Patients served' },
            { value: 'Top 10', label: 'App Store — World\'s Best Digital Hospitals ranking (HCI 2022)' },
          ],
          reflections: [
            {
              title: 'Research gaps have design consequences',
              body: 'Not speaking directly to patients was a real limitation. The instinct to design for the most vulnerable user compensated — but assumption is not research.',
            },
            {
              title: 'Designing for public good is a different constraint',
              body: 'The metric isn\'t conversion. It\'s whether a citizen gets the care they need. That changes every decision — and it\'s the kind of constraint I want to design within.',
            },
            {
              title: 'Jargon is a trust problem',
              body: 'Clinical language in a patient app is a barrier. Plain language with appropriate depth — that was the brief we set ourselves.',
            },
          ],
        },
      ],
    },
  },

  // ── 4. ION Orchard ────────────────────────────────────────────────────────
  {
    slug: 'ion-orchard',
    hidden: true,
    title: 'ION Orchard',
    company: '2359 Media Consultancy',
    year: '2018–2019',
    category: 'Consumer · Retail',
    summary: '70% receipt rejection rate. Restructured the loyalty experience end-to-end — rebuilt the IA, redesigned core scanning and navigation.',
    coverImage: '/images/ion-cover.png',
    heroVideo: '/videos/ion/ion-demo.mp4',
    accent: '#C4A265',
    caseStudy: {
      label: 'Case Study · 2018–2019',
      role: 'Lead Designer',
      team: '1 PM · 4 Engineers · 1 Lead Designer (me)',
      duration: '2018 – 2019',
      impact: [
        { value: '+24%', label: 'Member sign-ups' },
        { value: '+239%', label: 'Active loyalty members' },
        { value: '15,000', label: 'Deals redeemed in-store' },
      ],
      sections: [
        {
          type: 'text',
          bg: 'light',
          label: 'The Problem',
          heading: 'A loyalty app failing its core job.',
          body: [
            'Stagnating sign-up rate. The app\'s information architecture was badly organised, leading to friction everywhere.',
            'Key features like scan receipts required manual input — 70% of submissions were rejected due to human error. Only 40% of members were active.',
          ],
          image: '/images/ion-before.png',
        },
        {
          type: 'columns',
          bg: 'dark',
          label: 'Design goals',
          heading: 'Three focused interventions.',
          columns: [
            {
              heading: 'Fix the receipt scanning',
              body: 'This feature is critical to the loyalty program\'s success. It was hidden, buggy, and rejected 70% of submissions.',
            },
            {
              heading: 'Restructure the IA',
              body: 'Users couldn\'t find key features like redeeming carpark points. Navigation needed a complete rethink.',
            },
            {
              heading: 'Cohesive visual direction',
              body: 'The app and website were inconsistent and mis-aligned with ION Orchard\'s premium branding.',
            },
          ],
        },
        {
          type: 'twocol',
          bg: 'light',
          label: 'Execution',
          heading: 'Re-imagining the experience.',
          left: {
            heading: 'Personalised content',
            body: 'Added an onboarding flow to capture user interests — so we could serve targeted deals and give shoppers a reason to return.',
          },
          right: {
            heading: 'Smart search',
            body: 'Putting brands front and centre with better recommendations, categorisation, and a directory that actually helped people discover stores.',
          },
          image: '/images/ion-features.png',
        },
        {
          type: 'image',
          bg: 'dark',
          label: 'Receipt scanning',
          caption: 'Using OCR technology to reduce manual input. Added "Submit another receipt" for batch submissions.',
          image: '/images/ion-receipt-scan.png',
          device: 'mobile',
        },
        {
          type: 'text',
          bg: 'light',
          label: 'Design system',
          heading: 'Art direction, iconography, and component library.',
          body: 'I created a cohesive design language inspired by ION Orchard\'s iconic glass-and-steel architecture — clean lines, premium typography, and a restrained colour palette.',
          image: '/images/ion-design-system.png',
          imageNatural: true,
        },
        {
          type: 'image',
          bg: 'dark',
          label: 'The redesign',
          caption: 'Complete redesign across sign-in, loyalty dashboard, wallet, and deals — aligned with ION Orchard\'s premium brand.',
          image: '/images/ion-redesign.png',
        },
        {
          type: 'outcome',
          bg: 'light',
          impact: [
            { value: '+24%', label: 'Member sign-ups' },
            { value: '+239%', label: 'Active members' },
            { value: '15,000', label: 'Deals redeemed' },
          ],
          reflections: [
            {
              title: 'IA before aesthetics',
              body: 'Users didn\'t need a prettier app — they needed to find things. The restructured navigation drove more engagement than any visual change.',
            },
            {
              title: 'Error states are features',
              body: 'Better error messaging on receipt scanning drove rejection rate down more than any flow change.',
            },
          ],
        },
      ],
    },
  },

  // ── 5. Roda WhatsApp Chatbot ──────────────────────────────────────────────
  {
    slug: 'roda-chatbot',
    hidden: true,
    title: 'Roda WhatsApp Chatbot',
    company: 'Grab',
    year: '2022',
    category: 'Consumer · Emerging Markets',
    summary: 'No app, no coverage — rural Indonesia. Designed Grab\'s WhatsApp booking experience for 500+ underserved cities, no download needed.',
    coverImage: '/images/roda-chatbot-full.png',
    heroVideo: '/videos/roda-demo.mp4',
    heroVideoFit: 'phone',
    accent: '#25D366',
    caseStudy: {
      label: 'Case Study · 2022',
      role: 'Product Designer',
      team: '1 PM · 1 Backend Engineer · 1 Researcher · 1 UX Writer',
      duration: '2022',
      impact: [
        { value: '500+', label: 'Tier 2+ cities targeted' },
        { value: '89%', label: 'Of Indonesia\'s population in target area' },
      ],
      sections: [
        {
          type: 'text',
          bg: 'light',
          label: 'The Problem',
          heading: 'A huge untapped market with low app adoption.',
          body: [
            'Indonesia sees only 6% MTU penetration. Outside the 13 key municipalities, 500+ cities classified as "Tier 2+" make up 89% of the population and 74% of national GDP.',
            'These communities have low app download rates but high WhatsApp usage. The vision: provide underserved rural communities with an easy way to book a Grab ride using WhatsApp and cash.',
          ],
          image: '/images/roda-chatbot-full.png',
        },
        {
          type: 'columns',
          bg: 'dark',
          label: 'The challenges',
          heading: 'Designing without any visual UI.',
          columns: [
            {
              heading: 'No visuals',
              body: 'Designing without any visual prompt or button is challenging. Chat is linear — a one-to-one replica of the app won\'t work.',
            },
            {
              heading: 'No map',
              body: 'Addresses in Indonesia are extremely long and inaccurate. We had to find alternatives to map-based pickup.',
            },
            {
              heading: 'Complex stakeholders',
              body: 'Working across Safety, Comms, Offline Support, Marketing, Operations, and Legal teams.',
            },
          ],
        },
        {
          type: 'image',
          bg: 'light',
          label: 'Product outline',
          caption: 'Mapping the core product flow — identifying must-haves vs. good-to-haves, and establishing product principles.',
          image: '/images/roda-product-outline.png',
        },
        {
          type: 'image',
          bg: 'dark',
          label: 'Conversation flows',
          caption: 'Core booking flow and sub-flows designed for WhatsApp — working within Twilio and Meta\'s capabilities for quick action menus and location features.',
          image: '/images/roda-flows.png',
        },
        {
          type: 'image',
          bg: 'light',
          label: 'The final experience',
          caption: 'The complete Roda chatbot experience — from first message to ride completion, all within WhatsApp.',
          image: '/images/roda-final.png',
        },
        {
          type: 'outcome',
          bg: 'dark',
          impact: [
            { value: '500+', label: 'Tier 2+ cities' },
            { value: '89%', label: 'Population coverage' },
            { value: '74%', label: 'GDP share of target area' },
          ],
          reflections: [
            {
              title: 'Constraints breed creativity',
              body: 'No UI, no map, no buttons — working within WhatsApp\'s limitations forced more thoughtful interaction design than any app project.',
            },
            {
              title: 'Safety is non-negotiable',
              body: 'Even in a stripped-down chatbot, we couldn\'t compromise on safety features. Some legal requirements were challenging to navigate within chat.',
            },
          ],
        },
      ],
    },
  },

]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Projects shown in the home grid + used for case-study prev/next nav. */
export const visibleProjects: Project[] = projects.filter((p) => !p.hidden)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

