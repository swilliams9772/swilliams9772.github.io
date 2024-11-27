"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideProps, LucideIcon } from 'lucide-react'

interface ClientIconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  tooltip?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

export function ClientIcon({
  icon: Icon,
  className,
  size = 'md',
  color,
  animate = false,
  tooltip,
  onClick,
  disabled = false,
  loading = false,
  strokeWidth = 2,
  ...props
}: ClientIconProps) {
  const [isClient, setIsClient] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient || !Icon) {
    return null
  }

  return (
    <motion.div
      className={cn(
        'inline-flex items-center justify-center',
        disabled && 'opacity-50 cursor-not-allowed',
        onClick && !disabled && 'cursor-pointer',
        className
      )}
      whileHover={animate && !disabled ? { scale: 1.1 } : {}}
      whileTap={animate && !disabled ? { scale: 0.95 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      aria-label={tooltip}
      {...props}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={cn(sizeMap[size])}
        >
          <Icon
            className={cn(sizeMap[size])}
            style={{ 
              color: color,
              strokeWidth
            }}
          />
        </motion.div>
      ) : (
        <Icon
          className={cn(sizeMap[size])}
          style={{ 
            color: color,
            strokeWidth
          }}
        />
      )}
    </motion.div>
  )
} 