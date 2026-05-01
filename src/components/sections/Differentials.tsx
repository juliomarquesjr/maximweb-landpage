'use client'

import { Zap, TrendingUp, Palette, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'

const DIFFERENTIALS = [
  {
    icon: Zap,
    title: 'Alta Performance',
    description:
      'Aplicações otimizadas para velocidade máxima, com scores 90+ no Lighthouse, ' +
      'garantindo a melhor experiência ao usuário.',
  },
  {
    icon: TrendingUp,
    title: 'Escalabilidade',
    description:
      'Arquitetura pensada para crescer com seu negócio. Do MVP ao produto ' +
      'enterprise, suportamos qualquer demanda.',
  },
  {
    icon: Palette,
    title: 'Design Moderno',
    description:
      'Interfaces premium que combinam estética e usabilidade, ' +
      'criando experiências digitais memoráveis.',
  },
  {
    icon: Headphones,
    title: 'Suporte Contínuo',
    description:
      'Acompanhamento pós-entrega, manutenção proativa e suporte técnico ' +
      'dedicado para manter tudo funcionando.',
  },
]

export default function Differentials() {
  return (
    <SectionWrapper id="differentials" className="bg-bg-main">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-brand-glow text-sm font-semibold uppercase tracking-widest mb-3">
            Por que nos escolher
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Nossos <span className="gradient-text">Diferenciais</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            O que nos torna a escolha certa para o seu próximo projeto digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIALS.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative p-6 rounded-2xl border border-border-subtle
                         bg-bg-card hover:border-brand-primary/40 transition-all duration-300
                         hover:shadow-[0_0_32px_rgba(59,130,246,0.12)]"
            >
              {/* Number indicator */}
              <span className="absolute top-4 right-4 text-3xl font-black text-white/[0.04]
                               group-hover:text-white/[0.07] transition-colors select-none">
                0{index + 1}
              </span>
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20
                              flex items-center justify-center mb-5
                              group-hover:bg-brand-primary/20 group-hover:border-brand-primary/40
                              transition-all duration-300">
                <Icon className="w-6 h-6 text-brand-glow" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-brand-glow transition-colors duration-300">
                {title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
