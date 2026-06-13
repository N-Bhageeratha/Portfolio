'use client'

import React from "react"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { messagesAPI, type MessageInput } from '@/lib/api'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { TerminalBlock } from '@/components/terminal/terminal-block'
import { Mail, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-xs text-primary mb-4 block">// CONTACT</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have a project in mind or want to collaborate? 
              Send a message through the terminal below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <CyberCard variant="cyan" glow>
                <h2 className="font-mono text-xs text-primary mb-6">// CONNECT</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">EMAIL</p>
                      <a 
                        href="mailto:hello@example.com" 
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        Bhageeratha2303@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">LOCATION</p>
                      <p className="text-foreground">Hyderabad, INDIA</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border mt-6 pt-6">
                  <p className="font-mono text-xs text-muted-foreground mb-4">SOCIAL_LINKS</p>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        aria-label={link.label}
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </CyberCard>

              {/* Terminal Info */}
              <TerminalBlock
                variant="default"
                showCursor={true}
                lines={[
                  { prompt: '~', text: 'status --availability' },
                  { prompt: '', text: 'Currently available for freelance' },
                  { prompt: '', text: 'and full-time opportunities.' },
                  { prompt: '~', text: 'response-time --avg' },
                  { prompt: '', text: '< 24 hours' },
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState<MessageInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { error } = await messagesAPI.create(formData)
    
    if (error) {
      setStatus('error')
      setErrorMessage(error)
    } else {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <CyberCard variant="default">
      <h2 className="font-mono text-xs text-primary mb-6">// SEND_MESSAGE</h2>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="font-mono text-lg mb-2 text-emerald-500">MESSAGE_SENT</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Thanks for reaching out! I will get back to you soon.
            </p>
            <CyberButton 
              onClick={() => setStatus('idle')} 
              variant="ghost" 
              size="sm"
            >
              Send Another Message
            </CyberButton>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <CyberInput
              label="NAME"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <CyberInput
              label="EMAIL"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <CyberInput
              label="SUBJECT"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              required
            />

            <CyberTextarea
              label="MESSAGE"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows={5}
              required
            />

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-accent text-sm"
              >
                <AlertCircle className="w-4 h-4" />
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
                  SENDING...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  SEND_MESSAGE
                </>
              )}
            </CyberButton>
          </motion.form>
        )}
      </AnimatePresence>
    </CyberCard>
  )
}

interface CyberInputProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

function CyberInput({ label, name, value, onChange, placeholder, type = 'text', required }: CyberInputProps) {
  return (
    <div>
      <label className="font-mono text-xs text-muted-foreground mb-2 block">
        {'>'} {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full bg-secondary border border-border px-4 py-3',
          'font-mono text-sm text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50',
          'transition-colors'
        )}
      />
    </div>
  )
}

interface CyberTextareaProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  required?: boolean
}

function CyberTextarea({ label, name, value, onChange, placeholder, rows = 4, required }: CyberTextareaProps) {
  return (
    <div>
      <label className="font-mono text-xs text-muted-foreground mb-2 block">
        {'>'} {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={cn(
          'w-full bg-secondary border border-border px-4 py-3 resize-none',
          'font-mono text-sm text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50',
          'transition-colors'
        )}
      />
    </div>
  )
}
