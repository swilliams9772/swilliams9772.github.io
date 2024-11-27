"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface VisualizationTooltipProps {
  content: React.ReactNode;
  visible: boolean;
  x: number;
  y: number;
  className?: string;
  offset?: { x?: number; y?: number };
  placement?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  maxWidth?: number;
  interactive?: boolean;
  onClose?: () => void;
}

export function VisualizationTooltip({
  content,
  visible,
  x,
  y,
  className,
  offset = { x: 10, y: -10 },
  placement = 'right',
  delay = 0,
  maxWidth = 320,
  interactive = false,
  onClose
}: VisualizationTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x, y })

  useEffect(() => {
    if (!tooltipRef.current || !visible) return

    const tooltip = tooltipRef.current
    const rect = tooltip.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let newX = x + (offset.x ?? 0)
    let newY = y + (offset.y ?? 0)

    // Adjust position based on placement
    switch (placement) {
      case 'top':
        newY = y - rect.height - (offset.y ?? 10)
        newX = x - rect.width / 2
        break
      case 'right':
        newX = x + (offset.x ?? 10)
        newY = y - rect.height / 2
        break
      case 'bottom':
        newY = y + (offset.y ?? 10)
        newX = x - rect.width / 2
        break
      case 'left':
        newX = x - rect.width - (offset.x ?? 10)
        newY = y - rect.height / 2
        break
    }

    // Keep tooltip within viewport
    if (newX + rect.width > viewportWidth) {
      newX = viewportWidth - rect.width - 10
    }
    if (newX < 0) {
      newX = 10
    }
    if (newY + rect.height > viewportHeight) {
      newY = viewportHeight - rect.height - 10
    }
    if (newY < 0) {
      newY = 10
    }

    setPosition({ x: newX, y: newY })
  }, [x, y, visible, offset, placement])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15, delay }}
          className={cn(
            "fixed z-50 p-4 bg-popover/95 text-popover-foreground rounded-lg shadow-lg backdrop-blur-sm border",
            interactive ? "pointer-events-auto" : "pointer-events-none",
            className
          )}
          style={{
            left: position.x,
            top: position.y,
            maxWidth,
            transformOrigin: placement === 'top' ? 'bottom' : 'top'
          }}
          role="tooltip"
          aria-hidden={!visible}
        >
          {interactive && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          )}
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 