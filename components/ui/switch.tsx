"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const switchVariants = {
  default: {
    root: "bg-input",
    active: "bg-primary",
    thumb: "bg-background"
  },
  success: {
    root: "bg-red-200 dark:bg-red-900",
    active: "bg-green-500",
    thumb: "bg-white"
  },
  danger: {
    root: "bg-green-200 dark:bg-green-900",
    active: "bg-red-500",
    thumb: "bg-white"
  },
  primary: {
    root: "bg-primary/20",
    active: "bg-primary",
    thumb: "bg-white"
  },
  secondary: {
    root: "bg-secondary/20",
    active: "bg-secondary",
    thumb: "bg-white"
  }
} as const

type SwitchVariant = keyof typeof switchVariants

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  variant?: SwitchVariant
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
  label?: string
  description?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ 
  className, 
  variant = "default",
  size = "md",
  icon,
  label,
  description,
  ...props 
}, ref) => {
  const variants = switchVariants[variant]
  
  const sizeClasses = {
    sm: {
      root: "h-4 w-8",
      thumb: "h-3 w-3",
      translate: "translate-x-4"
    },
    md: {
      root: "h-6 w-11",
      thumb: "h-5 w-5",
      translate: "translate-x-5"
    },
    lg: {
      root: "h-8 w-14",
      thumb: "h-7 w-7",
      translate: "translate-x-6"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitives.Root
        className={cn(
          "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          sizeClasses[size].root,
          variants.root,
          "data-[state=checked]:" + variants.active,
          className
        )}
        {...props}
        ref={ref}
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block rounded-full shadow-lg ring-0 transition-transform",
              sizeClasses[size].thumb,
              variants.thumb,
              "data-[state=checked]:" + sizeClasses[size].translate
            )}
          >
            {icon && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex items-center justify-center h-full"
              >
                {icon}
              </motion.div>
            )}
          </SwitchPrimitives.Thumb>
        </motion.div>
      </SwitchPrimitives.Root>
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={props.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch } 