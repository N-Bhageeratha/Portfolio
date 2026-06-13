'use client'

import { useEffect, useState } from 'react'
import { messagesAPI } from '@/lib/api'
import { CyberCard } from '@/components/ui/cyber-card'
import { CyberButton } from '@/components/ui/cyber-button'
import { Mail, Trash2 } from 'lucide-react'

type Message = {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const loadMessages = async () => {
    const { data } = await messagesAPI.getAll()

    if (data) {
      setMessages(data)
    }

    setLoading(false)
  }

  const deleteMessage = async (id: string) => {
    await messagesAPI.remove(id)

    setMessages((prev) => prev.filter((m) => m._id !== id))
  }

  useEffect(() => {
    loadMessages()
  }, [])

  if (loading) {
    return (
      <div className="p-8 font-mono text-muted-foreground">
        Loading messages...
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold mb-2">MESSAGES</h1>
        <p className="text-muted-foreground text-sm">
          Messages sent from your portfolio contact form
        </p>
      </div>

      {messages.length === 0 && (
        <CyberCard>
          <div className="p-6 text-center text-muted-foreground">
            No messages yet.
          </div>
        </CyberCard>
      )}

      {messages.map((msg) => (
        <CyberCard key={msg._id} className="p-6">

          <div className="flex justify-between items-start">

            <div className="space-y-2">

              <div className="flex items-center gap-2 font-semibold">
                <Mail size={16} />
                {msg.subject}
              </div>

              <div className="text-sm text-muted-foreground">
                From: {msg.name} ({msg.email})
              </div>

              <div className="text-sm text-muted-foreground">
                {new Date(msg.createdAt).toLocaleString()}
              </div>

              <p className="mt-3 text-sm">
                {msg.message}
              </p>

            </div>

            <CyberButton
              variant="ghost"
              size="sm"
              onClick={() => deleteMessage(msg._id)}
            >
              <Trash2 size={16} />
            </CyberButton>

          </div>

        </CyberCard>
      ))}

    </div>
  )
}