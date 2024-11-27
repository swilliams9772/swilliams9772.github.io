"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { TechnologyEcosystemVisualization } from '@/components/ui/technology-ecosystem-visualization'
import { TechStackVisualization } from '@/components/ui/tech-stack-visualization'
import { LearningJourneyVisualization } from '@/components/ui/learning-journey-visualization'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { techEcosystemData } from '@/data/visualization-data'

export function TechnologyOverview() {
  return (
    <SectionLayout id="technology" pattern="dots">
      <SectionHeader
        title="Technology Overview"
        subtitle="Explore my technical expertise through interactive visualizations"
      />

      <Tabs defaultValue="ecosystem" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
          <TabsTrigger value="stack">Tech Stack</TabsTrigger>
          <TabsTrigger value="journey">Learning Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="ecosystem" className="space-y-8">
          <Card className="p-6">
            <TechnologyEcosystemVisualization 
              data={techEcosystemData}
              className="min-h-[600px]"
            />
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techEcosystemData.categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <ClientIcon 
                      icon={Icons[category.icon]} 
                      className="h-6 w-6"
                      style={{ color: category.color }}
                    />
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>

                  <div className="space-y-3">
                    {techEcosystemData.nodes
                      .filter(node => node.category === category.name)
                      .slice(0, 3)
                      .map(node => (
                        <div key={node.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{node.name}</span>
                            <span>{node.proficiency}%</span>
                          </div>
                          <Progress 
                            value={node.proficiency}
                            className="h-1"
                          />
                        </div>
                      ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {techEcosystemData.nodes
                      .filter(node => node.category === category.name)
                      .slice(0, 5)
                      .map(node => (
                        <Badge key={node.id} variant="outline">
                          {node.name}
                        </Badge>
                      ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stack" className="space-y-8">
          <Card className="p-6">
            <TechStackVisualization 
              data={techEcosystemData.categories.map(category => ({
                category: category.name,
                icon: category.icon,
                color: category.color,
                technologies: techEcosystemData.nodes
                  .filter(node => node.category === category.name)
                  .map(node => ({
                    name: node.name,
                    proficiency: node.proficiency,
                    experience: node.experience,
                    projects: node.projects,
                    description: node.description,
                    type: node.status === 'active' ? 'primary' : 
                          node.status === 'learning' ? 'secondary' : 'experimental',
                    status: node.status,
                    relatedTech: node.connections.map(id => 
                      techEcosystemData.nodes.find(n => n.id === id)?.name || ''
                    ).filter(Boolean),
                    tools: node.tools
                  }))
              }))}
              className="min-h-[600px]"
            />
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-8">
          <Card className="p-6">
            <LearningJourneyVisualization 
              data={techEcosystemData.categories.map(category => ({
                category: category.name,
                paths: techEcosystemData.nodes
                  .filter(node => node.category === category.name)
                  .map(node => ({
                    id: node.id,
                    title: node.name,
                    description: node.description,
                    status: node.status,
                    skills: node.skills,
                    tools: node.tools,
                    metrics: {
                      proficiency: node.proficiency,
                      projectsCompleted: node.projects,
                      hoursSpent: Math.round(node.projects * 40) // Estimate
                    }
                  }))
              }))}
              className="min-h-[600px]"
            />
          </Card>
        </TabsContent>
      </Tabs>
    </SectionLayout>
  )
} 