"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SectionLayout } from '@/components/ui/section-layout'
import { SectionHeader } from '@/components/ui/section-header'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { projectsData, projectCategories, getProjectMetrics } from '@/data/projects-data'

export function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>(projectCategories.AI_ML)
  const metrics = getProjectMetrics()

  const filteredProjects = projectsData.filter(
    project => project.category === selectedCategory
  )

  return (
    <SectionLayout id="projects" pattern="dots">
      <SectionHeader
        title="Project Portfolio"
        subtitle="Showcasing my technical projects and their impact"
      />

      {/* Project Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{metrics.totalProjects}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{metrics.featuredProjects}</div>
            <div className="text-sm text-muted-foreground">Featured Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{metrics.categories}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">{metrics.technologies}</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <Tabs
        defaultValue={projectCategories.AI_ML}
        onValueChange={setSelectedCategory}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Object.values(projectCategories).map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="w-full"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{project.timeline}</Badge>
                    {project.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Key Outcomes</h4>
                    <ul className="space-y-1">
                      {project.outcomes.map(outcome => (
                        <li key={outcome} className="flex items-center gap-2">
                          <ClientIcon icon={Icons.CheckCircle} className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map(metric => (
                        <Card key={metric.name} className="p-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {metric.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {metric.name}
                            </div>
                            <div className="text-sm text-green-500">
                              {metric.improvement}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {project.github && (
                    <Button asChild className="w-full">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ClientIcon icon={Icons.Github} className="h-4 w-4" />
                        View Source
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionLayout>
  )
} 