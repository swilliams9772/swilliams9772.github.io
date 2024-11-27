"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './card'
import { Badge } from './badge'
import { Progress } from './progress'
import { Button } from './button'
import { ScrollArea } from './scroll-area'
import { ClientIcon } from './client-icon'
import { Icons } from '@/components/icons'
import { useTechnology } from '@/contexts/technology-context'
import { useSkills } from '@/contexts/skills-context'
import { cn } from '@/lib/utils'
import { PROFICIENCY_COLORS, STATUS_COLORS } from '@/lib/constants/technology'

export function TechEcosystemInteractions() {
  const { selectedTech, setSelectedTech, techStats } = useTechnology()
  const { getSkillsByCategory } = useSkills()

  if (!selectedTech) return null

  const techStat = techStats.get(selectedTech.name)
  const relatedSkills = getSkillsByCategory(selectedTech.category)
    .filter(skill => skill.name !== selectedTech.name)
    .slice(0, 5)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedTech.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t"
      >
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              {/* Header */}
              <div className="flex items-start gap-4">
                <ClientIcon
                  icon={Icons[selectedTech.icon]}
                  className="h-8 w-8 text-primary"
                />
                <div>
                  <h3 className="text-lg font-semibold">{selectedTech.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedTech.experience}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(STATUS_COLORS[selectedTech.status])}
                >
                  {selectedTech.status}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium">Projects</div>
                  <div className="text-2xl font-bold text-primary">
                    {techStat?.projects.length || 0}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Proficiency</div>
                  <div className="text-2xl font-bold text-primary">
                    {selectedTech.proficiency}%
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Related Tech</div>
                  <div className="text-2xl font-bold text-primary">
                    {selectedTech.connections.length}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Related Skills</div>
                <ScrollArea className="h-20">
                  <div className="flex flex-wrap gap-2">
                    {relatedSkills.map(skill => (
                      <Badge
                        key={skill.name}
                        variant="outline"
                        className="bg-background/50"
                      >
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Tools */}
              {selectedTech.tools.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Tools & Resources</div>
                  <ScrollArea className="h-20">
                    <div className="flex flex-wrap gap-2">
                      {selectedTech.tools.map(tool => (
                        <Badge
                          key={tool}
                          variant="secondary"
                          className="bg-background/50"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedTech(null)}
            >
              <ClientIcon icon={Icons.X} className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
} 