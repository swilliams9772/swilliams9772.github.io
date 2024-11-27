import { cn } from "@/lib/utils"
import { glassEffect } from "@/lib/utils/theme-config"

interface GlassPanelProps {
  variant?: keyof typeof glassEffect
  className?: string
  children: React.ReactNode
}

export function GlassPanel({
  variant = "subtle",
  className,
  children
}: GlassPanelProps) {
  return (
    <div className={cn(glassEffect[variant], className)}>
      {children}
    </div>
  )
} 