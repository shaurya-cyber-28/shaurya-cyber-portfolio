import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { projects } from '../../data/projects'
import GlowButton from '../ui/GlowButton'

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ─── Animated number counter ─── */
function AnimatedStat({ value, color }) {
  const ref       = useRef(null)
  // Extract leading numeric portion; keep suffix (%, +, ms, etc.)
  const numeric   = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
  const suffix    = value.replace(/^[\d.]+/, '')               // everything after the number
  const prefix    = value.match(/^[^0-9]*/)                    // anything before digits (e.g. "<")
  const hasPrefix = prefix && prefix[0] !== ''

  useEffect(() => {
    const el = ref.current
    if (!el || numeric === 0) { if (el) el.textContent = value; return }

    const duration  = 1800
    const start     = Date.now()

    const tick = () => {
      const elapsed  = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease     = 1 - Math.pow(1 - progress, 3)
      const current  = Math.floor(numeric * ease)

      // Reconstruct original format
      if (hasPrefix) {
        el.textContent = `${prefix[0]}${current}${suffix}`
      } else {
        el.textContent = `${current}${suffix}`
      }

      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [numeric, suffix, value, hasPrefix, prefix])

  return (
    <div
      ref={ref}
      className="font-display text-4xl font-black mb-2"
      style={{ color, textShadow: `0 0 20px ${color}50` }}
    >
      {value}
    </div>
  )
}

export default function ProjectPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const project   = projects.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="gradient-text text-4xl font-black mb-4">404</h2>
          <p className="text-gray-500 mb-8">Project not found</p>
          <GlowButton onClick={() => navigate('/')}>Go Home</GlowButton>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      {/* ── Hero ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}15, transparent 60%)`,
        }}
      >
        {/* Animated grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(${project.color}08 1px, transparent 1px),
              linear-gradient(90deg, ${project.color}08 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}50, transparent)`,
          }}
        />

        <div className="container-cyber px-6 mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Back */}
            <motion.div variants={fadeUp} className="mb-10">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-purple-400 transition-colors group"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                <span>Back to projects</span>
              </button>
            </motion.div>

            {/* Category + Status */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6 flex-wrap">
              <div
                className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {project.category}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background:
                      project.status === 'ACTIVE' ? '#22c55e' : project.color,
                  }}
                />
                <span className="font-mono text-[10px] text-gray-500 tracking-widest">
                  {project.status}
                </span>
              </div>
              <span className="font-mono text-[10px] text-gray-700">{project.year}</span>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp} className="mb-4">
              <h1 className="font-display text-5xl md:text-7xl font-black">
                <span
                  style={{
                    color: project.color,
                    textShadow: `0 0 40px ${project.color}50`,
                  }}
                >
                  {project.title}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-mono text-lg text-gray-400 mb-6"
            >
              {project.subtitle}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-10"
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: `${project.color}10`,
                    color: project.color,
                    border: `1px solid ${project.color}20`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <GlowButton
                size="lg"
                variant="primary"
                onClick={() => project.links?.websiteCode ? window.open(project.links.websiteCode, '_blank') : navigate(`/demo/${project.demo}`)}
                icon="⚡"
              >
                LAUNCH
              </GlowButton>
              
              {project.links?.sourceCode && (
                <GlowButton 
                  size="lg" 
                  variant="outline" 
                  icon="📂"
                  onClick={() => window.open(project.links.sourceCode, '_blank')}
                >
                  View Source
                </GlowButton>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Animated Stats — FIXED: counter now actually animates the displayed values ── */}
      <section className="py-16 border-y border-white/5">
        <div className="container-cyber px-6 mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                className="glass-strong rounded-2xl p-6 text-center"
                style={{ border: `1px solid ${project.color}15` }}
              >
                <AnimatedStat value={stat.value} color={project.color} />
                <div className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Details ── */}
      <section className="py-20">
        <div className="container-cyber px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Architecture */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:col-span-2 glass-strong rounded-2xl p-8"
              style={{ border: `1px solid ${project.color}15` }}
            >
              <h3
                className="font-mono text-xs tracking-widest uppercase mb-6"
                style={{ color: project.color }}
              >
                // Architecture Pipeline
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {project.architecture.split('→').map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="px-3 py-2 rounded-lg font-mono text-xs text-gray-300 glass"
                      style={{ border: `1px solid ${project.color}20` }}
                    >
                      {step.trim()}
                    </div>
                    {i < arr.length - 1 && (
                      <span style={{ color: project.color }} className="text-lg font-bold">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="glass-strong rounded-2xl p-8"
              style={{ border: `1px solid ${project.color}15` }}
            >
              <h3
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: project.color }}
              >
                // Real-World Impact
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{project.impact}</p>
            </motion.div>
          </div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 glass-strong rounded-2xl p-8"
            style={{ border: `1px solid ${project.color}15` }}
          >
            <h3
              className="font-mono text-xs tracking-widest uppercase mb-6"
              style={{ color: project.color }}
            >
              // Engineering Challenges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.challenges.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{
                      background: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-16 text-center"
          >
            <div
              className="glass-strong rounded-2xl p-12 relative overflow-hidden"
              style={{ border: `1px solid ${project.color}20` }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${project.color}10, transparent 60%)`,
                }}
              />
              <h3 className="font-display text-3xl font-black text-white mb-4">
                Experience It Live
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Launch the interactive demo to see {project.title} in action
                with simulated real-world data.
              </p>
              <GlowButton
                size="xl"
                onClick={() => project.links?.websiteCode ? window.open(project.links.websiteCode, '_blank') : navigate(`/demo/${project.demo}`)}
                icon="🚀"
              >
                LAUNCH
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}