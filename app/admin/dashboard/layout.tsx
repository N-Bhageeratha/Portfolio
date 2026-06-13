'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { StatusPill } from '@/components/ui/status-pill'
import {
  LayoutDashboard,
  Folder,
  Wrench,
  User,
  Mail,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { adminAPI } from '@/lib/api'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/dashboard/projects', icon: Folder, label: 'Projects' },
  { href: '/admin/dashboard/skills', icon: Wrench, label: 'Skills' },
  { href: '/admin/dashboard/messages', icon: Mail, label: 'Messages' },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setMounted(true)

    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    onResize()
    window.addEventListener('resize', onResize)

    ;(async () => {
      try {
        const data = await adminAPI.me()
        if (!data?.email) {
          router.push('/admin')
        }
      } catch {
        router.push('/admin')
      }
    })()

    return () => window.removeEventListener('resize', onResize)
  }, [router])

  const showSidebar = mounted && (sidebarOpen || isDesktop)

  const handleLogout = async () => {
    await adminAPI.logout()
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure'
    router.push('/admin')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex">
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-card border border-border text-foreground"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {showSidebar && (
          <>
            {!isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-background/80 z-40 lg:hidden"
              />
            )}

            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-card border-r border-border flex flex-col"
            >
              <div className="p-6 border-b border-border">
                <Link href="/admin/dashboard" className="font-mono text-lg font-bold">
                  <span className="text-primary">{'<'}</span>
                  <span className="text-foreground">ADMIN</span>
                  <span className="text-primary">{' />'}</span>
                </Link>
                <div className="mt-2">
                  <StatusPill status="SYSTEM ACTIVE" variant="green" />
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 font-mono text-sm transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary border-l-2 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 w-full font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  View Site
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 min-h-screen lg:ml-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}