'use client'

import { Code2, Bot, Puzzle } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'
import GlowCard from '@/components/ui/GlowCard'

const SERVICES = [
  {
    icon: Code2,
    title: 'Desenvolvimento de Sistemas',
    description:
      'Criamos aplicações web e mobile robustas, escaláveis e de alta performance, ' +
      'utilizando as tecnologias mais modernas do mercado.',
    features: ['Next.js & React', 'APIs RESTful', 'Banco de dados', 'Deploy & CI/CD'],
  },
  {
    icon: Bot,
    title: 'Automação de Processos',
    description:
      'Eliminamos tarefas repetitivas e otimizamos fluxos de trabalho, ' +
      'liberando sua equipe para o que realmente importa.',
    features: ['Automação de vendas', 'Integração de sistemas', 'Bots & IA', 'Workflows'],
  },
  {
    icon: Puzzle,
    title: 'Soluções Personalizadas',
    description:
      'Cada negócio é único. Desenvolvemos soluções sob medida ' +
      'que se encaixam perfeitamente nas suas necessidades.',
    features: ['Consultoria técnica', 'Arquitetura customizada', 'Integrações', 'Manutenção'],
  },
]

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-bg-main">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-brand-glow text-sm font-semibold uppercase tracking-widest mb-3">
            O que fazemos
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Nossos <span className="gradient-text">Serviços</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Soluções completas para levar seu negócio ao próximo nível.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, description, features }) => (
            <GlowCard key={title} className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20
                              flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-brand-glow" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{description}</p>
              </div>
              <ul className="space-y-2 mt-auto">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
