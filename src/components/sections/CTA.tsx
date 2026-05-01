'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Rocket } from 'lucide-react'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import Button from '@/components/ui/Button'

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

        <AnimatedHeading
          text="Pronto para transformar seu negócio?"
          highlightWords={['transformar']}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
        />

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Vamos construir juntos a solução digital que sua empresa precisa.
          Entre em contato e receba uma proposta personalizada.
        </p>

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
    </section>
  )
}
