'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CountUpProps {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function CountUp({
  to,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, to, {
      duration,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return () => controls.stop()
  }, [isInView, to, duration, count])

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{display}{suffix}
    </span>
  )
}
