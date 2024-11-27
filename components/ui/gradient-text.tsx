import { cn } from "@/lib/utils"
import { textGradients } from "@/lib/utils/theme-config"

interface GradientTextProps {
  variant?: keyof typeof textGradients
  className?: string
  children: React.ReactNode
}

export function GradientText({
  variant = "primary",
  className,
  children
}: GradientTextProps) {
  return (
    <span className={cn(textGradients[variant], className)}>
      {children}
    </span>
  )
} 