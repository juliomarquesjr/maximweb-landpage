'use client'

import { forwardRef, useRef, ButtonHTMLAttributes } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop'
  | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  magnetic?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      magnetic = false,
      className,
      children,
      disabled,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 300, damping: 20 })
    const springY = useSpring(y, { stiffness: 300, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (magnetic && innerRef.current) {
        const rect = innerRef.current.getBoundingClientRect()
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25)
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25)
      }
      onMouseMove?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      x.set(0)
      y.set(0)
      onMouseLeave?.(e)
    }

    const base =
      'relative inline-flex items-center justify-center font-semibold rounded-xl ' +
      'transition-all duration-200 focus-ring select-none overflow-hidden ' +
      'disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'btn-gradient text-white shadow-lg',
      secondary:
        'glass border border-brand-primary/30 text-brand-glow hover:border-brand-primary ' +
        'hover:bg-brand-primary/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
      ghost:
        'text-text-muted hover:text-slate-200 hover:bg-white/5',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <motion.button
        ref={(node) => {
          innerRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
        }}
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        )}
        <span className={cn('inline-flex items-center justify-center', loading && 'invisible')}>
          {children}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button
