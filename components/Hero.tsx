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

export const Hero = () => {
  return (
    <SectionLayout id="home" pattern="waves" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi, I'm{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Shaquille Williams
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            AI Engineer & Full Stack Developer specializing in machine learning, voice synthesis, and scalable web applications
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 rounded-full hover:bg-primary/10",
                  transitions.fast
                )}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg">
              <a href="#contact" className="gap-2">
                Contact Me <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

