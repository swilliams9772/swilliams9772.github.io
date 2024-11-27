"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'

interface ProjectTimelineViewProps {
  projects: Project[]
}

export function ProjectTimelineView({ projects }: ProjectTimelineViewProps) {
  const timelineProjects = projects
    .filter(p => p.timeline)
    .sort((a, b) => new Date(b.timeline).getTime() - new Date(a.timeline).getTime())

  const years = [...new Set(timelineProjects.map(p => 
    new Date(p.timeline).getFullYear()
  ))].sort((a, b) => b - a)

  return (
    <div className="space-y-8">
      {years.map((year, yearIndex) => (
        <motion.div
          key={year}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: yearIndex * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <ClientIcon icon={Icons.Calendar} className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">{year}</h3>
          </div>

          <div className="space-y-4">
            {timelineProjects
              .filter(p => new Date(p.timeline).getFullYear() === year)
              .map((project, projectIndex) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: projectIndex * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {new Date(project.timeline).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric'
                          })}
                        </Badge>
                      </div>

                      {/* Project Progress */}
                      {project.status && (
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Project Status</span>
                            <span className="capitalize">{project.status}</span>
                          </div>
                          <Progress 
                            value={getStatusProgress(project.status)} 
                            className="h-2" 
                          />
                        </div>
                      )}

                      {/* Key Achievements */}
                      {project.outcomes && (
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-medium">Key Achievements</h5>
                          <div className="grid gap-2">
                            {project.outcomes.map((outcome, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <ClientIcon 
                                  icon={Icons.CheckCircle} 
                                  className="h-4 w-4 text-green-500" 
                                />
                                <span className="text-sm">{outcome}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies Used */}
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function getStatusProgress(status: string): number {
  const statusMap: Record<string, number> = {
    'planning': 20,
    'in-progress': 50,
    'review': 80,
    'completed': 100
  }
  return statusMap[status.toLowerCase()] || 0
} 