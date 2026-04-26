'use client'

// Animated icon sequence: single car → checkmark → double car → loop
// Used in the "Using motion for delight" Details card on the Grab case study.

function CarIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 11h16M3 11v3h2v-1M23 11v3h2v-1" />
      <path d="M5 11l2.5-5h13L23 11H5z" />
      <circle cx="7.5" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20.5" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CheckIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="11" />
      <path d="M8.5 14l4 4 7-8" />
    </svg>
  )
}

function DoubleCarIcon({ size = 28 }: { size?: number }) {
  const s = size * 0.72
  return (
    <svg width={size + 10} height={s * 0.75} viewBox="0 0 38 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Back car — offset right and slightly faded */}
      <g opacity="0.45" transform="translate(10, 0)">
        <path d="M5 10h16M2 10v3h2v-1M22 10v3h2v-1" />
        <path d="M4 10l2.5-4.5h11L20 10H4z" />
        <circle cx="6.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
      </g>
      {/* Front car */}
      <g transform="translate(0, 2)">
        <path d="M5 10h16M2 10v3h2v-1M22 10v3h2v-1" />
        <path d="M4 10l2.5-4.5h11L20 10H4z" />
        <circle cx="6.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="19.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

export default function RideTypeMotion() {
  return (
    <>
      <style>{`
        @keyframes rideSeq1 {
          0%, 22%   { opacity: 1; transform: scale(1); }
          30%, 70%  { opacity: 0; transform: scale(0.88); }
          78%, 100% { opacity: 1; transform: scale(1); }
        }
        @keyframes rideSeq2 {
          0%, 30%   { opacity: 0; transform: scale(0.88); }
          38%, 62%  { opacity: 1; transform: scale(1); }
          70%, 100% { opacity: 0; transform: scale(0.88); }
        }
        @keyframes rideSeq3 {
          0%, 62%   { opacity: 0; transform: scale(0.88); }
          70%, 92%  { opacity: 1; transform: scale(1); }
          100%      { opacity: 0; transform: scale(0.88); }
        }
      `}</style>

      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'rideSeq1 3.6s ease-in-out infinite' }}>
          <CarIcon size={64} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'rideSeq2 3.6s ease-in-out infinite', opacity: 0 }}>
          <CheckIcon size={64} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'rideSeq3 3.6s ease-in-out infinite', opacity: 0 }}>
          <DoubleCarIcon size={64} />
        </div>
      </div>
    </>
  )
}
