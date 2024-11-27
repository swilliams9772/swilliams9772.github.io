"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart, 
  Database, 
  LineChart,
  PieChart,
  GitBranch,
  Server,
  Workflow,
  Layers
} from 'lucide-react'
import type { Project } from '@/types'

interface DataAnalyticsViewProps {
  project: Project
}

export function DataAnalyticsView({ project }: DataAnalyticsViewProps) {
  return (
    <div className="space-y-6">
      {/* Data Pipeline Architecture */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Workflow className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Data Pipeline</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.pipeline?.stages && (
              <div className="space-y-4">
                <h4 className="font-medium">Pipeline Stages</h4>
                {project.pipeline.stages.map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{stage.name}</h5>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                      {stage.metrics && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(stage.metrics).map(([key, value], i) => (
                            <Badge key={i} variant="outline">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {project.pipeline?.optimizations && (
              <div className="space-y-4">
                <h4 className="font-medium">Optimizations</h4>
                {project.pipeline.optimizations.map((opt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <LineChart className="h-4 w-4 text-primary" />
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

      {/* Data Sources & Processing */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Data Sources & Processing</h3>
          </div>
          {project.dataProcessing && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Data Sources</h4>
                {project.dataProcessing.sources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{source.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        Volume: {source.volume}
                      </Badge>
                      <Badge variant="outline">
                        Frequency: {source.frequency}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Processing Steps</h4>
                {project.dataProcessing.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{step.name}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    {step.performance && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performance</span>
                          <span>{step.performance.value}</span>
                        </div>
                        <Progress value={step.performance.percentage} className="h-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics & Insights */}
      {project.analytics && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Analytics & Insights</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {project.analytics.metrics.map((metric, index) => (
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
                      {metric.change && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "mt-2",
                            metric.change.includes('+') 
                              ? "bg-success/10 text-success" 
                              : "bg-destructive/10 text-destructive"
                          )}
                        >
                          {metric.change}
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Key Findings</h4>
                {project.analytics.findings.map((finding, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="h-4 w-4 text-primary" />
                      <h5 className="font-medium">{finding.title}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                    {finding.impact && (
                      <Badge variant="outline" className="mt-2">
                        Impact: {finding.impact}
                      </Badge>
                    )}
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