/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black:   '#020206',
          dark:    '#080812',
          purple:  '#7c3aed',
          violet:  '#a855f7',
          pink:    '#ec4899',
          red:     '#ef4444',
          cyan:    '#06b6d4',
          glow:    '#c026d3',
        },
      },
      fontFamily: {
        mono:   ['JetBrains Mono', 'Fira Code', 'monospace'],
        display:['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'scanline':     'scanline 8s linear infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'border-run':   'borderRun 3s linear infinite',
        'typing':       'typing 3.5s steps(40, end)',
        'blink':        'blink 1s step-end infinite',
        'gradient-x':   'gradientX 4s ease infinite',
        'flicker':      'flicker 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.4)' },
          '50%':      { boxShadow: '0 0 40px rgba(168,85,247,0.8), 0 0 80px rgba(168,85,247,0.3)' },
        },
        borderRun: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 1 },
          '20%, 24%, 55%':                           { opacity: 0.4 },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}