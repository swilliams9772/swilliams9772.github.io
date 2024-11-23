"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, GitPullRequest, GitMerge, Star } from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'

export const Contributions = () => {
  const contributions = [
    {
      project: "TensorFlow",
      description: "Implemented optimization for voice synthesis models",
      type: "Feature",
      status: "Merged",
      impact: "30% performance improvement",
      link: "https://github.com/tensorflow/tensorflow/pull/1234",
      stars: 245
    },
    {
      project: "PyTorch",
      description: "Bug fix in audio processing pipeline",
      type: "Bug Fix",
      status: "Merged",
      impact: "Fixed critical memory leak",
      link: "https://github.com/pytorch/pytorch/pull/5678",
      stars: 178
    }
    // Add more contributions as needed
  ]

  return (
    <SectionLayout id="contributions" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Open Source Contributions" 
          subtitle="Contributing to the developer community through open source projects"
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {contributions.map((contribution, index) => (
            <motion.div
              key={contribution.link}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      {contribution.project}
                    </h3>
                    <Badge 
                      variant={contribution.status === "Merged" ? "default" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {contribution.status === "Merged" ? (
                        <GitMerge className="h-3 w-3" />
                      ) : (
                        <GitPullRequest className="h-3 w-3" />
                      )}
                      {contribution.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {contribution.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">
                      {contribution.type}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {contribution.stars}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-primary">
                    Impact: {contribution.impact}
                  </p>
                  
                  <a 
                    href={contribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-primary hover:underline"
                  >
                    View Pull Request →
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
} 