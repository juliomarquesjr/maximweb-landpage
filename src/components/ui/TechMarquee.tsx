import { cn } from '@/lib/utils'

const TECHS = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL',
  'Tailwind CSS', 'Framer Motion', 'Prisma', 'Docker', 'Vercel',
  'Redis', 'React Native', 'REST APIs', 'WebSockets', 'Figma',
]

export default function TechMarquee({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('relative overflow-hidden py-5 border-y border-border-subtle bg-bg-secondary/50', className)}
    >
      {/* Fade left */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10
                      bg-gradient-to-r from-bg-main to-transparent" />
      {/* Fade right */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10
                      bg-gradient-to-l from-bg-main to-transparent" />

      <div className="flex w-max gap-6 animate-marquee">
        {[...TECHS, ...TECHS].map((tech, i) => (
          <span
            key={i}
            className="text-xs font-semibold text-text-muted tracking-widest uppercase
                       border border-border-subtle bg-bg-card/60 px-4 py-2 rounded-full
                       whitespace-nowrap cursor-default select-none
                       hover:text-brand-glow hover:border-brand-primary/40 transition-colors duration-200"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
