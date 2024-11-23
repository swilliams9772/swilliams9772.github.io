"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'

export const Publications = () => {
  const publications = [
    {
      title: "Machine Learning Approaches in Voice Cloning",
      journal: "Journal of AI Research",
      year: "2023",
      abstract: "A comprehensive review of state-of-the-art techniques in voice cloning...",
      link: "https://example.com/publication1",
      tags: ["Machine Learning", "Voice Synthesis", "Deep Learning"]
    }
    // Add more publications as needed
  ]

  return (
    <SectionLayout id="publications" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Publications" 
          subtitle="Research papers and technical publications in AI and software engineering"
        />
        
        <div className="grid gap-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.title}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <a 
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {pub.title}
                    </a>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {pub.journal} • {pub.year}
                  </p>
                  <p className="mb-4">{pub.abstract}</p>
                  <div className="flex flex-wrap gap-2">
                    {pub.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
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

