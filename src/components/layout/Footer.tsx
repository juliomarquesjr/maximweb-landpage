import { Zap, GitBranch, Link, Camera, Mail } from 'lucide-react'

const FOOTER_LINKS = {
  'Serviços': [
    { label: 'Desenvolvimento',       href: '#services' },
    { label: 'Automação',             href: '#services' },
    { label: 'Soluções Customizadas', href: '#services' },
  ],
  'Produtos': [
    { label: 'Shopping Digital',   href: '#products' },
    { label: 'Transporte Escolar', href: '#products' },
    { label: 'Lanchonetes',        href: '#products' },
    { label: 'Lavagem de Carros',  href: '#products' },
  ],
  'Empresa': [
    { label: 'Diferenciais', href: '#differentials' },
    { label: 'Contato',      href: '#contact' },
  ],
}

const SOCIAL = [
  { icon: GitBranch, href: '#',                                label: 'GitHub' },
  { icon: Link,      href: '#',                                label: 'LinkedIn' },
  { icon: Camera,    href: '#',                                label: 'Instagram' },
  { icon: Mail,      href: 'mailto:maximweb.com.br@gmail.com', label: 'Email' },
]

const COPYRIGHT_YEAR = 2026

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center
                              group-hover:shadow-[0_0_16px_rgba(59,130,246,0.6)] transition-shadow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                Maxim<span className="text-brand-glow">Web</span>
              </span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Transformamos ideias em soluções digitais de alta performance,
              com design premium e tecnologia de ponta.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center
                             text-text-muted hover:text-brand-glow
                             transition-all duration-200 border border-border-subtle
                             hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-text-muted hover:text-slate-200 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {COPYRIGHT_YEAR} MaximWeb. Todos os direitos reservados.</p>
          <p>Feito com dedicação para transformar negócios.</p>
        </div>
      </div>
    </footer>
  )
}
