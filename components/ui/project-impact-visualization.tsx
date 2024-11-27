"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'
import { getProjectImpact } from '@/utils/project-analysis'

interface ProjectImpactVisualizationProps {
  project: Project
}

export function ProjectImpactVisualization({ project }: ProjectImpactVisualizationProps) {
  const impact = getProjectImpact(project)
  const impactCategories = {
    technical: calculateTechnicalImpact(project),
    business: calculateBusinessImpact(project),
    social: calculateSocialImpact(project),
    innovation: calculateInnovationScore(project)
  }

  return (
    <div className="space-y-6">
      {/* Overall Impact Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Project Impact Analysis</h3>
            <Badge variant="outline">
              Impact Score: {Math.round(impact * 10)}/100
            </Badge>
          </div>

          {/* Impact Categories */}
          <div className="space-y-4">
            {Object.entries(impactCategories).map(([category, score], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ClientIcon 
                      icon={getCategoryIcon(category)} 
                      className="h-4 w-4 text-primary" 
                    />
                    <span className="capitalize">{category} Impact</span>
                  </div>
                  <span className="text-sm">{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
                {getImpactDescription(category, score)}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Visualization */}
      {project.metrics && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted rounded-lg"
                >
                  <div className="text-2xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {metric.name}
                  </div>
                  <div className="text-sm text-green-500 mt-1">
                    {metric.improvement}
                  </div>
                  {getMetricInsight(metric)}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline Impact */}
      {project.timelineDetails && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Impact Timeline</h3>
            <div className="space-y-4">
              {project.timelineDetails.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-32 font-medium">{phase.phase}</div>
                  <div className="flex-1">
                    <Progress 
                      value={((index + 1) / project.timelineDetails!.length) * 100} 
                    />
                  </div>
                  <div className="w-24 text-sm text-muted-foreground">
                    {phase.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Helper functions
function calculateTechnicalImpact(project: Project): number {
  const factors = {
    complexity: project.difficulty || 3,
    technologiesCount: project.technologies.length,
    metricsImprovement: getAverageImprovement(project.metrics || [])
  }
  
  return Math.min(
    Math.round(
      (factors.complexity * 15 +
       factors.technologiesCount * 5 +
       factors.metricsImprovement * 0.5)
    ),
    100
  )
}

function calculateBusinessImpact(project: Project): number {
  const hasMetrics = project.metrics && project.metrics.length > 0
  const hasPositiveOutcomes = project.outcomes.some(o => 
    o.toLowerCase().includes('increase') || 
    o.toLowerCase().includes('improve') ||
    o.toLowerCase().includes('reduce')
  )
  
  return hasMetrics && hasPositiveOutcomes ? 85 : 60
}

function calculateSocialImpact(project: Project): number {
  const socialKeywords = ['accessibility', 'community', 'education', 'social']
  const hasSocialImpact = project.tags.some(tag => 
    socialKeywords.some(keyword => 
      tag.toLowerCase().includes(keyword)
    )
  )
  
  return hasSocialImpact ? 90 : 70
}

function calculateInnovationScore(project: Project): number {
  const innovationFactors = {
    isNovel: project.tags.some(t => 
      t.toLowerCase().includes('novel') || 
      t.toLowerCase().includes('innovative')
    ),
    usesCuttingEdgeTech: project.technologies.some(t =>
      ['GPT', 'Quantum', 'Blockchain'].some(tech => 
        t.includes(tech)
      )
    ),
    hasResearchAspect: project.tags.some(t => 
      t.toLowerCase().includes('research')
    )
  }
  
  return Object.values(innovationFactors).filter(Boolean).length * 30
}

function getAverageImprovement(metrics: Project['metrics']): number {
  if (!metrics?.length) return 0
  return metrics.reduce((acc, metric) => {
    const value = parseFloat(metric.improvement.replace(/[^0-9.-]/g, ''))
    return acc + (isNaN(value) ? 0 : value)
  }, 0) / metrics.length
}

function getCategoryIcon(category: string): keyof typeof Icons {
  const iconMap: Record<string, keyof typeof Icons> = {
    technical: 'Code',
    business: 'LineChart',
    social: 'Users',
    innovation: 'Lightbulb'
  }
  return iconMap[category] || 'Circle'
}

function getImpactDescription(category: string, score: number): JSX.Element {
  const descriptions: Record<string, Record<string, string>> = {
    technical: {
      high: "Significant technical achievements and innovations",
      medium: "Solid technical implementation with good practices",
      low: "Basic technical implementation"
    },
    business: {
      high: "Strong business value and measurable outcomes",
      medium: "Good business impact with room for growth",
      low: "Limited business metrics available"
    },
    social: {
      high: "Major positive social impact",
      medium: "Moderate social benefits",
      low: "Indirect social impact"
    },
    innovation: {
      high: "Cutting-edge innovation and novel approaches",
      medium: "Innovative elements in implementation",
      low: "Standard implementation approaches"
    }
  }

  const level = score >= 80 ? 'high' : score >= 50 ? 'medium' : 'low'
  
  return (
    <div className="text-sm text-muted-foreground">
      {descriptions[category]?.[level]}
    </div>
  )
}

function getMetricInsight(metric: Project['metrics'][0]): JSX.Element {
  const value = parseFloat(metric.improvement.replace(/[^0-9.-]/g, ''))
  const isPositive = !isNaN(value) && value > 0

  return (
    <div className="text-xs text-muted-foreground mt-2">
      <ClientIcon 
        icon={isPositive ? Icons.TrendingUp : Icons.TrendingDown}
        className={cn(
          "inline-block mr-1 h-3 w-3",
          isPositive ? "text-green-500" : "text-red-500"
        )}
      />
      {isPositive ? 'Positive trend' : 'Needs improvement'}
    </div>
  )
} 