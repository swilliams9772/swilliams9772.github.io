"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { cn } from '@/lib/utils'

interface Experience {
  id: string
  company: string
  role: string
  duration: string
  location: string
  description: string
  icon: keyof typeof Icons
  color: string
  achievements: string[]
  skills: string[]
  metrics: {
    name: string
    value: string
    improvement: string
    trend: 'up' | 'down' | 'stable'
  }[]
  projects: {
    name: string
    description: string
    impact: 'high' | 'medium' | 'low'
    technologies: string[]
  }[]
  teamSize: number
  responsibilities: string[]
  technologies: {
    name: string
    proficiency: number
    category: string
  }[]
}

const experiences: Experience[] = [
  {
    id: "1",
    company: "Rose from Concrete",
    role: "Technical Program Director",
    duration: "Jan 2021 - Present",
    location: "New York, NY",
    description: "Leading AI research and development initiatives focused on community empowerment and social impact.",
    icon: "Brain",
    color: "text-purple-500",
    achievements: [
      "Led multi-functional teams to develop AI-powered community tools benefiting over 20,000 NYC residents",
      "Architected decentralized energy solution using AWS Lambda and Docker for underserved communities",
      "Created real-time monitoring tools for tracking community project impact and resource allocation"
    ],
    skills: ["Python", "AWS", "Docker", "Machine Learning", "Data Analytics", "Project Management"],
    metrics: [
      {
        name: "Community Impact",
        value: "20,000+",
        improvement: "+200%",
        trend: "up"
      },
      {
        name: "Resource Efficiency",
        value: "85%",
        improvement: "+35%",
        trend: "up"
      }
    ],
    projects: [
      {
        name: "Community Resource Platform",
        description: "AI-driven platform for optimizing community resource distribution",
        impact: "high",
        technologies: ["AWS", "Python", "Machine Learning"]
      },
      {
        name: "Energy Management System",
        description: "Decentralized solution for community energy optimization",
        impact: "high",
        technologies: ["Docker", "IoT", "Cloud Computing"]
      }
    ],
    teamSize: 5,
    responsibilities: [
      "Lead AI research initiatives",
      "Mentor junior engineers",
      "Design and implement ML pipelines",
      "Collaborate with stakeholders"
    ],
    technologies: [
      {
        name: "PyTorch",
        proficiency: 95,
        category: "ML Framework"
      },
      {
        name: "TensorFlow",
        proficiency: 90,
        category: "ML Framework"
      },
      {
        name: "Python",
        proficiency: 95,
        category: "Programming"
      }
    ]
  },
  {
    id: "2",
    company: "Success Academy High School",
    role: "Lead AP Physics Teacher",
    duration: "Jul 2019 - Present",
    location: "New York, NY",
    description: "Designing and implementing innovative STEM curriculum with focus on real-world applications.",
    icon: "GraduationCap",
    color: "text-blue-500",
    achievements: [
      "Designed innovative curriculum integrating data analysis and social justice concepts",
      "Enhanced student learning outcomes through physics and coding integration",
      "Coordinated workshops and programs focused on applying physics in social contexts"
    ],
    skills: ["Physics", "Data Analysis", "Curriculum Development", "Python", "STEM Education"],
    metrics: [
      {
        name: "Student Comprehension",
        value: "95%",
        improvement: "+20%",
        trend: "up"
      },
      {
        name: "Student Engagement",
        value: "90%",
        improvement: "+25%",
        trend: "up"
      }
    ],
    projects: [
      {
        name: "Physics & Social Justice Curriculum",
        description: "Integrated curriculum combining physics principles with real-world social issues",
        impact: "high",
        technologies: ["Python", "Data Analysis", "Educational Tech"]
      },
      {
        name: "STEM Workshop Series",
        description: "After-school program teaching coding and physics concepts",
        impact: "medium",
        technologies: ["Python", "Physics Simulations", "Educational Tools"]
      }
    ]
  },
  {
    id: "3",
    company: "BlackRock",
    role: "Risk/Quantitative Summer Analyst",
    duration: "Jun 2017 - Aug 2017",
    location: "New York, NY",
    description: "Developed and implemented quantitative solutions for portfolio risk management.",
    icon: "LineChart",
    color: "text-green-500",
    achievements: [
      "Automated high-stakes data pipelines, resulting in $30,000 annual savings",
      "Developed ML-driven anomaly detection algorithms for portfolio risk",
      "Built visualization dashboards for data-driven decision making"
    ],
    skills: ["Python", "Machine Learning", "Data Analysis", "Risk Management", "SQL"],
    metrics: [
      {
        name: "Cost Savings",
        value: "$30K",
        improvement: "Annual",
        trend: "up"
      },
      {
        name: "Process Efficiency",
        value: "75%",
        improvement: "+40%",
        trend: "up"
      }
    ],
    projects: [
      {
        name: "Portfolio Risk Analysis Pipeline",
        description: "Automated data pipeline for risk assessment and anomaly detection",
        impact: "high",
        technologies: ["Python", "ML", "SQL"]
      },
      {
        name: "Analytics Dashboard",
        description: "Interactive visualization platform for portfolio metrics",
        impact: "medium",
        technologies: ["Python", "Data Viz", "Web Tech"]
      }
    ]
  },
  {
    id: "4",
    company: "NYC Mayor's Office of Operations",
    role: "Program Manager Apprentice",
    duration: "Jan 2017 - Jun 2017",
    location: "New York, NY",
    description: "Led UX/UI improvements and policy design for public-facing applications.",
    icon: "Building",
    color: "text-orange-500",
    achievements: [
      "Led design and implementation of UX/UI improvements for public applications",
      "Contributed to resident-centered tools and policies design",
      "Increased civic engagement through improved digital interfaces"
    ],
    skills: ["UX/UI Design", "Policy Design", "Project Management", "Public Service"],
    metrics: [
      {
        name: "User Engagement",
        value: "85%",
        improvement: "+30%",
        trend: "up"
      },
      {
        name: "Resident Satisfaction",
        value: "90%",
        improvement: "+25%",
        trend: "up"
      }
    ],
    projects: [
      {
        name: "Civic Engagement Platform",
        description: "Redesigned public-facing applications for better user experience",
        impact: "high",
        technologies: ["UX/UI", "Web Design", "Public Policy"]
      },
      {
        name: "Digital Services Initiative",
        description: "Improved accessibility of government digital services",
        impact: "medium",
        technologies: ["Service Design", "Policy", "UX Research"]
      }
    ]
  }
]

