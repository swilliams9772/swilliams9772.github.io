"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Badge } from '@/components/ui/badge'
import { Skill } from '@/types'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { 
  PROFICIENCY_LEVELS, 
  PROFICIENCY_COLORS,
  SKILL_METRICS,
  EXPERIENCE_LEVELS
} from '@/lib/constants/technology'

interface SkillCardProps {
  skill: Skill
  index: number
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const getProficiencyColor = (level: number) => {
    if (level >= PROFICIENCY_LEVELS.EXPERT) return PROFICIENCY_COLORS[PROFICIENCY_LEVELS.EXPERT]
    if (level >= PROFICIENCY_LEVELS.ADVANCED) return PROFICIENCY_COLORS[PROFICIENCY_LEVELS.ADVANCED]
    if (level >= PROFICIENCY_LEVELS.INTERMEDIATE) return PROFICIENCY_COLORS[PROFICIENCY_LEVELS.INTERMEDIATE]
    if (level >= PROFICIENCY_LEVELS.BEGINNER) return PROFICIENCY_COLORS[PROFICIENCY_LEVELS.BEGINNER]
    return PROFICIENCY_COLORS[PROFICIENCY_LEVELS.LEARNING]
  }

  const getExperienceLevel = (years: string) => {
    const numYears = parseInt(years)
    if (numYears >= 5) return EXPERIENCE_LEVELS.EXPERT
    if (numYears >= 3) return EXPERIENCE_LEVELS.ADVANCED
    if (numYears >= 1) return EXPERIENCE_LEVELS.INTERMEDIATE
    return EXPERIENCE_LEVELS.BEGINNER
  }

  const experienceLevel = getExperienceLevel(skill.experience)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{skill.name}</h3>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </div>
          <Badge 
            variant="outline"
            className={cn(
              "ml-2",
              skill.level >= PROFICIENCY_LEVELS.EXPERT && "text-green-500 border-green-500",
              skill.level >= PROFICIENCY_LEVELS.ADVANCED && "text-blue-500 border-blue-500",
              skill.level >= PROFICIENCY_LEVELS.INTERMEDIATE && "text-yellow-500 border-yellow-500"
            )}
          >
            {experienceLevel.label}
          </Badge>
        </div>

        {/* Proficiency Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Proficiency</span>
            <span>{skill.level}%</span>
          </div>
          <Progress 
            value={skill.level} 
            className="h-2"
            indicatorClassName={getProficiencyColor(skill.level)}
          />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Experience</div>
            <div className="flex items-center gap-2">
              <ClientIcon icon={Icons.Clock} className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{skill.experience}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Projects</div>
            <div className="flex items-center gap-2">
              <ClientIcon icon={Icons.Briefcase} className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{skill.projects} Completed</span>
            </div>
          </div>
        </div>

        {/* Growth & Impact */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium">Growth</div>
            <Badge variant="secondary" className="text-xs">
              {skill.growth || SKILL_METRICS.GROWTH.STEADY}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Impact</div>
            <Badge variant="secondary" className="text-xs">
              {skill.impact || SKILL_METRICS.IMPACT.MEDIUM}
            </Badge>
          </div>
        </div>

        {/* Tools & Technologies */}
        {(skill.tools || skill.frameworks || skill.technologies || skill.relatedTools) && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Tools & Technologies</div>
            <div className="flex flex-wrap gap-2">
              {[...(skill.tools || []), ...(skill.frameworks || []), 
                ...(skill.technologies || []), ...(skill.relatedTools || [])]
                .map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
            </div>
          </div>
        )}

        {/* Endorsements & Certifications */}
        <div className="flex flex-wrap gap-2 pt-2">
          {skill.endorsements && (
            <div className="flex items-center gap-1">
              <ClientIcon icon={Icons.ThumbsUp} className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{skill.endorsements} Endorsements</span>
            </div>
          )}
          {skill.certifications && skill.certifications.map(cert => (
            <Badge key={cert} variant="secondary" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>

        {/* Key Achievements */}
        {skill.achievements && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Key Achievements</div>
            <ul className="text-sm space-y-1">
              {skill.achievements.map((achievement, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ClientIcon icon={Icons.CheckCircle} className="h-4 w-4 text-green-500" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </motion.div>
  )
} 