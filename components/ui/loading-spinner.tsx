"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
}

const colors = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  accent: 'border-accent'
}

export const LoadingSpinner = ({ 
  size = 'md', 
  className,
  color = 'primary' 
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className={cn(
          "border-2 rounded-full",
          sizes[size],
          colors[color],
          "border-t-transparent",
          className
        )}
        animate={{ 
          rotate: 360,
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
    </div>
  )
} 