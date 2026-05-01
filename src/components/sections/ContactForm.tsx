'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'
import Button from '@/components/ui/Button'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import { cn } from '@/lib/utils'

interface FormState {
  nome: string
  email: string
  telefone: string
  mensagem: string
}

interface FieldError {
  nome?: string
  email?: string
  telefone?: string
  mensagem?: string
}

function validate(form: FormState): FieldError {
  const errors: FieldError = {}
  if (!form.nome.trim())
    errors.nome = 'Nome é obrigatório'
  if (!form.email.trim())
    errors.email = 'Email é obrigatório'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Email inválido'
  if (!form.telefone.trim())
    errors.telefone = 'Telefone é obrigatório'
  else if (!/^[\d\s\+\-\(\)]{9,}$/.test(form.telefone))
    errors.telefone = 'Telefone inválido'
  if (!form.mensagem.trim())
    errors.mensagem = 'Mensagem é obrigatória'
  else if (form.mensagem.trim().length < 20)
    errors.mensagem = 'Mensagem deve ter pelo menos 20 caracteres'
  return errors
}

const FIELDS = [
  { name: 'nome'     as const, label: 'Nome',     icon: User,  type: 'text',  placeholder: 'Seu nome completo',  autoComplete: 'name' },
  { name: 'email'    as const, label: 'Email',    icon: Mail,  type: 'email', placeholder: 'seu@email.com',      autoComplete: 'email' },
  { name: 'telefone' as const, label: 'Telefone', icon: Phone, type: 'tel',   placeholder: '(11) 99999-9999',    autoComplete: 'tel' },
]

const CONTACT_PILLARS = [
  {
    title: 'Direção criativa sob medida',
    description: 'Transformamos ideia em experiência visual com identidade forte para sua marca.',
    icon: MessageSquare,
  },
  {
    title: 'Tecnologia focada em conversão',
    description: 'Design e performance trabalham juntos para gerar resultados reais.',
    icon: Send,
  },
  {
    title: 'Retorno rápido e transparente',
    description: 'Você fala com quem constrói: sem ruído, sem repasse, com objetividade.',
    icon: CheckCircle2,
  },
] as const

export default function ContactForm() {
  const [form,    setForm]    = useState<FormState>({ nome: '', email: '', telefone: '', mensagem: '' })
  const [errors,  setErrors]  = useState<FieldError>({})
  const [loading, setLoading] = useState(false)
  const [status,  setStatus]  = useState<'idle' | 'success' | 'error' | 'unavailable'>('idle')

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setStatus('idle')
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        setStatus(res.status === 503 ? 'unavailable' : 'error')
        return
      }

      setStatus('success')
      setForm({ nome: '', email: '', telefone: '', mensagem: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionWrapper id="contact" className="bg-bg-main">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-10 lg:mb-12">
          <p className="text-brand-glow text-sm font-semibold uppercase tracking-widest mb-3">
            Entre em contato
          </p>
          <AnimatedHeading
            text="Vamos criar algo memorável para sua marca"
            highlightWords={['MaximWeb']}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          />
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Uma conversa já pode destravar o próximo salto do seu negócio. Conte seu contexto e desenhamos
            o melhor caminho juntos.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass relative overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10 border border-border-subtle"
          style={{ boxShadow: '0 0 65px rgba(59,130,246,0.1)' }}
        >
          <div className="absolute -top-20 -left-16 h-48 w-48 rounded-full bg-brand-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.12fr] lg:gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-2 text-xs font-semibold tracking-wider text-brand-glow uppercase">
                Sprint criativo e estratégico
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                Seu próximo projeto pode começar com uma mensagem de 1 minuto.
              </h3>

              <p className="text-text-muted leading-relaxed max-w-xl">
                Compartilhe seu desafio, objetivos e momento atual. A partir disso, desenhamos uma proposta
                com visão de marca, experiência e tecnologia.
              </p>

              <div className="space-y-3.5">
                {CONTACT_PILLARS.map(({ title, description, icon: Icon }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="rounded-2xl border border-border-subtle/80 bg-slate-900/35 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-glow">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{title}</p>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border-subtle/80 bg-slate-950/40 p-5 sm:p-6 lg:p-7">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center gap-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                  <h3 className="text-2xl font-bold">Mensagem enviada!</h3>
                  <p className="text-text-muted">Entraremos em contato em breve. Obrigado!</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-brand-glow hover:text-brand-primary transition-colors text-sm mt-2"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {FIELDS.slice(0, 2).map(({ name, label, icon: Icon, type, placeholder, autoComplete }) => (
                      <div key={name} className="flex flex-col gap-1.5">
                        <label htmlFor={name} className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-text-muted" />
                          {label}
                        </label>
                        <input
                          id={name}
                          type={type}
                          value={form[name]}
                          onChange={e => handleChange(name, e.target.value)}
                          placeholder={placeholder}
                          autoComplete={autoComplete}
                          className={cn(
                            'dark-input w-full px-4 py-3 rounded-xl text-sm',
                            errors[name] && 'border-red-500/60 focus:border-red-500'
                          )}
                        />
                        {errors[name] && (
                          <p className="text-red-400 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors[name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {FIELDS.slice(2).map(({ name, label, icon: Icon, type, placeholder, autoComplete }) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label htmlFor={name} className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-text-muted" />
                        {label}
                      </label>
                      <input
                        id={name}
                        type={type}
                        value={form[name]}
                        onChange={e => handleChange(name, e.target.value)}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        className={cn(
                          'dark-input w-full px-4 py-3 rounded-xl text-sm',
                          errors[name] && 'border-red-500/60 focus:border-red-500'
                        )}
                      />
                      {errors[name] && (
                        <p className="text-red-400 text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors[name]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensagem" className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-text-muted" />
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      rows={5}
                      value={form.mensagem}
                      onChange={e => handleChange('mensagem', e.target.value)}
                      placeholder="Descreva seu projeto, problema ou dúvida..."
                      className={cn(
                        'dark-input w-full px-4 py-3 rounded-xl text-sm resize-none',
                        errors.mensagem && 'border-red-500/60'
                      )}
                    />
                    {errors.mensagem && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.mensagem}
                      </p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Ocorreu um erro. Por favor, tente novamente.
                    </div>
                  )}
                  {status === 'unavailable' && (
                    <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      O envio de mensagens não está disponível no momento. Tente mais tarde ou use o email na seção de contato.
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-1">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={loading}
                      className="w-full"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                    <p className="text-center text-xs text-text-muted">
                      Retorno inicial em até 24h úteis.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
