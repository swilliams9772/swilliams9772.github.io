"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

interface DifficultyFilterProps {
  value: number | null
  onChange: (value: number | null) => void
}

const difficultyLevels = [
  { level: 1, label: 'Beginner', icon: Icons.Book, color: 'bg-green-500/10' },
  { level: 2, label: 'Elementary', icon: Icons.Code, color: 'bg-blue-500/10' },
  { level: 3, label: 'Intermediate', icon: Icons.GitBranch, color: 'bg-yellow-500/10' },
  { level: 4, label: 'Advanced', icon: Icons.Database, color: 'bg-orange-500/10' },
  { level: 5, label: 'Expert', icon: Icons.Brain, color: 'bg-red-500/10' }
]

export function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  return (
    <Card className="p-4">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Difficulty Level</h3>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange(null)}
              className="h-8 px-2"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {difficultyLevels.map((level) => (
            <motion.div
              key={level.level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(level.level === value ? null : level.level)}
              className={cn(
                'cursor-pointer rounded-lg p-2 text-center transition-colors',
                level.color,
                value === level.level ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
              )}
            >
              <ClientIcon
                icon={level.icon}
                className={cn(
                  'mx-auto mb-1 h-5 w-5',
                  value === level.level ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <div className="text-xs font-medium">{level.label}</div>
              <Badge 
                variant="outline" 
                className="mt-1 text-xs"
              >
                Level {level.level}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 