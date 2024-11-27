"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/data/personal-info'

interface MobileNavProps {
  items: Array<{
    label: string
    href: string
    icon: any
  }>
  activeSection: string
  onClose: () => void
}

const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05
    }
  }
}

const itemVariants = {
  closed: {
    x: 50,
    opacity: 0
  },
  open: {
    x: 0,
    opacity: 1
  }
}

const socialLinks = [
  {
    icon: Icons.Linkedin,
    href: `https://${personalInfo.linkedin}`,
    label: 'LinkedIn',
    color: 'text-blue-500'
  },
  {
    icon: Icons.Github,
    href: `https://${personalInfo.github}`,
    label: 'GitHub',
    color: 'text-purple-500'
  },
  {
    icon: Icons.Mail,
    href: `mailto:${personalInfo.email}`,
    label: 'Email',
    color: 'text-green-500'
  }
]

export function MobileNav({ items, activeSection, onClose }: MobileNavProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Handle swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    
    if (isLeftSwipe) {
      onClose()
    }
  }

  return (
    <motion.div
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-y-0 right-0 w-full sm:w-80 z-50 bg-background/95 backdrop-blur-lg border-l shadow-xl"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 border-b"
        >
          <div className="flex items-center gap-2">
            <ClientIcon icon={Icons.Brain} className="h-6 w-6 text-primary" />
            <span className="font-semibold">{personalInfo.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <ClientIcon icon={Icons.X} className="h-6 w-6" />
          </Button>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-4 space-y-1">
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                custom={index}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    "hover:bg-muted hover:scale-[1.02]",
                    activeSection === item.href.slice(1) && "bg-muted text-primary"
                  )}
                >
                  <ClientIcon icon={item.icon} className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 border-t"
        >
          <div className="space-y-4">
            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    "hover:bg-muted hover:scale-110",
                    link.color
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ClientIcon icon={link.icon} className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Contact Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  Get in Touch
                  <ClientIcon icon={Icons.Send} className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            {/* Swipe Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-sm text-muted-foreground"
            >
              <p className="flex items-center justify-center gap-2">
                <ClientIcon icon={Icons.SwipeRight} className="h-4 w-4" />
                Swipe right to close
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 