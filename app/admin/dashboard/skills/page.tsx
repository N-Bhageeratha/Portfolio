'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { skillAPI, type SkillData } from '@/lib/api'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const emptyForm: SkillData = {
  name: '',
  category: 'Languages',
  level: 'Intermediate',
  featured: false,
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillData[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<SkillData>(emptyForm)

  const loadSkills = async () => {
    setLoading(true)
    const { data, error } = await skillAPI.getAll()

    if (error) {
      setError(error)
    } else {
      setSkills(data || [])
      setError('')
    }

    setLoading(false)
  }

  useEffect(() => {
    loadSkills()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const result = editingId
      ? await skillAPI.update(editingId, form)
      : await skillAPI.create(form)

    setSaving(false)

    if (result.error) {
      setError(result.error)
      return
    }

    resetForm()
    loadSkills()
  }

  const handleEdit = (skill: SkillData) => {
    setEditingId(skill._id || null)
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level || 'Intermediate',
      featured: !!skill.featured,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    const ok = window.confirm('Delete this skill?')
    if (!ok) return

    const result = await skillAPI.remove(id)
    if (result.error) {
      setError(result.error)
      return
    }

    loadSkills()
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="font-mono text-xs text-primary mb-2 block">// SKILLS_CMS</span>
        <h1 className="text-3xl font-bold">Manage Skills</h1>
        <p className="text-muted-foreground mt-2">
          Add, edit, and delete portfolio skills from here.
        </p>
      </motion.div>

      <CyberCard variant="cyan" glow className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">
            {editingId ? 'Edit Skill' : 'Add Skill'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="SKILL NAME"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="React.js"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground mb-2 block">{'>'} CATEGORY</label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    category: e.target.value as SkillData['category'],
                  }))
                }
                className="w-full bg-secondary border border-border px-4 py-3 font-mono text-sm"
              >
                <option value="Languages">Languages</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tools">Tools</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-xs text-muted-foreground mb-2 block">{'>'} LEVEL</label>
              <select
                value={form.level}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    level: e.target.value as SkillData['level'],
                  }))
                }
                className="w-full bg-secondary border border-border px-4 py-3 font-mono text-sm"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
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
              Featured Skill
            </label>
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
                'UPDATE SKILL'
              ) : (
                'ADD SKILL'
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
        <h2 className="text-xl font-semibold mb-6">Existing Skills</h2>

        {loading ? (
          <div className="font-mono text-sm text-muted-foreground">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="font-mono text-sm text-muted-foreground">No skills added yet.</div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="border border-border bg-secondary/20 p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <span className="font-mono text-[11px] px-2 py-1 border border-primary/30 text-primary">
                      {skill.category}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-1 border border-border text-muted-foreground">
                      {skill.level}
                    </span>
                    {skill.featured && (
                      <span className="font-mono text-[11px] px-2 py-1 border border-emerald-500/30 text-emerald-400">
                        featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <CyberButton type="button" variant="ghost" size="sm" onClick={() => handleEdit(skill)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </CyberButton>

                  <CyberButton type="button" variant="ghost" size="sm" onClick={() => handleDelete(skill._id)}>
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
      <label className="font-mono text-xs text-muted-foreground mb-2 block">{'>'} {label}</label>
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