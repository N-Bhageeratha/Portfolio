'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { TerminalBlock } from '@/components/terminal/terminal-block'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { StatusPill } from '@/components/ui/status-pill'
import { ArrowRight, Folder, Briefcase, Code, Radio } from 'lucide-react'
import Link from 'next/link'
import { projectAPI, type ProjectData } from '@/lib/api'

const BOOT_DURATION_MS = 5200

const systemTiles = [
  {
    icon: Folder,
    title: 'PROJECTS',
    value: '4+',
    description: 'Major projects completed',
    href: '/projects',
  },
  {
    icon: Briefcase,
    title: 'EXPERIENCE',
    value: '3+ YRS',
    description: 'Building software',
    href: '/work',
  },
  {
    icon: Code,
    title: 'STACK',
    value: 'FULL',
    description: 'Frontend & Backend',
    href: '/about',
  },
  {
    icon: Radio,
    title: 'CURRENTLY',
    value: 'OPEN',
    description: 'For opportunities',
    href: '/contact',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const [bootStep, setBootStep] = useState<'boot' | 'granted' | 'done'>('boot')

  useEffect(() => {
    const bootPlayed = sessionStorage.getItem('bootPlayed')

    if (bootPlayed === 'true') {
      setBootStep('done')
      return
    }

    const t1 = window.setTimeout(() => setBootStep('granted'), BOOT_DURATION_MS)
    const t2 = window.setTimeout(() => {
      sessionStorage.setItem('bootPlayed', 'true')
      setBootStep('done')
    }, BOOT_DURATION_MS + 1200)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  if (bootStep !== 'done') {
    return <BootIntro step={bootStep} bootDurationMs={BOOT_DURATION_MS} />
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Terminal Intro */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 pl-8 md:pl-12 lg:pl-16"
            >
              <motion.div variants={itemVariants}>
                <StatusPill status="AVAILABLE FOR WORK" variant="green" className="mb-6" />
              </motion.div>

              <TerminalBlock
                variant="minimal"
                showCursor={true}
                glitch={true}
                glitchChance={0.4}
                lines={[
                  { prompt: '~', text: 'Hello, World', delay: 0 },
                  { prompt: '~', text: 'I am Bhageeratha', delay: 0.3 },
                  { prompt: '~', text: "I'm a Software Developer", delay: 0.3 },
                  { prompt: '~', text: 'Building digital experiences', delay: 0.3 },
                ]}
                className="text-xl md:text-2xl lg:text-3xl"
              />

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="text-foreground">Crafting </span>
                <span className="text-primary text-glow-cyan">exceptional</span>
                <br />
                <span className="text-foreground">digital products</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-lg max-w-md leading-relaxed"
              >
                Full-stack developer specializing in building performant, accessible, and visually
                compelling web applications.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <CyberButton href="/projects" variant="cyan" size="lg">
                  View Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </CyberButton>
                <CyberButton href="/contact" variant="ghost" size="lg">
                  Get in Touch
                </CyberButton>
              </motion.div>
            </motion.div>

            {/* Right - Profile Image with HUD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* HUD Frame */}
                <div className="absolute inset-0 border border-primary/30 glow-cyan">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
                </div>

                {/* Profile Image */}
                <div className="absolute inset-4 overflow-hidden border border-primary/20 bg-secondary/30">
                  <Image
                    src="/profile.jpeg"
                    alt="Profile"
                    fill
                    priority
                    className="object-cover object-top scale-[0.98]"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/15" />
                </div>

                {/* Status indicators */}
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div
                    className="w-2 h-2 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Tiles */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {systemTiles.map((tile) => (
              <motion.div key={tile.title} variants={itemVariants}>
                <Link href={tile.href}>
                  <CyberCard variant="default" className="group h-full">
                    <div className="flex items-start justify-between mb-4">
                      <tile.icon className="w-5 h-5 text-primary" />
                      <span className="font-mono text-xs text-muted-foreground">{tile.title}</span>
                    </div>
                    <div className="font-mono text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {tile.value}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">{tile.description}</div>
                  </CyberCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Work Preview */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeader label="WORK_HISTORY" title="Experience" href="/work" />
          <WorkPreview />
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeader label="PROJECTS" title="Featured Projects" href="/projects" />
          <ProjectsPreview />
        </div>
      </section>
    </div>
  )
}

function BootIntro({
  step,
  bootDurationMs,
}: {
  step: 'boot' | 'granted' | 'done'
  bootDurationMs: number
}) {
  const isGranted = step === 'granted'
  const bootSeconds = useMemo(() => Math.max(0.1, bootDurationMs / 1000), [bootDurationMs])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isGranted ? 0 : 1 }}
      transition={{ duration: 0.4, delay: isGranted ? 0.6 : 0 }}
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,rgba(0,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.10)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <motion.div
        className="absolute left-0 right-0 h-px bg-primary/40"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      <div className="w-full max-w-2xl px-6">
        {!isGranted ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <TerminalBlock
                variant="default"
                showCursor={true}
                glitch={true}
                glitchChance={0.25}
                className="text-base md:text-lg"
                lines={[
                  { prompt: '>', text: 'BOOT_SEQUENCE v2.0', delay: 0 },
                  { prompt: '>', text: 'Initializing modules…', delay: 0.15 },
                  { prompt: '>', text: 'Loading developer profile…', delay: 0.35 },
                  { prompt: '>', text: 'Verifying identity: Bhageeratha', delay: 0.55 },
                  { prompt: '>', text: 'Handshake complete', delay: 0.75 },
                ]}
              />
            </motion.div>

            <div className="mt-5 h-2 w-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: bootSeconds, ease: 'linear' }}
              />
            </div>

            <div className="mt-3 font-mono text-xs text-muted-foreground">
              Entering system interface…
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="border border-primary/40 bg-card/40 p-8 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.25), transparent 55%)',
              }}
            />

            <motion.div
              initial={{ letterSpacing: '0.2em', opacity: 0 }}
              animate={{ letterSpacing: '0.06em', opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative font-mono text-3xl md:text-4xl text-primary text-glow-cyan"
            >
              ACCESS GRANTED
            </motion.div>

            <div className="relative mt-3 font-mono text-xs text-muted-foreground">
              USER: BHAGEERATHA • SESSION: ACTIVE • MODE: CYBER
            </div>

            <motion.div
              className="relative mt-6 h-1 bg-primary/30 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="h-full bg-primary"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function SectionHeader({ label, title, href }: { label: string; title: string; href: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <span className="font-mono text-xs text-primary mb-2 block">// {label}</span>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      <CyberButton href={href} variant="ghost" size="sm">
        View All
        <ArrowRight className="ml-2 w-4 h-4" />
      </CyberButton>
    </motion.div>
  )
}

function WorkPreview() {
  const previewWork = [
    {
      role: 'Student Developer — Self Learning',
      company: 'Independent / Personal Projects',
      period: '2024 – Present',
      current: true,
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {previewWork.map((work, index) => (
        <motion.div key={index} variants={itemVariants}>
          <CyberCard variant="default">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{work.role}</h3>
                  {work.current && <StatusPill status="CURRENT" variant="green" pulse={false} />}
                </div>
                <p className="text-muted-foreground">{work.company}</p>
              </div>
              <span className="font-mono text-sm text-muted-foreground">{work.period}</span>
            </div>
          </CyberCard>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ProjectsPreview() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await projectAPI.getAll()

      if (!error && data) {
        const featuredProjects = data.filter((p: { featured: any }) => p.featured).slice(0, 2)
        setProjects(featuredProjects)
      }

      setLoading(false)
    })()
  }, [])

  if (loading) {
    return (
      <div className="font-mono text-sm text-muted-foreground">
        Loading featured projects...
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="font-mono text-sm text-muted-foreground">
        No featured projects found.
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-6"
    >
      {projects.map((project, index) => (
        <motion.div key={project._id || index} variants={itemVariants}>
          <CyberCard variant="cyan" glow className="group h-full">
            <div className="relative aspect-video mb-4 overflow-hidden border border-border bg-secondary/30">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xs text-muted-foreground">
                    PROJECT_IMAGE
                  </span>
                </div>
              )}
            </div>

            <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {(project.tech || []).map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2 py-1 bg-secondary text-primary border border-primary/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </CyberCard>
        </motion.div>
      ))}
    </motion.div>
  )
}