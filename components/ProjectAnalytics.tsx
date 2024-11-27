"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { SectionHeader } from '@/components/ui/section-header'
import { SectionLayout } from '@/components/ui/section-layout'
import { 
  getProjectComplexity,
  getProjectImpact,
  getTechnologyStats,
  getCategoryStats,
  getProjectTimeline
} from '@/utils/project-analysis'

export function ProjectAnalytics() {
  const techStats = getTechnologyStats()
  const categoryStats = getCategoryStats()
  const { timeline, yearlyStats } = getProjectTimeline()

  return (
    <SectionLayout id="analytics" pattern="dots">
      <SectionHeader 
        title="Project Analytics" 
        subtitle="Insights and metrics across all projects"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Technology Usage Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Top Technologies</h3>
                <ClientIcon icon={Icons.Code} className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {techStats.slice(0, 5).map(tech => (
                  <div key={tech.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{tech.name}</span>
                      <span>{tech.count} projects</span>
                    </div>
                    <Progress 
                      value={(tech.count / techStats[0].count) * 100} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Category Distribution</h3>
                <ClientIcon icon={Icons.PieChart} className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {categoryStats.map(cat => (
                  <div key={cat.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{cat.category}</span>
                      <Badge variant="secondary">
                        {cat.projectCount} projects
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        Avg Complexity: {cat.averageComplexity}
                      </Badge>
                      <Badge variant="outline">
                        Featured: {cat.featuredCount}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Project Timeline</h3>
                <ClientIcon icon={Icons.Timeline} className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {yearlyStats.map(year => (
                  <div key={year.year} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{year.year}</span>
                      <span>{year.projectCount} projects</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {year.categories.map(cat => (
                        <Badge key={cat} variant="outline">{cat}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionLayout>
  )
} 