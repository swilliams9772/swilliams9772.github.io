"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Brain, 
  Target, 
  Users, 
  Heart,
  Code2,
  GraduationCap
} from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/utils/animation-variants'

const About = () => {
  return (
    <SectionLayout id="about" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="About Me" 
          subtitle="Passionate about technology and community impact"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative aspect-square rounded-xl overflow-hidden"
          >
            <Image
              src="/images/profile.jpg"
              alt="Shaquille Williams"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-2">
              {['AI/ML', 'Full Stack', 'Cloud Architecture', 'Community Tech'].map((tag, index) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Technical Expertise</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Specialized in machine learning, generative AI, and cloud-native applications. 
                    Experienced in building scalable systems and implementing AI solutions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Community Impact</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Dedicated to leveraging technology for social good. Active in STEM education 
                    and community tech initiatives.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Current Focus</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Developing AI-driven tools for community organizations and contributing to 
                    open-source projects focused on social impact.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default About 