"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { SectionLayout } from '@/components/ui/section-layout'
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/utils/animation-variants'

const highlights = [
  {
    icon: Icons.Brain,
    title: "AI & Machine Learning",
    description: "Specialized in deep learning, neural networks, and voice synthesis"
  },
  {
    icon: Icons.Code2,
    title: "Full Stack Development",
    description: "Building scalable applications with React, Next.js, Python, and AWS"
  },
  {
    icon: Icons.Users,
    title: "Team Leadership",
    description: "Leading technical teams and mentoring junior developers"
  }
]

function About() {
  return (
    <SectionLayout id="about" pattern="dots">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Profile Photo Placeholder
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <SectionHeader 
              title="About Me"
              subtitle="AI Engineer & Full Stack Developer"
              align="left"
            />

            <p className="text-muted-foreground mb-6">
              I'm a software engineer with a passion for AI/ML and full-stack development. 
              Currently serving as the Technical Program Director at Rose from Concrete, 
              I leverage cutting-edge technology to create impactful solutions for community development. 
              My expertise spans machine learning, voice synthesis, and cloud architecture, 
              allowing me to build scalable applications that solve complex problems.
            </p>

            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                >
                  <Card>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button className="flex items-center gap-2">
                <Icons.Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

export { About } 