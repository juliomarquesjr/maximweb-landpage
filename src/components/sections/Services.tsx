'use client'

import {
  Bot,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Mail,
  MousePointer2,
  Puzzle,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'
import GlowCard from '@/components/ui/GlowCard'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import { cn } from '@/lib/utils'

const SERVICES = [
  {
    icon: Code2,
    scene: SystemScene,
    eyebrow: 'Produto digital',
    title: 'Desenvolvimento de Sistemas',
    description:
      'Criamos aplicações web e mobile robustas, escaláveis e de alta performance, ' +
      'utilizando as tecnologias mais modernas do mercado.',
    features: ['Next.js & React', 'APIs RESTful', 'Banco de dados', 'Deploy & CI/CD'],
    glowColor: 'rgba(96,165,250,0.40)',
    accent: 'from-sky-400/80 via-blue-500/45 to-cyan-300/70',
  },
  {
    icon: Bot,
    scene: AutomationScene,
    eyebrow: 'Fluxos inteligentes',
    title: 'Automação de Processos',
    description:
      'Eliminamos tarefas repetitivas e otimizamos fluxos de trabalho, ' +
      'liberando sua equipe para o que realmente importa.',
    features: ['Automação de vendas', 'Integração de sistemas', 'Bots & IA', 'Workflows'],
    glowColor: 'rgba(34,211,238,0.34)',
    accent: 'from-cyan-300/80 via-sky-500/45 to-blue-400/70',
  },
  {
    icon: Puzzle,
    scene: CustomScene,
    eyebrow: 'Sob medida',
    title: 'Soluções Personalizadas',
    description:
      'Cada negócio é único. Desenvolvemos soluções sob medida ' +
      'que se encaixam perfeitamente nas suas necessidades.',
    features: ['Consultoria técnica', 'Arquitetura customizada', 'Integrações', 'Manutenção'],
    glowColor: 'rgba(129,140,248,0.38)',
    accent: 'from-indigo-300/80 via-blue-500/45 to-sky-300/70',
  },
]

interface SceneProps {
  accent: string
}

function SceneShell({ children, accent }: SceneProps & { children: ReactNode }) {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-bg-main/70 p-4">
      <div className={cn('absolute inset-x-4 top-0 h-px bg-linear-to-r', accent)} />
      <div
        aria-hidden
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 w-20 bg-linear-to-r from-transparent via-brand-glow/10 to-transparent"
        animate={{ x: ['-40%', '420%'] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function SystemScene({ accent }: SceneProps) {
  return (
    <SceneShell accent={accent}>
      <div className="absolute left-0 top-0 h-full w-[46%] rounded-xl border border-white/10 bg-slate-950/80 p-3">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        {[70, 52, 82, 44, 64].map((width, index) => (
          <motion.div
            key={width}
            className="mb-2 h-2 rounded-full bg-brand-glow/55"
            style={{ width: `${width}%` }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.8, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="absolute right-0 top-3 h-[78%] w-[48%] rounded-xl border border-brand-primary/20 bg-white/[0.045] p-3 backdrop-blur-sm">
        <motion.div
          className={cn('mb-3 h-8 rounded-lg bg-linear-to-r', accent)}
          animate={{ scaleX: [0.82, 1, 0.9, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="h-9 rounded-lg border border-white/10 bg-bg-card/80"
              animate={{ y: [10, 0, 0], opacity: [0.35, 1, 1] }}
              transition={{ duration: 2.8, delay: item * 0.25, repeat: Infinity, repeatDelay: 1.4, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_0_24px_rgba(96,165,250,0.28)] backdrop-blur-sm"
        animate={{ x: [-16, 8, -8, -16], y: [8, -10, 4, 8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MousePointer2 className="h-4 w-4" />
      </motion.div>
    </SceneShell>
  )
}

function AutomationScene({ accent }: SceneProps) {
  const nodes = [
    { label: 'Lead', icon: Workflow, className: 'left-1 top-12' },
    { label: 'CRM', icon: Database, className: 'left-[38%] top-3' },
    { label: 'Email', icon: Mail, className: 'right-1 top-12' },
    { label: 'Relatório', icon: FileText, className: 'left-[34%] bottom-2' },
  ]

  return (
    <SceneShell accent={accent}>
      <div className="absolute left-[18%] top-[37%] h-px w-[32%] rotate-[-18deg] bg-brand-primary/35" />
      <div className="absolute right-[18%] top-[37%] h-px w-[32%] rotate-[18deg] bg-brand-primary/35" />
      <div className="absolute left-[40%] bottom-[29%] h-px w-[25%] rotate-[-35deg] bg-brand-primary/35" />
      <div className="absolute left-[35%] top-[47%] h-px w-[28%] rotate-[34deg] bg-brand-primary/35" />

      <motion.div
        className={cn('absolute h-3 w-3 rounded-full bg-linear-to-br shadow-[0_0_22px_rgba(96,165,250,0.65)]', accent)}
        animate={{
          left: ['18%', '44%', '78%', '45%', '18%'],
          top: ['46%', '20%', '46%', '78%', '46%'],
        }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {nodes.map(({ label, icon: Icon, className }, index) => (
        <motion.div
          key={label}
          className={cn('absolute flex min-w-24 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur-sm', className)}
          animate={{ y: [0, -5, 0], borderColor: ['rgba(255,255,255,0.10)', 'rgba(96,165,250,0.34)', 'rgba(255,255,255,0.10)'] }}
          transition={{ duration: 3, delay: index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="h-4 w-4 text-brand-glow" />
          {label}
        </motion.div>
      ))}
    </SceneShell>
  )
}

function CustomScene({ accent }: SceneProps) {
  const pieces = [
    { label: 'ERP', className: 'left-2 top-3', move: { x: [0, 18, 10, 0], y: [0, 20, 12, 0], rotate: [-5, 0, -2, -5] } },
    { label: 'Site', className: 'right-3 top-5', move: { x: [0, -20, -8, 0], y: [0, 18, 10, 0], rotate: [6, 0, 3, 6] } },
    { label: 'App', className: 'left-7 bottom-4', move: { x: [0, 22, 12, 0], y: [0, -16, -8, 0], rotate: [4, 0, 2, 4] } },
    { label: 'IA', className: 'right-8 bottom-3', move: { x: [0, -18, -10, 0], y: [0, -18, -9, 0], rotate: [-4, 0, -1, -4] } },
  ]

  return (
    <SceneShell accent={accent}>
      <motion.div
        className="absolute left-1/2 top-1/2 flex h-24 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-dashed border-brand-primary/35 bg-brand-primary/10 text-xs font-semibold uppercase tracking-[0.18em] text-brand-glow"
        animate={{ boxShadow: ['0 0 0 rgba(96,165,250,0)', '0 0 32px rgba(96,165,250,0.22)', '0 0 0 rgba(96,165,250,0)'] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        Sob medida
      </motion.div>

      {pieces.map(({ label, className, move }, index) => (
        <motion.div
          key={label}
          className={cn('absolute flex h-12 w-20 items-center justify-center rounded-xl border border-white/10 bg-bg-card/90 text-sm font-black text-white shadow-[0_16px_34px_rgba(0,0,0,0.35)]', className)}
          animate={move}
          transition={{ duration: 4.8, delay: index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
        >
          {label}
        </motion.div>
      ))}

      <motion.div
        className={cn('absolute left-[42%] top-[42%] h-9 w-9 rounded-xl bg-linear-to-br', accent)}
        animate={{ rotate: [0, 90, 180, 270, 360], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </SceneShell>
  )
}

export default function Services() {
  return (
    <SectionWrapper id="services" className="relative overflow-hidden bg-bg-main">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[520px] w-[min(900px,92vw)] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(14,165,233,0.12) 38%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-glow">
            <Sparkles className="h-3.5 w-3.5" />
            O que fazemos
          </div>
          <AnimatedHeading
            text="Nossos Serviços"
            highlightWords={['Serviços']}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          />
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Soluções completas para levar seu negócio ao próximo nível.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, scene: Scene, eyebrow, title, description, features, glowColor, accent }, index) => (
            <GlowCard
              key={title}
              glowColor={glowColor}
              className="min-h-[520px] overflow-hidden p-0"
            >
              <div className="relative flex h-full flex-col gap-6 p-5 sm:p-6">
                <Scene accent={accent} />

                <div className="flex items-start gap-4">
                  <motion.div
                    className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-glow"
                    animate={{ y: [0, -3, 0], rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 3.5, delay: index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="absolute inset-0 rounded-2xl bg-brand-primary/15 blur-xl" />
                    <Icon className="relative h-6 w-6" />
                  </motion.div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-glow">
                      {eyebrow}
                    </p>
                    <h3 className="text-xl font-bold leading-tight">{title}</h3>
                  </div>
                </div>

                <p className="text-text-muted text-sm leading-relaxed">{description}</p>

                <ul className="mt-auto grid gap-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2 text-sm text-slate-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-glow" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
