"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ClientIconProps {
  Icon: LucideIcon
  className?: string
  animate?: boolean
  delay?: number
}

export const ClientIcon = ({ 
  Icon, 
  className, 
  animate = false,
  delay = 0 
}: ClientIconProps) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const IconComponent = (
    <Icon className={cn("transition-colors duration-200", className)} />
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.3, 
          delay,
          type: "spring",
          stiffness: 200
        }}
      >
        {IconComponent}
      </motion.div>
    )
  }

  return IconComponent
} 