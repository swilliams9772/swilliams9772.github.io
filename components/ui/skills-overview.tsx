"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { ClientIcon } from './client-icon'
import { useSkills } from '@/contexts/skills-context'
import { cn } from '@/lib/utils'

export function SkillsOverview() {
  const { skills, coreCompetencies, topSkills } = useSkills()

  return (
    <div className="space-y-6">
      {/* Core Competencies */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Core Competencies</h3>
        <div className="flex flex-wrap gap-2">
          {coreCompetencies.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Badge variant="outline" className="text-primary">
                {skill}
              </Badge>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Skills by Category */}
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ClientIcon 
                  icon={category.icon} 
                  className={cn("h-5 w-5", category.color)} 
                />
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{skill.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {skill.experience}
                        </div>
                      </div>
                      <Badge variant="outline">
                        {skill.endorsements} endorsements
                      </Badge>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                      indicatorClassName={cn(
                        skill.level >= 90 && "bg-green-500",
                        skill.level >= 75 && skill.level < 90 && "bg-blue-500",
                        skill.level >= 60 && skill.level < 75 && "bg-yellow-500",
                        skill.level < 60 && "bg-red-500"
                      )}
                    />
                    <div className="flex flex-wrap gap-1">
                      {skill.tools?.map((tool, index) => (
                        <Badge 
                          key={tool} 
                          variant="secondary"
                          className="text-xs"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 