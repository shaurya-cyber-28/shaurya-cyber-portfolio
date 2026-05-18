import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import CustomCursor from './components/layout/CustomCursor'
import ScanlineOverlay from './components/ui/ScanlineOverlay'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import ProjectPage from './components/projects/ProjectPage'
import NeuroShieldDemo from './components/demos/NeuroShieldDemo'
import DarkWebDemo from './components/demos/DarkWebDemo'
import CyberDefenseDemo from './components/demos/CyberDefenseDemo'
import ShadowNetDemo from './components/demos/ShadowNetDemo'

/* ─── Home page ─── */
function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <ContactSection />
    </main>
  )
}

/* ─── Contact ─── */
function ContactSection() {
  return (
    <section id="contact" className="relative section-padding">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent)',
        }}
      />
      <div className="container-cyber px-6 mx-auto text-center">
        <div className="font-mono text-xs tracking-[0.5em] text-purple-400 uppercase mb-4">
          // 03 — Contact
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-black gradient-text mb-6">
          Let&apos;s Build Something
          <br />
          Dangerous
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mb-12 text-lg">
          Open to blue team engagements, AI security research, and ambitious
          product collaborations.
        </p>
        
        <a
          href="mailto:shaurya.verma.cyber@gmail.com"
          className="inline-flex items-center gap-3 font-mono text-sm tracking-widest uppercase px-10 py-5 rounded-xl transition-all duration-300 text-white"
          style={{
            background:
              'linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)',
            boxShadow: '0 0 30px rgba(168,85,247,0.4)',
            backgroundSize: '200% 200%',
            animation: 'gradientX 3s ease infinite',
          }}
        >
          <span>⚡</span>
          <span>Initiate Contact</span>
        </a>

        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-700 tracking-widest">
            © 2026 VERMA.DEV — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((s) => (
              <a
                key={s}
                href="#"
                className="font-mono text-xs text-gray-600 hover:text-purple-400 transition-colors tracking-widest uppercase"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Demo router — FIXED: useParams imported at top, no require() ─── */
function DemoRoute() {
  const { id } = useParams()

  const demos = {
    neuroshield:  <NeuroShieldDemo />,
    darkweb:      <DarkWebDemo />,
    cyberdefense: <CyberDefenseDemo />,
    shadownet:    <ShadowNetDemo />,
  }

  return (
    demos[id] ?? (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-gray-500">Demo not found</p>
      </div>
    )
  )
}

/* ─── App root ─── */
export default function App() {
  const location = useLocation()

  return (
    <div className="relative bg-[#020206] text-white min-h-screen overflow-x-hidden">
      <CustomCursor />
      <ScanlineOverlay />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* FIXED: removed invalid `index` prop from top-level route */}
          <Route path="/"              element={<HomePage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/demo/:id"      element={<DemoRoute />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}