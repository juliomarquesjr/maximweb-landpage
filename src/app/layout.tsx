import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-var',
  display: 'swap',
})

const hydrationAttributeCleanup = `
(() => {
  const root = document.documentElement
  const clean = () => {
    root.removeAttribute('data-lt-installed')
    root.removeAttribute('suppresshydrationwarning')
  }
  clean()
  const observer = new MutationObserver(clean)
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-lt-installed', 'suppresshydrationwarning'],
  })
  window.addEventListener('load', () => observer.disconnect(), { once: true })
})()
`

export const metadata: Metadata = {
  title: 'MaximWeb — Soluções Digitais Premium',
  description:
    'Desenvolvimento de sistemas sob medida, automação de processos e soluções digitais personalizadas para o seu negócio.',
  keywords: ['desenvolvimento web', 'automação', 'sistemas', 'MaximWeb', 'software'],
  authors: [{ name: 'MaximWeb' }],
  openGraph: {
    title: 'MaximWeb — Soluções Digitais Premium',
    description: 'Transforme seu negócio com tecnologia de ponta.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter bg-bg-main text-slate-200 antialiased">
        {children}
        <Script id="hydration-attribute-cleanup" strategy="beforeInteractive">
          {hydrationAttributeCleanup}
        </Script>
      </body>
    </html>
  )
}
