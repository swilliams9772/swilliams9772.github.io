"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types/project'
import { calculateProjectImpact, getProjectStatus } from '@/lib/utils/project'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
  onClick?: (project: Project) => void
  className?: string
  searchTerm?: string
  filterTags?: string[]
}

export function ProjectCard({ project, index, onClick, className, searchTerm, filterTags }: ProjectCardProps) {
  const matchesSearch = !searchTerm || 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
  const matchesTags = !filterTags?.length || 
    filterTags.every(tag => project.tags.includes(tag));

  if (!matchesSearch || !matchesTags) return null;

  const impact = calculateProjectImpact(project)
  const status = getProjectStatus(project)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn("w-full", className)}
    >
      <Card 
        className="h-full hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onClick?.(project)}
      >
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={cn("ml-2", status.color)}
              >
                <ClientIcon 
                  icon={Icons[status.icon]} 
                  className="h-4 w-4 mr-1" 
                />
                {status.label}
              </Badge>
            </div>
          </div>

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {project.metrics.map(metric => (
                <div 
                  key={metric.name} 
                  className="text-center p-2 rounded-lg bg-muted/50"
                >
                  <div className="text-lg font-semibold text-primary">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.name}
                  </div>
                  {metric.improvement && (
                    <div className="text-xs text-green-500">
                      {metric.improvement}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="flex justify-between items-center pt-4">
            {project.technologies?.length > 0 && (
              <div className="flex gap-2">
                {project.technologies.slice(0, 3).map(tech => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            )}
            
            {/* Links */}
            <div className="flex gap-2 ml-auto">
              {project.github && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <ClientIcon icon={Icons.Github} className="h-4 w-4" />
                </Button>
              )}
              {project.demo && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demo, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <ClientIcon icon={Icons.ExternalLink} className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 