'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
]

export function Footer() {
  const pathname = usePathname()
  
  // Don't show footer on admin pages
  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {'<SYSTEM.DEV />'}
            </Link>
            <span className="hidden md:block text-border">|</span>
            <span className="font-mono text-xs text-muted-foreground">
              BUILD v1.0.0 // {new Date().getFullYear()}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">{'>'}</span> SYSTEM_STATUS: <span className="text-emerald-500">ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
