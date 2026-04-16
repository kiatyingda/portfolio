'use client'

export default function Hero() {
  return (
    <section data-bg="light" className="grain relative min-h-[100svh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>

      {/* ASCII rain — ambient keyword field as textural backdrop. Invert +
          multiply pushes the iframe's white-on-black render onto the light
          section as grey chars against white. */}
      <iframe
        src="/ascii/ascii-shape.html"
        className="absolute inset-0 w-full h-full"
        style={{
          border: 'none',
          background: 'transparent',
          filter: 'invert(1)',
          mixBlendMode: 'multiply',
        }}
        title="ASCII Background"
        loading="eager"
        tabIndex={-1}
        onFocus={(e) => e.currentTarget.blur()}
      />

    </section>
  )
}
