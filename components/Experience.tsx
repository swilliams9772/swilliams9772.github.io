"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import * as Icons from 'lucide-react'  // Import all icons
import { SectionHeader } from '@/components/ui/section-header'
import { SectionLayout } from '@/components/ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'
import type { Experience as ExperienceType } from '@/types'

const experiences: ExperienceType[] = [
  {
    role: 'Technical Program Director',
    company: 'Rose from Concrete',
    period: 'January 2021 - Present',
    description: [
      'Forged strategic partnerships with 40+ community centers across Brooklyn, deploying ML models to assess and optimize program reach',
      'Developed predictive models using Python, Scikit-learn, and Geopandas on GCP to impact over 20,000 NYC residents',
      'Led implementation of community-focused programs using AWS Lambda and Docker for scalable resource management',
      'Designed decentralized energy solutions and AI-powered monitoring tools for program sustainability',
    ],
    skills: ['Python', 'Machine Learning', 'AWS', 'Docker', 'GCP', 'Community Development'],
    impact: 'Positively impacted over 20,000 NYC residents through data-driven community programs',
    metrics: [
      { label: 'Community Centers', value: '40+', icon: Icons.Building2 },
      { label: 'Residents Impacted', value: '20,000+', icon: Icons.Users },
      { label: 'Programs Launched', value: '15+', icon: Icons.Target }
    ]
  },
  {
    role: 'AI Research Engineer',
    company: 'VoiceTech Solutions',
    period: 'June 2019 - December 2020',
    description: [
      'Led development of voice synthesis models achieving 95% accuracy in emotional tone replication',
      'Implemented real-time voice conversion system using PyTorch and TensorFlow',
      'Optimized model inference reducing latency by 60% through CUDA optimization',
      'Published research on novel voice cloning techniques at major AI conferences'
    ],
    skills: ['PyTorch', 'TensorFlow', 'CUDA', 'Signal Processing', 'Research'],
    impact: 'Pioneered voice synthesis technology used by 100,000+ users globally',
    metrics: [
      { label: 'Model Accuracy', value: '95%', icon: Icons.BarChart },
      { label: 'Latency Reduction', value: '60%', icon: Icons.Clock },
      { label: 'Active Users', value: '100K+', icon: Icons.Users }
    ]
  }
]

export const Experience = () => {
  return (
    <SectionLayout id="experience" pattern="grid">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Professional Experience" 
          subtitle="A track record of impactful contributions and leadership in technology"
        />
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.company}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{experience.role}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icons.Building2 className="h-4 w-4" />
                        <span>{experience.company}</span>
                        <span>•</span>
                        <Icons.Clock className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {experience.description.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map(skill => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-primary mb-4 flex items-center gap-2">
                          <Icons.Trophy className="h-4 w-4" />
                          {experience.impact}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {experience.metrics.map((metric, i) => {
                            const Icon = metric.icon
                            return (
                              <div key={i} className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                                </div>
                                <div>
                                  <p className="font-semibold">{metric.value}</p>
                                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

