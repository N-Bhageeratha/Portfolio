'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { projectAPI, type ProjectData } from '@/lib/api'
import { CyberButton } from '@/components/ui/cyber-button'
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react'

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const resolvedParams = await params
      const { data } = await projectAPI.getBySlug(resolvedParams.slug)
      setProject(data || null)
      setLoading(false)
    })()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16">
        <div className="font-mono text-sm text-muted-foreground">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16">
        <div className="font-mono text-sm text-muted-foreground mb-6">Project not found.</div>
        <CyberButton href="/projects" variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </CyberButton>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <section className="border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs text-primary mb-4 block">// PROJECT_DETAILS</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <CyberButton href="/projects" variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </CyberButton>

              {project.github && (
                <CyberButton href={project.github} variant="cyan" size="sm">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </CyberButton>
              )}

              {project.live && (
                <CyberButton href={project.live} variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </CyberButton>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-10">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative aspect-video overflow-hidden border border-border bg-secondary/30">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground">
                    PROJECT_IMAGE
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/10" />
              </div>

              <div className="mt-8 border border-border bg-card/40 p-6">
                <div className="font-mono text-xs text-primary mb-3">// OVERVIEW</div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="mt-6 border border-border bg-card/40 p-6">
                  <div className="font-mono text-xs text-primary mb-4">// KEY_FEATURES</div>
                  <div className="space-y-3">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="mt-6 border border-border bg-card/40 p-6">
                  <div className="font-mono text-xs text-primary mb-4">// SCREENSHOTS</div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.screenshots.map((shot, index) => (
                      <div
                        key={`${shot}-${index}`}
                        className="relative aspect-video overflow-hidden border border-border bg-secondary/30"
                      >
                        <Image
                          src={shot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="border border-border bg-card/40 p-6">
                <div className="font-mono text-xs text-primary mb-4">// PROJECT_META</div>

                <div className="space-y-4">
                  <div>
                    <div className="font-mono text-[11px] text-muted-foreground mb-1">STATUS</div>
                    <div className="text-sm">{project.status || 'completed'}</div>
                  </div>

                  <div>
                    <div className="font-mono text-[11px] text-muted-foreground mb-2">TECH STACK</div>
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
                  </div>

                  <div>
                    <div className="font-mono text-[11px] text-muted-foreground mb-1">FEATURED</div>
                    <div className="text-sm">{project.featured ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-card/40 p-6">
                <div className="font-mono text-xs text-primary mb-4">// LINKS</div>

                <div className="space-y-3">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-border bg-secondary/30 px-4 py-3 text-sm hover:border-primary transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <Github className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="border border-border bg-secondary/20 px-4 py-3 text-sm text-muted-foreground">
                      GitHub link not added
                    </div>
                  )}

                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-border bg-secondary/30 px-4 py-3 text-sm hover:border-primary transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <div className="border border-border bg-secondary/20 px-4 py-3 text-sm text-muted-foreground">
                      Live demo not added
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}