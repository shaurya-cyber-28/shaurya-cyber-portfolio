import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const cardRef   = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const navigate  = useNavigate()

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const statusColors = {
    ACTIVE:   '#22c55e',
    BETA:     '#eab308',
    RESEARCH: '#06b6d4',
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      onClick={() => navigate(`/project/${project.slug}`)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered ? 'transform 0.1s linear' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: 'pointer',
      }}
      className="relative rounded-2xl overflow-hidden group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card background */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: project.accentColor,
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          border: `1px solid ${hovered ? project.borderColor : 'rgba(255,255,255,0.06)'}`,
          transition: 'border-color 0.3s ease',
          boxShadow: hovered ? `0 0 30px ${project.color}30, inset 0 0 30px ${project.color}05` : 'none',
        }}
      />

      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: `conic-gradient(from 180deg at 100% 0%, ${project.color}30, transparent 60%)`,
        }}
      />

      {/* Scanline */}
      {hovered && (
        <div
          className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden rounded-2xl"
          style={{ opacity: 0.4 }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
              animation: 'scanline 3s linear infinite',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}
            >
              {project.icon}
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-gray-600 uppercase mb-0.5">
                {project.category}
              </div>
              <div className="font-mono text-[10px] text-gray-700">{project.year}</div>
            </div>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: `${statusColors[project.status]}15`,
              border: `1px solid ${statusColors[project.status]}30`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                background: statusColors[project.status],
                boxShadow: `0 0 6px ${statusColors[project.status]}`,
              }}
            />
            <span
              className="font-mono text-[10px] tracking-widest font-bold"
              style={{ color: statusColors[project.status] }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display text-2xl font-black mb-2 transition-colors duration-300"
          style={{ color: hovered ? project.color : '#fff' }}
        >
          {project.title}
        </h3>
        <p className="font-mono text-xs text-gray-500 mb-3 tracking-wide">{project.subtitle}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.shortDesc}</p>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {project.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono text-sm font-bold mb-0.5"
                style={{ color: project.color }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[9px] text-gray-600 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 rounded-md tracking-wider"
              style={{
                background: `${project.color}10`,
                color: `${project.color}`,
                border: `1px solid ${project.color}20`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-md text-gray-600 glass">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 font-mono text-xs tracking-widest transition-all duration-300"
          style={{ color: hovered ? project.color : '#6b7280' }}
        >
          <span>VIEW PROJECT</span>
          <span
            className="transition-transform duration-300"
            style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}
          >
            →
          </span>
        </div>
      </div>
    </motion.div>
  )
}