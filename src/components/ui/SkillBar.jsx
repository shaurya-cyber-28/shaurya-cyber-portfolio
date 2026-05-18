import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SkillBar({ label, level, color = '#a855f7', delay = 0 }) {
  const { ref, inView } = useScrollReveal(0.2)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(level), delay)
      return () => clearTimeout(t)
    }
  }, [inView, level, delay])

  return (
    <div ref={ref} className="mb-5">
      {/* Label row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-mono text-gray-300 tracking-wider">{label}</span>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {level}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        {/* Fill bar */}
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 10px ${color}60`,
            transition: `width 1.4s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          }}
        >
          {/* FIXED: shimmer now works because @keyframes shimmer is defined in globals.css */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
              animation: 'shimmer 2.2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  )
}