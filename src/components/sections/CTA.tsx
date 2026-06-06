'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket, ChevronDown, Zap, Star } from 'lucide-react'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import Button from '@/components/ui/Button'

// ─── Stagger Variants ──────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─── Floating Stars ────────────────────────────────────────────────
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}))

// ─── Exhaust Particles (rocket flame) ──────────────────────────────
const EXHAUST_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  angle: (Math.random() - 0.5) * 60,
  dist: 20 + Math.random() * 40,
  size: 3 + Math.random() * 5,
  delay: i * 0.08,
  color: ['#F59E0B', '#FB923C', '#F97316', '#3B82F6', '#60A5FA'][i % 5],
}))

// ─── Spark Particles (launch burst) ───────────────────────────────
const SPARK_PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  angle: (i / 24) * 360,
  dist: 40 + (i % 5) * 25,
  size: 2 + (i % 3) * 2,
  delay: i * 0.025,
  color: ['#3B82F6', '#60A5FA', '#818CF8', '#F59E0B', '#34D399'][i % 5],
}))

// ─── LaunchPadScene ────────────────────────────────────────────────
function LaunchPadScene() {
  return (
    <div className="relative w-full h-[340px] sm:h-[420px] rounded-2xl overflow-hidden
                    border border-white/10 bg-bg-main/70">
      {/* Grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.06) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Scan line */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-brand-glow/8 to-transparent"
        animate={{ x: ['-40%', '520%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stars twinkling */}
      {STARS.map(star => (
        <motion.div
          key={star.id}
          aria-hidden
          className="absolute rounded-full bg-white"
          style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Launch pad (bottom center) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-700/80 rounded-t-sm" />
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-48 h-3 bg-slate-600/60 rounded-t-sm" />

      {/* Support arms (left) */}
      <motion.div
        className="absolute bottom-2 left-[calc(50%-50px)] w-1 h-16 bg-slate-500/50 origin-bottom"
        animate={{ rotate: [0, -12, 0] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Support arms (right) */}
      <motion.div
        className="absolute bottom-2 right-[calc(50%-50px)] w-1 h-16 bg-slate-500/50 origin-bottom"
        animate={{ rotate: [0, 12, 0] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rocket body */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: '6%' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Nose cone */}
        <div className="mx-auto w-6 h-10 bg-gradient-to-b from-brand-glow to-brand-primary rounded-t-full relative">
          {/* Nose tip glow */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-glow shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
        </div>

        {/* Body */}
        <div className="w-8 h-16 mx-auto bg-gradient-to-b from-slate-700 to-slate-800 border-x border-slate-600/50 relative">
          {/* Window */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-glow/80 border border-brand-primary/60 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
          {/* Stripe */}
          <div className="absolute top-8 inset-x-0 h-1 bg-brand-primary/40" />
        </div>

        {/* Fins */}
        <div className="flex justify-between -mx-2 h-8">
          <div className="w-4 h-8 bg-gradient-to-br from-brand-primary/80 to-brand-primary/40 rounded-bl-lg skew-x-[-12deg]" />
          <div className="flex-1" />
          <div className="w-4 h-8 bg-gradient-to-bl from-brand-primary/80 to-brand-primary/40 rounded-br-lg skew-x-[12deg]" />
        </div>

        {/* Engine nozzle */}
        <div className="mx-auto w-6 h-3 bg-slate-900 rounded-b-full border-x border-slate-700/50" />

        {/* Exhaust flame */}
        <div className="flex flex-col items-center">
          {/* Core flame */}
          <motion.div
            className="w-3 h-20 bg-gradient-to-b from-yellow-300/90 via-orange-400/70 to-transparent rounded-b-full animate-flicker"
            animate={{ scaleY: [0.85, 1.15, 0.85], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Outer flame glow */}
          <motion.div
            className="absolute -bottom-12 w-8 h-28 bg-gradient-to-b from-orange-500/40 via-red-500/20 to-transparent rounded-b-full blur-sm"
            animate={{ scaleY: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />
        </div>
      </motion.div>

      {/* Exhaust particles flying out */}
      {EXHAUST_PARTICLES.map(p => (
        <motion.div
          key={p.id}
          aria-hidden
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            bottom: '4%',
            left: '50%',
            boxShadow: `0 0 4px ${p.color}`,
          }}
          animate={{
            y: [0, -60 - p.dist, -120 - p.dist * 2],
            x: [0, Math.sin((p.angle * Math.PI) / 180) * p.dist, Math.sin((p.angle * Math.PI) / 180) * p.dist * 1.5],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{ duration: 1.2, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* Ambient glow at bottom (launch pad light) */}
      <div
        aria-hidden
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.35) 0%, rgba(249,115,22,0.15) 40%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* "LAUNCH" status indicator */}
      <motion.div
        className="absolute top-3 left-3 flex items-center gap-1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
        <span className="text-[10px] font-mono text-emerald-400/80 tracking-widest uppercase">Ready</span>
      </motion.div>

      {/* Altitude indicator (top right) */}
      <div className="absolute top-3 right-3 text-[10px] font-mono text-brand-glow/50">
        ALT: <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>────</motion.span>
      </div>
    </div>
  )
}

// ─── BurstRing — expanding glow ring on button hover ──────────────
function BurstRing() {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 rounded-2xl border-2 border-brand-primary/30"
      animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

// ─── CTA Section ──────────────────────────────────────────────────
export default function CTA() {
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative py-24 sm:py-32 px-6 overflow-hidden bg-bg-secondary">
      {/* Deep background nebula glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 60% 50% at 70% 70%, rgba(129,140,248,0.06) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 50%)',
        }}
      />

      {/* Content — staggered entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + CTA */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <span className="glass border border-brand-primary/30 text-brand-glow text-xs font-semibold
                               px-4 py-2 rounded-full flex items-center gap-2 uppercase tracking-widest">
                <Zap className="w-3 h-3" />
                Pronto para decolar
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants}>
              <AnimatedHeading
                text="Pronto para transformar seu negócio?"
                highlightWords={['transformar']}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 justify-center lg:justify-start"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Vamos construir juntos a solução digital que sua empresa precisa.
              Entre em contato e receba uma proposta personalizada.
            </motion.p>

            {/* CTA Button with burst ring */}
            <motion.div variants={itemVariants} className="relative inline-flex">
              <BurstRing />
              <Button
                variant="primary"
                size="lg"
                magnetic
                onClick={scrollToContact}
                className="animate-glow-pulse shadow-[0_0_30px_rgba(59,130,246,0.4)] px-10 py-4 text-lg rounded-2xl gap-3"
              >
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Social proof micro-line */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xs text-text-muted flex items-center gap-2 justify-center lg:justify-start"
            >
              <Star className="w-3 h-3 text-yellow-500" />
              <Star className="w-3 h-3 text-yellow-500" />
              <Star className="w-3 h-3 text-yellow-500" />
              <Star className="w-3 h-3 text-yellow-500" />
              <Star className="w-3 h-3 text-yellow-500" />
              <span>+50 projetos entregues com excelência</span>
            </motion.p>
          </div>

          {/* Right: LaunchPad Scene */}
          <motion.div variants={itemVariants}>
            <LaunchPadScene />
          </motion.div>
        </div>

        {/* Directional chevrons pointing down to form */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="w-6 h-6 text-brand-glow" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── CTABeam — luminous connector between CTA and ContactForm ─────
export function CTABeam() {
  return (
    <div
      aria-hidden
      className="relative h-20 w-full flex items-start justify-center overflow-hidden bg-bg-secondary"
    >
      {/* Beam line */}
      <motion.div
        className="w-[2px] h-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(59,130,246,0.5) 0%, rgba(96,165,250,0.2) 50%, transparent 100%)',
          boxShadow: '0 0 12px 2px rgba(59,130,246,0.2), 0 0 24px 4px rgba(96,165,250,0.08)',
        }}
        animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Traveling pulse dot */}
      <motion.div
        className="absolute top-0 w-2 h-2 rounded-full bg-brand-glow"
        animate={{ y: [0, 72, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 8px 2px rgba(96,165,250,0.5)' }}
      />
      {/* Secondary slower pulse */}
      <motion.div
        className="absolute top-0 w-1.5 h-1.5 rounded-full bg-brand-primary"
        animate={{ y: [0, 72, 0], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.8, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ boxShadow: '0 0 6px 1px rgba(59,130,246,0.4)' }}
      />
    </div>
  )
}
