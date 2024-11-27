"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { personalInfo } from '@/data/personal-info'

export function Footer() {
  return (
    <footer className="border-t py-8 mt-20">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <ClientIcon icon={Icons.Brain} className="h-6 w-6 text-primary" />
            <span className="font-semibold">{personalInfo.name}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground"
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-primary transition-colors"
            >
              <ClientIcon icon={Icons.Mail} className="h-5 w-5" />
            </a>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <ClientIcon icon={Icons.Linkedin} className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

