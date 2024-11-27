"use client"

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4'
}

export const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="relative">
        {/* Main spinner */}
        <div
          className={cn(
            "animate-spin rounded-full border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent",
            sizeClasses[size],
            className
          )}
        />
        
        {/* Inner glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-t-blue-400/20 border-r-transparent border-b-blue-400/20 border-l-transparent animate-pulse",
            sizeClasses[size]
          )}
        />

        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-zinc-400">
          Loading...
        </div>
      </div>
    </div>
  )
} 