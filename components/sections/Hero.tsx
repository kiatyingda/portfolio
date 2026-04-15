export default function Hero() {
  return (
    <section data-bg="light" className="grain relative min-h-[100svh] flex items-center overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>

      {/* ASCII field — fills section, dense block in center with soft edges.
          filter: invert(1) flips the iframe's monochrome content so white bg + dark
          particles render over the light section (matching the rest of the page). */}
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
      />

    </section>
  )
}
