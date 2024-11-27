"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'

interface ProjectDetailsModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                {project.description}
              </DialogDescription>
            </div>
            {project.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            {project.timelineDetails && (
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-6">
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              <Card>
                <CardContent className="p-4 space-y-4">
                  <h4 className="font-medium">Key Outcomes</h4>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <ClientIcon 
                          icon={Icons.CheckCircle} 
                          className="h-4 w-4 text-green-500" 
                        />
                        <span>{outcome}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent 
            value="technical" 
            className="mt-4 space-y-6"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h4 className="font-medium">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  {project.challenges && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Challenges & Solutions</h4>
                      <div className="space-y-4">
                        {project.challenges.map((challenge, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <ClientIcon 
                                icon={Icons.AlertTriangle} 
                                className="h-4 w-4 text-yellow-500" 
                              />
                              <span className="font-medium">{challenge}</span>
                            </div>
                            {project.solutions?.[index] && (
                              <div className="ml-6 text-sm text-muted-foreground">
                                Solution: {project.solutions[index]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="metrics" className="mt-4">
            {project.metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.metrics.map(metric => (
                  <Card key={metric.name}>
                    <CardContent className="p-4">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-primary">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {metric.name}
                        </div>
                        <div className="text-sm text-green-500 mt-1">
                          {metric.improvement}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {project.timelineDetails && (
            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {project.timelineDetails.map((phase, index) => (
                      <motion.div
                        key={phase.phase}
                        initial={{ opacity: 0, y: 20 }}
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
            </TabsContent>
          )}
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
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
      </DialogContent>
    </Dialog>
  )
} 