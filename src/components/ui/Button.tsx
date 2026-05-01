'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }, ref) => {
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
      <button
        ref={ref}
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
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
