"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Book, Award, Brain, Lightbulb } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const educationData = [
  {
    degree: 'Bachelor of Science in Physics',
    institution: 'City College of New York',
    location: 'New York, New York',
    period: '2015 - 2019',
    details: 'Focus on Computational Physics, Data Science, and Quantitative Analysis',
    gpa: '3.8',
    coursework: [
      'Machine Learning',
      'Data Structures',
      'Computational Physics',
      'Network Science',
      'Data Visualization',
      'Quantum Mechanics',
      'Statistical Mechanics',
      'Mathematical Physics',
      'Differential Equations',
      'Linear Algebra'
    ],
    research: [
      {
        title: 'Computational Physics Research',
        description: 'Developed numerical methods for solving complex quantum mechanical systems',
        outcomes: [
          'Implemented Monte Carlo simulations for quantum systems',
          'Created visualization tools for quantum phenomena',
          'Published findings in undergraduate physics journal'
        ]
      },
      {
        title: 'Quantitative Analysis Project',
        description: 'Applied statistical methods to analyze large datasets from particle physics experiments',
        outcomes: [
          'Processed terabytes of experimental data',
          'Developed statistical models for particle detection',
          'Created automated analysis pipelines'
        ]
      }
    ],
    achievements: [
      {
        title: 'Research Excellence',
        description: 'Applied advanced data analysis techniques to physics research projects',
        icon: Brain
      },
      {
        title: 'Technical Innovation',
        description: 'Developed computational models for complex physical systems',
        icon: Lightbulb
      },
      {
        title: 'Academic Leadership',
        description: 'Led physics study groups and mentored junior students',
        icon: Award
      }
    ],
    skills: [
      { name: 'Scientific Computing', level: 90 },
      { name: 'Data Analysis', level: 95 },
      { name: 'Mathematical Modeling', level: 85 },
      { name: 'Research Methods', level: 90 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Quantum Mechanics', level: 85 },
      { name: 'Statistical Analysis', level: 90 },
      { name: 'Numerical Methods', level: 85 }
    ],
    publications: [
      {
        title: 'Numerical Solutions to Quantum Mechanical Systems',
        journal: 'Undergraduate Physics Journal',
        year: '2019'
      },
      {
        title: 'Statistical Analysis of Particle Physics Data',
        conference: 'Physics Student Conference',
        year: '2018'
      }
    ],
    specializations: [
      {
        area: 'Computational Physics',
        topics: [
          'Numerical Methods',
          'Monte Carlo Simulations',
          'Quantum Computing',
          'High-Performance Computing'
        ]
      },
      {
        area: 'Mathematical Physics',
        topics: [
          'Differential Equations',
          'Complex Analysis',
          'Group Theory',
          'Linear Algebra'
        ]
      },
      {
        area: 'Data Science',
        topics: [
          'Statistical Analysis',
          'Machine Learning',
          'Data Visualization',
          'Big Data Processing'
        ]
      }
    ],
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    degree: 'High School Diploma - Mechanical Engineering Major',
    institution: 'Brooklyn Technical High School',
    location: 'Brooklyn, New York',
    period: '2009 - 2013',
    details: 'Specialized in Mechanical Engineering with additional focus on Mandarin language studies',
    gpa: '3.9',
    coursework: [
      'Mechanical Engineering Design',
      'CNC Programming & Operation',
      'CAD/CAM Systems',
      'Machine Shop Practice',
      'Mandarin Chinese',
      'Engineering Mathematics',
      'Materials Science',
      'Technical Drawing'
    ],
    research: [
      {
        title: 'Advanced Manufacturing Projects',
        description: 'Gained hands-on experience with industrial manufacturing equipment and processes',
        outcomes: [
          'Operated CNC mills and lathes for precision parts manufacturing',
          'Developed proficiency in G-code programming for CNC machines',
          'Created complex mechanical assemblies using various machine tools'
        ]
      },
      {
        title: 'Engineering Design Projects',
        description: 'Participated in comprehensive engineering design and fabrication projects',
        outcomes: [
          'Designed and fabricated mechanical components using CAD/CAM software',
          'Utilized 3D printing and rapid prototyping techniques',
          'Implemented quality control and testing procedures'
        ]
      }
    ],
    achievements: [
      {
        title: 'Technical Excellence',
        description: 'Mastered industrial-grade manufacturing equipment and processes',
        icon: Brain
      },
      {
        title: 'Language Proficiency',
        description: 'Achieved proficiency in Mandarin Chinese language and cultural studies',
        icon: Lightbulb
      },
      {
        title: 'Engineering Projects',
        description: 'Completed multiple hands-on engineering projects using advanced manufacturing tools',
        icon: Award
      }
    ],
    skills: [
      { name: 'CNC Operation', level: 90 },
      { name: 'Machine Shop', level: 85 },
      { name: 'CAD/CAM', level: 90 },
      { name: 'Technical Drawing', level: 85 },
      { name: 'Mandarin Chinese', level: 80 },
      { name: 'Engineering Design', level: 85 },
      { name: 'Quality Control', level: 80 },
      { name: 'Manufacturing', level: 85 }
    ],
    specializations: [
      {
        area: 'Manufacturing Technology',
        topics: [
          'CNC Programming',
          'Machine Tool Operation',
          'Manufacturing Processes',
          'Quality Control'
        ]
      },
      {
        area: 'Engineering Design',
        topics: [
          'CAD/CAM Systems',
          'Technical Drawing',
          'Mechanical Design',
          'Materials Science'
        ]
      },
      {
        area: 'Language Studies',
        topics: [
          'Mandarin Chinese',
          'Technical Communication',
          'Cultural Studies',
          'Business Language'
        ]
      }
    ],
    color: 'from-orange-500/20 to-yellow-500/20'
  }
]

const Education = () => {
  return (
    <section id="education" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className={`overflow-hidden bg-gradient-to-r ${edu.color}`}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Book className="h-6 w-6 text-primary" />
                        <h3 className="text-2xl font-bold">{edu.degree}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.location}</p>
                      <Badge variant="secondary" className="mt-2">GPA: {edu.gpa}</Badge>
                    </div>
                    <Badge variant="outline" className="text-lg">
                      {edu.period}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Key Coursework</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {edu.coursework.map((course, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex justify-between items-center bg-background/50 p-3 rounded-lg"
                            >
                              <span>{course}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-4">Skills Developed</h4>
                        <div className="space-y-4">
                          {edu.skills.map((skill, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <div className="flex justify-between mb-1">
                                <span>{skill.name}</span>
                                <span>{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Key Achievements</h4>
                        <div className="space-y-4">
                          {edu.achievements.map((achievement, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-background/50 p-4 rounded-lg"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <achievement.icon className="h-5 w-5 text-primary" />
                                <h5 className="font-semibold">{achievement.title}</h5>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {achievement.description}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education

