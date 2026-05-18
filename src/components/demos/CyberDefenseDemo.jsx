import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlowButton from '../ui/GlowButton'

const EVENTS = [
  'Lateral movement detected — Host: 10.0.1.45',
  'Credential dump attempt — LSASS access',
  'Outbound C2 beacon — IP: 185.220.101.x',
  'Privilege escalation — NT AUTHORITY\\SYSTEM',
  'Firewall rule modification detected',
  'Suspicious PowerShell execution',
  'Registry persistence key added',
  'Network reconnaissance — ICMP sweep',
  'Ransomware process signature match',
  'Shadow copy deletion attempted',
]

const PLAYBOOKS = [
  { name: 'Isolate Host',       status: 'ready',    color: '#22c55e' },
  { name: 'Kill Process',       status: 'ready',    color: '#22c55e' },
  { name: 'Block IP',           status: 'running',  color: '#eab308' },
  { name: 'Revoke Credentials', status: 'complete', color: '#a855f7' },
  { name: 'Snapshot VM',        status: 'ready',    color: '#22c55e' },
]

export default function CyberDefenseDemo() {
  const navigate = useNavigate()
  const [events, setEvents]   = useState([])
  const [running, setRunning] = useState(true)
  const [metrics, setMetrics] = useState({ incidents: 0, autoResolved: 0, eventsPerSec: 0 })
  const [cmd, setCmd]         = useState('')
  const [cmdLog, setCmdLog]   = useState([
    { text: 'CyberDefense-X v3.0 — Autonomous SOC Platform', color: '#a855f7' },
    { text: 'Type "help" for available commands', color: '#6b7280' },
  ])

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      const event = {
        id:   Math.random().toString(36).slice(2),
        ts:   new Date().toTimeString().split(' ')[0],
        text: EVENTS[Math.floor(Math.random() * EVENTS.length)],
        auto: Math.random() > 0.2,
        sev:  Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MED' : 'LOW',
      }
      setEvents(e => [event, ...e.slice(0, 19)])
      setMetrics(m => ({
        incidents:   m.incidents + 1,
        autoResolved: event.auto ? m.autoResolved + 1 : m.autoResolved,
        eventsPerSec: Math.floor(Math.random() * 50000 + 450000),
      }))
    }, 1200)
    return () => clearInterval(interval)
  }, [running])

  const handleCmd = (e) => {
    e.preventDefault()
    if (!cmd.trim()) return
    const c = cmd.trim().toLowerCase()
    let response

    if (c === 'help') {
      response = 'Commands: status | block <ip> | isolate <host> | playbooks | clear'
    } else if (c === 'status') {
      response = `System ONLINE | Incidents: ${metrics.incidents} | Auto-resolved: ${metrics.autoResolved}`
    } else if (c.startsWith('block ')) {
      response = `Firewall rule added: DROP ${c.split(' ')[1]} — Applied to all edge nodes`
    } else if (c.startsWith('isolate ')) {
      response = `Host ${c.split(' ')[1]} quarantined — Network access revoked`
    } else if (c === 'playbooks') {
      response = `Active playbooks: ${PLAYBOOKS.map(p => p.name).join(', ')}`
    } else if (c === 'clear') {
      setCmdLog([])
      setCmd('')
      return
    } else {
      response = `Unknown command: "${c}". Type "help" for available commands.`
    }

    setCmdLog(log => [
      ...log,
      { text: `$ ${cmd}`, color: '#a855f7' },
      { text: `> ${response}`, color: '#9ca3af' },
    ])
    setCmd('')
  }

  const sevColors = { HIGH: '#ef4444', MED: '#f97316', LOW: '#eab308' }

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container-cyber mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/project/cyberdefense-x')}
              className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-red-400 transition-colors mb-3"
            >
              ← Back to project
            </button>
            <h1 className="font-display text-3xl font-black">
              <span className="text-red-400">CyberDefense-X</span>
              <span className="text-white"> — SOC Command Center</span>
            </h1>
          </div>
          <GlowButton
            variant={running ? 'danger' : 'primary'}
            size="sm"
            onClick={() => setRunning(r => !r)}
            icon={running ? '⏸' : '▶'}
          >
            {running ? 'Pause' : 'Resume'}
          </GlowButton>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Incidents',    value: metrics.incidents,       color: '#ef4444' },
            { label: 'Auto-Resolved',      value: metrics.autoResolved,    color: '#22c55e' },
            { label: 'Events/sec',         value: metrics.eventsPerSec.toLocaleString(), color: '#a855f7' },
          ].map(s => (
            <div key={s.label} className="glass-strong rounded-xl p-5" style={{ border: `1px solid ${s.color}20` }}>
              <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2">{s.label}</div>
              <div className="font-display text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event feed */}
          <div className="lg:col-span-2 glass-strong rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
              <div className={`w-2 h-2 rounded-full ${running ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className="font-mono text-xs text-gray-600">Live Incident Feed</span>
            </div>
            <div className="h-72 overflow-y-auto p-4 space-y-1.5 font-mono text-xs">
              <AnimatePresence initial={false}>
                {events.map(ev => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-white/2"
                  >
                    <span className="text-gray-700 w-16 flex-shrink-0">{ev.ts}</span>
                    <span
                      className="w-8 text-[9px] tracking-widest flex-shrink-0 font-bold"
                      style={{ color: sevColors[ev.sev] }}
                    >
                      {ev.sev}
                    </span>
                    <span className="text-gray-300 flex-1 truncate">{ev.text}</span>
                    <span
                      className="text-[9px] flex-shrink-0 font-bold tracking-wide"
                      style={{ color: ev.auto ? '#22c55e' : '#ef4444' }}
                    >
                      {ev.auto ? '✓ AUTO' : '⚠ MANUAL'}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Command input */}
            <div className="border-t border-white/5">
              <div className="h-32 overflow-y-auto p-4 font-mono text-xs space-y-1">
                {cmdLog.map((line, i) => (
                  <div key={i} style={{ color: line.color }}>{line.text}</div>
                ))}
              </div>
              <form onSubmit={handleCmd} className="flex items-center gap-2 px-4 pb-4">
                <span className="font-mono text-xs text-red-400">root@cyberx:~#</span>
                <input
                  value={cmd}
                  onChange={e => setCmd(e.target.value)}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder-gray-700"
                />
              </form>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Playbooks */}
            <div className="glass-strong rounded-2xl p-5" style={{ border: '1px solid rgba(239,68,68,0.15)' }}>
              <h4 className="font-mono text-xs text-red-400 tracking-widest mb-4">// PLAYBOOKS</h4>
              <div className="space-y-3">
                {PLAYBOOKS.map(pb => (
                  <div key={pb.name} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: pb.color, boxShadow: `0 0 6px ${pb.color}`, animation: pb.status === 'running' ? 'pulse 1s infinite' : 'none' }}
                    />
                    <span className="font-mono text-xs text-gray-400 flex-1">{pb.name}</span>
                    <span className="font-mono text-[9px] tracking-widest" style={{ color: pb.color }}>
                      {pb.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security posture */}
            <div className="glass-strong rounded-2xl p-5" style={{ border: '1px solid rgba(168,85,247,0.15)' }}>
              <h4 className="font-mono text-xs text-purple-400 tracking-widest mb-4">// SECURITY POSTURE</h4>
              <div className="text-center mb-4">
                <div
                  className="font-display text-4xl font-black"
                  style={{ color: '#22c55e', textShadow: '0 0 20px rgba(34,197,94,0.5)' }}
                >
                  {metrics.incidents > 0
                    ? ((metrics.autoResolved / metrics.incidents) * 100).toFixed(0)
                    : 0}%
                </div>
                <div className="font-mono text-[10px] text-gray-600 tracking-widest mt-1">AUTO-RESOLUTION RATE</div>
              </div>
              <div className="h-1.5 rounded-full bg-white/5">
                <motion.div
                  animate={{
                    width: `${metrics.incidents > 0 ? (metrics.autoResolved / metrics.incidents) * 100 : 0}%`
                  }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #a855f7, #22c55e)', boxShadow: '0 0 10px rgba(34,197,94,0.4)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}