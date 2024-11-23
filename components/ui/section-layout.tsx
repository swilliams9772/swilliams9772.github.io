"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { patterns, gradients, glassEffect } from '@/lib/utils/theme-config'

interface SectionLayoutProps {
  children: React.ReactNode
  id?: string
  className?: string
  pattern?: keyof typeof patterns
  gradient?: keyof typeof gradients
  glass?: keyof typeof glassEffect
}

export function SectionLayout({
  children,
  id,
  className,
  pattern = 'none',
  gradient = 'primary',
  glass = 'subtle'
}: SectionLayoutProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 relative overflow-hidden',
        patterns[pattern],
        gradients[gradient],
        glass && glassEffect[glass],
        'transition-colors duration-300',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  )
} 