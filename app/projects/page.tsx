'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { projectAPI, type ProjectData } from '@/lib/api'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { ArrowLeft, ExternalLink, Github, ArrowRight } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data } = await projectAPI.getAll()
      setProjects(data || [])
      setLoading(false)
    })()
  }, [])

  return (
    <div className="min-h-screen">
      <section className="border-b border-border py-14">
        <div className="container mx-auto px-4">
          <span className="font-mono text-xs text-primary mb-4 block">// PROJECTS</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Projects</h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            A collection of my major builds — full-stack, AI demos, and system-level implementations.
          </p>

          <div className="mt-7 flex gap-3">
            <CyberButton href="/" variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </CyberButton>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="font-mono text-sm text-muted-foreground">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="font-mono text-sm text-muted-foreground">No projects found.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CyberCard variant="cyan" glow className="h-full group">
                    <div className="relative aspect-video overflow-hidden border border-border bg-secondary/30">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
                          PROJECT_IMAGE
                        </div>
                      )}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                    </div>

                    <div className="mt-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-lg">{p.title}</h3>
                        {p.status && (
                          <span className="font-mono text-[10px] text-primary">{p.status}</span>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mt-2">{p.description}</p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {(p.tech || []).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2 py-1 bg-secondary text-primary border border-primary/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <Link
                          href={`/projects/${p.slug}`}
                          className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:opacity-80 transition-opacity"
                        >
                          VIEW_DETAILS
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center gap-3">
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CyberCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}