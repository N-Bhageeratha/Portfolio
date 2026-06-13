const API_URL = process.env.NEXT_PUBLIC_API_URL

export type ProjectData = {
  _id?: string
  title: string
  slug?: string
  description: string
  fullDescription?: string
  tech: string[]
  image?: string
  screenshots?: string[]
  features?: string[]
  github?: string
  live?: string
  featured?: boolean
  status?: 'completed' | 'in-progress'
  createdAt?: string
  updatedAt?: string
}

export type SkillData = {
  _id?: string
  name: string
  category: 'Languages' | 'Frontend' | 'Backend' | 'Tools'
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export type MessageInput = {
  name: string
  email: string
  subject: string
  message: string
}

export type MessageData = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export const adminAPI = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      })

      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Login failed' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  logout: async () => {
    const res = await fetch(`${API_URL}/admin/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    return res.json()
  },

  me: async () => {
    const res = await fetch(`${API_URL}/admin/me`, {
      credentials: 'include',
    })
    return res.json()
  },
}

export const projectAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        cache: 'no-store',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to fetch projects' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const res = await fetch(`${API_URL}/projects/slug/${slug}`, {
        cache: 'no-store',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to fetch project' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  create: async (payload: ProjectData) => {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to create project' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  update: async (id: string, payload: ProjectData) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to update project' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  remove: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to delete project' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },
}

export const skillAPI = {
  getAll: async () => {
    try {
      const res = await fetch(`${API_URL}/skills`, {
        cache: 'no-store',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to fetch skills' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  create: async (payload: SkillData) => {
    try {
      const res = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to create skill' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  update: async (id: string, payload: SkillData) => {
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to update skill' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  remove: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/skills/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to delete skill' }
      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },
}

export const messagesAPI = {
  create: async (payload: MessageInput) => {
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) return { error: data.message || 'Failed to send message' }

      return { data }
    } catch {
      return { error: 'Network error' }
    }
  },

  getAll: async () => {
    const res = await fetch(`${API_URL}/messages`, {
      credentials: 'include',
    })

    const data = await res.json()
    return { data }
  },

  remove: async (id: string) => {
    const res = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    const data = await res.json()
    return { data }
  },
}