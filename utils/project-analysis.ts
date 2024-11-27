import { Project } from '@/types'
import { projectsData, projectCategories } from '@/data/projects-data'

// Get project complexity metrics
export const getProjectComplexity = (project: Project) => {
  const factors = {
    technologiesCount: project.technologies.length * 0.2,
    metricsCount: (project.metrics?.length || 0) * 0.3,
    difficulty: (project.difficulty || 3) * 0.3,
    teamSize: (project.teamSize || 1) * 0.2
  }

  return Math.round(
    (factors.technologiesCount + factors.metricsCount + 
     factors.difficulty + factors.teamSize) * 20
  )
}

// Get project impact score
export const getProjectImpact = (project: Project) => {
  const metrics = project.metrics || []
  const improvements = metrics.map(m => {
    const value = parseFloat(m.improvement.replace(/[^0-9.-]/g, ''))
    return isNaN(value) ? 0 : value
  })

  return improvements.reduce((acc, val) => acc + val, 0) / (improvements.length || 1)
}

// Get related projects based on technologies and tags
export const getRelatedProjects = (project: Project, limit = 3) => {
  return projectsData
    .filter(p => p.id !== project.id)
    .map(p => ({
      project: p,
      relevance: calculateRelevance(project, p)
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ project }) => project)
}

// Calculate technology usage statistics
export const getTechnologyStats = () => {
  const stats = new Map<string, {
    count: number
    projects: string[]
    categories: Set<string>
  }>()

  projectsData.forEach(project => {
    project.technologies.forEach(tech => {
      const existing = stats.get(tech) || {
        count: 0,
        projects: [],
        categories: new Set()
      }

      existing.count++
      existing.projects.push(project.id)
      existing.categories.add(project.category)
      stats.set(tech, existing)
    })
  })

  return Array.from(stats.entries())
    .map(([tech, data]) => ({
      name: tech,
      count: data.count,
      projects: data.projects,
      categories: Array.from(data.categories)
    }))
    .sort((a, b) => b.count - a.count)
}

// Get project timeline analysis
export const getProjectTimeline = () => {
  const timeline = projectsData
    .map(project => {
      const [startYear] = project.timeline.split('-')
      return {
        year: parseInt(startYear),
        project
      }
    })
    .sort((a, b) => b.year - a.year)

  const yearlyStats = timeline.reduce((acc, { year, project }) => {
    acc[year] = acc[year] || {
      count: 0,
      categories: new Set(),
      technologies: new Set()
    }

    acc[year].count++
    acc[year].categories.add(project.category)
    project.technologies.forEach(tech => acc[year].technologies.add(tech))

    return acc
  }, {} as Record<number, {
    count: number
    categories: Set<string>
    technologies: Set<string>
  }>)

  return {
    timeline,
    yearlyStats: Object.entries(yearlyStats).map(([year, stats]) => ({
      year: parseInt(year),
      projectCount: stats.count,
      categories: Array.from(stats.categories),
      technologies: Array.from(stats.technologies)
    }))
  }
}

// Helper function to calculate project relevance
const calculateRelevance = (source: Project, target: Project): number => {
  const techOverlap = source.technologies.filter(t => 
    target.technologies.includes(t)
  ).length

  const tagOverlap = source.tags.filter(t => 
    target.tags.includes(t)
  ).length

  const categoryRelevance = source.category === target.category ? 2 : 0

  return (techOverlap * 3) + (tagOverlap * 2) + categoryRelevance
}

// Get project statistics by category
export const getCategoryStats = () => {
  return Object.values(projectCategories).map(category => {
    const projects = projectsData.filter(p => p.category === category)
    const technologies = new Set(projects.flatMap(p => p.technologies))
    const avgComplexity = projects.reduce((acc, p) => 
      acc + getProjectComplexity(p), 0
    ) / projects.length

    return {
      category,
      projectCount: projects.length,
      technologies: Array.from(technologies),
      averageComplexity: Math.round(avgComplexity),
      featuredCount: projects.filter(p => p.featured).length,
      completedCount: projects.filter(p => p.status === 'completed').length
    }
  })
}

// Advanced project search
export interface ProjectSearchParams {
  query?: string
  categories?: string[]
  technologies?: string[]
  status?: ('completed' | 'in-progress' | 'planned')[]
  minDifficulty?: number
  maxDifficulty?: number
  featured?: boolean
}

export const searchProjects = (params: ProjectSearchParams) => {
  return projectsData.filter(project => {
    if (params.query) {
      const searchString = `
        ${project.title} ${project.description} 
        ${project.tags.join(' ')} ${project.technologies.join(' ')}
      `.toLowerCase()
      
      if (!searchString.includes(params.query.toLowerCase())) {
        return false
      }
    }

    if (params.categories?.length && 
        !params.categories.includes(project.category)) {
      return false
    }

    if (params.technologies?.length && 
        !params.technologies.some(t => project.technologies.includes(t))) {
      return false
    }

    if (params.status?.length && 
        project.status && 
        !params.status.includes(project.status)) {
      return false
    }

    if (params.minDifficulty !== undefined && 
        (project.difficulty || 0) < params.minDifficulty) {
      return false
    }

    if (params.maxDifficulty !== undefined && 
        (project.difficulty || 0) > params.maxDifficulty) {
      return false
    }

    if (params.featured !== undefined && 
        project.featured !== params.featured) {
      return false
    }

    return true
  })
} 