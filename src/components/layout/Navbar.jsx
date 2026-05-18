import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home',    href: '/#home' },
  { label: 'About',   href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const location  = useLocation()
  const navigate  = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const [path, hash] = href.split('#')
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-cyber px-6 mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" onClick={(e) => handleNavClick(e, '/#home')}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  boxShadow: '0 0 15px rgba(168,85,247,0.5)',
                }}
              >
                V
              </div>
              <div>
                <div className="font-mono text-sm font-bold tracking-widest text-white">VERMA</div>
                <div className="font-mono text-[10px] text-purple-400 tracking-[0.3em] -mt-0.5">
                  .DEV
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { handleNavClick(e, link.href); setActiveLink(link.label) }}
                  className={`relative font-mono text-xs tracking-widest uppercase transition-colors duration-300 group ${
                    activeLink === link.label ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: activeLink === link.label ? '100%' : '0%' }}
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Status + CTA */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                <div className="status-dot" />
                <span className="font-mono text-xs text-green-400 tracking-widest">AVAILABLE</span>
              </div>
              
              <a
                href="https://www.linkedin.com/in/shaurya-verma-cyber805"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg transition-all duration-300 text-white"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                  boxShadow: '0 0 15px rgba(168,85,247,0.3)',
                }}
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-px bg-purple-400 transition-all duration-300"
                  style={{
                    width: i === 1 ? '24px' : '16px',
                    opacity: menuOpen ? (i === 1 ? 0 : 1) : 1,
                    transform: menuOpen
                      ? i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                      : i === 2 ? 'rotate(-45deg) translate(3px, -3px)'
                      : 'none'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/5"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-mono text-xs tracking-widest uppercase text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <span className="text-purple-500 mr-2">&gt;</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}