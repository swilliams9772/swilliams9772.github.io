"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Trophy, 
  ChartBar, 
  Target,
  Users,
  Briefcase,
  Clock
} from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/utils/animation-variants'

const experiences = [
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
      { label: 'Community Centers', value: '40+', icon: Building2 },
      { label: 'Residents Impacted', value: '20,000+', icon: Users },
      { label: 'Programs Launched', value: '15+', icon: Target }
    ]
  }
  // Add more experiences here
]

const Experience = () => {
  return (
    <SectionLayout id="experience" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Professional Experience" 
          subtitle="Building impactful solutions and leading innovative teams"
        />

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              variants={staggerItem(index)}
              className="relative"
            >
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Role and Company Info */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg text-primary">{exp.company}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Description */}
                      <div className="space-y-4">
                        {exp.description.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-2"
                          >
                            <ChartBar className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <p className="text-muted-foreground">{item}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Skills */}
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-primary" />
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Badge variant="secondary">{skill}</Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {exp.metrics.map((metric, i) => (
                          <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-primary/5 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <metric.icon className="h-5 w-5 text-primary" />
                              <span className="text-sm text-muted-foreground">{metric.label}</span>
                            </div>
                            <p className="text-2xl font-bold text-primary">{metric.value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionLayout>
  )
}

export default Experience

