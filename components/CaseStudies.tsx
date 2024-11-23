"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ChartBar, 
  Target, 
  Lightbulb, 
  ArrowRight, 
  Code2,
  GitPullRequest,
  Star
} from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'

const caseStudies = [
  {
    title: 'Optimizing Voice Cloning for Real-Time Applications',
    description: 'An in-depth look at the challenges and solutions in developing a real-time voice cloning system.',
    impact: 'Reduced inference time by 75% while maintaining high voice similarity.',
    technologies: ['PyTorch', 'CUDA', 'TensorRT'],
    link: '/case-studies/voice-cloning-optimization',
    metrics: [
      { label: 'Performance Improvement', value: '75%' },
      { label: 'Model Size Reduction', value: '60%' },
      { label: 'Latency Decrease', value: '80ms' }
    ],
    challenges: [
      'Real-time processing constraints',
      'Voice quality preservation',
      'Resource optimization'
    ],
    solutions: [
      'Custom CUDA kernels',
      'Model quantization',
      'Parallel processing pipeline'
    ],
    timeline: [
      { phase: 'Research', duration: '2 months' },
      { phase: 'Development', duration: '4 months' },
      { phase: 'Optimization', duration: '2 months' }
    ],
    team: [
      { role: 'ML Engineer', count: 2 },
      { role: 'DevOps', count: 1 },
      { role: 'QA', count: 1 }
    ],
    icon: Code2,
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    title: 'Scaling Machine Learning Infrastructure',
    description: 'How we designed and implemented a scalable ML infrastructure to support thousands of models in production.',
    impact: 'Increased model deployment speed by 10x and reduced operational costs by 40%.',
    technologies: ['Kubernetes', 'MLflow', 'Apache Airflow'],
    link: '/case-studies/ml-infrastructure-scaling',
    metrics: [
      { label: 'Deployment Speed', value: '10x' },
      { label: 'Cost Reduction', value: '40%' },
      { label: 'Model Throughput', value: '5000/day' }
    ],
    challenges: [
      'Resource allocation',
      'Model versioning',
      'Monitoring at scale'
    ],
    solutions: [
      'Auto-scaling clusters',
      'GitOps workflow',
      'Distributed monitoring'
    ],
    timeline: [
      { phase: 'Planning', duration: '1 month' },
      { phase: 'Implementation', duration: '3 months' },
      { phase: 'Testing', duration: '2 months' }
    ],
    team: [
      { role: 'DevOps Engineer', count: 2 },
      { role: 'ML Engineer', count: 1 },
      { role: 'SRE', count: 1 }
    ],
    icon: Workflow,
    color: 'from-green-500/20 to-emerald-500/20'
  }
]

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'team'>('overview')

  return (
    <section id="case-studies" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
        <div className="grid grid-cols-1 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="transform transition-all duration-300"
            >
              <Card className={`bg-gradient-to-r ${study.color} overflow-hidden`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <study.icon className="h-8 w-8 text-primary" />
                      <CardTitle className="text-2xl">{study.title}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      {['overview', 'details', 'team'].map((tab) => (
                        <Button
                          key={tab}
                          variant={activeTab === tab ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setActiveTab(tab as typeof activeTab)}
                          className="capitalize"
                        >
                          {tab}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid md:grid-cols-2 gap-8"
                      >
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Target className="h-5 w-5 text-primary" />
                              Overview
                            </h4>
                            <p className="text-muted-foreground">{study.description}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <ChartBar className="h-5 w-5 text-primary" />
                              Key Metrics
                            </h4>
                            <div className="grid grid-cols-3 gap-4">
                              {study.metrics.map((metric, i) => (
                                <motion.div
                                  key={metric.label}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="bg-background/50 p-4 rounded-lg text-center"
                                >
                                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Layers className="h-5 w-5 text-primary" />
                              Technical Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="bg-background/50">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Clock className="h-5 w-5 text-primary" />
                              Timeline
                            </h4>
                            <div className="space-y-2">
                              {study.timeline.map((phase, i) => (
                                <div key={i} className="flex justify-between items-center bg-background/50 p-3 rounded-lg">
                                  <span>{phase.phase}</span>
                                  <Badge variant="outline">{phase.duration}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'details' && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-2 gap-6"
                      >
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Microscope className="h-5 w-5 text-primary" />
                            Challenges
                          </h4>
                          <ul className="space-y-2">
                            {study.challenges.map((challenge, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <ArrowRight className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">{challenge}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Lightbulb className="h-5 w-5 text-primary" />
                            Solutions
                          </h4>
                          <ul className="space-y-2">
                            {study.solutions.map((solution, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <ArrowRight className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">{solution}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'team' && (
                      <motion.div
                        key="team"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                      >
                        <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Team Composition
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {study.team.map((member, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-background/50 p-4 rounded-lg text-center"
                            >
                              <div className="text-2xl font-bold text-primary">{member.count}</div>
                              <div className="text-sm text-muted-foreground">{member.role}</div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 flex justify-end">
                    <Button asChild>
                      <a href={study.link} className="flex items-center gap-2">
                        Read Full Case Study
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies

