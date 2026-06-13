'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CyberCard } from '@/components/ui/cyber-card'
import { TerminalBlock } from '@/components/terminal/terminal-block'
import { Folder, Wrench, Mail, Activity, Clock } from 'lucide-react'
import Link from 'next/link'
import { messagesAPI, projectAPI, skillAPI } from '@/lib/api'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AdminDashboardPage() {
  const [projectCount, setProjectCount] = useState<number | string>('--')
  const [skillCount, setSkillCount] = useState<number | string>('--')
  const [messageCount, setMessageCount] = useState<number | string>('--')
  const [lastSync, setLastSync] = useState('--')

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [projectsRes, skillsRes, messagesRes] = await Promise.all([
          projectAPI.getAll(),
          skillAPI.getAll(),
          messagesAPI.getAll(),
        ])

        const projects = projectsRes.data || []
        const skills = skillsRes.data || []
        const messages = messagesRes.data || []

        setProjectCount(projects.length)
        setSkillCount(skills.length)
        setMessageCount(messages.length)
        setLastSync(new Date().toLocaleString())
      } catch {
        setProjectCount('--')
        setSkillCount('--')
        setMessageCount('--')
        setLastSync('--')
      }
    }

    loadDashboardData()
  }, [])

  const statsCards = [
    {
      icon: Folder,
      label: 'Projects',
      value: projectCount,
      href: '/admin/dashboard/projects',
      color: 'cyan',
    },
    {
      icon: Wrench,
      label: 'Skills',
      value: skillCount,
      href: '/admin/dashboard/skills',
      color: 'cyan',
    },
    {
      icon: Mail,
      label: 'Messages',
      value: messageCount,
      href: '/admin/dashboard/messages',
      color: 'cyan',
    },
  ]

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="font-mono text-xs text-primary mb-2 block">// DASHBOARD</span>
        <h1 className="text-3xl font-bold">System Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin dashboard. Manage your portfolio content here.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        {statsCards.map((card) => (
          <motion.div key={card.label} variants={itemVariants}>
            <Link href={card.href}>
              <CyberCard
                variant={card.color as 'cyan' | 'orange'}
                className="group h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <card.icon className="w-5 h-5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    {card.label}
                  </span>
                </div>
                <div className="font-mono text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {card.value}
                </div>
              </CyberCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Info */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CyberCard variant="default">
            <h2 className="font-mono text-xs text-primary mb-4">// SYSTEM_STATUS</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">API Connection</span>
                </div>
                <span className="font-mono text-xs text-emerald-500">
                  CONNECTED
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-border">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">Last Sync</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {lastSync}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">Unread Messages</span>
                </div>
                <span className="font-mono text-xs text-emerald-500">
                  {messageCount}
                </span>
              </div>
            </div>
          </CyberCard>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TerminalBlock
            variant="default"
            showCursor={true}
            lines={[
              { prompt: '~', text: 'admin --status' },
              { prompt: '', text: 'Dashboard initialized successfully' },
              { prompt: '~', text: 'content --scan' },
              { prompt: '', text: `Projects: ${projectCount}` },
              { prompt: '', text: `Skills: ${skillCount}` },
              { prompt: '', text: `Messages: ${messageCount}` },
            ]}
          />
        </motion.div>
      </div>
    </div>
  )
}