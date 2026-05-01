'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, CheckCircle2, AlertCircle, User, Mail, Phone, MessageSquare,
  ArrowRight, ChevronLeft, Loader2,
} from 'lucide-react'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'
import AnimatedHeading from '@/components/ui/AnimatedHeading'
import { cn } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────
interface FormState {
  nome: string
  email: string
  telefone: string
  mensagem: string
}

// ─── Validation ──────────────────────────────────────────────────
function validateField(field: keyof FormState, value: string): string | null {
  switch (field) {
    case 'nome':
      return value.trim() ? null : 'Digite seu nome'
    case 'email':
      if (!value.trim()) return 'Digite seu email'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Email inválido'
    case 'telefone':
      if (!value.trim()) return 'Digite seu telefone'
      return /^[\d\s\+\-\(\)]{9,}$/.test(value) ? null : 'Telefone inválido'
    case 'mensagem':
      if (!value.trim()) return 'Escreva sua mensagem'
      return value.trim().length >= 20 ? null : 'Mínimo 20 caracteres'
    default:
      return null
  }
}

// ─── Steps config ─────────────────────────────────────────────────
const STEPS = [
  {
    key: 'nome'     as const,
    question:   'Como posso te chamar?',
    subtext:    'Nome, apelido ou razão social.',
    label:      'Nome',
    icon:       User,
    inputType:  'text'  as const,
    placeholder: 'Ex: João Silva ou Studio Criativo',
    autoComplete: 'name' as const,
  },
  {
    key: 'email'    as const,
    question:   'Qual é o seu email?',
    subtext:    'Sem spam — só para responder você.',
    label:      'Email',
    icon:       Mail,
    inputType:  'email' as const,
    placeholder: 'seu@email.com',
    autoComplete: 'email' as const,
  },
  {
    key: 'telefone' as const,
    question:   'Um número para contato?',
    subtext:    'WhatsApp ou telefone comercial.',
    label:      'Telefone',
    icon:       Phone,
    inputType:  'tel'   as const,
    placeholder: '(11) 99999-9999',
    autoComplete: 'tel'  as const,
  },
  {
    key: 'mensagem' as const,
    question:   'O que você quer construir?',
    subtext:    'Desafio, objetivo, prazo — qualquer detalhe ajuda.',
    label:      'Mensagem',
    icon:       MessageSquare,
    inputType:  'textarea' as const,
    placeholder: 'Estou precisando de um site para minha empresa...',
    autoComplete: undefined,
  },
]

// ─── Particle burst for success ──────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id:    i,
  angle: (i / 20) * 360,
  dist:  65 + (i % 4) * 28,
  color: ['#3B82F6', '#60A5FA', '#818CF8', '#34D399', '#F59E0B'][i % 5],
  size:  5 + (i % 4) * 2,
  delay: i * 0.032,
}))

// ─── Motion variants ─────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 280, damping: 28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    filter: 'blur(6px)',
    transition: { duration: 0.18 },
  }),
}

