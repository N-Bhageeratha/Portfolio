'use client'

import React from "react"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CyberCardProps {
  children: React.ReactNode
  variant?: 'default' | 'cyan' | 'orange'
  glow?: boolean
  className?: string
  hoverEffect?: boolean
}

export function CyberCard({ 
  children, 
  variant = 'default',
  glow = false,
  hoverEffect = true,
  className 
}: CyberCardProps) {
  const variants = {
    default: 'border-border',
    cyan: 'border-primary/50',
    orange: 'border-accent/50',
  }

  const glowVariants = {
    default: '',
    cyan: 'glow-cyan',
    orange: 'glow-orange',
  }

  return (
    <motion.div
      className={cn(
        'relative bg-card border p-6 hud-corners',
        variants[variant],
        glow && glowVariants[variant],
        className
      )}
      whileHover={hoverEffect ? { 
        borderColor: variant === 'orange' 
          ? 'hsl(25, 100%, 55%)' 
          : 'hsl(180, 100%, 50%)',
        transition: { duration: 0.2 }
      } : undefined}
    >
      {children}
    </motion.div>
  )
}
