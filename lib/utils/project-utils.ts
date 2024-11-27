import { Project } from '@/types'

export const sortProjects = (projects: Project[], sortOption: string) => {
  return [...projects].sort((a, b) => {
    switch (sortOption) {
      case 'date':
        return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime()
      case 'difficulty':
        return b.difficulty - a.difficulty
      case 'impact':
        return b.impact.localeCompare(a.impact)
      default:
        return 0
    }
  })
}

export const filterProjects = (
  projects: Project[],
  filter: { category: string; technology: string; difficulty: string },
  searchTerm: string
) => {
  return projects.filter(project => 
    (filter.category === 'All' || project.category === filter.category) &&
    (filter.technology === 'All' || project.technologies.includes(filter.technology)) &&
    (filter.difficulty === 'All' || project.difficulty === parseInt(filter.difficulty)) &&
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())))
  )
} 