export function Experience() {
  const [selectedExp, setSelectedExp] = useState<Experience>(experiences[0])
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <SectionLayout id="experience">
      <SectionHeader
        title="Professional Experience"
        subtitle="A detailed look at my professional journey and achievements"
      />

      <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
        {/* Experience Timeline */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedExp(exp)}
            >
              <Card 
                className={cn(
                  "p-4 cursor-pointer transition-colors",
                  selectedExp.id === exp.id ? "border-primary" : "hover:border-muted-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <ClientIcon 
                    icon={Icons[exp.icon]} 
                    className={cn("h-8 w-8", exp.color)} 
                  />
                  <div>
                    <h3 className="font-semibold">{exp.company}</h3>
                    <p className="text-sm text-muted-foreground">{exp.role}</p>
                    <p className="text-xs text-muted-foreground">{exp.duration}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Experience Details */}
        <div className="space-y-6">
          <motion.div
            key={selectedExp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedExp.role}</h2>
                    <p className="text-lg text-muted-foreground">{selectedExp.company}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <ClientIcon icon={Icons.MapPin} className="h-4 w-4" />
                      <span>{selectedExp.location}</span>
                      <span>•</span>
                      <span>{selectedExp.duration}</span>
                    </div>
                  </div>
                  <ClientIcon 
                    icon={Icons[selectedExp.icon]} 
                    className={cn("h-12 w-12", selectedExp.color)} 
                  />
                </div>

                {/* Description */}
                <p className="text-muted-foreground">{selectedExp.description}</p>

                {/* Metrics */}
                {selectedExp.metrics && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedExp.metrics.map((metric, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{metric.name}</p>
                          <Badge variant={metric.trend === 'up' ? 'success' : 'default'}>
                            {metric.improvement}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold mt-2">{metric.value}</p>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedExp.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ClientIcon 
                          icon={Icons.CheckCircle} 
                          className="h-5 w-5 mt-1 text-green-500" 
                        />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                {selectedExp.projects && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Notable Projects</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {selectedExp.projects.map((project, index) => (
                        <Card key={index} className="p-4">
                          <h4 className="font-semibold">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Badge 
                            variant={project.impact === 'high' ? 'success' : 'secondary'}
                            className="mt-3"
                          >
                            {project.impact.charAt(0).toUpperCase() + project.impact.slice(1)} Impact
                          </Badge>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionLayout>
  )
}

