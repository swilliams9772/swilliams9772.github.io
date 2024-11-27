"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Code, 
  Server, 
  GitBranch,
  Database,
  Cloud,
  Terminal,
  Settings,
  Activity,
  Layers
} from 'lucide-react'
import type { Project } from '@/types'

interface DevViewProps {
  project: Project
}

export function DevView({ project }: DevViewProps) {
  return (
    <div className="space-y-6">
      {/* Architecture Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">System Architecture</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.architecture?.components && (
              <div className="space-y-4">
                <h4 className="font-medium">Components</h4>
                {project.architecture.components.map((component, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Code className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{component.name}</h5>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                      {component.tech && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {component.tech.map((tech, i) => (
                            <Badge key={i} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {project.architecture?.infrastructure && (
              <div className="space-y-4">
                <h4 className="font-medium">Infrastructure</h4>
                {project.architecture.infrastructure.map((infra, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Server className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{infra.name}</h5>
                      <p className="text-sm text-muted-foreground">{infra.description}</p>
                      {infra.services && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {infra.services.map((service, i) => (
                            <Badge key={i} variant="secondary">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Development & Deployment */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Development & Deployment</h3>
          </div>
          {project.development && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">CI/CD Pipeline</h4>
                {project.development.pipeline.map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{stage.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                    {stage.metrics && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Success Rate</span>
                          <span>{stage.metrics.successRate}%</span>
                        </div>
                        <Progress value={stage.metrics.successRate} className="h-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Deployment Environments</h4>
                {project.development.environments.map((env, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Cloud className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{env.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{env.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {env.features.map((feature, i) => (
                        <Badge key={i} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Monitoring */}
      {project.monitoring && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Performance Monitoring</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {project.monitoring.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background/50 p-4 rounded-lg text-center"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.name}
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {metric.trend}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Alerts & Incidents</h4>
                {project.monitoring.alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium">{alert.name}</h5>
                      <Badge 
                        variant="outline"
                        className={cn(
                          alert.severity === 'High' ? 'bg-destructive/10 text-destructive' :
                          alert.severity === 'Medium' ? 'bg-warning/10 text-warning' :
                          'bg-success/10 text-success'
                        )}
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 