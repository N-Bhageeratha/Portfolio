'use client'

import { motion } from 'framer-motion'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { TerminalBlock } from '@/components/terminal/terminal-block'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center"
      >
        {/* Glitch effect title */}
        <div className="relative mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-8xl md:text-9xl font-mono font-bold text-primary text-glow-cyan"
          >
            404
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            className="absolute inset-0 text-8xl md:text-9xl font-mono font-bold text-accent"
            style={{ transform: 'translate(2px, 2px)' }}
          >
            404
          </motion.div>
        </div>

        <CyberCard variant="cyan" glow>
          <div className="space-y-6">
            <div>
              <h2 className="font-mono text-lg font-bold mb-2">PAGE_NOT_FOUND</h2>
              <p className="text-muted-foreground">
                The requested resource could not be located on this server.
              </p>
            </div>

            <TerminalBlock
              variant="minimal"
              showCursor={true}
              lines={[
                { prompt: '~', text: 'cd /requested/path' },
                { prompt: '!', text: 'Error: No such file or directory' },
                { prompt: '~', text: 'suggest --recovery' },
                { prompt: '', text: 'Return to homepage or check URL' },
              ]}
              className="text-xs text-left"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <CyberButton href="/" variant="cyan" size="md" className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </CyberButton>
              <CyberButton 
                onClick={() => window.history.back()} 
                variant="ghost" 
                size="md" 
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </CyberButton>
            </div>
          </div>
        </CyberCard>

        {/* System info */}
        <div className="mt-8 font-mono text-xs text-muted-foreground">
          <span className="text-primary">{'>'}</span> ERROR_CODE: 404 | STATUS: NOT_FOUND
        </div>
      </motion.div>
    </div>
  )
}
