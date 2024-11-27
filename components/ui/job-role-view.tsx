"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from './card'
import { Badge } from './badge'
import { Button } from './button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { JobRole } from '@/types'
import { generateResume } from '@/lib/resume-generator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

interface JobRoleViewProps {
  roles: JobRole[];
  className?: string;
}

export function JobRoleView({ roles, className }: JobRoleViewProps) {
  const [currentRole, setCurrentRole] = useState<JobRole | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'experience'>('overview')
  
  const handleGeneratePDF = async () => {
    if (!currentRole) return
    
    setIsGeneratingPDF(true)
    try {
      const doc = await generateResume(currentRole)
      doc.save(`${currentRole.title.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`)
    } catch (error) {
      console.error('Failed to generate PDF:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <Select
          value={currentRole?.id}
          onValueChange={(value) => setCurrentRole(roles.find(r => r.id === value) || null)}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map(role => (
              <SelectItem key={role.id} value={role.id}>
                <div className="flex items-center gap-2">
                  <role.icon className="h-4 w-4" />
                  {role.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {currentRole && (
          <Button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2"
          >
            {isGeneratingPDF ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Icons.FileDown className="h-4 w-4" />
                Download Resume
              </>
            )}
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {currentRole && (
          <motion.div
            key={currentRole.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className={cn(
              "p-6",
              `bg-gradient-to-r ${currentRole.color}`
            )}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <currentRole.icon className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-2xl font-bold">{currentRole.title}</h3>
                    <p className="text-muted-foreground">{currentRole.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as any)}>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    {/* Overview content */}
                  </TabsContent>

                  <TabsContent value="projects">
                    {/* Projects content */}
                  </TabsContent>

                  <TabsContent value="experience">
                    {/* Experience content */}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 