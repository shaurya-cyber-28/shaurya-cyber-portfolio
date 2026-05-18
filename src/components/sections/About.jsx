import { motion } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import SkillBar from '../ui/SkillBar'

const SKILLS_SECURITY = [
  { label: 'Penetration Testing',  level: 78 },
  { label: 'Network Security',     level: 84 },
  { label: 'Malware Analysis',     level: 68 },
  { label: 'Threat Intelligence',  level: 80 },
  { label: 'Incident Response',    level: 74 },
]

const SKILLS_AI = [
  { label: 'Machine Learning',            level: 76 },
  { label: 'Deep Learning / Neural Nets', level: 70 },
  { label: 'NLP & LLM Engineering',       level: 72 },
  { label: 'Adversarial AI',              level: 60 },
  { label: 'MLOps & Model Deployment',    level: 58 },
]

const TOOLS = [
  'Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SQL', 'Bash', 'PowerShell',
  'Wireshark', 'Nmap', 'Metasploit', 'BurpSuite', 'Nessus', 'Kali Linux', 'Splunk', 'OWASP'
]

const CERTS = [
  { label: 'OSCP',  name: 'Offensive Security Certified Professional', color: '#ef4444' },
  { label: 'CEH',   name: 'Certified Ethical Hacker',                  color: '#a855f7' },
  { label: 'CISSP', name: 'Certified Information Security Professional',color: '#06b6d4' },
  { label: 'AWS-SA', name: 'AWS Solutions Architect',                   color: '#eab308' },
]

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

export default function About() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }}
        />
        <div
          className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
      </div>

      <div className="container-cyber px-6 mx-auto">
        {/* Section header */}
        <RevealSection>
          <div className="text-center mb-20">
            <div className="font-mono text-xs tracking-[0.5em] text-purple-400 uppercase mb-4">
              // 01 — About
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black gradient-text mb-6">
              Who I Am
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              A rogue operator in the intersection of artificial intelligence and offensive/defensive security.
            </p>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left — Bio */}
          <RevealSection delay={0.1}>
            <div className="glass-strong rounded-2xl p-8 h-full" style={{ border: '1px solid rgba(168,85,247,0.15)' }}>
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                <span className="font-mono text-xs text-gray-600 ml-2">bio.txt</span>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <p className="text-gray-400 leading-relaxed">
                  <span className="text-purple-400">$</span> I live at the intersection of{' '}
                  <span className="text-pink-400">cybersecurity</span> and{' '}
                  <span className="text-purple-400">artificial intelligence</span> — building
                  systems that defend, detect, and dominate in the cyber domain.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  <span className="text-purple-400">$</span> Currently undergoing intensive industrial training in cybersecurity since January 2026, rapidly expanding my practical knowledge in network defense, ethical hacking, and threat intelligence.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  <span className="text-purple-400">$</span> My philosophy:{' '}
                  <span className="text-white font-semibold">
                    "To build perfect defense, you must think like a perfect attacker."
                  </span>
                </p>
                <p className="text-gray-400 leading-relaxed">
                  <span className="text-purple-400">$</span> I am building immersive AI-powered cybersecurity platforms that combine real-time threat detection, SOC operations, intrusion analysis, dark web intelligence, and live global attack visualization into interactive next-generation cyber defense systems.
                </p>
              </div>

              {/* Stats row */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                {[
                  { n: 'Jan \'26', l: 'Started Training' },
                  { n: '4+',       l: 'Projects Built' },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-display text-3xl font-black gradient-text">{s.n}</div>
                    <div className="font-mono text-xs text-gray-500 tracking-wider mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Right — Certs + Tools */}
          <div className="flex flex-col gap-6">
            <RevealSection delay={0.2}>
              <div className="glass-strong rounded-2xl p-6" style={{ border: '1px solid rgba(168,85,247,0.1)' }}>
                <h3 className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-5">
                  // Certifications In Future
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {CERTS.map((cert) => (
                    <div
                      key={cert.label}
                      className="glass rounded-xl p-3 flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
                      style={{ border: `1px solid ${cert.color}30` }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                        style={{ background: `${cert.color}20`, color: cert.color }}
                      >
                        {cert.label}
                      </div>
                      <span className="text-xs text-gray-400 leading-tight">{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div className="glass-strong rounded-2xl p-6" style={{ border: '1px solid rgba(168,85,247,0.1)' }}>
                <h3 className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-5">
                  // Tech Stack & Security Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs px-3 py-1.5 rounded-full glass transition-all duration-300 hover:border-purple-500/40 hover:text-purple-300 cursor-default"
                      style={{
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: '#9ca3af',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </RevealSection>
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <RevealSection delay={0.1}>
            <div className="glass-strong rounded-2xl p-8" style={{ border: '1px solid rgba(168,85,247,0.1)' }}>
              <h3 className="font-mono text-xs tracking-widest text-purple-400 uppercase mb-6 flex items-center gap-3">
                <span>🛡️</span> Security Skills
              </h3>
              {SKILLS_SECURITY.map((s, i) => (
                <SkillBar key={s.label} label={s.label} level={s.level} color="#a855f7" delay={i * 120} />
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="glass-strong rounded-2xl p-8" style={{ border: '1px solid rgba(6,182,212,0.1)' }}>
              <h3 className="font-mono text-xs tracking-widest text-cyan-400 uppercase mb-6 flex items-center gap-3">
                <span>🤖</span> AI / ML Skills
              </h3>
              {SKILLS_AI.map((s, i) => (
                <SkillBar key={s.label} label={s.label} level={s.level} color="#06b6d4" delay={i * 120} />
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}