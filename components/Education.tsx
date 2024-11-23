"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'
import { fadeInUp } from '@/lib/utils/animation-variants'

const education = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'Georgia Institute of Technology',
    period: '2019 - 2021',
    specialization: 'Machine Learning & Artificial Intelligence',
    achievements: [
      'GPA: 3.9/4.0',
      'Research Focus: Deep Learning for Voice Synthesis',
      'Teaching Assistant for ML Fundamentals'
    ],
    courses: [
      'Advanced Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Reinforcement Learning'
    ]
  },
  {
    degree: 'Bachelor of Science in Computer Engineering',
    institution: 'University of Maryland',
    period: '2015 - 2019',
    specialization: 'Robotics & Embedded Systems',
    achievements: [
      'GPA: 3.8/4.0',
      'Senior Project: Autonomous UAV System',
      'Dean\'s List: All Semesters'
    ],
    courses: [
      'Digital Signal Processing',
      'Embedded Systems',
      'Control Systems',
      'Robotics',
      'Computer Architecture'
    ]
  }
]

export const Education = () => {
  return (
    <SectionLayout id="education" pattern="dots">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Education" 
          subtitle="Academic background and achievements"
        />
        
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={index}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      </div>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {edu.institution}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </p>
                    </div>
                    <Badge variant="secondary" className="self-start">
                      {edu.specialization}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Achievements</h4>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <Badge key={i} variant="outline">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

