'use client'

import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'

interface TerminalLine {
  prompt?: string
  text: string
  delay?: number
}

interface TerminalBlockProps {
  lines: TerminalLine[]
  showCursor?: boolean
  className?: string
  variant?: 'default' | 'minimal'

  // Glitch controls (optional)
  glitch?: boolean
  glitchChance?: number // 0 to 1

  // ✅ Typing speed control (ms per character)
  // Use this ONLY where you want faster/slower typing (ex: boot screen).
  typingSpeed?: number
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{};:,.<>/?\\|~'

function randChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

export function TerminalBlock({
  lines,
  showCursor = true,
  variant = 'default',
  className,

  glitch = true,
  glitchChance = 0.35,

  // ✅ default keeps your current behaviour
  typingSpeed = 55,
}: TerminalBlockProps) {
  const safeLines = useMemo(() => lines ?? [], [lines])

  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [glitchTail, setGlitchTail] = useState('')

  useEffect(() => {
    if (currentLine >= safeLines.length) return

    const line = safeLines[currentLine]
    const delayMs = Math.max(0, Math.floor((line.delay ?? 0) * 1000))

    const timer = setTimeout(() => {
      const nextCharIndex = charIndex + 1
      const stable = line.text.slice(0, nextCharIndex)

      // Glitch “tail” flicker
      if (glitch && Math.random() < glitchChance && nextCharIndex < line.text.length) {
        const tailLen = 2 + Math.floor(Math.random() * 4) // 2–5 chars
        let tail = ''
        for (let i = 0; i < tailLen; i++) tail += randChar()
        setGlitchTail(tail)
      } else {
        setGlitchTail('')
      }

      setVisibleLines((prev) => {
        const copy = [...prev]
        copy[currentLine] = stable
        return copy
      })

      setCharIndex(nextCharIndex)

      // Move to next line when done
      if (nextCharIndex >= line.text.length) {
        setGlitchTail('')
        setCurrentLine((prev) => prev + 1)
        setCharIndex(0)
      }
    }, charIndex === 0 ? delayMs : Math.max(5, typingSpeed)) // ✅ speed controlled by prop

    return () => clearTimeout(timer)
  }, [charIndex, currentLine, safeLines, glitch, glitchChance, typingSpeed])

  return (
    <div
      className={cn(
        'font-mono',
        variant === 'default' && 'bg-card border border-border p-4',
        className
      )}
    >
      {variant === 'default' && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-muted-foreground">terminal</span>
        </div>
      )}

      <div className="space-y-2">
        {safeLines.slice(0, Math.min(currentLine + 1, safeLines.length)).map((line, index) => {
          const isCurrent = index === currentLine
          const typed = visibleLines[index] ?? ''

          return (
            <div key={index} className="flex items-start gap-2">
              {line.prompt !== undefined && (
                <span className="text-primary shrink-0">{line.prompt || '>'}</span>
              )}
              <span className="text-foreground">
                {typed}
                {isCurrent && glitchTail && <span className="text-primary/70">{glitchTail}</span>}
              </span>
            </div>
          )
        })}

        {showCursor && (
          <div className="flex items-center gap-2">
            <span className="text-primary">{'>'}</span>
            <span className="w-2 h-5 bg-primary cursor-blink" />
          </div>
        )}
      </div>
    </div>
  )
}
