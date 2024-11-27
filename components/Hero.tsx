"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GradientText } from '@/components/ui/gradient-text'
import { PatternBackground } from '@/components/ui/pattern-background'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { personalInfo } from '@/data/personal-info'

// Define the feature type to ensure type safety
interface Feature {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

// Move features array before the component
const features: Feature[] = [
  {
    title: "AI & Machine Learning",
    description: "Specializing in deep learning, computer vision, NLP, and voice cloning systems",
    icon: "Brain"
  },
  {
    title: "Community Impact",
    description: "Building AI-powered tools that serve over 20,000 NYC residents",
    icon: "Users"
  },
  {
    title: "STEM Education",
    description: "Innovating physics education with data analysis and social justice integration",
    icon: "GraduationCap"
  }
]

export const Hero = () => {
  return (
    <PatternBackground>
      <section className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-8 md:py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-4"
        >
          <div className="flex items-center gap-2">
            <ClientIcon icon={Icons.Brain} className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              AI Innovation for <GradientText>Social Change</GradientText>
            </h1>
          </div>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {personalInfo.bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 backdrop-blur-sm border-muted/50"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="space-y-2"
              >
                <ClientIcon
                  icon={Icons[feature.icon]}
                  className="h-12 w-12 text-primary"
                />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <Button size="lg" asChild>
            <a href="#projects">
              View Projects
              <ClientIcon icon={Icons.ArrowRight} className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">
              Get in Touch
              <ClientIcon icon={Icons.Mail} className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </section>
    </PatternBackground>
  )
}

