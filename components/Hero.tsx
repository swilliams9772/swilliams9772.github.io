"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react'
import { SectionLayout } from './ui/section-layout'
import { cn } from '@/lib/utils'
import { transitions } from '@/lib/utils/theme-config'
import type { SocialLink } from '@/types'

const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/swilliams9772",
    icon: Github,
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/shaquille-williams-957970129/",
    icon: Linkedin,
    label: "LinkedIn"
  }
]

const contactInfo = {
  email: "shaq.williams.ai@gmail.com",
  phone: "(917) 831-2482"
}

const Hero = () => {
  return (
    <SectionLayout id="hero" pattern="dots" gradient="blue">
      <div className="container mx-auto px-4">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="inline-block">
                Building AI-Powered Solutions
              </span>{" "}
              <span className="inline-block text-primary">
                for Social Impact
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 flex justify-center gap-4 text-sm"
          >
            <a 
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              {contactInfo.email}
            </a>
            <span className="text-muted-foreground">|</span>
            <a 
              href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto"
          >
            Senior Software Engineer and AI Specialist with a passion for developing 
            innovative solutions that drive positive social change. Experienced in 
            machine learning, cloud architecture, and community-driven technology initiatives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <a href="#projects" className="flex items-center gap-2">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 flex justify-center gap-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "text-muted-foreground hover:text-primary",
                  transitions.fast
                )}
              >
                <link.icon className="h-6 w-6" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Hero

