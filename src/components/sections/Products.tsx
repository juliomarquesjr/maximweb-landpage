'use client'

import { ShoppingBag, Bus, UtensilsCrossed, Car } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'
import GlowCard from '@/components/ui/GlowCard'
import AnimatedHeading from '@/components/ui/AnimatedHeading'

const PRODUCTS = [
  {
    icon: ShoppingBag,
    title: 'Loja em Shopping',
    tag: 'E-commerce',
    description:
      'Plataforma completa para lojistas em shoppings gerenciarem vendas, ' +
      'estoque e atendimento em um único lugar.',
    glowColor: 'rgba(59,130,246,0.35)',
    iconBg: 'rgba(59,130,246,0.12)',
    iconBorder: 'rgba(59,130,246,0.25)',
  },
  {
    icon: Bus,
    title: 'Transporte Escolar',
    tag: 'Mobilidade',
    description:
      'Sistema de gerenciamento de rotas, alunos, motoristas e ' +
      'comunicação com responsáveis em tempo real.',
    glowColor: 'rgba(16,185,129,0.3)',
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.25)',
  },
  {
    icon: UtensilsCrossed,
    title: 'Pedidos para Lanchonetes',
    tag: 'Food Tech',
    description:
      'App de pedidos com cardápio digital, gestão de filas, ' +
      'impressão automática e relatórios de vendas.',
    glowColor: 'rgba(245,158,11,0.3)',
    iconBg: 'rgba(245,158,11,0.12)',
    iconBorder: 'rgba(245,158,11,0.25)',
  },
  {
    icon: Car,
    title: 'Agendamento para Lavagens',
    tag: 'Serviços',
    description:
      'Sistema de agendamento online para lava-jatos com controle de ' +
      'horários, serviços, pagamentos e fidelização.',
    glowColor: 'rgba(139,92,246,0.3)',
    iconBg: 'rgba(139,92,246,0.12)',
    iconBorder: 'rgba(139,92,246,0.25)',
  },
]

export default function Products() {
  return (
    <SectionWrapper id="products" className="bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-brand-glow text-sm font-semibold uppercase tracking-widest mb-3">
            Portfólio
          </p>
          <AnimatedHeading
            text="Nossos Produtos"
            highlightWords={['Produtos']}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          />
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Sistemas prontos e customizáveis para segmentos específicos do mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map(({ icon: Icon, title, tag, description, glowColor, iconBg, iconBorder }) => (
            <GlowCard key={title} glowColor={glowColor} className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
                >
                  <Icon className="w-6 h-6 text-brand-glow" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted
                                 bg-white/5 border border-border-subtle px-2 py-1 rounded-full">
                  {tag}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{description}</p>
              </div>
              <button className="mt-auto text-sm text-brand-glow hover:text-brand-primary
                                 transition-colors duration-200 flex items-center gap-1 group w-fit">
                Saiba mais
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </GlowCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
