"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  animate?: boolean
}

const variantStyles = {
  default: "bg-primary",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-red-500"
}

const sizeStyles = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100,
    variant = 'default',
    size = 'md',
    showValue = false,
    animate = true,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div
        ref={ref}
        className={cn("w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <motion.div
          initial={animate ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className={cn(
            "h-full transition-all",
            variantStyles[variant],
            sizeStyles[size]
          )}
        >
          {showValue && (
            <span className="sr-only">{percentage}%</span>
          )}
        </motion.div>
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress } 