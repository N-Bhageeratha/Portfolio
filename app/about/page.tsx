'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { TerminalBlock } from '@/components/terminal/terminal-block'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import {
  ArrowLeft,
  Shield,
  Cpu,
  Code2,
  GraduationCap,
  BadgeCheck,
  ExternalLink,
  X,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

type ToastLine = {
  id: number
  text: string
}

type CertItem = {
  id: string
  title: string
  issuer: string
  status: 'completed' | 'in-progress'
  image?: string
  verifyUrl?: string
}

const certifications: CertItem[] = [
  {
    id: 'nptel-python',
    title: 'Python Programming',
    issuer: 'NPTEL',
    status: 'completed',
    image: '/certificates/nptel-python.jpg',
  },
  {
    id: 'internvision-cyber',
    title: 'Cyber Security',
    issuer: 'Intern Vision',
    status: 'completed',
    image: '/certificates/internvision-cyber.jpg',
  },
  {
    id: 'udemy-ds',
    title: 'Data Science',
    issuer: 'Udemy',
    status: 'in-progress',
  },
  {
    id: 'udemy-aiml',
    title: 'AI & Machine Learning',
    issuer: 'Udemy',
    status: 'in-progress',
  },
]

export default function AboutPage() {
  const [toast, setToast] = useState<ToastLine[] | null>(null)
  const [toastKey, setToastKey] = useState(0)
  const [activeCert, setActiveCert] = useState<CertItem | null>(null)

  const runTerminalOpen = (commandLabel: string, href: string, mode: 'newtab' | 'mailto') => {
    const lines: ToastLine[] = [
      { id: 1, text: `> open ${commandLabel.toLowerCase()}` },
      { id: 2, text: `> opening…` },
      { id: 3, text: `> done ✅` },
    ]
    setToast(lines)
    setToastKey((k) => k + 1)

    window.setTimeout(() => {
      if (mode === 'mailto') {
        window.location.href = href
      } else {
        window.open(href, '_blank', 'noopener,noreferrer')
      }
    }, 650)

    window.setTimeout(() => {
      setToast(null)
    }, 1800)
  }

  return (
    <div className="min-h-screen relative">
      {/* Terminal Toast (bonus) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toastKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-5 right-5 z-[9999] w-[320px] max-w-[90vw]"
          >
            <div className="border border-primary/30 bg-card/70 backdrop-blur p-3 glow-cyan">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-muted-foreground">SYS_TERMINAL</span>
                <span className="font-mono text-[11px] text-primary/80">LIVE</span>
              </div>

              <div className="space-y-1 font-mono text-xs">
                {toast.map((l, idx) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.2 }}
                    className="text-foreground"
                  >
                    <span className="text-primary mr-1">{'>'}</span>
                    <span>{l.text.replace(/^>\s?/, '')}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 h-1 bg-primary/20 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Popup Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl border border-primary/30 bg-card/70 backdrop-blur p-4 md:p-6 glow-cyan"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="font-mono text-xs text-primary mb-2">{'// CERTIFICATE_VIEW'}</div>
                  <div className="text-xl md:text-2xl font-semibold">{activeCert.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {activeCert.issuer} •{' '}
                    {activeCert.status === 'completed' ? (
                      <span className="text-emerald-400">COMPLETED</span>
                    ) : (
                      <span className="text-yellow-300">IN PROGRESS</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  className="p-2 border border-border bg-secondary/30 hover:border-primary hover:bg-primary/10 transition"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activeCert.status === 'completed' && activeCert.image ? (
                <div className="relative w-full aspect-[16/10] overflow-hidden border border-primary/20 bg-secondary/30">
                  <Image
                    src={activeCert.image}
                    alt={`${activeCert.title} certificate`}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-black/10" />
                </div>
              ) : (
                <div className="border border-primary/20 bg-secondary/30 p-6">
                  <div className="font-mono text-xs text-muted-foreground mb-2">{'>> STATUS'}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    This certification is currently <span className="text-yellow-300">in progress</span>. Once completed,
                    I’ll upload the certificate here.
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {activeCert.verifyUrl ? (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-primary/30 bg-primary/10 px-4 py-2 font-mono text-xs text-primary hover:bg-primary/15 transition"
                  >
                    Verify / Course Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="font-mono text-xs text-muted-foreground border border-border bg-secondary/30 px-4 py-2">
                    No verification link added
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  className="inline-flex items-center justify-center border border-border bg-secondary/30 px-4 py-2 font-mono text-xs hover:border-primary hover:bg-primary/10 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs text-primary mb-4 block">// ABOUT</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Operator Profile</h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Student developer focused on full-stack builds, AI demos, and system-based implementations. I like
              projects that feel like “real systems”: backend + UI + deployment + performance.
            </p>

            <div className="mt-7 flex gap-3">
              <CyberButton href="/" variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </CyberButton>

              <CyberButton href="/projects" variant="cyan" size="sm">
                View Projects
              </CyberButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Left column */}
            <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-2 space-y-6">
              <motion.div variants={item}>
                <TerminalBlock
                  variant="default"
                  showCursor={true}
                  glitch={true}
                  glitchChance={0.22}
                  className="text-sm md:text-base"
                  lines={[
                    { prompt: '>', text: 'whoami', delay: 0 },
                    { prompt: '>', text: 'Bhageeratha Naidu', delay: 0.25 },
                    { prompt: '>', text: 'Role: Student Developer (Self Learning)', delay: 0.35 },
                    { prompt: '>', text: 'Focus: Full-Stack • AI Demos • Systems', delay: 0.45 },
                    { prompt: '>', text: 'Status: Building. Shipping. Iterating.', delay: 0.55 },
                  ]}
                />
              </motion.div>

              <motion.div variants={item}>
                <CyberCard variant="default" className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold">What I’m building</h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        Projects that look “production-like” — clean UI, real backend logic, and clear documentation.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <li>• Full-stack apps using React / Next.js + Node.js / Express</li>
                    <li>• AI demos using Python + OpenCV / model workflows</li>
                    <li>• System-based builds like personal NAS cloud and networking concepts</li>
                    <li>• Improving UI/UX + performance step-by-step</li>
                  </ul>
                </CyberCard>
              </motion.div>

              {/* Skills */}
              <motion.div variants={item}>
                <CyberCard variant="cyan" glow className="p-6">
                  <div className="flex items-start gap-3 mb-5">
                    <Cpu className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h2 className="text-xl font-semibold">Tech Stack</h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        Based on what I’m actively using and learning (resume-aligned).
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <SkillBlock title="Languages" icon={<Code2 className="w-4 h-4 text-primary" />} items={['Java', 'Python', 'JavaScript']} />
                    <SkillBlock title="Frontend" icon={<Code2 className="w-4 h-4 text-primary" />} items={['HTML', 'CSS', 'Bootstrap', 'React.js', 'Next.js']} />
                    <SkillBlock title="Backend" icon={<Code2 className="w-4 h-4 text-primary" />} items={['Node.js', 'Express.js', 'REST APIs']} />
                    <SkillBlock title="Tools & DB" icon={<Code2 className="w-4 h-4 text-primary" />} items={['Git', 'GitHub', 'VS Code', 'Eclipse', 'SQL', 'JDBC']} />
                  </div>
                </CyberCard>
              </motion.div>

              {/* Education + Internship */}
              <motion.div variants={item}>
                <div className="grid md:grid-cols-2 gap-6">
                  <CyberCard variant="default" className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <GraduationCap className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold">Education</h3>
                        <p className="text-muted-foreground text-sm mt-1">Institute of Aeronautical Engineering</p>
                      </div>
                    </div>

                    <div className="font-mono text-sm text-muted-foreground space-y-2">
                      <div>• B.Tech (CSE) — 2023–2027</div>
                      <div>• GPA: 7.8 / 10.0</div>
                    </div>
                  </CyberCard>

                  <CyberCard variant="default" className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <BadgeCheck className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold">Internship</h3>
                        <p className="text-muted-foreground text-sm mt-1">MSME Tool Room, CITD</p>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                      <div className="font-mono text-xs">May–Jun 2025</div>
                      <ul className="space-y-1">
                        <li>• Deep learning concepts + workflows</li>
                        <li>• Dataset preprocessing, training, evaluation</li>
                        <li>• Image classification style tasks</li>
                      </ul>
                    </div>
                  </CyberCard>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={item}>
                <CyberCard variant="default" className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold">Certifications</h3>
                    <span className="font-mono text-[11px] text-muted-foreground">click to view</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {certifications.map((c) => (
                      <Cert
                        key={c.id}
                        text={`${c.title} — ${c.issuer}`}
                        status={c.status}
                        onClick={() => setActiveCert(c)}
                      />
                    ))}
                  </div>
                </CyberCard>
              </motion.div>
            </motion.div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Profile Panel */}
              <CyberCard variant="cyan" glow className="p-6">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-primary/20 bg-secondary/30">
                  <Image
                    src="/profile.jpeg"
                    alt="Bhageeratha"
                    fill
                    priority
                    className="object-cover object-top scale-[1.02]"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                </div>

                <div className="mt-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">PROFILE_PANEL</div>
                  <div className="text-lg font-semibold">Bhageeratha Naidu</div>
                  <div className="text-sm text-muted-foreground mt-1">Student Developer • Full-Stack + AI + Systems</div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <LinkRow
                    label="GitHub"
                    value="github.com/N-Bhageeratha"
                    onOpen={(href) => runTerminalOpen('github', href, 'newtab')}
                  />
                  <LinkRow
                    label="LinkedIn"
                    value="linkedin.com/in/n-bhageeratha"
                    onOpen={(href) => runTerminalOpen('linkedin', href, 'newtab')}
                  />
                  <LinkRow
                    label="Email"
                    value="bhageeratha2303@gmail.com"
                    onOpen={(href) => runTerminalOpen('mail', href, 'mailto')}
                  />
                </div>

                <div className="mt-5">
                  <CyberButton href="/contact" variant="cyan" size="sm" className="w-full">
                    Contact
                  </CyberButton>
                </div>
              </CyberCard>

              {/* ✅ Resume download BELOW the entire profile panel (NOT inside it) */}
              <a href="/resume.pdf" download className="block">
                <CyberButton variant="cyan" size="lg" className="w-full">
                  Download Resume
                </CyberButton>
              </a>

              {/* ✅ Leave remaining space empty (no extra blocks) */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SkillBlock({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="border border-primary/20 bg-secondary/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="font-mono text-xs text-muted-foreground">{title.toUpperCase()}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <span
            key={t}
            className="font-mono text-xs px-2 py-1 bg-secondary text-primary border border-primary/30"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function Cert({
  text,
  status,
  onClick,
}: {
  text: string
  status: 'completed' | 'in-progress'
  onClick: () => void
}) {
  const isProgress = status === 'in-progress'

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left border border-border bg-secondary/30 px-3 py-2 hover:border-primary hover:bg-primary/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-primary">{'>>'}</span>
            <span className="truncate">{text}</span>
          </div>

          <div className="mt-1 font-mono text-[11px] text-muted-foreground">
            {isProgress ? (
              <span className="text-yellow-300">IN PROGRESS</span>
            ) : (
              <span className="text-emerald-400">COMPLETED</span>
            )}
          </div>
        </div>

        <ExternalLink className="w-4 h-4 opacity-70 shrink-0" />
      </div>
    </button>
  )
}

function LinkRow({ label, value, onOpen }: { label: string; value: string; onOpen: (href: string) => void }) {
  const href = useMemo(() => {
    const l = label.toLowerCase()
    if (l === 'email') return `mailto:${value}`
    return value.startsWith('http') ? value : `https://${value}`
  }, [label, value])

  return (
    <button
      type="button"
      onClick={() => onOpen(href)}
      className="w-full text-left flex items-start justify-between gap-3 border border-border bg-secondary/30 px-3 py-2
                 hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
    >
      <span className="font-mono text-xs text-muted-foreground">{label}</span>

      <span className="flex items-center gap-2 font-mono text-xs text-primary text-right break-all">
        {value}
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </span>
    </button>
  )
}