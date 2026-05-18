import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GlowButton from '../ui/GlowButton'

const ONION_FEEDS = [
  { site: 'breach-market.onion',  type: 'LEAK',    data: 'Corporate email dump — 2.1M records', severity: 'CRITICAL' },
  { site: 'xss-forum.onion',      type: 'THREAT',  data: 'Zero-day exploit for CVE-2025-XXXX listed', severity: 'HIGH' },
  { site: 'darkpaste.onion',      type: 'CREDS',   data: 'Banking credentials from phishing kit', severity: 'CRITICAL' },
  { site: 'ransomhub.onion',      type: 'RANSOM',  data: 'New victim listed: Acme Corp 50GB', severity: 'HIGH' },
  { site: 'telegram-leak.onion',  type: 'INTEL',   data: 'Nation-state actor recon tools shared', severity: 'CRITICAL' },
  { site: 'cred-bazaar.onion',    type: 'CREDS',   data: 'Fortune 500 employee credentials', severity: 'HIGH' },
  { site: 'malware-share.onion',  type: 'MALWARE', data: 'New polymorphic loader sample', severity: 'MEDIUM' },
  { site: 'forum-shadow.onion',   type: 'INTEL',   data: 'Infrastructure scanning campaign', severity: 'MEDIUM' },
]

const TYPE_COLORS = {
  LEAK:    '#ef4444',
  THREAT:  '#f97316',
  CREDS:   '#ec4899',
  RANSOM:  '#ef4444',
  INTEL:   '#a855f7',
  MALWARE: '#eab308',
}

const TERMINAL_LINES = [
  '> Connecting through Tor exit node...',
  '> Circuit established: 3 hops',
  '> Activating crawler swarm...',
  '> Monitoring 1,247 active .onion sites',
  '> NLP threat scoring engine: ONLINE',
  '> Alert engine: STANDBY',
  '> DarkWeb Sentinel v2.4.1 — READY',
]

export default function DarkWebDemo() {
  const navigate = useNavigate()
  const [feeds, setFeeds]   = useState([])
  const [typed, setTyped]   = useState([])
  const [lineIdx, setLineIdx] = useState(0)
  const [scanning, setScanning] = useState(true)
  const [stats, setStats]   = useState({ scanned: 0, leaks: 0, alerts: 0 })

  // Terminal typing
  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) return
    const t = setTimeout(() => {
      setTyped(p => [...p, TERMINAL_LINES[lineIdx]])
      setLineIdx(i => i + 1)
    }, 500)
    return () => clearTimeout(t)
  }, [lineIdx])

  // Feed simulation
  useEffect(() => {
    if (!scanning) return
    const interval = setInterval(() => {
      const item = {
        ...ONION_FEEDS[Math.floor(Math.random() * ONION_FEEDS.length)],
        id: Math.random().toString(36).slice(2),
        ts: new Date().toTimeString().split(' ')[0],
        score: (Math.random() * 30 + 70).toFixed(0),
      }
      setFeeds(f => [item, ...f.slice(0, 14)])
      setStats(s => ({
        scanned: s.scanned + Math.floor(Math.random() * 12 + 3),
        leaks:   item.severity === 'CRITICAL' ? s.leaks + 1 : s.leaks,
        alerts:  s.alerts + 1,
      }))
    }, 1800)
    return () => clearInterval(interval)
  }, [scanning])

  return (
    <div className="min-h-screen pt-20 pb-12 px-6">
      <div className="container-cyber mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/project/darkweb-sentinel')}
              className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-pink-400 transition-colors mb-3"
            >
              ← Back to project
            </button>
            <h1 className="font-display text-3xl font-black">
              <span className="text-pink-400">DarkWeb Sentinel</span>
              <span className="text-white"> — Intelligence Feed</span>
            </h1>
            <p className="font-mono text-xs text-gray-600 mt-1">Simulated dark web monitoring console</p>
          </div>
          <GlowButton
            variant={scanning ? 'danger' : 'primary'}
            size="sm"
            onClick={() => setScanning(s => !s)}
            icon={scanning ? '⏸' : '▶'}
          >
            {scanning ? 'Pause Scan' : 'Resume'}
          </GlowButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Sites Scanned',  value: stats.scanned.toLocaleString(), color: '#a855f7' },
            { label: 'Leaks Detected', value: stats.leaks,                    color: '#ef4444' },
            { label: 'Alerts Fired',   value: stats.alerts,                   color: '#ec4899' },
          ].map(s => (
            <div
              key={s.label}
              className="glass-strong rounded-xl p-5"
              style={{ border: `1px solid ${s.color}20` }}
            >
              <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-2">{s.label}</div>
              <div className="font-display text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Terminal */}
          <div
            className="lg:col-span-2 glass-strong rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(236,72,153,0.15)' }}
          >
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
              <span className="font-mono text-xs text-gray-600 ml-2">sentinel.sh</span>
            </div>
            <div className="p-5 h-80 overflow-y-auto font-mono text-xs">
              {typed.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mb-1.5 ${line.includes('READY') ? 'text-green-400' : line.includes('Circuit') ? 'text-pink-400' : 'text-gray-400'}`}
                >
                  {line}
                </motion.div>
              ))}
              {lineIdx < TERMINAL_LINES.length && (
                <span className="text-pink-400 animate-pulse">▋</span>
              )}
              {lineIdx >= TERMINAL_LINES.length && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                  {feeds.slice(0, 3).map(f => (
                    <div key={f.id} className="mb-1 text-gray-500">
                      <span className="text-pink-400">[{f.ts}]</span>{' '}
                      <span style={{ color: TYPE_COLORS[f.type] }}>[{f.type}]</span>{' '}
                      {f.site.slice(0, 12)}...
                    </div>
                  ))}
                  {scanning && <span className="text-green-400 animate-pulse">▋</span>}
                </motion.div>
              )}
            </div>
          </div>

          {/* Intel feed */}
          <div
            className="lg:col-span-3 glass-strong rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(168,85,247,0.15)' }}
          >
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
              <div className={`w-2 h-2 rounded-full ${scanning ? 'bg-pink-500 animate-pulse' : 'bg-gray-600'}`} />
              <span className="font-mono text-xs text-gray-600">Intelligence Feed</span>
              <span className="ml-auto font-mono text-[10px] text-pink-400">{feeds.length} EVENTS</span>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-2">
              <AnimatePresence initial={false}>
                {feeds.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/2 transition-colors"
                    style={{
                      border: `1px solid ${TYPE_COLORS[item.type]}15`,
                      background: `${TYPE_COLORS[item.type]}05`,
                    }}
                  >
                    <div
                      className="px-2 py-0.5 rounded text-[9px] font-mono tracking-widest flex-shrink-0 mt-0.5"
                      style={{ background: `${TYPE_COLORS[item.type]}20`, color: TYPE_COLORS[item.type] }}
                    >
                      {item.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] text-gray-600 mb-0.5">{item.site}</div>
                      <div className="font-mono text-xs text-gray-300 truncate">{item.data}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className="font-mono text-[9px] tracking-widest mb-0.5"
                        style={{ color: item.severity === 'CRITICAL' ? '#ef4444' : '#f97316' }}
                      >
                        {item.severity}
                      </div>
                      <div className="font-mono text-[10px] text-gray-700">{item.ts}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {feeds.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-700 font-mono text-xs">
                  Initializing crawler swarm...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}