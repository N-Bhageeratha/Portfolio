'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projectAPI, type ProjectData } from '@/lib/api'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const emptyForm: ProjectData = {
  title: '',
  description: '',
  fullDescription: '',
  tech: [],
  image: '',
  screenshots: [],
  features: [],
  github: '',
  live: '',
  featured: false,
  status: 'completed',
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [form, setForm] = useState<ProjectData>(emptyForm)
  const [techInput, setTechInput] = useState('')
  const [featuresInput, setFeaturesInput] = useState('')
  const [screenshotsInput, setScreenshotsInput] = useState('')

  const loadProjects = async () => {
    setLoading(true)
    const { data, error } = await projectAPI.getAll()

    if (error) {
      setError(error)
    } else {
      setProjects(data || [])
      setError('')
    }

    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setTechInput('')
    setFeaturesInput('')
    setScreenshotsInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload: ProjectData = {
      ...form,
      tech: techInput.split(',').map((t) => t.trim()).filter(Boolean),
      features: featuresInput.split(',').map((f) => f.trim()).filter(Boolean),
      screenshots: screenshotsInput
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    }

    const result = editingId
      ? await projectAPI.update(editingId, payload)
      : await projectAPI.create(payload)

    setSaving(false)

    if (result.error) {
      setError(result.error)
      return
    }

    resetForm()
    loadProjects()
  }

  const handleEdit = (project: ProjectData) => {
    setEditingId(project._id || null)
    setForm({
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription || '',
      tech: project.tech || [],
      image: project.image || '',
      screenshots: project.screenshots || [],
      features: project.features || [],
      github: project.github || '',
      live: project.live || '',
      featured: !!project.featured,
      status: project.status || 'completed',
    })

    setTechInput((project.tech || []).join(', '))
    setFeaturesInput((project.features || []).join(', '))
    setScreenshotsInput((project.screenshots || []).join('\n'))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    const ok = window.confirm('Delete this project?')
    if (!ok) return

    const result = await projectAPI.remove(id)
    if (result.error) {
      setError(result.error)
      return
    }

    loadProjects()
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary mb-2 block">// PROJECTS_CMS</span>
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <p className="text-muted-foreground mt-2">
          Add, edit, and delete portfolio projects from here.
        </p>
      </motion.div>

      <CyberCard variant="cyan" glow className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">
            {editingId ? 'Edit Project' : 'Add Project'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="TITLE"
            value={form.title}
            onChange={(v) => setForm((p) => ({ ...p, title: v }))}
            placeholder="Personal NAS Cloud"
          />

          <TextArea
            label="SHORT DESCRIPTION"
            value={form.description}
            onChange={(v) => setForm((p) => ({ ...p, description: v }))}
            placeholder="Short summary for project cards..."
          />

          <TextArea
            label="FULL DESCRIPTION"
            value={form.fullDescription || ''}
            onChange={(v) => setForm((p) => ({ ...p, fullDescription: v }))}
            placeholder="Detailed explanation for the project details page..."
          />

          <Input
            label="TECH (comma separated)"
            value={techInput}
            onChange={setTechInput}
            placeholder="Node.js, React, Linux, Networking"
          />

          <Input
            label="FEATURES (comma separated)"
            value={featuresInput}
            onChange={setFeaturesInput}
            placeholder="Authentication, File Upload, Dashboard"
          />

          <Input
            label="MAIN IMAGE URL"
            value={form.image || ''}
            onChange={(v) => setForm((p) => ({ ...p, image: v }))}
            placeholder="https://... or /projects/nas-cloud.jpg"
          />

          <TextArea
            label="SCREENSHOT URLS (one per line)"
            value={screenshotsInput}
            onChange={setScreenshotsInput}
            placeholder={`https://example.com/shot1.jpg\nhttps://example.com/shot2.jpg`}
          />

          <Input
            label="GITHUB URL"
            value={form.github || ''}
            onChange={(v) => setForm((p) => ({ ...p, github: v }))}
            placeholder="https://github.com/..."
          />

          <Input
            label="LIVE DEMO URL"
            value={form.live || ''}
            onChange={(v) => setForm((p) => ({ ...p, live: v }))}
            placeholder="https://..."
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-2 block">
                {'>'} STATUS
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    status: e.target.value as 'completed' | 'in-progress',
                  }))
                }
                className="w-full bg-secondary border border-border px-4 py-3 font-mono text-sm"
              >
                <option value="completed">completed</option>
                <option value="in-progress">in-progress</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 font-mono text-sm">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      featured: e.target.checked,
                    }))
                  }
                />
                Featured Project
              </label>
            </div>
          </div>

          {error && (
            <div className="border border-accent/50 bg-accent/10 p-3 text-sm text-accent">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <CyberButton type="submit" variant="cyan" size="lg" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  SAVING...
                </>
              ) : editingId ? (
                'UPDATE PROJECT'
              ) : (
                'ADD PROJECT'
              )}
            </CyberButton>

            {editingId && (
              <CyberButton type="button" variant="ghost" size="lg" onClick={resetForm}>
                CANCEL
              </CyberButton>
            )}
          </div>
        </form>
      </CyberCard>

      <CyberCard variant="default" className="p-6">
        <h2 className="text-xl font-semibold mb-6">Existing Projects</h2>

        {loading ? (
          <div className="font-mono text-sm text-muted-foreground">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="font-mono text-sm text-muted-foreground">No projects added yet.</div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="border border-border bg-secondary/20 p-4 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <span className="font-mono text-[11px] px-2 py-1 border border-primary/30 text-primary">
                      {project.status}
                    </span>
                    {project.featured && (
                      <span className="font-mono text-[11px] px-2 py-1 border border-emerald-500/30 text-emerald-400">
                        featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {(project.tech || []).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-1 bg-secondary text-primary border border-primary/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="font-mono text-xs text-muted-foreground">
                    slug: {project.slug}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <CyberButton type="button" variant="ghost" size="sm" onClick={() => handleEdit(project)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </CyberButton>

                  <CyberButton type="button" variant="ghost" size="sm" onClick={() => handleDelete(project._id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </CyberButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </CyberCard>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="font-mono text-xs text-muted-foreground mb-2 block">
        {'>'} {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-secondary border border-border px-4 py-3',
          'font-mono text-sm text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50'
        )}
      />
    </div>
  )
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="font-mono text-xs text-muted-foreground mb-2 block">
        {'>'} {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className={cn(
          'w-full bg-secondary border border-border px-4 py-3',
          'font-mono text-sm text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50'
        )}
      />
    </div>
  )
}