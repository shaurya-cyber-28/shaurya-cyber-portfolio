import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ParticleField from '../ui/ParticleField'
import AnimatedGrid from '../ui/AnimatedGrid'
import GlowButton from '../ui/GlowButton'

const TYPING_PHRASES = [
  'Cybersecurity Engineer',
  'High-end security dashboard/UI design',
  'Threat Intelligence Analyst',
  'Penetration Tester',
  'Threat intelligence and dark web monitoring',
]

function useTypingEffect(phrases, speed = 80, pause = 2000) {
  const [text, setText]         = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting]  = useState(false)
  const [waiting, setWaiting]   = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]

    if (waiting) {
      const t = setTimeout(() => { setDeleting(true); setWaiting(false) }, pause)
      return () => clearTimeout(t)
    }

    if (!deleting && charIdx <= current.length) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIdx))
        setCharIdx(c => c + 1)
        if (charIdx === current.length) setWaiting(true)
      }, speed)
      return () => clearTimeout(t)
    }

    if (deleting && charIdx >= 0) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIdx))
        setCharIdx(c => c - 1)
        if (charIdx === 0) {
          setDeleting(false)
          setPhraseIdx(i => (i + 1) % phrases.length)
        }
      }, speed / 2)
      return () => clearTimeout(t)
    }
  }, [charIdx, deleting, waiting, phraseIdx, phrases, speed, pause])

  return text
}

const STATUS_ITEMS = [
  { label: 'SYSTEM', value: 'ONLINE',    color: '#22c55e' },
  { label: 'THREAT', value: 'MONITORING', color: '#a855f7' },
  { label: 'AI',     value: 'ACTIVE',    color: '#06b6d4' },
]

export default function Hero() {
  const typedText = useTypingEffect(TYPING_PHRASES)
  const heroRef   = useRef(null)

  // Subtle parallax on scroll
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      el.style.transform = `translateY(${y * 0.2}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#020206' }}
    >
      {/* Background layers */}
      <AnimatedGrid />
      <ParticleField count={50} />

      {/* Radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
      </div>

      {/* Main content */}
      <div ref={heroRef} className="relative z-10 container-cyber px-6 mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Top badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="glass-strong inline-flex items-center gap-3 px-5 py-2.5 rounded-full">
              <div className="status-dot" />
              <span className="font-mono text-xs tracking-[0.3em] text-green-400 uppercase">
                System Online — Accepting New Missions
              </span>
            </div>
          </motion.div>

          {/* Terminal intro */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="glass inline-block px-5 py-3 rounded-lg text-left max-w-sm mx-auto">
              <p className="font-mono text-xs text-gray-500 mb-1">
                <span className="text-purple-500">root@verma</span>
                <span className="text-gray-600">:~#</span>
              </p>
              <p className="font-mono text-xs text-green-400">
                ./initialize_portfolio.sh
                <span className="animate-pulse text-purple-400"> ▋</span>
              </p>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="font-mono text-xs tracking-[0.5em] text-purple-400 uppercase mb-4">
              — Cybersecurity & AI Engineer —
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="gradient-text">SHAURYA</span>
              <br />
              <span
                className="text-white"
                style={{ textShadow: '0 0 60px rgba(255,255,255,0.05)' }}
              >
                VERMA
              </span>
            </h1>
          </motion.div>

          {/* Typing effect */}
          <motion.div variants={itemVariants} className="mb-10 h-8">
            <p className="font-mono text-lg md:text-xl text-gray-300">
              <span className="text-purple-400">&gt; </span>
              <span>{typedText}</span>
              <span className="animate-[blink_1s_step-end_infinite] text-purple-400">|</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Building{' '}
            <span className="text-purple-400 font-semibold">AI-powered defensive systems</span> and{' '}
            <span className="text-pink-400 font-semibold">adversarial security tools</span>{' '}
            that push the boundaries of what's possible in the cyber domain.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <GlowButton
              size="lg"
              variant="primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              icon="🚀"
            >
              View Projects
            </GlowButton>
            <GlowButton
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              icon="⚡"
            >
              About Me
            </GlowButton>
          </motion.div>

          {/* Status indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {STATUS_ITEMS.map((item) => (
              <div
                key={item.label}
                className="glass flex items-center gap-3 px-4 py-2.5 rounded-lg"
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                />
                <span className="font-mono text-[10px] tracking-widest text-gray-500">
                  {item.label}:
                </span>
                <span
                  className="font-mono text-[10px] tracking-widest font-bold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">Scroll</span>
        <div
          className="w-px h-12 rounded-full overflow-hidden bg-white/10"
        >
          <div
            className="w-full rounded-full"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, #a855f7, transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}