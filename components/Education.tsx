"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GlassPanel } from '@/components/ui/glass-panel'
import { GradientText } from '@/components/ui/gradient-text'
import { PatternBackground } from '@/components/ui/pattern-background'
import * as Icons from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const educationData = [
  {
    degree: 'Bachelor of Science in Physics',
    institution: 'City College of New York',
    location: 'New York, New York',
    period: '2015 - 2019',
    details: 'Focus on Computational Physics, Data Science, and Quantitative Analysis',
    gpa: '3.8',
    skills: [
      { name: 'Scientific Computing', level: 90 },
      { name: 'Data Analysis', level: 95 },
      { name: 'Mathematical Modeling', level: 85 },
      { name: 'Research Methods', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Quantum Mechanics', level: 85 },
      { name: 'Statistical Analysis', level: 90 },
      { name: 'Numerical Methods', level: 85 }
    ],
    coursework: [
      'Machine Learning',
      'Data Structures',
      'Computational Physics',
      'Network Science',
      'Data Visualization',
      'Quantum Mechanics',
      'Statistical Mechanics',
      'Mathematical Physics',
      'Differential Equations',
      'Linear Algebra'
    ],
    research: [
      {
        title: 'Computational Physics Research',
        description: 'Developed numerical methods for solving complex quantum mechanical systems',
        outcomes: [
          'Implemented Monte Carlo simulations for quantum systems',
          'Created visualization tools for quantum phenomena',
          'Published findings in undergraduate physics journal'
        ]
      },
      {
        title: 'Quantitative Analysis Project',
        description: 'Applied statistical methods to analyze large datasets from particle physics experiments',
        outcomes: [
          'Processed terabytes of experimental data',
          'Developed statistical models for particle detection',
          'Created automated analysis pipelines'
        ]
      }
    ],
    achievements: [
      {
        title: 'Research Excellence',
        description: 'Applied advanced data analysis techniques to physics research projects',
        icon: Icons.Brain
      },
      {
        title: 'Technical Innovation',
        description: 'Developed computational models for complex physical systems',
        icon: Icons.Lightbulb
      },
      {
        title: 'Academic Leadership',
        description: 'Led physics study groups and mentored junior students',
        icon: Icons.Award
      }
    ],
    specializations: [
      {
        area: 'Computational Physics',
        topics: [
          'Numerical Methods',
          'Monte Carlo Simulations',
          'Quantum Computing',
          'High-Performance Computing'
        ]
      },
      {
        area: 'Data Science',
        topics: [
          'Statistical Analysis',
          'Machine Learning',
          'Data Visualization',
          'Big Data Processing'
        ]
      }
    ],
    color: 'from-blue-500/20 to-purple-500/20'
  }
]

export function Education() {
  return (
    <PatternBackground pattern="grid" className="py-20">
      <div className="container mx-auto px-4">
        <GradientText variant="primary">
          <h2 className="text-3xl font-bold text-center mb-12">Education & Qualifications</h2>
        </GradientText>
        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className={`overflow-hidden bg-gradient-to-r ${edu.color}`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icons.GraduationCap className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-bold">{edu.degree}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.location}</p>
                      <Badge variant="secondary" className="mt-2">GPA: {edu.gpa}</Badge>
                    </div>
                    <Badge variant="outline" className="text-lg">
                      {edu.period}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <GlassPanel variant="subtle" className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Key Coursework</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {edu.coursework.map((course, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex justify-between items-center bg-background/50 p-3 rounded-lg"
                            >
                              <span>{course}</span>
                            </motion.div>
                          ))}
                        </div>
                      </GlassPanel>

                      <GlassPanel variant="subtle" className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Research Projects</h4>
                        <div className="space-y-4">
                          {edu.research.map((project, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <h5 className="font-semibold text-primary">{project.title}</h5>
                              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                              <ul className="space-y-1">
                                {project.outcomes.map((outcome, j) => (
                                  <li key={j} className="flex items-center gap-2 text-sm">
                                    <Icons.ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span className="text-muted-foreground">{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </GlassPanel>
                    </div>

                    <div className="space-y-6">
                      <GlassPanel variant="subtle" className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Skills & Proficiencies</h4>
                        <div className="space-y-4">
                          {edu.skills.map((skill, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </motion.div>
                          ))}
                        </div>
                      </GlassPanel>

                      <GlassPanel variant="subtle" className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Specializations</h4>
                        <div className="space-y-6">
                          {edu.specializations.map((spec, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <h5 className="font-semibold text-primary mb-2">{spec.area}</h5>
                              <div className="flex flex-wrap gap-2">
                                {spec.topics.map((topic, j) => (
                                  <Badge key={j} variant="secondary">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </GlassPanel>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PatternBackground>
  )
}

export default Education

