"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'

interface ProjectDetailsProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetails({ project, isOpen, onClose }: ProjectDetailsProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{project.title}</span>
            {project.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Overview */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="text-muted-foreground">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </section>

          {/* Project Metrics */}
          {project.metrics && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.metrics.map(metric => (
                  <Card key={metric.name}>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-primary">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.name}
                      </div>
                      <div className="text-sm text-green-500">
                        {metric.improvement}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Project Timeline */}
          {project.timelineDetails && (
            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <div className="space-y-2">
                {project.timelineDetails.map((phase, index) => (
                  <div key={phase.phase} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium">
                      {phase.phase}
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={((index + 1) / project.timelineDetails!.length) * 100}
                      />
                    </div>
                    <div className="w-24 text-sm text-muted-foreground">
                      {phase.duration}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4">
            {project.github && (
              <Button variant="outline" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ClientIcon icon={Icons.GitBranch} className="h-4 w-4" />
                  View Source
                </a>
              </Button>
            )}
            {project.demo && (
              <Button asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ClientIcon icon={Icons.Globe} className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 