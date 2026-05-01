'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps {
  text: string
  highlightWords?: string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

const wordVariant = {
  hidden:  { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function AnimatedHeading({
  text,
  highlightWords = [],
  className,
  as: Tag = 'h2',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref}>
      <Tag className={cn('flex flex-wrap gap-x-[0.3em] justify-center', className)}>
        {text.split(' ').map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
            variants={wordVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={cn(highlightWords.includes(word) && 'gradient-text')}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  )
}
