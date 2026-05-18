import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlowButton from '../ui/GlowButton'

const ATTACK_STEPS = [
  { phase: 'RECON',      step: 'Passive OSINT gathering on target domain', time: '00:00', done: false },
  { phase: 'SCAN',       step: 'Port enumeration — 65535 ports scanned', time: '00:12', done: false },
  { phase: 'ENUM',       step: 'Service fingerprinting and version detection', time: '00:45', done: false },
  { phase: 'EXPLOIT',    step: 'CVE-2024-3400 — PAN-OS command injection', time: '01:20', done: false },
  { phase: 'PIVOT',      step: 'Lateral movement via WMI to internal hosts', time: '02:05', done: false },
  { phase: 'PERSIST',    step: 'Registry persistence + scheduled task created', time: '02:50', done: false },
  { phase: 'EXFIL',      step: 'Data staging and encrypted C2 exfiltration', time: '03:30', done: false },
]

const AI_THOUGHTS = [
  "Analyzing target surface area with GPT-4 planner...",
  "Generating novel attack graph from OSINT data...",
  "Evaluating exploit likelihood: CVE-2024-3400 (8.7 CVSS)...",
  "Planning lateral movement path through trust boundaries...",
  "Adapting strategy based on defense detection...",
  "Synthesizing red team report narrative...",
]

export default function ShadowNetDemo() {
  const navigate  = useNavigate()
  const [step, setStep]       = useState(0)
  const [running, setRunning] = useState(false)
  const [aiLog, setAiLog]     = useState([AI_THOUGHTS[0]])
  const [aiIdx, setAiIdx]     = useState(0)
  const [report, setReport]   = useState(false)
  const [steps, setSteps]     = useState(ATTACK_STEPS)

  useEffect(() => {
    if (!running) return
    if (step >= steps.length) {
      setRunning(false)
      setReport(true)
      return
    }
    const t = setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === step ? { ...s, done: true } : s))
      setStep(s => s + 1)
      const nextAi = AI_THOUGHTS[Math.min(step + 1, AI_THOUGHTS.length - 1)]
      setAiLog(l => [...l, nextAi])
      setAiIdx(i => i + 1)
    }, 2500)
    return () => clearTimeout(t)
  }, [running, step, steps.length])

  const reset = () => {
    setStep(0)
    setRunning(false)
    setReport(false)
    setSteps(ATTACK_STEPS)
    setAiLog([AI_THOUGHTS[0]])
    setAiIdx(0)
  }

  const phaseColors = {
    RECON: '#06b6d4', SCAN: '#a855f7', ENUM: '#8b5cf6',
    EXPLOIT: '#ef4444', PIVOT: '#f97316', PERSIST: '#ec4899', EXFIL: '#eab308',
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container-cyber mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/project/shadownet')}
              className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-cyan-400 transition-colors mb-3"
            >
              ← Back to project
            </button>
            <h1 className="font-display text-3xl font-black">
              <span className="text-cyan-400">ShadowNet</span>
              <span className="text-white"> — AI Red Team Simulation</span>
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="font-mono text-[10px] text-yellow-500 tracking-widest">AUTHORIZED SIMULATION ENVIRONMENT ONLY</span>
            </div>
          </div>
          <div className="flex gap-3">
            {!running && !report && (
              <GlowButton variant="cyan" size="sm" onClick={() => setRunning(true)} icon="▶">
                Start Simulation
              </GlowButton>
            )}
            {(running || report) && (
              <GlowButton variant="outline" size="sm" onClick={reset} icon="↺">
                Reset
              </GlowButton>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attack chain */}
          <div className="glass-strong rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(6,182,212,0.15)' }}>
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
              <div className={`w-2 h-2 rounded-full ${running ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
              <span className="font-mono text-xs text-gray-600">Attack Chain</span>
              <span className="ml-auto font-mono text-[10px] text-cyan-400">
                {step}/{steps.length} PHASES
              </span>
            </div>
            <div className="p-6 space-y-3">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  animate={{ opacity: i <= step ? 1 : 0.3 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 mt-0.5 transition-all duration-300"
                    style={{
                      background: s.done ? `${phaseColors[s.phase]}30` : 'rgba(255,255,255,0.03)',
                      color: s.done ? phaseColors[s.phase] : '#4b5563',
                      border: `1px solid ${s.done ? phaseColors[s.phase] : 'rgba(255,255,255,0.05)'}40`,
                    }}
                  >
                    {s.done ? '✓' : String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="font-mono text-[9px] tracking-widest"
                        style={{ color: phaseColors[s.phase] }}
                      >
                        {s.phase}
                      </span>
                      {i === step && running && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-cyan-400 text-[10px]"
                        >
                          ▋ EXECUTING
                        </motion.span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-gray-400">{s.step}</span>
                  </div>
                  <span className="font-mono text-[10px] text-gray-700 flex-shrink-0">{s.time}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI planner log */}
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(6,182,212,0.15)' }}>
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
                <span className="text-lg">🤖</span>
                <span className="font-mono text-xs text-gray-600">AI Planner Log</span>
              </div>
              <div className="p-5 h-52 overflow-y-auto font-mono text-xs space-y-2">
                {aiLog.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400"
                  >
                    <span className="text-cyan-500">AI›</span> {line}
                  </motion.div>
                ))}
                {running && (
                  <span className="text-cyan-400 animate-pulse">▋</span>
                )}
              </div>
            </div>

            {/* Report */}
            <AnimatePresence>
              {report && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-strong rounded-2xl p-6"
                  style={{ border: '1px solid rgba(34,197,94,0.2)' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <h4 className="font-mono text-xs text-green-400 tracking-widest">// SIMULATION COMPLETE — REPORT GENERATED</h4>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    {[
                      ['Attack Phases Completed', '7/7'],
                      ['Vulnerabilities Found',   '3 Critical'],
                      ['Avg. Time per Phase',     '2m 30s'],
                      ['Stealth Score',           '8.4 / 10'],
                      ['Report Quality',          '9.1 / 10'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-500">{k}</span>
                        <span className="text-green-400 font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!running && !report && (
              <div
                className="glass-strong rounded-2xl p-8 text-center"
                style={{ border: '1px solid rgba(6,182,212,0.1)' }}
              >
                <div className="text-4xl mb-3">🤖</div>
                <p className="font-mono text-xs text-gray-600">
                  Press "Start Simulation" to run the<br />autonomous red team agent.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}