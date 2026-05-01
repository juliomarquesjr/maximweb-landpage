'use client'

import { motion } from 'framer-motion'
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
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
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
