'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { itemVariants } from './SectionWrapper'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export default function GlowCard({
  children,
  className,
  glowColor = 'rgba(59,130,246,0.35)',
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springCfg = { stiffness: 200, damping: 25, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springCfg)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springCfg)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        'glass rounded-2xl p-6 relative group cursor-default',
        'transition-shadow duration-300',
        className
      )}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(59,130,246,0.5), 0 0 40px 2px ${glowColor}`,
        }}
      />
      {children}
    </motion.div>
  )
}
