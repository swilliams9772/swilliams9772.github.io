import { Icons } from '@/components/icons'

export interface TechNode {
  id: string
  name: string
  category: string
  icon: keyof typeof Icons
  proficiency: number
  experience: string
  projects: number
  status: 'active' | 'learning' | 'planned'
  description: string
  skills: string[]
  tools: string[]
  connections: string[]
}

export interface TechCategory {
  name: string
  color: string
  icon: keyof typeof Icons
  description: string
}

export interface TechEcosystem {
  nodes: TechNode[]
  categories: TechCategory[]
  timeRange: string
  summary: {
    totalTechnologies: number
    activeTechnologies: number
    averageProficiency: number
  }
}

export interface TechStack {
  category: string
  icon: keyof typeof Icons
  color: string
  technologies: {
    name: string
    proficiency: number
    experience: string
    projects: number
    description?: string
    type: 'primary' | 'secondary' | 'experimental'
    status: 'active' | 'learning' | 'planned'
    relatedTech: string[]
    metrics?: {
      name: string
      value: string
      improvement?: string
    }[]
    lastUsed?: string
    resources?: string[]
    certifications?: string[]
  }[]
}

export interface LearningPath {
  category: string
  paths: {
    id: string
    title: string
    description: string
    status: 'active' | 'learning' | 'planned'
    skills: string[]
    tools: string[]
    metrics: {
      proficiency: number
      projectsCompleted: number
      hoursSpent: number
    }
  }[]
} 