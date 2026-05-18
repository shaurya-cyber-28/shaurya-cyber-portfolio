import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef   = useRef(null)
  const followerRef = useRef(null)
  const posRef      = useRef({ x: -100, y: -100 })
  const followPos   = useRef({ x: -100, y: -100 })
  const animRef     = useRef(null)

  useEffect(() => {
    const cursor   = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    /* ── Mouse position ── */
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = `${e.clientX}px`
      cursor.style.top  = `${e.clientY}px`
    }

    /* ── Hover state via event delegation — FIXED: no per-element listeners ── */
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      if (!target) return
      cursor.style.transform   = 'translate(-50%, -50%) scale(0)'
      follower.style.transform = 'translate(-50%, -50%) scale(2.5)'
      follower.style.borderColor = 'rgba(168,85,247,0.9)'
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-hover]')
      if (!target) return
      cursor.style.transform   = 'translate(-50%, -50%) scale(1)'
      follower.style.transform = 'translate(-50%, -50%) scale(1)'
      follower.style.borderColor = 'rgba(168,85,247,0.5)'
    }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseover',  onMouseOver)
    document.addEventListener('mouseout',   onMouseOut)

    /* ── Smooth follower via RAF ── */
    const tick = () => {
      followPos.current.x += (posRef.current.x - followPos.current.x) * 0.1
      followPos.current.y += (posRef.current.y - followPos.current.y) * 0.1
      follower.style.left = `${followPos.current.x}px`
      follower.style.top  = `${followPos.current.y}px`
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed z-[9999] pointer-events-none"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#a855f7',
          transform: 'translate(-50%, -50%) scale(1)',
          boxShadow: '0 0 10px #a855f7, 0 0 20px rgba(168,85,247,0.5)',
          transition: 'transform 0.2s ease',
          top: 0,
          left: 0,
          willChange: 'left, top',
        }}
      />
      {/* Outer ring */}
      <div
        ref={followerRef}
        className="fixed z-[9998] pointer-events-none"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.5)',
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.3s ease, border-color 0.3s ease',
          top: 0,
          left: 0,
          willChange: 'left, top',
        }}
      />
    </>
  )
}