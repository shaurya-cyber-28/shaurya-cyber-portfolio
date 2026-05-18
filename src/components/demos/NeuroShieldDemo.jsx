import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlowButton from '../ui/GlowButton'

const ATTACK_TYPES = [
  'SQL Injection',      'XSS Attack',       'DDoS Flood',
  'Port Scan',          'Brute Force SSH',   'ARP Spoofing',
  'MITM Attack',        'Ransomware C2',     'DNS Poisoning',
  'Zero-Day Exploit',   'Credential Stuffing','Buffer Overflow',
]

const SOURCES = [
  '195.22.41.x', '103.87.12.x', '45.148.10.x', '91.240.118.x',
  '185.220.10.x','5.188.62.x',  '194.165.16.x','62.233.50.x',
]

const SEVERITIES = [
  { label: 'CRITICAL', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  { label: 'HIGH',     color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  { label: 'MEDIUM',   color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  { label: 'LOW',      color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
]

function randomEntry() {
  const sev  = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)]
  const type = ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)]
  const src  = SOURCES[Math.floor(Math.random() * SOURCES.length)]
  const conf = (Math.random() * 20 + 80).toFixed(1)
  const ts   = new Date().toTimeString().split(' ')[0]
  return { id: Math.random().toString(36).slice(2), sev, type, src, conf, ts, blocked: Math.random() > 0.15 }
}

