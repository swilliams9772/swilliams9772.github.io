"use client"

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Badge } from './ui/badge'
import { ClientIcon } from './ui/client-icon'
import { Icons } from './icons'
import { personalInfo } from '@/data/personal-info'
import { cn } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'

// Dynamically import heavy components with loading states
const SkillsGlobe = dynamic(() => import('./SkillsGlobe'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

const Timeline3D = dynamic(() => import('./Timeline3D'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

// Separate components for better performance
const MetricCard = ({ metric, index }: { metric: { value: string; label: string }; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-zinc-800/30 rounded-lg p-6 border border-zinc-700/50
                 hover:bg-zinc-800/50 transition-all cursor-pointer backdrop-blur-sm"
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="text-3xl font-bold text-white mb-2"
        initial={{ scale: 0.5 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {metric.value}
      </motion.div>
      <div className="text-sm text-zinc-400">{metric.label}</div>
    </motion.div>
  )
}

const TechnologyBadge = ({ tech, index }: { tech: string; index: number }) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : index * 0.05 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      <Badge
        className="bg-zinc-800/50 text-zinc-300 border-zinc-700/50 hover:bg-zinc-700/50 
                 cursor-pointer transition-all backdrop-blur-sm"
      >
        {tech}
      </Badge>
    </motion.div>
  )
}

const TabButton = ({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: string; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm capitalize transition-all border-b-2",
      isActive
        ? "text-white border-white"
        : "text-zinc-500 border-transparent hover:text-zinc-300"
    )}
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    {tab}
  </motion.button>
)

interface Experience {
  title: string
  company: string
  companyDescription?: string
  period: string
  location: string
  department: string
  description: string[]
  overview?: string[]
  technologies?: string[]
  icon?: keyof typeof Icons
  color?: string
  impact?: string[]
  achievements?: string[]
  projects?: {
    name: string
    description: string
    technologies: string[]
  }[]
  metrics?: {
    value: string
    label: string
  }[]
  skillLevels?: {
    name: string
    value: number
  }[]
  timelineData?: {
    date: string
    value: number
    label: string
  }[]
}

const ExperienceSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'impact' | 'achievements' | 'projects'>('overview')
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const shouldReduceMotion = useReducedMotion()

  const toggleExpand = useCallback((key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }, [])

  const renderExpandableContent = useCallback(({ 
    item, 
    index, 
    type 
  }: { 
    item: string; 
    index: number; 
    type: string 
  }) => {
    const key = `${type}-${index}`
    const isExpanded = expandedItems[key]

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
      >
        <div 
          className="flex items-start gap-3 cursor-pointer
                   hover:bg-zinc-800/30 p-4 rounded-lg transition-all"
          onClick={() => toggleExpand(key)}
        >
          <ClientIcon 
            icon={Icons.ChevronRight} 
            className={cn(
              "h-5 w-5 text-zinc-500 mt-1 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
          <div>
            <p className="text-zinc-300 group-hover:text-white transition-colors">
              {item}
            </p>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pl-4 border-l-2 border-zinc-700"
                >
                  <div className="text-sm text-zinc-400 space-y-2">
                    <p>• Detailed impact analysis</p>
                    <p>• Key technologies utilized</p>
                    <p>• Team collaboration highlights</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    )
  }, [expandedItems, toggleExpand])

  const renderSection = useCallback((role: Experience) => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {role.metrics?.map((metric, i) => (
                <MetricCard key={i} metric={metric} index={i} />
              ))}
            </div>

            {/* Overview Items */}
            <div className="space-y-4">
              {role.overview?.map((item, i) => (
                renderExpandableContent({ item, index: i, type: 'overview' })
              ))}
            </div>

            {/* Skills Globe */}
            {role.skillLevels && (
              <div className="mt-12">
                <h4 className="text-sm font-medium text-zinc-400 mb-4">Skills & Expertise</h4>
                <Suspense fallback={<LoadingSpinner />}>
                  <SkillsGlobe skills={role.skillLevels} />
                </Suspense>
              </div>
            )}

            {/* Technologies */}
            {role.technologies && (
              <div className="mt-8">
                <h4 className="text-sm font-medium text-zinc-400 mb-3">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {role.technologies.map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )

      case 'details':
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Timeline */}
            {role.timelineData && (
              <div className="mt-8">
                <h4 className="text-sm font-medium text-zinc-400 mb-4">Progress Timeline</h4>
                <Suspense fallback={<LoadingSpinner />}>
                  <Timeline3D data={role.timelineData} />
                </Suspense>
              </div>
            )}

            {/* Description Items */}
            <div className="space-y-4">
              {role.description.map((item, i) => (
                renderExpandableContent({ item, index: i, type: 'detail' })
              ))}
            </div>
          </motion.div>
        )

      case 'impact':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {role.impact?.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg
                         hover:bg-zinc-800/30 transition-all cursor-pointer"
              >
                <ClientIcon 
                  icon={Icons.TrendingUp} 
                  className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" 
                />
                <span className="text-zinc-300">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        )

      case 'achievements':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {role.achievements?.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-lg
                         hover:bg-zinc-800/30 transition-all cursor-pointer"
              >
                <ClientIcon 
                  icon={Icons.Trophy} 
                  className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" 
                />
                <span className="text-zinc-300">{achievement}</span>
              </motion.div>
            ))}
          </motion.div>
        )

      case 'projects':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {role.projects?.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-800/30 rounded-lg p-6 border border-zinc-700/50
                         hover:bg-zinc-800/50 transition-all cursor-pointer"
              >
                <h4 className="text-lg font-medium text-white mb-2">{project.name}</h4>
                <p className="text-zinc-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, j) => (
                    <TechnologyBadge key={j} tech={tech} index={j} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )

      default:
        return null
    }
  }, [activeTab, renderExpandableContent])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {personalInfo.experience.map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "mb-8 p-6 rounded-lg",
              "bg-zinc-900/50 backdrop-blur-sm",
              "border border-zinc-800 hover:border-zinc-700 transition-all"
            )}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <motion.div 
                  className={cn(
                    "p-3 rounded-lg",
                    "bg-zinc-800/50",
                    role.color || "text-blue-400"
                  )}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  <ClientIcon icon={Icons[role.icon || 'Briefcase']} className="h-6 w-6" />
                </motion.div>
                
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl font-semibold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {role.title}
                  </motion.h3>
                  <div className="text-zinc-400">
                    {role.company}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-zinc-500">
                    <span>{role.period}</span>
                    <span>•</span>
                    <span>{role.location}</span>
                    <span>•</span>
                    <span>{role.department}</span>
                  </div>

                  {role.companyDescription && (
                    <motion.p 
                      className="mt-4 text-sm text-zinc-400 italic border-l-2 border-zinc-700 pl-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {role.companyDescription}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex space-x-4 border-b border-zinc-800">
                {['overview', 'details', 'impact', 'achievements', 'projects'].map((tab) => (
                  <TabButton
                    key={tab}
                    tab={tab}
                    isActive={activeTab === tab}
                    onClick={() => setActiveTab(tab as any)}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="min-h-[200px]">
                {renderSection(role)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceSection 