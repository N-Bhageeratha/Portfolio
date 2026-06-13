'use client'

import { cn } from '@/lib/utils'

interface StatusPillProps {
  status: string
  variant?: 'cyan' | 'orange' | 'green'
  pulse?: boolean
  className?: string
}

export function StatusPill({ 
  status, 
  variant = 'cyan', 
  pulse = true,
  className 
}: StatusPillProps) {
  const variants = {
    cyan: 'border-primary text-primary',
    orange: 'border-accent text-accent',
    green: 'border-emerald-500 text-emerald-500',
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1 border font-mono text-xs uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            variant === 'cyan' && 'bg-primary',
            variant === 'orange' && 'bg-accent',
            variant === 'green' && 'bg-emerald-500'
          )} />
          <span className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            variant === 'cyan' && 'bg-primary',
            variant === 'orange' && 'bg-accent',
            variant === 'green' && 'bg-emerald-500'
          )} />
        </span>
      )}
      {status}
    </div>
  )
}
