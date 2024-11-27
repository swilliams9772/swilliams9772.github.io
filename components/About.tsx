"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { personalInfo } from '@/data/personal-info'

export function About() {
  return (
    <SectionLayout id="about">
      <SectionHeader
        title="About Me"
        subtitle="Learn more about my background and expertise"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClientIcon icon={Icons.User} className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Bio</h3>
              </div>
              <p className="text-muted-foreground">{personalInfo.bio}</p>
              
              <div className="flex flex-wrap gap-2">
                {personalInfo.interests.map(interest => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClientIcon icon={Icons.Star} className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Expertise</h3>
              </div>
              
              <div className="space-y-4">
                {personalInfo.expertise.map(exp => (
                  <div key={exp.area} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{exp.area}</h4>
                      <Badge variant="outline">{exp.years}+ years</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClientIcon icon={Icons.Code} className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Technical Skills</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Programming</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.programming.map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.frameworks.map(framework => (
                      <Badge key={framework} variant="outline">{framework}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Cloud</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.cloud.map(platform => (
                      <Badge key={platform} variant="outline">{platform}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {personalInfo.skills.tools.map(tool => (
                      <Badge key={tool} variant="outline">{tool}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 h-full">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClientIcon icon={Icons.Trophy} className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Key Achievements</h3>
              </div>
              
              <ul className="space-y-2">
                {personalInfo.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ClientIcon 
                      icon={Icons.CheckCircle} 
                      className="h-4 w-4 mt-1 text-green-500" 
                    />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>
    </SectionLayout>
  )
} 