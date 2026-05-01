'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'

export default function CTA() {
  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-bg-secondary">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[600px] h-[300px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.7) 0%, transparent 70%)',
            filter: 'blur(48px)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/30
                        flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-7 h-7 text-brand-glow" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Pronto para{' '}
          <span className="gradient-text">transformar</span>
          <br />
          seu negócio?
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Vamos construir juntos a solução digital que sua empresa precisa.
          Entre em contato e receba uma proposta personalizada.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToContact}
          className="animate-glow-pulse btn-gradient text-white font-bold text-lg
                     px-10 py-4 rounded-2xl inline-flex items-center gap-3
                     shadow-[0_0_30px_rgba(59,130,246,0.4)]"
        >
          Começar agora
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  )
}
