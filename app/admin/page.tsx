'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { adminAPI } from '@/lib/api'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { TerminalBlock } from '@/components/terminal/terminal-block'
import { Lock, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const data = await adminAPI.me()
        if (data?.authenticated || data?.email) {
          router.push('/admin/dashboard')
        }
      } catch {
        // do nothing
      }
    })()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const { data, error } = await adminAPI.login({ email, password })

      if (error) {
        setStatus('error')
        setErrorMessage(error)
        return
      }

      if (data) {
        setStatus('idle')
        router.push('/admin/dashboard')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Authentication failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 grid-overlay noise-texture">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          <span className="text-primary">{'>'}</span> ssh admin@system.dev
        </div>

        <CyberCard variant="cyan" glow className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-primary/20 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 border border-primary flex items-center justify-center">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-mono text-xl font-bold mb-2">ADMIN_ACCESS</h1>
              <p className="text-muted-foreground text-sm">Enter credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-mono text-xs text-muted-foreground mb-2 block">{'>'} EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className={cn(
                    'w-full bg-secondary border border-border px-4 py-3',
                    'font-mono text-sm text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50',
                    'transition-colors'
                  )}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted-foreground mb-2 block">{'>'} PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={cn(
                    'w-full bg-secondary border border-border px-4 py-3',
                    'font-mono text-sm text-foreground placeholder:text-muted-foreground',
                    'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50',
                    'transition-colors'
                  )}
                />
              </div>

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-accent text-sm p-3 border border-accent/50 bg-accent/10"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <CyberButton
                type="submit"
                variant="cyan"
                size="lg"
                disabled={status === 'loading'}
                className="w-full"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  'LOGIN'
                )}
              </CyberButton>
            </form>

            <div className="mt-8">
              <TerminalBlock
                variant="minimal"
                showCursor={true}
                lines={[
                  { prompt: '~', text: 'Secure connection established' },
                  { prompt: '~', text: 'Waiting for authentication...' },
                ]}
                className="text-xs"
              />
            </div>
          </div>
        </CyberCard>

        <div className="text-center mt-6">
          <CyberButton href="/" variant="ghost" size="sm">
            Back to Site
          </CyberButton>
        </div>
      </motion.div>
    </div>
  )
}