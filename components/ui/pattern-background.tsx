"use client"

import { cn } from "@/lib/utils"
import { patterns } from "@/lib/utils/theme-config"
import { motion } from "framer-motion"

interface PatternBackgroundProps {
  pattern?: keyof typeof patterns
  className?: string
  children?: React.ReactNode
}

export function PatternBackground({
  pattern = "dots",
  className,
  children
}: PatternBackgroundProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "relative w-full h-full",
        patterns[pattern],
        className
      )}
    >
      {children}
    </motion.div>
  )
} 