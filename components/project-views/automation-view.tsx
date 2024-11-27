"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Tool, 
  Workflow,
  Zap,
  GitBranch,
  Settings,
  Clock,
  BarChart,
  CheckCircle,
  Bot
} from 'lucide-react'
import type { Project } from '@/types'

interface AutomationViewProps {
  project: Project
}

export function AutomationView({ project }: AutomationViewProps) {
  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tool className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Automation Overview</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.automation?.workflows && (
              <div className="space-y-4">
                <h4 className="font-medium">Automated Workflows</h4>
                {project.automation.workflows.map((workflow, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Workflow className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{workflow.name}</h5>
                      <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      {workflow.metrics && (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Efficiency</span>
                            <span>{workflow.metrics.efficiency}%</span>
                          </div>
                          <Progress value={workflow.metrics.efficiency} className="h-1 mt-1" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {project.automation?.integrations && (
              <div className="space-y-4">
                <h4 className="font-medium">System Integrations</h4>
                {project.automation.integrations.map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{integration.name}</h5>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {integration.features.map((feature, i) => (
                          <Badge key={i} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
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
            <h3 className="text-lg font-semibold">Performance Impact</h3>
          </div>
          {project.automation?.metrics && (
            <div className="grid md:grid-cols-3 gap-4">
              {project.automation.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 p-4 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold text-primary mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {metric.name}
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

      {/* Bot Configuration */}
      {project.automation?.bots && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Automated Agents</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {project.automation.bots.map((bot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-primary" />
                    <h5 className="font-medium">{bot.name}</h5>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{bot.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span>{bot.metrics.uptime}%</span>
                    </div>
                    <Progress value={bot.metrics.uptime} className="h-1" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {bot.capabilities.map((capability, i) => (
                        <Badge key={i} variant="secondary">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Scheduling */}
      {project.automation?.scheduling && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Task Scheduling</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {project.automation.scheduling.tasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium">{task.name}</h5>
                    <Badge 
                      variant="outline"
                      className={task.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {task.frequency}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 