"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  MessageSquare, 
  Languages, 
  Brain,
  Database,
  LineChart,
  BarChart,
  FileText,
  Layers
} from 'lucide-react'
import type { Project } from '@/types'

interface NLPViewProps {
  project: Project
}

export function NLPView({ project }: NLPViewProps) {
  return (
    <div className="space-y-6">
      {/* Language Processing Pipeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">NLP Pipeline</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.nlp?.pipeline && (
              <div className="space-y-4">
                <h4 className="font-medium">Processing Steps</h4>
                {project.nlp.pipeline.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{step.name}</h5>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.metrics && (
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span>{step.metrics.accuracy}</span>
                          </div>
                          <Progress value={parseFloat(step.metrics.accuracy)} className="h-1 mt-1" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {project.nlp?.models && (
              <div className="space-y-4">
                <h4 className="font-medium">Model Architecture</h4>
                {project.nlp.models.map((model, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 bg-background/50 p-4 rounded-lg"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium">{model.name}</h5>
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {model.features.map((feature, i) => (
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

      {/* Dataset & Training */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Dataset & Training</h3>
          </div>
          {project.nlp?.dataset && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Dataset Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(project.nlp.dataset.statistics).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background/50 p-4 rounded-lg text-center"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {key}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Training Metrics</h4>
                {project.nlp.dataset.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">{metric.value}</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      {project.nlp?.performance && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Performance Analysis</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {project.nlp.performance.map((metric, index) => (
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
          </CardContent>
        </Card>
      )}

      {/* Language Support */}
      {project.nlp?.languages && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Language Support</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {project.nlp.languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background/50 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{lang.name}</h5>
                    <Badge variant="outline">{lang.support}% Coverage</Badge>
                  </div>
                  <Progress value={lang.support} className="h-2" />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {lang.features.map((feature, i) => (
                      <Badge key={i} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
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