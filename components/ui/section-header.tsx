import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { textGradients, transitions } from '@/lib/utils/theme-config'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  gradient?: keyof typeof textGradients
  className?: string
  align?: 'left' | 'center' | 'right'
}

export const SectionHeader = ({
  title,
  subtitle,
  gradient = 'primary',
  className,
  align = 'center'
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-12',
        {
          'text-center': align === 'center',
          'text-left': align === 'left',
          'text-right': align === 'right'
        },
        className
      )}
    >
      <h2 className={cn(
        'text-3xl font-bold mb-4',
        textGradients[gradient],
        transitions.fast
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn(
        "mt-4",
        {
          'flex justify-center': align === 'center',
          'flex justify-start': align === 'left',
          'flex justify-end': align === 'right'
        }
      )}>
        <motion.div
          className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  )
} 