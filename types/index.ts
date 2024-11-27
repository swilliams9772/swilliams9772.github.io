import { LucideIcon } from 'lucide-react'
import { Icons } from '@/components/icons'
import { SKILL_METRICS, TECH_STATUS, TECH_TYPE } from '@/lib/constants/technology'

// Personal Info Types
export interface PersonalInfo {
  name: string
  email: string
  linkedin: string
  github: string
  location: string
  role: string
  bio: string
  expertise: {
    area: string
    description: string
    years: number
  }[]
  skills: {
    programming: string[]
    frameworks: string[]
    cloud: string[]
    tools: string[]
  }
  education: {
    degree: string
    school: string
    year: string
  }[]
  languages: string[]
  interests: string[]
  achievements: string[]
}

// Skill Types
export interface Skill {
  name: string
  level: number
  description: string
  projects: number
  experience: string
  endorsements?: number
  tools?: string[]
  frameworks?: string[]
  technologies?: string[]
  relatedTools?: string[]
  certifications?: string[]
  achievements?: string[]
  impact?: keyof typeof SKILL_METRICS.IMPACT
  growth?: keyof typeof SKILL_METRICS.GROWTH
  demand?: keyof typeof SKILL_METRICS.DEMAND
  category?: string
  subcategory?: string
  lastUsed?: string
  resources?: {
    name: string
    url: string
    type: 'documentation' | 'tutorial' | 'course' | 'article' | 'video'
  }[]
  metrics?: {
    name: string
    value: string | number
    trend?: 'up' | 'down' | 'stable'
    description?: string
  }[]
  relatedSkills?: string[]
  prerequisites?: string[]
  nextSteps?: string[]
  notes?: string
}

export interface SkillCategory {
  name: string
  icon: keyof typeof Icons
  color: string
  description?: string
  skills: Skill[]
  metrics?: {
    totalProjects: number
    averageProficiency: number
    activeSkills: number
    learningSkills: number
  }
}

// Job Role Types
export interface JobRole {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: string
  responsibilities: string[]
  requiredSkills: string[]
  relevantProjects: {
    name: string
    description: string
    skills: string[]
    outcomes: string[]
  }[]
  relevantExperience: {
    role: string
    company: string
    duration: string
    highlights: string[]
  }[]
  publications?: {
    title: string
    type: string
    relevance: string
  }[]
  certifications?: string[]
}

// Icon Types
export type IconKey = keyof typeof Icons
export type Icon = LucideIcon

// Project Types
export interface ProjectMetric {
  name: string
  value: string
  improvement: string
}

export interface ProjectTimeline {
  phase: string
  duration: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  timeline: string
  status: 'completed' | 'in-progress' | 'planned'
  featured?: boolean
  difficulty: number
  tags: string[]
  technologies: string[]
  outcomes: string[]
  metrics?: {
    name: string
    value: string
    improvement?: string
  }[]
  github?: string
  demo?: string
  documentation?: string
  technical?: {
    architecture: string
    pipeline?: {
      name: string
      performance: {
        value: string | number
        percentage: number
      }
    }[]
    infrastructure?: string[]
    challenges?: string[]
    solutions?: string[]
    learnings?: string[]
  }
  team?: {
    size: number
    roles: string[]
    responsibilities: string[]
  }
  impact?: {
    business: string[]
    technical: string[]
    community?: string[]
  }
  nextSteps?: string[]
  relatedProjects?: string[]
  resources?: {
    name: string
    url: string
    type: 'documentation' | 'demo' | 'code' | 'article' | 'video'
  }[]
  notes?: string
}

// Visualization Types
export interface SkillVisualizationData {
  categories: SkillCategory[]
  summary: {
    totalSkills: number
    averageLevel: number
    topSkills: string[]
    recentSkills: string[]
  }
  timeline: {
    date: string
    skill: string
    event: string
    level: number
  }[]
}

export interface LearningPath {
  id: string
  name: string
  description: string
  skills: string[]
  milestones: {
    date: string
    title: string
    description: string
    skills: string[]
    type: 'course' | 'project' | 'certification' | 'achievement'
    status: 'completed' | 'in-progress' | 'planned'
  }[]
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  prerequisites: string[]
  outcomes: string[]
}

export interface TechNode {
  id: string
  name: string
  category: string
  subcategory?: string
  icon: keyof typeof Icons
  proficiency: number
  experience: string
  projects: number
  status: keyof typeof TECH_STATUS
  type?: keyof typeof TECH_TYPE
  description: string
  skills: string[]
  tools: string[]
  connections: string[]
  metrics?: {
    impact: keyof typeof SKILL_METRICS.IMPACT
    growth: keyof typeof SKILL_METRICS.GROWTH
    demand: keyof typeof SKILL_METRICS.DEMAND
    complexity: number
    satisfaction: number
  }
  timeline?: {
    started: string
    milestones: {
      date: string
      title: string
      description: string
      type: 'achievement' | 'certification' | 'project' | 'learning'
    }[]
  }
  resources?: {
    name: string
    url: string
    type: 'documentation' | 'tutorial' | 'course' | 'article' | 'video'
  }[]
  notes?: string
}

export interface TechCategory {
  name: string
  icon: keyof typeof Icons
  color: string
  description: string
  metrics?: {
    totalTechnologies: number
    activeTechnologies: number
    averageProficiency: number
    totalProjects: number
    learningPath?: {
      current: string[]
      next: string[]
      recommended: string[]
    }
  }
} 