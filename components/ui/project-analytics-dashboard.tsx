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

interface ProjectAnalyticsDashboardProps {
  projects: Project[]
}

export function ProjectAnalyticsDashboard({ projects }: ProjectAnalyticsDashboardProps) {
  const categoryStats = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const difficultyStats = projects.reduce((acc, project) => {
    acc[project.difficulty] = (acc[project.difficulty] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const statusStats = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Project Categories */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Project Categories</h3>
            <ClientIcon icon={Icons.PieChart} className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category}</span>
                  <span>{count} projects</span>
                </div>
                <Progress 
                  value={(count / projects.length) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Complexity Distribution */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Complexity Distribution</h3>
            <ClientIcon icon={Icons.BarChart} className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-3">
            {Object.entries(difficultyStats)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([difficulty, count]) => (
                <div key={difficulty} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Level {difficulty}</span>
                    <span>{count} projects</span>
                  </div>
                  <Progress 
                    value={(count / projects.length) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Status Overview */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Project Status</h3>
            <ClientIcon icon={Icons.Target} className="h-5 w-5 text-primary" />
          </div>
          <div className="grid gap-4">
            {Object.entries(statusStats).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {status}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{count}</span>
                  <span className="text-sm text-muted-foreground">projects</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 