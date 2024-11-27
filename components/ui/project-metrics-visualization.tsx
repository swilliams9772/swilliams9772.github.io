"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'
import {
  getProjectComplexity,
  getProjectImpact,
  getTechnologyStats
} from '@/utils/project-analysis'

interface ProjectMetricsVisualizationProps {
  project: Project
}

export function ProjectMetricsVisualization({ project }: ProjectMetricsVisualizationProps) {
  const complexity = getProjectComplexity(project)
  const impact = getProjectImpact(project)
  const techStats = getTechnologyStats()

  const projectTechStats = project.technologies.map(tech => ({
    name: tech,
    usage: techStats.find(t => t.name === tech)?.count || 0,
    categories: techStats.find(t => t.name === tech)?.categories || []
  }))

  return (
    <div className="space-y-6">
      {/* Complexity and Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Project Complexity</h4>
              <Badge variant="outline">{complexity}/100</Badge>
            </div>
            <Progress value={complexity} className="h-2" />
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <ClientIcon icon={Icons.Code} className="h-4 w-4" />
                <span>{project.technologies.length} Technologies</span>
              </div>
              {project.teamSize && (
                <div className="flex items-center gap-1">
                  <ClientIcon icon={Icons.Users} className="h-4 w-4" />
                  <span>{project.teamSize} Team Members</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Project Impact</h4>
              <Badge variant="outline">{impact.toFixed(1)}x</Badge>
            </div>
            <Progress value={Math.min(impact * 10, 100)} className="h-2" />
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {project.metrics?.map(metric => (
                <div key={metric.name} className="flex items-center gap-1">
                  <ClientIcon icon={Icons.TrendingUp} className="h-4 w-4" />
                  <span>{metric.improvement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Usage Analysis */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h4 className="font-medium">Technology Usage Analysis</h4>
          <div className="space-y-3">
            {projectTechStats.map(tech => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-1"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge>{tech.name}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Used in {tech.usage} projects
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {tech.categories.map(cat => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Progress 
                  value={(tech.usage / Math.max(...projectTechStats.map(t => t.usage))) * 100} 
                  className="h-1"
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Pipeline Visualization */}
      {project.technical?.pipeline && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h4 className="font-medium">Technical Pipeline</h4>
            <div className="space-y-4">
              {project.technical.pipeline.map((step, index) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ClientIcon 
                        icon={Icons.GitBranch} 
                        className="h-4 w-4 text-primary" 
                      />
                      <span className="font-medium">{step.name}</span>
                    </div>
                    <Badge variant="outline">{step.performance.value}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={step.performance.percentage} 
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">
                      {step.performance.percentage}%
                    </span>
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