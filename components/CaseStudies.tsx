"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'

export const CaseStudies = () => {
  const caseStudies = [
    {
      title: "AI-Powered Voice Cloning System",
      description: "Developed a state-of-the-art voice cloning system using deep learning...",
      technologies: ["PyTorch", "FastAPI", "React", "Docker"],
      outcomes: [
        "99.9% accuracy in voice reproduction",
        "50ms latency for real-time processing",
        "Deployed to production serving 10k+ users"
      ],
      link: "https://example.com/case-study-1"
    }
    // Add more case studies as needed
  ]

  return (
    <SectionLayout id="case-studies" pattern="grid">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Case Studies" 
          subtitle="In-depth analysis of key projects and their impact"
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    <a 
                      href={study.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {study.title}
                    </a>
                  </h3>
                  <p className="text-muted-foreground mb-6">{study.description}</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map(tech => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Key Outcomes:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {study.outcomes.map((outcome, i) => (
                          <li key={i}>{outcome}</li>
                        ))}
                      </ul>
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

