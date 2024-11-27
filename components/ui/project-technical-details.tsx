"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { Project } from '@/types'

interface ProjectTechnicalDetailsProps {
  project: Project
}

export function ProjectTechnicalDetails({ project }: ProjectTechnicalDetailsProps) {
  if (!project.technical) return null

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Technical Details</h3>
          <Badge variant="outline">{project.technical.architecture}</Badge>
        </div>

        {project.technical.pipeline && (
          <div className="space-y-4">
            <h4 className="font-medium">Processing Pipeline</h4>
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
                    <span>{step.name}</span>
                  </div>
                  <Badge>{step.performance.value}</Badge>
                </div>
                <Progress value={step.performance.percentage} />
              </motion.div>
            ))}
          </div>
        )}

        {project.technical.architecture && (
          <div className="space-y-4">
            <h4 className="font-medium">Architecture Overview</h4>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <ClientIcon 
                    icon={Icons.Server} 
                    className="h-4 w-4 text-primary" 
                  />
                  <span className="font-medium">Type</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.technical.architecture}
                </p>
              </Card>
              {project.technical.scalability && (
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <ClientIcon 
                      icon={Icons.TrendingUp} 
                      className="h-4 w-4 text-primary" 
                    />
                    <span className="font-medium">Scalability</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.technical.scalability}
                  </p>
                </Card>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 