"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { gradients, transitions } from '@/lib/utils/theme-config'

interface SectionLayoutProps {
  id: string
  className?: string
  children: React.ReactNode
  gradient?: keyof typeof gradients
  pattern?: 'dots' | 'grid' | 'waves' | 'none'
  animate?: boolean
}

const patterns = {
  dots: "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]",
  grid: "bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]",
  waves: "bg-[url('/patterns/waves.svg')] bg-repeat dark:opacity-5",
  none: ""
}

export const SectionLayout = ({
  id,
  className,
  children,
  gradient = 'primary',
  pattern = 'none',
  animate = true
}: SectionLayoutProps) => {
  const content = (
    <div className="container mx-auto px-4">
      {children}
    </div>
  )

  return (
    <section
      id={id}
      className={cn(
        "relative py-20 overflow-hidden",
        transitions.slow,
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-10",
          gradients[gradient]
        )} />
        <div className={cn(
          "absolute inset-0",
          patterns[pattern]
        )} />
      </div>

      {/* Content with optional animation */}
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {content}
        </motion.div>
      ) : content}

      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </section>
  )
} 