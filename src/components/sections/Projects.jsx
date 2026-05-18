import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ProjectCard from '../projects/ProjectCard'
import { projects } from '../../data/projects'

function RevealSection({ children, delay = 0 }) {
  const { ref, inView } = useScrollReveal(0.1)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      {/* Section accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)' }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
      </div>

      <div className="container-cyber px-6 mx-auto">
        {/* Header */}
        <RevealSection>
          <div className="text-center mb-20">
            <div className="font-mono text-xs tracking-[0.5em] text-pink-400 uppercase mb-4">
              // 02 — Projects
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Featured</span>{' '}
              <span className="text-white">Missions</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Real-world cybersecurity and AI systems built for modern threat landscapes.
            </p>
          </div>
        </RevealSection>

        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <RevealSection key={project.id} delay={i * 0.1}>
              <ProjectCard project={project} index={i} />
            </RevealSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealSection delay={0.3}>
          <div className="mt-16 text-center">
            <p className="font-mono text-xs text-gray-600 tracking-widest">
              // More projects available on{' '}
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                GitHub
              </a>
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}