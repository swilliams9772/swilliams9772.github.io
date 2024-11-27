"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

interface VisualizationContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  timeRange?: string;
  summary?: Record<string, number | string>;
  isEmpty?: boolean;
  isLoading?: boolean;
  error?: Error;
  onRetry?: () => void;
}

export function VisualizationContainer({
  title,
  children,
  className,
  timeRange,
  summary,
  isEmpty = false,
  isLoading = false,
  error,
  onRetry
}: VisualizationContainerProps) {
  if (isLoading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Icons.Loader className="h-8 w-8 text-muted-foreground" />
          </motion.div>
          <p className="text-sm text-muted-foreground">Loading visualization...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
          <Icons.AlertTriangle className="h-12 w-12 text-yellow-500" />
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">Visualization Error</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {error.message}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  if (isEmpty) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
          <Icons.Database className="h-12 w-12 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {timeRange && (
            <span className="text-sm text-muted-foreground">{timeRange}</span>
          )}
        </div>

        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(summary).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm text-muted-foreground">{key}</p>
                <p className="text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </Card>
  )
} 