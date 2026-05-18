export default function ScanlineOverlay() {
  return (
    <>
      {/* Moving scanline */}
      <div
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        style={{ mixBlendMode: 'overlay' }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)',
            animation: 'scanline 10s linear infinite',
          }}
        />
      </div>
      {/* Static noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />
    </>
  )
}