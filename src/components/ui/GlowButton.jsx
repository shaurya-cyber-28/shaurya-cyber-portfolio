import { useMagneticButton } from '../../hooks/useMagneticButton'

export default function GlowButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...props
}) {
  const { ref, handleMouseMove, handleMouseLeave, handleMouseEnter } = useMagneticButton(0.3)

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  }

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)',
      boxShadow: '0 0 20px rgba(168,85,247,0.4)',
      border: 'none',
      color: '#fff',
    },
    outline: {
      background: 'transparent',
      boxShadow: '0 0 15px rgba(168,85,247,0.2)',
      border: '1px solid rgba(168,85,247,0.5)',
      color: '#a855f7',
    },
    danger: {
      background: 'linear-gradient(135deg, #dc2626, #ef4444)',
      boxShadow: '0 0 20px rgba(239,68,68,0.4)',
      border: 'none',
      color: '#fff',
    },
    ghost: {
      background: 'rgba(168,85,247,0.1)',
      boxShadow: 'none',
      border: '1px solid rgba(168,85,247,0.2)',
      color: '#a855f7',
    },
    cyan: {
      background: 'linear-gradient(135deg, #0891b2, #06b6d4)',
      boxShadow: '0 0 20px rgba(6,182,212,0.4)',
      border: 'none',
      color: '#fff',
    }
  }

  const style = variants[variant] || variants.primary

  return (
    <div
      ref={ref}
      className="magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button
        onClick={onClick}
        className={`
          relative inline-flex items-center gap-2 font-semibold rounded-lg
          font-mono tracking-wider uppercase transition-all duration-300
          overflow-hidden group
          ${sizes[size]} ${className}
        `}
        style={{
          background:  style.background,
          boxShadow:   style.boxShadow,
          border:      style.border,
          color:       style.color,
          backgroundSize: '200% 200%',
          animation: variant === 'primary' ? 'gradientX 3s ease infinite' : undefined,
        }}
        {...props}
      >
        {/* Shine sweep */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'skewX(-20deg)',
          }}
        />
        {icon && <span className="text-lg">{icon}</span>}
        <span className="relative z-10">{children}</span>
      </button>
    </div>
  )
}