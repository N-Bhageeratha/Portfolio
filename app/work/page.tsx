'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { ArrowLeft, Briefcase, GraduationCap, BadgeCheck } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

type WorkItem = {
  title: string
  org: string
  period: string
  type: 'self' | 'internship' | 'activity'
  highlights: string[]
  stack: string[]
}

const workItems: WorkItem[] = [
  {
    title: 'Student Developer — Self Learning',
    org: 'Independent / Personal Projects',
    period: '2024 – Present',
    type: 'self',
    highlights: [
      'Building full-stack projects with real UI + backend + deployment approach.',
      'Developed system-based projects like Personal NAS Cloud and other practical builds.',
      'Improving code quality, UI/UX, documentation, and performance step-by-step.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Git'],
  },
  {
    title: 'Internship Trainee (Deep Learning)',
    org: 'MSME Tool Room, CITD',
    period: 'May 2025 – Jun 2025',
    type: 'internship',
    highlights: [
      'Learned deep learning workflows and practical model training approach.',
      'Worked with dataset preprocessing, training, and evaluation basics.',
      'Built a foundation for AI-based demos like computer vision systems.',
    ],
    stack: ['Python', 'OpenCV', 'Deep Learning', 'Data Prep'],
  },
]

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs text-primary mb-4 block">// WORK</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Log</h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              I’m currently a student developer. This page focuses on real work-like efforts:
              projects, internship training, and consistent self-learning builds.
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

      {/* Timeline */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-6">
            {workItems.map((w, idx) => (
              <motion.div key={idx} variants={item}>
                <CyberCard variant={w.type === 'internship' ? 'cyan' : 'default'} glow={w.type === 'internship'} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {w.type === 'self' && <GraduationCap className="w-5 h-5 text-primary" />}
                        {w.type === 'internship' && <BadgeCheck className="w-5 h-5 text-primary" />}
                        {w.type === 'activity' && <Briefcase className="w-5 h-5 text-primary" />}

                        <h2 className="text-xl font-semibold">{w.title}</h2>
                      </div>

                      <div className="text-sm text-muted-foreground">{w.org}</div>

                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                        {w.highlights.map((h, i) => (
                          <li key={i}>• {h}</li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {w.stack.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2 py-1 bg-secondary text-primary border border-primary/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="font-mono text-xs text-muted-foreground shrink-0">
                      {w.period}
                    </div>
                  </div>
                </CyberCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Optional bottom CTA */}
          <div className="mt-10 flex justify-center">
            <CyberButton href="/contact" variant="ghost" size="sm">
              Want to collaborate? Contact me
            </CyberButton>
          </div>
        </div>
      </section>
    </div>
  )
}