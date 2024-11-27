"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { ClientIcon } from './ui/client-icon'
import { Icons } from './icons'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/data/personal-info'

const skillCategories = [
  {
    name: "AI & Machine Learning",
    icon: "Brain",
    color: "text-blue-500",
    skills: [
      { name: "Deep Learning & Neural Networks", level: 95 },
      { name: "Computer Vision & Image Processing", level: 90 },
      { name: "Natural Language Processing", level: 90 },
      { name: "Voice Cloning & Audio Processing", level: 95 },
      { name: "Generative AI & GANs", level: 90 }
    ],
    technologies: [
      "TensorFlow", "PyTorch", "Scikit-Learn", "Hugging Face", "OpenCV",
      "DALL-E 2", "Stable Diffusion", "YOLOv9", "Whisper"
    ]
  },
  {
    name: "Software Engineering",
    icon: "Code",
    color: "text-green-500",
    skills: [
      { name: "Full-Stack Development", level: 95 },
      { name: "Cloud Architecture", level: 90 },
      { name: "System Design", level: 90 },
      { name: "DevOps & CI/CD", level: 85 },
      { name: "Database Design", level: 90 }
    ],
    technologies: [
      "Python", "TypeScript", "React", "Node.js", "Docker",
      "Kubernetes", "AWS", "GCP", "PostgreSQL", "MongoDB"
    ]
  },
  {
    name: "Community Tech & Education",
    icon: "Users",
    color: "text-purple-500",
    skills: [
      { name: "STEM Education", level: 95 },
      { name: "Community Program Management", level: 90 },
      { name: "Impact Assessment", level: 90 },
      { name: "Curriculum Development", level: 95 },
      { name: "Workshop Facilitation", level: 90 }
    ],
    technologies: [
      "Educational Software", "Analytics Tools", "LMS Systems",
      "Impact Measurement", "Data Visualization"
    ]
  },
  {
    name: "Cybersecurity & Networks",
    icon: "Shield",
    color: "text-red-500",
    skills: [
      { name: "Network Analysis", level: 90 },
      { name: "Security Tool Development", level: 85 },
      { name: "Vulnerability Assessment", level: 85 },
      { name: "Graph Analytics", level: 90 },
      { name: "Data Privacy", level: 90 }
    ],
    technologies: [
      "Shodan", "Graph Databases", "Network Tools", "Security Frameworks",
      "Social Network Analysis"
    ]
  }
]

export const Skills = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 mb-12"
        >
          <h2 className="text-3xl font-bold">Skills & Expertise</h2>
          <p className="text-zinc-400">
            Specialized in AI/ML, community tech, and educational innovation with {personalInfo.expertise[1].years}+ years of software engineering experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "p-2 rounded-lg bg-zinc-800/50",
                    category.color
                  )}>
                    <ClientIcon icon={Icons[category.icon]} className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  {category.skills.map((skill, j) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-300">{skill.name}</span>
                        <span className="text-zinc-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1" />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, k) => (
                    <Badge
                      key={k}
                      className="bg-zinc-800/50 text-zinc-300 border-zinc-700/50 hover:bg-zinc-700/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills;

