'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Blocks,
  MousePointer2,
  Sparkles,
  Terminal,
  TowerControl,
  Wrench,
} from 'lucide-react'
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

const BUILD_BLOCKS = [
  { label: 'UX', className: 'left-[12%] bottom-[21%] w-[28%]', delay: 0, color: 'from-sky-400/55 to-blue-500/20' },
  { label: 'API', className: 'left-[41%] bottom-[21%] w-[24%]', delay: 0.45, color: 'from-blue-400/55 to-indigo-500/20' },
  { label: 'DB', className: 'left-[66%] bottom-[21%] w-[20%]', delay: 0.9, color: 'from-cyan-300/50 to-sky-500/20' },
  { label: 'UI', className: 'left-[18%] bottom-[34%] w-[22%]', delay: 1.35, color: 'from-indigo-300/55 to-blue-500/20' },
  { label: 'SEO', className: 'left-[42%] bottom-[34%] w-[28%]', delay: 1.8, color: 'from-sky-300/55 to-cyan-500/20' },
  { label: 'GO', className: 'left-[32%] bottom-[47%] w-[27%]', delay: 2.25, color: 'from-blue-300/60 to-indigo-500/25' },
] as const

const TERMINAL_LINES = [
  { width: '72%', delay: 0 },
  { width: '48%', delay: 0.35 },
  { width: '64%', delay: 0.7 },
] as const

const scrollTo = (hash: string) =>
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })

function DigitalBuildScene() {
  return (
    <motion.div
      aria-hidden
      variants={itemVariants}
      whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className="relative mx-auto mt-12 w-full max-w-[540px] lg:mt-0"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute -inset-8 rounded-2xl bg-brand-primary/10 blur-3xl" />
      <div className="glass relative h-[390px] overflow-hidden rounded-2xl border-brand-primary/20 shadow-[0_28px_90px_rgba(0,0,0,0.45)] sm:h-[430px]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(96,165,250,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.09) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
        <motion.div
          className="absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-brand-glow/10 to-transparent"
          animate={{ x: ['-40%', '520%'] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-2xl border border-white/10 bg-bg-main/70 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-glow">
            <Wrench className="h-3.5 w-3.5" />
            Build ao vivo
          </div>
        </div>

        <div className="absolute left-7 top-24 h-[210px] w-24">
          <motion.div
            className="absolute left-1 top-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/15 text-brand-glow"
            animate={{ rotate: [-6, 6, -6], y: [0, -4, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TowerControl className="h-6 w-6" />
          </motion.div>
          <div className="absolute left-6 top-12 h-40 w-2 rounded-full bg-brand-primary/35" />
          <div className="absolute left-1 top-20 h-2 w-24 rounded-full bg-brand-primary/25" />
          <div className="absolute left-10 top-12 h-32 w-px rotate-[26deg] bg-brand-primary/25" />
        </div>

        <motion.div
          className="absolute left-[28%] top-[25%] z-20"
          animate={{ x: ['-8%', '72%', '22%', '86%', '-8%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="mx-auto w-px bg-brand-glow/70"
            animate={{ height: [46, 78, 54, 84, 46] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="flex h-12 w-20 items-center justify-center rounded-xl border border-brand-glow/40 bg-bg-card/95 text-sm font-black text-slate-100 shadow-[0_0_28px_rgba(96,165,250,0.35)]"
            animate={{ rotate: [-2, 3, -4, 2, -2], y: [0, 10, 0, 14, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Blocks className="mr-1.5 h-4 w-4 text-brand-glow" />
            APP
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-8 bottom-14 h-3 rounded-full bg-slate-950/90 shadow-[0_-10px_32px_rgba(59,130,246,0.18)]">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-brand-primary/20 via-brand-glow/60 to-brand-primary/20"
            animate={{ x: ['-20%', '90%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            style={{ width: '36%' }}
          />
        </div>

        {BUILD_BLOCKS.map((block) => (
          <motion.div
            key={block.label}
            className={`absolute h-12 rounded-2xl border border-white/10 bg-linear-to-br ${block.color} px-3 text-sm font-black text-white shadow-[0_18px_34px_rgba(0,0,0,0.35)] backdrop-blur-sm ${block.className}`}
            animate={{
              opacity: [0, 1, 1, 0.35, 1],
              y: [22, 0, 0, -4, 0],
              scale: [0.86, 1, 1, 0.98, 1],
            }}
            transition={{
              duration: 6.4,
              delay: block.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="flex h-full items-center justify-center">{block.label}</span>
          </motion.div>
        ))}

        <motion.div
          className="absolute right-6 top-[32%] w-[38%] rounded-2xl border border-brand-primary/20 bg-slate-950/75 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-brand-glow">
            <Terminal className="h-4 w-4" />
            deploy
          </div>
          <div className="space-y-2">
            {TERMINAL_LINES.map((line) => (
              <motion.div
                key={line.width}
                className="h-2 rounded-full bg-brand-glow/55"
                style={{ width: line.width }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, delay: line.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[28%] right-[18%] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_0_24px_rgba(96,165,250,0.3)] backdrop-blur-md"
          animate={{ x: [0, -28, 12, 0], y: [0, 16, -8, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MousePointer2 className="h-5 w-5" />
        </motion.div>

        <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
          <span>briefing</span>
          <span>protótipo</span>
          <span>código</span>
          <span className="text-brand-glow">online</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const bgY = useTransform(scrollYProgress, [0, 0.4], ['0%', '30%'])

  return (
    <motion.section
      style={{ backgroundPositionY: bgY }}
      className="relative min-h-screen overflow-hidden hero-grid px-6 pt-28 pb-20 lg:flex lg:items-center lg:pt-20"
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
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]"
      >
        <motion.div className="text-center lg:text-left">
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
            className="text-4xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
          >
            Construímos sistemas{' '}
            <br className="hidden sm:block" />
            que <span className="gradient-text">transformam</span>
            <br />
            negócios
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Soluções digitais sob medida para empresas que querem crescer
            com tecnologia de alta performance e design premium.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
            className="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto lg:mx-0"
          >
            {([
              { to: 50,   suffix: '+', label: 'Projetos Entregues' },
              { to: 99,   suffix: '%', label: 'Satisfação' },
              { to: null, display: '24/7', label: 'Suporte' },
            ] as const).map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
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

        <DigitalBuildScene />
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
