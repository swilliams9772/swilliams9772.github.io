"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import * as Icons from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { SectionLayout } from '@/components/ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'
import type { LucideIcon } from 'lucide-react'

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: Icons.Brain,
    skills: [
      { name: 'TensorFlow', level: 95 },
      { name: 'PyTorch', level: 90 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Neural Networks', level: 90 },
      { name: 'NLP', level: 85 }
    ]
  },
  {
    title: 'Frontend Development',
    icon: Icons.Code2,
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 80 }
    ]
  },
  {
    title: 'Backend Development',
    icon: Icons.Database,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'FastAPI', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Icons.Cloud,
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'GCP', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 80 }
    ]
  },
  {
    title: 'System Programming',
    icon: Icons.Terminal,
    skills: [
      { name: 'C++', level: 75 },
      { name: 'Rust', level: 70 },
      { name: 'Linux', level: 85 },
      { name: 'Networking', level: 80 }
    ]
  },
  {
    title: 'Robotics & IoT',
    icon: Icons.Cpu,
    skills: [
      { name: 'ROS', level: 75 },
      { name: 'Arduino', level: 85 },
      { name: 'Raspberry Pi', level: 90 },
      { name: 'Sensors/Actuators', level: 80 }
    ]
  }
]

function Skills() {
  return (
    <SectionLayout id="skills" pattern="grid">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Technical Skills" 
          subtitle="A comprehensive overview of my technical expertise and proficiency levels"
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={index}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {category.skills.map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <Badge variant="secondary">{skill.level}%</Badge>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionLayout>
  )
}

export { Skills }

