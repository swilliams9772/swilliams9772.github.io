"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'

interface CaseStudy {
  title: string
  description: string
  category: string
  technologies: string[]
  outcomes: string[]
  metrics: {
    name: string
    value: string
    improvement: string
  }[]
  link: string
}

const caseStudies: CaseStudy[] = [
  {
    title: "AI-Powered Voice Cloning System",
    description: "Real-time voice synthesis using deep learning",
    category: "Speech Processing",
    technologies: ["PyTorch", "Tacotron", "WaveNet", "FastAPI"],
    outcomes: [
      "99.9% voice similarity score",
      "50ms latency for real-time processing",
      "Support for 15 languages"
    ],
    metrics: [
      {
        name: "MOS Score",
        value: "4.5/5",
        improvement: "+0.8"
      }
    ],
    link: "#"
  }
]

export default function CaseStudies() {
  return (
    <SectionLayout id="case-studies" pattern="dots">
      <SectionHeader
        title="Case Studies"
        subtitle="In-depth analysis of key projects and their impact"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Badge>{study.category}</Badge>
                  <h3 className="text-xl font-semibold">{study.title}</h3>
                  <p className="text-muted-foreground">{study.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map(tech => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Key Outcomes</h4>
                  <ul className="space-y-1">
                    {study.outcomes.map(outcome => (
                      <li key={outcome} className="flex items-center gap-2">
                        <ClientIcon icon={Icons.CheckCircle} className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {study.metrics.map(metric => (
                    <div key={metric.name} className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.name}</div>
                      <div className="text-sm text-green-500">{metric.improvement}</div>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <a href={study.link} target="_blank" rel="noopener noreferrer">
                    <ClientIcon icon={Icons.ExternalLink} className="mr-2 h-4 w-4" />
                    View Full Case Study
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  )
}

