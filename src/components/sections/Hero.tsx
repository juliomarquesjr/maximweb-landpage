'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import CountUp from '@/components/ui/CountUp'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const ORBS = [
  { w: 500, h: 500, top: '10%',  left: '-5%',   color: 'rgba(59,130,246,0.12)',  delay: '0s',   blur: 80 },
  { w: 350, h: 350, top: '60%',  right: '-8%',  color: 'rgba(129,140,248,0.10)', delay: '1.4s', blur: 60 },
  { w: 280, h: 280, top: '30%',  right: '15%',  color: 'rgba(96,165,250,0.08)',  delay: '0.7s', blur: 50 },
  { w: 200, h: 200, top: '75%',  left: '20%',   color: 'rgba(139,92,246,0.07)',  delay: '2.1s', blur: 40 },
] as const

const scrollTo = (hash: string) =>
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.4], ['0%', '30%'])

  return (
    <motion.section
      style={{ backgroundPositionY: bgY }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-grid px-6 pt-16"
    >

      {/* Floating ambient orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full animate-float"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: 'left' in orb ? orb.left : undefined,
            right: 'right' in orb ? orb.right : undefined,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.blur}px)`,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Radial glow — center */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.15) 45%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Secondary accent — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-10 w-64 h-64 opacity-15 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.8) 0%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex mb-6">
          <span className="glass border border-brand-primary/30 text-brand-glow text-xs font-semibold
                           px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Soluções Digitais Premium
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
        >
          Desenvolvemos sistemas{' '}
          <br className="hidden sm:block" />
          que <span className="gradient-text">transformam</span>
          <br />
          negócios
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Soluções digitais sob medida para empresas que querem crescer
          com tecnologia de alta performance e design premium.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" magnetic onClick={() => scrollTo('#contact')}>
            Solicitar Orçamento
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => scrollTo('#services')}>
            Ver Soluções
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {([
            { to: 50,   suffix: '+', label: 'Projetos Entregues' },
            { to: 99,   suffix: '%', label: 'Satisfação' },
            { to: null, display: '24/7', label: 'Suporte' },
          ] as const).map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {'to' in stat && stat.to !== null
                  ? <CountUp to={stat.to} suffix={stat.suffix} />
                  : stat.display}
              </div>
              <div className="text-xs text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-xs text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8"
          style={{ background: 'linear-gradient(to bottom, #3B82F6, transparent)' }}
        />
      </motion.div>
    </motion.section>
  )
}
