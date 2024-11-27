"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/data/personal-info'

const navItems = [
  { label: 'About', href: '#about', icon: Icons.User },
  { label: 'Technology', href: '#technology', icon: Icons.Brain },
  { label: 'Experience', href: '#experience', icon: Icons.History },
  { label: 'Projects', href: '#projects', icon: Icons.Briefcase },
  { label: 'Education', href: '#education', icon: Icons.GraduationCap },
  { label: 'Contact', href: '#contact', icon: Icons.Mail }
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    const observeSection = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { threshold: 0.5 }
      )

      document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section)
      })

      return observer
    }

    window.addEventListener('scroll', handleScroll)
    const observer = observeSection()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b" : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <ClientIcon icon={Icons.Brain} className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-semibold">{personalInfo.name}</span>
            <span className="text-xs text-muted-foreground">{personalInfo.role}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-1"
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={activeSection === item.href.slice(1) ? "default" : "ghost"}
              className="flex items-center gap-2"
              onClick={() => {
                document.querySelector(item.href)?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              <ClientIcon icon={item.icon} className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <ClientIcon 
              icon={isMobileMenuOpen ? Icons.X : Icons.Menu} 
              className="h-6 w-6" 
            />
          </Button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur-sm"
          >
            <div className="container py-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={activeSection === item.href.slice(1) ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    document.querySelector(item.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <ClientIcon icon={item.icon} className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

