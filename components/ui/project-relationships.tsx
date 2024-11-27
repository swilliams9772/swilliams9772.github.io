"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'
import { getRelatedProjects } from '@/utils/project-analysis'

interface ProjectRelationshipsProps {
  project: Project
  allProjects: Project[]
}

export function ProjectRelationships({ project, allProjects }: ProjectRelationshipsProps) {
  const relatedProjects = getRelatedProjects(project, 3)
  const sharedTechnologies = new Set(
    relatedProjects.flatMap(p => 
      p.technologies.filter(tech => project.technologies.includes(tech))
    )
  )
  const sharedTags = new Set(
    relatedProjects.flatMap(p => 
      p.tags.filter(tag => project.tags.includes(tag))
    )
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Project Relationships</h3>
            <ClientIcon icon={Icons.Network} className="h-5 w-5 text-primary" />
          </div>

          {/* Technology Overlap */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Shared Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(sharedTechnologies).map(tech => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Badge variant="secondary">{tech}</Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tag Overlap */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Shared Tags</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(sharedTags).map(tag => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Badge variant="outline">{tag}</Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Related Projects</h4>
            {relatedProjects.map((relatedProject, index) => (
              <motion.div
                key={relatedProject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium">{relatedProject.title}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {relatedProject.description}
                        </p>
                      </div>
                      <Badge>{relatedProject.category}</Badge>
                    </div>

                    {/* Relationship Strength */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Relationship Strength</span>
                        <span>{calculateRelationshipStrength(project, relatedProject)}%</span>
                      </div>
                      <Progress 
                        value={calculateRelationshipStrength(project, relatedProject)} 
                      />
                    </div>

                    {/* Shared Metrics */}
                    {hasSharedMetrics(project, relatedProject) && (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {getSharedMetrics(project, relatedProject).map(metric => (
                          <div key={metric.name} className="text-center p-2 bg-muted rounded-lg">
                            <div className="text-sm font-medium">{metric.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {metric.project}: {metric.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.related}: {metric.relatedValue}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions
function calculateRelationshipStrength(project: Project, relatedProject: Project): number {
  const techOverlap = project.technologies.filter(t => 
    relatedProject.technologies.includes(t)
  ).length
  const tagOverlap = project.tags.filter(t => 
    relatedProject.tags.includes(t)
  ).length
  const categoryMatch = project.category === relatedProject.category ? 1 : 0

  const maxTech = Math.max(project.technologies.length, relatedProject.technologies.length)
  const maxTags = Math.max(project.tags.length, relatedProject.tags.length)

  return Math.round(
    ((techOverlap / maxTech) * 40 + 
     (tagOverlap / maxTags) * 40 + 
     categoryMatch * 20)
  )
}

function hasSharedMetrics(project: Project, relatedProject: Project): boolean {
  if (!project.metrics || !relatedProject.metrics) return false
  return project.metrics.some(m1 => 
    relatedProject.metrics?.some(m2 => m1.name === m2.name)
  )
}

function getSharedMetrics(project: Project, relatedProject: Project) {
  if (!project.metrics || !relatedProject.metrics) return []

  return project.metrics
    .filter(m1 => relatedProject.metrics?.some(m2 => m1.name === m2.name))
    .map(m1 => ({
      name: m1.name,
      project: project.title,
      related: relatedProject.title,
      value: m1.value,
      relatedValue: relatedProject.metrics?.find(m2 => m2.name === m1.name)?.value || ''
    }))
} 