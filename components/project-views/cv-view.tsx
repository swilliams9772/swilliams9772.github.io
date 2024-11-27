"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Eye, 
  Camera, 
  Cpu, 
  BarChart, 
  GitBranch, 
  GitCommit,
  Play,
  Image as ImageIcon
} from 'lucide-react'
import type { Project } from '@/types'

interface CVViewProps {
  project: Project
}

export function CVView({ project }: CVViewProps) {
  return (
    <div className="space-y-6">
      {/* Model Architecture & Pipeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Vision Pipeline</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.technical?.pipeline && (
              <div className="space-y-4">
                <h4 className="font-medium">Processing Steps</h4>
                {project.technical.pipeline.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Camera className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{step.name}</h5>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.performance && (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Performance</span>
                            <span>{step.performance.value}</span>
                          </div>
                          <Progress value={step.performance.percentage} className="h-1 mt-1" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {project.technical?.optimizations && (
              <div className="space-y-4">
                <h4 className="font-medium">Optimizations</h4>
                {project.technical.optimizations.map((opt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Cpu className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{opt.name}</h5>
                      <p className="text-sm text-muted-foreground">{opt.description}</p>
                      {opt.improvement && (
                        <Badge variant="outline" className="mt-2">
                          {opt.improvement}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Performance Analysis</h3>
          </div>
          {project.performance && (
            <div className="grid md:grid-cols-3 gap-4">
              {project.performance.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 p-4 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {metric.metric}
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success">
                    {metric.improvement}
                  </Badge>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo & Results */}
      {project.gallery && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Play className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Demo & Results</h3>
            </div>
            <div className="space-y-6">
              {/* Images */}
              {project.gallery.images && (
                <div>
                  <h4 className="font-medium mb-4">Sample Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.images.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative aspect-video rounded-lg overflow-hidden group"
                      >
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <p className="text-white text-sm">{image.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagrams */}
              {project.gallery.diagrams && (
                <div>
                  <h4 className="font-medium mb-4">Architecture & Diagrams</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.gallery.diagrams.map((diagram, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="p-4">
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2">
                              <img
                                src={diagram.url}
                                alt={diagram.title}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <h4 className="font-medium mb-1">{diagram.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {diagram.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 