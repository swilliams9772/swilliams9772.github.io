"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ClientIcon } from './client-icon'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { Button } from './button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card } from './card'

interface LegendItem {
  label: string;
  color?: string;
  icon?: LucideIcon;
  description?: string;
  value?: number | string;
  isActive?: boolean;
}

interface VisualizationLegendProps {
  title: string;
  items: LegendItem[];
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  collapsible?: boolean;
  onItemClick?: (item: LegendItem) => void;
  maxHeight?: number;
  showValues?: boolean;
}

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4'
} as const;

export function VisualizationLegend({
  title,
  items,
  position = 'top-right',
  className,
  collapsible = true,
  onItemClick,
  maxHeight = 300,
  showValues = false
}: VisualizationLegendProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "absolute z-10",
        positionClasses[position],
        className
      )}
    >
      <Card className="p-3 backdrop-blur-sm bg-background/80">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h4 className="text-sm font-medium">{title}</h4>
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ClientIcon
                Icon={isCollapsed ? ChevronDown : ChevronUp}
                className="h-4 w-4"
              />
            </Button>
          )}
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-1.5"
              style={{ maxHeight, overflowY: "auto" }}
            >
              {items.map((item) => (
                <motion.div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded-md text-sm",
                    onItemClick && "cursor-pointer hover:bg-muted",
                    item.isActive === false && "opacity-50"
                  )}
                  onClick={() => onItemClick?.(item)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  {item.icon ? (
                    <ClientIcon
                      Icon={item.icon}
                      className={cn(
                        "h-4 w-4",
                        item.color && `text-[${item.color}]`
                      )}
                    />
                  ) : (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  <div className="flex-1 flex items-center justify-between">
                    <span className="capitalize">{item.label}</span>
                    {showValues && item.value && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {item.value}
                      </span>
                    )}
                  </div>
                  {item.description && hoveredItem === item.label && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute left-full ml-2 p-2 bg-popover text-popover-foreground rounded-md shadow-lg text-xs max-w-xs"
                    >
                      {item.description}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
} 