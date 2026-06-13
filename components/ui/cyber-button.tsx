'use client'

import React from "react"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CyberButtonProps {
  children: React.ReactNode
  variant?: 'cyan' | 'orange' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
  external?: boolean
}

export function CyberButton({ 
  children, 
  variant = 'cyan',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button',
  external = false,
  className 
}: CyberButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-mono uppercase tracking-wider border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    cyan: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
    orange: 'border-accent text-accent hover:bg-accent hover:text-accent-foreground',
    ghost: 'border-border text-muted-foreground hover:border-primary hover:text-primary',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  }

  const buttonContent = (
    <motion.span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={!disabled ? { 
        boxShadow: variant === 'cyan' 
          ? '0 0 20px hsl(180, 100%, 50%, 0.4)' 
          : variant === 'orange'
          ? '0 0 20px hsl(25, 100%, 55%, 0.4)'
          : undefined
      } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.span>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {buttonContent}
        </a>
      )
    }
    return <Link href={href}>{buttonContent}</Link>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {buttonContent}
    </button>
  )
}
