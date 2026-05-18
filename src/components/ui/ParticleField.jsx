import { useEffect, useRef } from 'react'

export default function ParticleField({ count = 60 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    if (!canvas) return
    const ctx     = canvas.getContext('2d')
    let W         = canvas.width  = window.innerWidth
    let H         = canvas.height = window.innerHeight
    let animId

    const particles = Array.from({ length: count }, () => ({
      x:      Math.random() * W,
      y:      Math.random() * H,
      r:      Math.random() * 1.5 + 0.5,
      vx:     (Math.random() - 0.5) * 0.3,
      vy:     (Math.random() - 0.5) * 0.3,
      alpha:  Math.random() * 0.5 + 0.1,
      color:  Math.random() > 0.5 ? '168,85,247' : '236,72,153',
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}