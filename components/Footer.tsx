"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { transitions } from '@/lib/utils/theme-config'
import type { SocialLink } from '@/types'

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/swilliams9772",
    icon: Github,
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/shaquille-williams-957970129/",
    icon: Linkedin,
    label: "LinkedIn"
  },
  {
    href: "https://twitter.com/swilliams9772",
    icon: Twitter,
    label: "Twitter"
  },
  {
    href: "mailto:shaq.williams.ai@gmail.com",
    icon: Mail,
    label: "Email"
  }
]

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Shaquille Williams. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  transitions.fast
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

