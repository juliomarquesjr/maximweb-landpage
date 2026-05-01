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
      <div className="max-w-2xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="text-brand-glow text-sm font-semibold uppercase tracking-widest mb-3">
            Entre em contato
          </p>
          <AnimatedHeading
            text="Fale com a MaximWeb"
            highlightWords={['MaximWeb']}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          />
          <p className="text-text-muted text-lg max-w-md mx-auto">
            Conte-nos sobre seu projeto e entraremos em contato em até 24 horas.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-3xl p-8 border border-border-subtle"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.06)' }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-12 gap-4"
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
              {FIELDS.map(({ name, label, icon: Icon, type, placeholder, autoComplete }) => (
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

              {/* Textarea */}
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

              {/* Error banner */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10
                                border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Ocorreu um erro. Por favor, tente novamente.
                </div>
              )}
              {status === 'unavailable' && (
                <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-500/10
                                border border-amber-500/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  O envio de mensagens não está disponível no momento. Tente mais tarde ou use o email
                  na seção de contato.
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-2"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
