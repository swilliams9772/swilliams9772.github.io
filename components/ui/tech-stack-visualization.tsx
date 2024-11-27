"use client"

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { VisualizationContainer } from './visualization-container'
import { VisualizationTooltip } from './visualization-tooltip'
import { VisualizationLegend } from './visualization-legend'
import { useVisualizationResize } from '@/hooks/use-visualization-resize'
import { ClientIcon } from './client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

interface TechStack {
  category: string;
  icon: keyof typeof Icons;
  color: string;
  technologies: {
    name: string;
    proficiency: number;
    experience: string;
    projects: number;
    description?: string;
    type: 'primary' | 'secondary' | 'experimental';
    status: 'active' | 'learning' | 'planned';
    relatedTech: string[];
    metrics?: {
      name: string;
      value: string;
      improvement?: string;
    }[];
    lastUsed?: string;
    resources?: string[];
    certifications?: string[];
  }[];
}

interface TechStackVisualizationProps {
  data: TechStack[];
  className?: string;
  onTechnologyClick?: (tech: TechStack['technologies'][0]) => void;
}

const statusColors = {
  active: "bg-green-500/10 text-green-500",
  learning: "bg-blue-500/10 text-blue-500",
  planned: "bg-amber-500/10 text-amber-500"
} as const;

const typeColors = {
  primary: "from-purple-500/20 to-pink-500/20",
  secondary: "from-blue-500/20 to-cyan-500/20",
  experimental: "from-amber-500/20 to-red-500/20"
} as const;

export function TechStackVisualization({
  data = [],
  className,
  onTechnologyClick
}: TechStackVisualizationProps) {
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { containerRef, width, height } = useVisualizationResize()

  const handleTechMouseEnter = (event: React.MouseEvent, tech: TechStack['technologies'][0]) => {
    setTooltipContent(
      <Card className="p-4 w-80">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{tech.name}</h4>
            <Badge variant="outline" className={cn(statusColors[tech.status])}>
              {tech.status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">{tech.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Proficiency</span>
              <span>{tech.proficiency}%</span>
            </div>
            <Progress 
              value={tech.proficiency} 
              className="h-1"
              indicatorClassName={cn(
                tech.proficiency >= 80 && "bg-green-500",
                tech.proficiency >= 60 && tech.proficiency < 80 && "bg-blue-500",
                tech.proficiency < 60 && "bg-amber-500"
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Experience: {tech.experience}</div>
            <div>Projects: {tech.projects}</div>
            <div>Last Used: {tech.lastUsed}</div>
          </div>

          {tech.certifications && tech.certifications.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Certifications:</div>
              <div className="flex flex-wrap gap-1">
                {tech.certifications.map((cert, i) => (
                  <Badge key={i} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {tech.relatedTech.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Related Technologies:</div>
              <div className="flex flex-wrap gap-1">
                {tech.relatedTech.map((related, i) => (
                  <Badge key={i} variant="outline" className="bg-muted">
                    {related}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {tech.resources && tech.resources.length > 0 && (
            <div className="space-y-1">
              <div className="text-sm font-medium">Learning Resources:</div>
              <div className="text-sm text-muted-foreground space-y-1">
                {tech.resources.map((resource, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <ClientIcon Icon={Icons.Book} className="h-3 w-3" />
                    <span>{resource}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    )
    setTooltipPosition({ x: event.pageX, y: event.pageY })
    setShowTooltip(true)
  }

  const handleTechMouseLeave = () => {
    setShowTooltip(false)
  }

  const legendItems = [
    ...Object.entries(typeColors).map(([type, color]) => ({
      label: type,
      color: color.split(' ')[0].replace('from-', '').replace('/20', '')
    })),
    ...Object.entries(statusColors).map(([status, color]) => ({
      label: status,
      color: color.split(' ')[1]
    }))
  ]

  return (
    <VisualizationContainer
      title="Technology Stack"
      className={className}
      isEmpty={!data?.length}
    >
      <div ref={containerRef} className="relative space-y-8">
        {data.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className={cn(
              "space-y-4",
              selectedCategory && selectedCategory !== category.category && "opacity-50"
            )}
          >
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setSelectedCategory(
                selectedCategory === category.category ? null : category.category
              )}
            >
              <ClientIcon
                Icon={Icons[category.icon]}
                className="h-5 w-5"
                style={{ color: category.color }}
              />
              <h3 className="font-semibold">{category.category}</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (categoryIndex * 0.1) + (techIndex * 0.05) }}
                  onMouseEnter={(e) => handleTechMouseEnter(e, tech)}
                  onMouseLeave={handleTechMouseLeave}
                  onClick={() => onTechnologyClick?.(tech)}
                  className="cursor-pointer"
                >
                  <Card className={cn(
                    "p-4 hover:shadow-lg transition-all duration-300",
                    "bg-gradient-to-r",
                    typeColors[tech.type]
                  )}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{tech.name}</h4>
                        <Badge
                          variant="outline"
                          className={cn(statusColors[tech.status])}
                        >
                          {tech.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Proficiency</span>
                          <span>{tech.proficiency}%</span>
                        </div>
                        <Progress
                          value={tech.proficiency}
                          className="h-1"
                          indicatorClassName={cn(
                            tech.proficiency >= 80 && "bg-green-500",
                            tech.proficiency >= 60 && tech.proficiency < 80 && "bg-blue-500",
                            tech.proficiency < 60 && "bg-amber-500"
                          )}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{tech.experience}</span>
                        <span>{tech.projects} projects</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        <VisualizationLegend
          title="Technology Types & Status"
          items={legendItems}
          position="top-right"
        />

        <VisualizationTooltip
          content={tooltipContent}
          visible={showTooltip}
          x={tooltipPosition.x}
          y={tooltipPosition.y}
        />
      </div>
    </VisualizationContainer>
  )
} 