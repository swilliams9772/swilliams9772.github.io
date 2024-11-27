"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function PageTransition({ 
  children,
  className 
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  )
} 