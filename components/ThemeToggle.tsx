"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : 180
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <ClientIcon icon={Icons.Sun} className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : -180
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <ClientIcon icon={Icons.Moon} className="h-5 w-5" />
      </motion.div>
    </Button>
  )
} 