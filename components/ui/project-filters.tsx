"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'
import { projectCategories } from '@/data/projects-data'
import { DifficultyFilter } from '@/components/ui/difficulty-filter'

interface ProjectFiltersProps {
  projects: Project[]
  filters: {
    search: string
    category: string
    technology: string
    difficulty: number | null
    status: string
    featured: boolean
    timeline?: string
    impact?: 'High' | 'Medium' | 'Low'
    hasMetrics?: boolean
    hasTechnicalDetails?: boolean
  }
  onFilterChange: (filters: any) => void
}

export function ProjectFilters({ projects, filters, onFilterChange }: ProjectFiltersProps) {
  // Get unique technologies across all projects
  const technologies = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  ).sort()

  // Get unique statuses
  const statuses = Array.from(
    new Set(projects.filter(p => p.status).map(p => p.status))
  )

  const timelinePeriods = [
    'Last Month',
    'Last 3 Months',
    'Last 6 Months',
    'Last Year',
    'All Time'
  ]

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search and Basic Filters */}
          <div className="space-y-4">
            {/* Search */}
            <div className="flex items-center gap-2">
              <ClientIcon icon={Icons.Search} className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="flex-1"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {/* Categories */}
              <Select
                value={filters.category}
                onValueChange={(value) => onFilterChange({ ...filters, category: value })}
              >
                <option value="">All Categories</option>
                {Object.values(projectCategories).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>

              {/* Technologies */}
              <Select
                value={filters.technology}
                onValueChange={(value) => onFilterChange({ ...filters, technology: value })}
              >
                <option value="">All Technologies</option>
                {technologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </Select>

              {/* Status */}
              <Select
                value={filters.status}
                onValueChange={(value) => onFilterChange({ ...filters, status: value })}
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="space-y-4">
            {/* Difficulty Filter */}
            <DifficultyFilter
              value={filters.difficulty}
              onChange={(value) => onFilterChange({ ...filters, difficulty: value })}
            />

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Timeline Filter */}
              <Select
                value={filters.timeline || ''}
                onValueChange={(value) => onFilterChange({ ...filters, timeline: value })}
              >
                <option value="">All Time Periods</option>
                {timelinePeriods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </Select>

              {/* Impact Filter */}
              <Select
                value={filters.impact || ''}
                onValueChange={(value) => 
                  onFilterChange({ ...filters, impact: value as typeof filters.impact })
                }
              >
                <option value="">All Impact Levels</option>
                <option value="High">High Impact</option>
                <option value="Medium">Medium Impact</option>
                <option value="Low">Low Impact</option>
              </Select>
            </div>

            {/* Toggle Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={filters.featured}
                  onCheckedChange={(checked) => 
                    onFilterChange({ ...filters, featured: checked })
                  }
                />
                <span className="text-sm">Featured Only</span>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={filters.hasMetrics}
                  onCheckedChange={(checked) => 
                    onFilterChange({ ...filters, hasMetrics: checked })
                  }
                />
                <span className="text-sm">Has Metrics</span>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={filters.hasTechnicalDetails}
                  onCheckedChange={(checked) => 
                    onFilterChange({ ...filters, hasTechnicalDetails: checked })
                  }
                />
                <span className="text-sm">Has Technical Details</span>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null
              return (
                <Badge
                  key={key}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => onFilterChange({ ...filters, [key]: '' })}
                >
                  {key}: {value.toString()}
                  <ClientIcon icon={Icons.X} className="ml-1 h-3 w-3" />
                </Badge>
              )
            })}
            {Object.values(filters).some(Boolean) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange({
                  search: '',
                  category: '',
                  technology: '',
                  difficulty: null,
                  status: '',
                  featured: false,
                  timeline: '',
                  impact: '',
                  hasMetrics: false,
                  hasTechnicalDetails: false
                })}
              >
                Clear All
              </Button>
            )}
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
} 