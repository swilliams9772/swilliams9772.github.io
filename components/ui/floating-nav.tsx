"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { 
  Home,
  User,
  Briefcase,
  Code,
  FileText,
  Mail,
  Brain,
  History,
  GraduationCap,
  MessageSquare
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '#home', description: 'Back to top' },
  { icon: User, label: 'About', href: '#about', description: 'Learn about me' },
  { icon: Brain, label: 'Technology', href: '#technology', description: 'Tech stack & skills' },
  { icon: Briefcase, label: 'Projects', href: '#projects', description: 'Featured work' },
  { icon: History, label: 'Experience', href: '#experience', description: 'Work history' },
  { icon: GraduationCap, label: 'Education', href: '#education', description: 'Academic background' },
  { icon: FileText, label: 'Publications', href: '#publications', description: 'Research & writing' },
  { icon: MessageSquare, label: 'Contact', href: '#contact', description: 'Get in touch' }
]

export function FloatingNav() {
  const [activeSection, setActiveSection] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
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

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full relative transition-all duration-300 hover:bg-primary/10",
                    activeSection === item.href.slice(1) && 
                    "bg-primary/10 text-primary shadow-lg shadow-primary/20"
                  )}
                  onClick={() => {
                    document.querySelector(item.href)?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Button>

                <motion.div
                  className="absolute left-full ml-2 px-2 py-1 rounded-md text-sm
                           bg-background/80 backdrop-blur-sm border shadow-lg
                           opacity-0 pointer-events-none group-hover:opacity-100
                           group-hover:pointer-events-auto whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </motion.div>

                {activeSection === item.href.slice(1) && (
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 
                             bg-primary rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 