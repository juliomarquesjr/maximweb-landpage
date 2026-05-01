'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Serviços',     href: '#services' },
  { label: 'Produtos',     href: '#products' },
  { label: 'Diferenciais', href: '#differentials' },
  { label: 'Contato',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const scrollTo = (hash: string) => {
    setMobileOpen(false)
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass border-b border-border-subtle shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 h-[2px] z-60 origin-left
                   bg-gradient-to-r from-brand-primary via-brand-glow to-[#818CF8]"
      />

      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group focus-ring rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center
                          group-hover:shadow-[0_0_16px_rgba(59,130,246,0.6)] transition-shadow duration-300">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Maxim<span className="text-brand-glow">Web</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="relative px-4 py-2 text-sm text-slate-400 hover:text-slate-100
                           transition-colors duration-200 rounded-lg group focus-ring"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px]
                                 bg-brand-primary rounded-full transition-all duration-300
                                 group-hover:w-3/4" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => scrollTo('#contact')}
          >
            Fale Conosco
          </Button>

          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100
                       hover:bg-white/5 transition-colors focus-ring"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden glass border-t border-border-subtle overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => scrollTo(href)}
                    className="block px-4 py-3 rounded-lg text-slate-300 hover:text-white
                               hover:bg-white/5 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => scrollTo('#contact')}
                >
                  Fale Conosco
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
