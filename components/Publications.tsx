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

interface Publication {
  title: string
  type: string
  journal?: string
  conference?: string
  year: number
  abstract: string
  link: string
  tags: string[]
  impact?: string
  citations?: number
}

const publications: Publication[] = [
  {
    title: "Advanced Object Detection Techniques for Real-Time Applications",
    type: "Research Paper",
    journal: "Journal of Computer Vision",
    year: 2024,
    abstract: "A novel approach to real-time object detection using optimized neural networks...",
    link: "https://example.com/publication/1",
    tags: ["Computer Vision", "Deep Learning", "Real-time Processing"],
    impact: "Cited by leading research institutions",
    citations: 25
  }
]

export default function Publications() {
  return (
    <SectionLayout id="publications" pattern="dots">
      <SectionHeader
        title="Publications & Research"
        subtitle="Academic contributions and research papers"
      />

      <div className="space-y-8">
        {publications.map((pub, index) => (
          <motion.div
            key={pub.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pub.journal || pub.conference} • {pub.year}
                    </p>
                  </div>
                  <Badge variant="outline">{pub.type}</Badge>
                </div>

                <p className="text-muted-foreground">{pub.abstract}</p>

                <div className="flex flex-wrap gap-2">
                  {pub.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                {(pub.impact || pub.citations) && (
                  <div className="flex items-center gap-4">
                    {pub.impact && (
                      <div className="flex items-center gap-2">
                        <ClientIcon icon={Icons.Trophy} className="h-4 w-4 text-primary" />
                        <span className="text-sm">{pub.impact}</span>
                      </div>
                    )}
                    {pub.citations && (
                      <div className="flex items-center gap-2">
                        <ClientIcon icon={Icons.Quote} className="h-4 w-4 text-primary" />
                        <span className="text-sm">{pub.citations} citations</span>
                      </div>
                    )}
                  </div>
                )}

                <Button asChild>
                  <a 
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ClientIcon icon={Icons.ExternalLink} className="h-4 w-4" />
                    Read Publication
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

