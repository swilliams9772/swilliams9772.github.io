"use client"

import React from 'react'
import { motion, Reorder } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'

interface ProjectKanbanViewProps {
  projects: Project[]
  onProjectClick: (project: Project) => void
}

type KanbanColumn = {
  id: string
  title: string
  icon: keyof typeof Icons
  status: Project['status']
}

const kanbanColumns: KanbanColumn[] = [
  { id: 'planned', title: 'Planned', icon: 'Clock', status: 'planned' },
  { id: 'in-progress', title: 'In Progress', icon: 'Timer', status: 'in-progress' },
  { id: 'review', title: 'In Review', icon: 'CheckSquare', status: 'review' },
  { id: 'completed', title: 'Completed', icon: 'CheckCircle', status: 'completed' }
]

export function ProjectKanbanView({ projects, onProjectClick }: ProjectKanbanViewProps) {
  const getColumnProjects = (status: Project['status']) => 
    projects.filter(p => p.status === status)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kanbanColumns.map(column => (
        <div key={column.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClientIcon 
                icon={Icons[column.icon]} 
                className="h-5 w-5 text-primary" 
              />
              <h3 className="font-semibold">{column.title}</h3>
            </div>
            <Badge variant="outline">
              {getColumnProjects(column.status).length}
            </Badge>
          </div>

          <Reorder.Group 
            axis="y" 
            values={getColumnProjects(column.status)} 
            onReorder={() => {}}
            className="space-y-4"
          >
            {getColumnProjects(column.status).map((project, index) => (
              <Reorder.Item
                key={project.id}
                value={project}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => onProjectClick(project)}
                >
                  <CardContent className="p-4 space-y-3">
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

                    {/* Project Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{getProjectProgress(project)}%</span>
                      </div>
                      <Progress value={getProjectProgress(project)} />
                    </div>

                    {/* Project Tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Project Metrics */}
                    {project.metrics && (
                      <div className="grid grid-cols-2 gap-2">
                        {project.metrics.slice(0, 2).map(metric => (
                          <div 
                            key={metric.name}
                            className="text-center p-2 bg-muted rounded-lg"
                          >
                            <div className="text-sm font-medium">
                              {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Project Team Size */}
                    {project.teamSize && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClientIcon icon={Icons.Users} className="h-4 w-4" />
                        <span>Team: {project.teamSize}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      ))}
    </div>
  )
}

function getProjectProgress(project: Project): number {
  if (project.status === 'completed') return 100
  if (project.status === 'review') return 80
  if (project.status === 'in-progress') return 50
  return 20
} 