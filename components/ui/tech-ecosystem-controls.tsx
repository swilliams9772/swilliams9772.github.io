"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Button } from './button'
import { Slider } from './slider'
import { Switch } from './switch'
import { cn } from '@/lib/utils'
import { 
  Filter,
  Layers,
  Network,
  RefreshCcw,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { getTechnologyMetrics } from '@/lib/utils/technology'

interface TechEcosystemControlsProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onLayoutChange: (type: 'force' | 'radial' | 'hierarchical') => void;
  onStrengthFilterChange: (value: number) => void;
  onShowLabelsChange: (show: boolean) => void;
  onShowMetricsChange: (show: boolean) => void;
  onResetLayout: () => void;
  className?: string;
}

export function TechEcosystemControls({
  categories,
  onCategoryChange,
  onLayoutChange,
  onStrengthFilterChange,
  onShowLabelsChange,
  onShowMetricsChange,
  onResetLayout,
  className
}: TechEcosystemControlsProps) {
  const metrics = getTechnologyMetrics();

  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Technologies</div>
            <div className="text-2xl font-bold text-primary">
              {metrics.totalTechnologies}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Avg. Proficiency</div>
            <div className="text-2xl font-bold text-primary">
              {metrics.averageProficiency}%
            </div>
          </div>
        </div>

        {/* Top Technologies */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Top Technologies
          </div>
          <div className="space-y-2">
            {metrics.topTechnologies.map(tech => (
              <div key={tech.name} className="flex items-center justify-between">
                <Badge variant="outline">{tech.name}</Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{tech.usage} projects</span>
                  {tech.trend === 'rising' && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                  {tech.trend === 'stable' && (
                    <Minus className="h-4 w-4 text-blue-500" />
                  )}
                  {tech.trend === 'declining' && (
                    <TrendingDown className="h-4 w-4 text-amber-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            Categories
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCategoryChange('all')}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => onCategoryChange(category)}
              >
                {category}
                <Badge variant="secondary" className="ml-2">
                  {metrics.categoryDistribution[category] || 0}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Layout Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Layers className="h-4 w-4" />
            Layout
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLayoutChange('force')}
              className="flex items-center gap-2"
            >
              <Network className="h-4 w-4" />
              Force
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLayoutChange('radial')}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Radial
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLayoutChange('hierarchical')}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Hierarchical
            </Button>
          </div>
        </div>

        {/* Visualization Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4" />
            Display Options
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Connection Strength</span>
              <Slider
                defaultValue={[0]}
                max={100}
                step={10}
                onValueChange={([value]) => onStrengthFilterChange(value)}
                className="w-[120px]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Show Labels</span>
              <Switch onCheckedChange={onShowLabelsChange} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Show Metrics</span>
              <Switch onCheckedChange={onShowMetricsChange} />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={onResetLayout}
        >
          Reset Layout
        </Button>
      </div>
    </Card>
  )
} 