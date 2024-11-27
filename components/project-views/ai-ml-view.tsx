"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Cpu, GitBranch, GitCommit, Star } from 'lucide-react'
import type { Project } from '@/types'

interface AIMLViewProps {
  project: Project
}

export function AIMLView({ project }: AIMLViewProps) {
  return (
    <div className="space-y-6">
      {/* Model Architecture */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Model Architecture</h3>
          </div>
          
          {project.model && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Model Details</h4>
                <div className="space-y-2">
                  {Object.entries(project.model.details).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center bg-background/50 p-3 rounded-lg"
                    >
                      <span className="font-medium">{key}</span>
                      <Badge variant="outline">{value}</Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Performance Metrics</h4>
                {project.model.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{metric.name}</span>
                      <span>{metric.value}</span>
                    </div>
                    <Progress value={metric.percentage} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Process */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Training Process</h3>
          </div>

          {project.training && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {project.training.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg text-center"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Training Timeline</h4>
                {project.training.phases.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <GitBranch className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{phase.name}</h5>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{phase.duration}</Badge>
                        {phase.status === 'completed' && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 