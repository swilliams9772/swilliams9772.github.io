"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'
import { getProjectComplexity } from '@/utils/project-analysis'

interface ProjectMatrixViewProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

type MatrixCell = {
  difficulty: number
  impact: 'High' | 'Medium' | 'Low'
  projects: Project[]
}

export function ProjectMatrixView({ projects, onProjectClick }: ProjectMatrixViewProps) {
  const getProjectImpact = (project: Project): 'High' | 'Medium' | 'Low' => {
    const complexity = getProjectComplexity(project)
    if (complexity >= 80) return 'High'
    if (complexity >= 50) return 'Medium'
    return 'Low'
  }

  const matrix: Record<string, MatrixCell[]> = {
    'High': [
      { difficulty: 5, impact: 'High', projects: [] },
      { difficulty: 4, impact: 'High', projects: [] },
      { difficulty: 3, impact: 'High', projects: [] }
    ],
    'Medium': [
      { difficulty: 5, impact: 'Medium', projects: [] },
      { difficulty: 4, impact: 'Medium', projects: [] },
      { difficulty: 3, impact: 'Medium', projects: [] }
    ],
    'Low': [
      { difficulty: 5, impact: 'Low', projects: [] },
      { difficulty: 4, impact: 'Low', projects: [] },
      { difficulty: 3, impact: 'Low', projects: [] }
    ]
  }

  // Populate matrix with projects
  projects.forEach(project => {
    const impact = getProjectImpact(project)
    const difficulty = project.difficulty || 3
    const cell = matrix[impact].find(cell => cell.difficulty === difficulty)
    if (cell) {
      cell.projects.push(project)
    }
  })

  const getBackgroundColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-500/10'
      case 'Medium': return 'bg-yellow-500/10'
      case 'Low': return 'bg-red-500/10'
      default: return 'bg-muted'
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(matrix).map(([impact, cells]) => (
          <div key={impact} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{impact} Impact</h3>
              <Badge variant="outline">
                {cells.reduce((acc, cell) => acc + cell.projects.length, 0)} Projects
              </Badge>
            </div>
            <div className="space-y-4">
              {cells.map((cell) => (
                <motion.div
                  key={`${impact}-${cell.difficulty}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg ${getBackgroundColor(impact)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ClientIcon 
                        icon={Icons.Target} 
                        className="h-4 w-4 text-primary" 
                      />
                      <span>Level {cell.difficulty}</span>
                    </div>
                    <Badge>{cell.projects.length} Projects</Badge>
                  </div>
                  <div className="grid gap-2">
                    {cell.projects.map(project => (
                      <Card
                        key={project.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onProjectClick(project)}
                      >
                        <CardContent className="p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{project.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                            {project.featured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map(tech => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                          {project.metrics && (
                            <div className="flex items-center gap-2">
                              <ClientIcon 
                                icon={Icons.TrendingUp} 
                                className="h-4 w-4 text-green-500" 
                              />
                              <span className="text-sm text-green-500">
                                {project.metrics[0].improvement}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 