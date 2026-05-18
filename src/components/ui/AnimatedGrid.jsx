export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 8s linear infinite',
        }}
      />
      {/* Secondary smaller grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      {/* Radial vignette fade */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #020206 80%)',
        }}
      />
    </div>
  )
}