export default function NeuroShieldDemo() {
  const navigate     = useNavigate()
  const [logs, setLogs]       = useState(() => Array.from({ length: 6 }, randomEntry))
  const [running, setRunning] = useState(true)
  const [stats, setStats]     = useState({ total: 1247, blocked: 1235, threats: 12 })
  const [alert, setAlert]     = useState(null)
  const logsRef = useRef(null)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      const entry = randomEntry()
      setLogs(prev => [entry, ...prev.slice(0, 19)])
      setStats(s => ({
        total:   s.total + 1,
        blocked: entry.blocked ? s.blocked + 1 : s.blocked,
        threats: !entry.blocked ? s.threats + 1 : s.threats,
      }))
      if (entry.sev.label === 'CRITICAL' && !entry.blocked) {
        setAlert(entry)
        setTimeout(() => setAlert(null), 3000)
      }
    }, 800)
    return () => clearInterval(interval)
  }, [running])

  const accuracy = ((stats.blocked / stats.total) * 100).toFixed(1)

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      {/* Alert */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -60, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -60, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-6 py-4 rounded-xl font-mono text-sm"
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.5)',
              boxShadow: '0 0 30px rgba(239,68,68,0.3)',
              minWidth: '320px',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-bold tracking-widest">⚠ THREAT BYPASSED DETECTION</span>
            </div>
            <div className="mt-1 text-xs text-gray-400">{alert.type} from {alert.src}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-cyber mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/project/neuroshield-ids')}
              className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-purple-400 transition-colors mb-3"
            >
              ← Back to project
            </button>
            <h1 className="font-display text-3xl font-black">
              <span className="text-purple-400">NeuroShield</span>
              <span className="text-white"> IDS — Live Dashboard</span>
            </h1>
            <p className="font-mono text-xs text-gray-600 mt-1">Simulated real-time threat detection feed</p>
          </div>
          <div className="flex gap-3">
            <GlowButton
              variant={running ? 'danger' : 'primary'}
              size="sm"
              onClick={() => setRunning(r => !r)}
              icon={running ? '⏸' : '▶'}
            >
              {running ? 'Pause' : 'Resume'}
            </GlowButton>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Events Analyzed', value: stats.total.toLocaleString(), color: '#a855f7', icon: '📡' },
            { label: 'Threats Blocked', value: stats.blocked.toLocaleString(), color: '#22c55e', icon: '🛡️' },
            { label: 'Threats Active',  value: stats.threats,                 color: '#ef4444', icon: '⚠️' },
            { label: 'AI Accuracy',     value: `${accuracy}%`,                color: '#06b6d4', icon: '🤖' },
          ].map(card => (
            <motion.div
              key={card.label}
              layout
              className="glass-strong rounded-xl p-5"
              style={{ border: `1px solid ${card.color}20` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{card.icon}</span>
                <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">{card.label}</span>
              </div>
              <div
                className="font-display text-2xl font-black"
                style={{ color: card.color, textShadow: `0 0 15px ${card.color}50` }}
              >
                {card.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attack log */}
          <div className="lg:col-span-2 glass-strong rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(168,85,247,0.15)' }}>
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
              <span className="font-mono text-xs text-gray-600 ml-2">live_threat_feed.log</span>
              <div className="ml-auto flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                <span className="font-mono text-[10px] text-gray-600">{running ? 'LIVE' : 'PAUSED'}</span>
              </div>
            </div>
            {/* Log entries */}
            <div className="h-96 overflow-y-auto p-4 space-y-1.5 font-mono text-xs" ref={logsRef}>
              <AnimatePresence initial={false}>
                {logs.map(log => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/2 transition-colors"
                  >
                    <span className="text-gray-700 w-16 flex-shrink-0">{log.ts}</span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] tracking-widest w-16 text-center flex-shrink-0"
                      style={{ background: log.sev.bg, color: log.sev.color }}
                    >
                      {log.sev.label}
                    </span>
                    <span className="text-gray-300 flex-1 truncate">{log.type}</span>
                    <span className="text-gray-600 w-24 flex-shrink-0">{log.src}</span>
                    <span className="text-gray-700 w-14 flex-shrink-0 text-right">{log.conf}%</span>
                    <span
                      className="w-14 text-center flex-shrink-0 text-[9px] tracking-wide font-bold"
                      style={{ color: log.blocked ? '#22c55e' : '#ef4444' }}
                    >
                      {log.blocked ? '✓ BLOCK' : '✗ PASS'}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right panel — AI feed */}
          <div className="space-y-4">
            {/* AI Detection */}
            <div className="glass-strong rounded-2xl p-5" style={{ border: '1px solid rgba(6,182,212,0.15)' }}>
              <h4 className="font-mono text-xs text-cyan-400 tracking-widest mb-4">// AI NEURAL ENGINE</h4>
              <div className="space-y-3">
                {['LSTM Encoder', 'CNN Classifier', 'Anomaly Detector', 'Response Engine'].map((layer, i) => (
                  <div key={layer} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-cyan-400" style={{ animationDelay: `${i * 200}ms` }} />
                    <span className="font-mono text-[10px] text-gray-400 flex-1">{layer}</span>
                    <span className="font-mono text-[10px] text-green-400">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Severity breakdown */}
            <div className="glass-strong rounded-2xl p-5" style={{ border: '1px solid rgba(168,85,247,0.15)' }}>
              <h4 className="font-mono text-xs text-purple-400 tracking-widest mb-4">// SEVERITY BREAKDOWN</h4>
              <div className="space-y-2">
                {SEVERITIES.map(sev => {
                  const count = logs.filter(l => l.sev.label === sev.label).length
                  const pct = logs.length ? (count / logs.length * 100).toFixed(0) : 0
                  return (
                    <div key={sev.label}>
                      <div className="flex justify-between font-mono text-[10px] mb-1">
                        <span style={{ color: sev.color }}>{sev.label}</span>
                        <span className="text-gray-600">{count} events</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/5">
                        <motion.div
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ background: sev.color, boxShadow: `0 0 6px ${sev.color}60` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Network status */}
            <div className="glass-strong rounded-2xl p-5" style={{ border: '1px solid rgba(34,197,94,0.15)' }}>
              <h4 className="font-mono text-xs text-green-400 tracking-widest mb-3">// NETWORK STATUS</h4>
              <div className="font-mono text-xs text-gray-500 space-y-1.5">
                <div className="flex justify-between">
                  <span>Packet Rate</span>
                  <span className="text-green-400">{(Math.random() * 5000 + 45000).toFixed(0)}/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency</span>
                  <span className="text-green-400">&lt;1ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime</span>
                  <span className="text-green-400">99.97%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}