// ─── Receipt panel (desktop left column) ─────────────────────────
function ReceiptPanel({ form, step }: { form: FormState; step: number }) {
  return (
    <div className="hidden lg:flex relative flex-col gap-7 p-8 xl:p-10 border-r border-border-subtle/50">
      <div className="absolute inset-0 hero-grid opacity-25 rounded-l-3xl pointer-events-none" />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 text-xs font-semibold tracking-widest text-brand-glow uppercase mb-5">
          MaximWeb
        </div>
        <h3 className="text-xl font-bold leading-snug text-white mb-2">
          Seu projeto começa com uma conversa.
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">
          Resposta inicial em até 24h úteis — sem automatizações.
        </p>
      </div>

      <div className="relative flex-1 space-y-2.5">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const isDone    = i < step
          const isCurrent = i === step
          const val       = form[s.key]

          return (
            <motion.div
              key={s.key}
              animate={{ opacity: isDone ? 1 : isCurrent ? 0.6 : 0.22 }}
              transition={{ duration: 0.35 }}
              className={cn(
                'flex items-start gap-3 p-3 rounded-xl',
                isDone    && 'bg-slate-900/50 border border-border-subtle/60',
                isCurrent && 'border border-brand-primary/30 bg-brand-primary/5',
              )}
            >
              <div className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300',
                isDone ? 'bg-brand-primary/20 text-brand-glow' : 'bg-border-subtle/50 text-text-muted',
              )}>
                {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-text-muted font-medium mb-0.5">{s.label}</p>
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.p
                      key="val"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-white font-medium truncate"
                    >
                      {s.key === 'mensagem' && val.length > 44 ? val.slice(0, 44) + '…' : val}
                    </motion.p>
                  ) : (
                    <motion.p key="ph" className="text-xs text-text-muted/50 italic">
                      {isCurrent ? 'Preenchendo…' : 'Aguardando…'}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <p className="text-xs text-text-muted">Conexão segura · SSL</p>
      </div>
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-[480px] flex-col items-center justify-center text-center gap-6 p-10 overflow-hidden"
    >
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity:  [0, 1, 0],
            scale:    [0, 1, 0.4],
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
          }}
          transition={{ duration: 0.9, delay: p.delay, ease: 'easeOut' }}
          style={{
            position:        'absolute',
            width:           p.size,
            height:          p.size,
            borderRadius:    p.id % 3 === 0 ? '50%' : '3px',
            backgroundColor: p.color,
            top:             '50%',
            left:            '50%',
            marginTop:       -(p.size / 2),
            marginLeft:      -(p.size / 2),
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15 border-2 border-emerald-500/40"
      >
        <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
          transition={{ duration: 1.1, delay: 0.4 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <h3 className="text-3xl font-bold">Mensagem enviada!</h3>
        <p className="text-text-muted max-w-sm mx-auto">
          Recebemos seu contato. Retornamos em até{' '}
          <span className="text-brand-glow font-semibold">24h úteis</span>{' '}
          com uma proposta personalizada.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        onClick={onReset}
        className="text-sm text-brand-glow hover:text-white transition-colors"
      >
        Enviar outra mensagem
      </motion.button>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function ContactForm() {
  const [step,       setStep]       = useState(0)
  const [dir,        setDir]        = useState(1)
  const [form,       setForm]       = useState<FormState>({ nome: '', email: '', telefone: '', mensagem: '' })
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [loading,    setLoading]    = useState(false)
  const [status,     setStatus]     = useState<'idle' | 'success' | 'error' | 'unavailable'>('idle')

  const inputRef    = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const current = STEPS[step]

  useEffect(() => {
    const id = setTimeout(() => {
      if (current.inputType === 'textarea') textareaRef.current?.focus()
      else                                  inputRef.current?.focus()
    }, 340)
    return () => clearTimeout(id)
  }, [step, current.inputType])

  const advance = async () => {
    const err = validateField(current.key, form[current.key])
    if (err) { setFieldError(err); return }
    setFieldError(null)

    if (step < STEPS.length - 1) {
      setDir(1)
      setStatus('idle')
      setStep(s => s + 1)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/contact.php', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : res.status === 503 ? 'unavailable' : 'error')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const back = () => {
    setFieldError(null)
    setStatus('idle')
    setDir(-1)
    setStep(s => s - 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (current.inputType !== 'textarea' && e.key === 'Enter') {
      e.preventDefault()
      advance()
    }
    if (current.inputType === 'textarea' && e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      advance()
    }
  }

  const CurrentIcon = current.icon

  return (
    <SectionWrapper id="contact" className="bg-bg-main">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 lg:mb-14">
          <p className="text-brand-glow text-sm font-semibold uppercase tracking-widest mb-3">
            Entre em contato
          </p>
          <AnimatedHeading
            text="Vamos criar algo memorável"
            highlightWords={['memorável']}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          />
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            4 perguntas rápidas. Retornamos com uma proposta personalizada em até 24h.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="glass relative overflow-hidden rounded-3xl border border-border-subtle"
          style={{ boxShadow: '0 0 80px rgba(59,130,246,0.12)' }}
        >
          <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

          {status === 'success' ? (
            <SuccessState
              onReset={() => {
                setStatus('idle')
                setStep(0)
                setDir(1)
                setForm({ nome: '', email: '', telefone: '', mensagem: '' })
              }}
            />
          ) : (
            <div className="relative grid lg:grid-cols-[1fr_1.5fr]">

              <ReceiptPanel form={form} step={step} />

              {/* ── Form panel ── */}
              <div className="flex flex-col p-6 sm:p-8 lg:p-10 min-h-[480px]">

                {/* Progress bar + dots */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex items-center justify-between text-xs text-text-muted mb-2.5">
                    <span className="font-medium">Passo {step + 1} de {STEPS.length}</span>
                    <span>{Math.round(((step + 1) / STEPS.length) * 100)}% concluído</span>
                  </div>
                  <div className="relative h-1 rounded-full bg-border-subtle/60 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #3B82F6, #818CF8)' }}
                      animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                      transition={{ type: 'spring', stiffness: 160, damping: 24 }}
                    />
                  </div>
                  <div className="flex justify-center gap-2 mt-3.5">
                    {STEPS.map((s, i) => (
                      <div
                        key={s.key}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-500',
                          i < step    ? 'w-6 bg-brand-primary' :
                          i === step  ? 'w-6 bg-brand-glow animate-glow-pulse' :
                                        'w-2 bg-border-subtle/50'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Question + input */}
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex flex-col gap-5"
                    >
                      {/* Icon + question text */}
                      <div className="flex items-start gap-4">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.08, type: 'spring', stiffness: 320 }}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-glow mt-0.5"
                        >
                          <CurrentIcon className="h-5 w-5" />
                        </motion.div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-brand-glow mb-1">
                            {step + 1} / {STEPS.length}
                          </p>
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                            {current.question}
                          </h3>
                          <p className="text-text-muted text-sm mt-1">{current.subtext}</p>
                        </div>
                      </div>

                      {/* Field */}
                      {current.inputType === 'textarea' ? (
                        <textarea
                          ref={textareaRef}
                          id={current.key}
                          rows={5}
                          value={form[current.key]}
                          onChange={e => {
                            setForm(p => ({ ...p, [current.key]: e.target.value }))
                            setFieldError(null)
                          }}
                          onKeyDown={handleKeyDown}
                          placeholder={current.placeholder}
                          className={cn(
                            'dark-input w-full px-4 py-3.5 rounded-xl text-sm resize-none',
                            fieldError && 'border-red-500/60 focus:border-red-500',
                          )}
                        />
                      ) : (
                        <input
                          ref={inputRef}
                          id={current.key}
                          type={current.inputType}
                          value={form[current.key]}
                          onChange={e => {
                            setForm(p => ({ ...p, [current.key]: e.target.value }))
                            setFieldError(null)
                          }}
                          onKeyDown={handleKeyDown}
                          placeholder={current.placeholder}
                          autoComplete={current.autoComplete}
                          className={cn(
                            'dark-input w-full px-4 py-3.5 rounded-xl text-base',
                            fieldError && 'border-red-500/60 focus:border-red-500',
                          )}
                        />
                      )}

                      {/* Error / keyboard hint */}
                      <div className="min-h-[18px]">
                        <AnimatePresence mode="wait">
                          {fieldError ? (
                            <motion.p
                              key="err"
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="flex items-center gap-1.5 text-red-400 text-xs"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              {fieldError}
                            </motion.p>
                          ) : (
                            <motion.p
                              key="hint"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-text-muted/45"
                            >
                              {current.inputType === 'textarea'
                                ? '⌘ Enter para enviar'
                                : '↵ Enter para continuar'}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Submission status alerts */}
                <AnimatePresence>
                  {status !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className={cn(
                        'flex items-center gap-2 text-sm rounded-xl px-4 py-3 border overflow-hidden',
                        status === 'error'       && 'text-red-400 bg-red-500/10 border-red-500/20',
                        status === 'unavailable' && 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                      )}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {status === 'error'
                        ? 'Erro ao enviar. Tente novamente.'
                        : 'Envio indisponível no momento. Tente mais tarde.'}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Back / Continue navigation */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={back}
                    className={cn(
                      'flex items-center gap-1.5 text-sm text-text-muted transition-all duration-200',
                      step === 0
                        ? 'opacity-0 pointer-events-none'
                        : 'hover:text-white',
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>

                  <motion.button
                    type="button"
                    onClick={advance}
                    disabled={loading}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-brand-primary hover:bg-brand-glow text-white text-sm font-semibold px-7 py-3 rounded-xl transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ boxShadow: '0 0 24px rgba(59,130,246,0.4)' }}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : step === STEPS.length - 1 ? (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar
                      </>
                    ) : (
                      <>
                        Continuar
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>

              </div>
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
