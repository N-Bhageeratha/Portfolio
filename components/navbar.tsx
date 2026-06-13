'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { StatusPill } from '@/components/ui/status-pill'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },

  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Don't show navbar on admin pages
  if (pathname.startsWith('/admin')) return null

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-mono text-lg font-bold tracking-tight group"
          >
            <span className="text-primary">{'<'}</span>
            <span className="text-foreground group-hover:text-primary transition-colors">SYSTEM</span>
            <span className="text-primary">{'.DEV />'}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-mono text-sm uppercase tracking-wider transition-colors relative',
                  pathname === link.href 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Status & Mobile Menu */}
          <div className="flex items-center gap-4">
            <StatusPill status="BUILDING" variant="cyan" />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'font-mono text-sm uppercase tracking-wider transition-colors px-2 py-2',
                    pathname === link.href 
                      ? 'text-primary border-l-2 border-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
