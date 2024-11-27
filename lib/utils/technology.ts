import { TechNode } from '@/types/technology'
import { techEcosystemData } from '@/data/visualization-data'
import { skillsData } from '@/data/skills-data'

export function calculateTechStats() {
  const stats = new Map<string, {
    proficiency: number
    projects: number
    trend: 'rising' | 'stable' | 'declining'
  }>()

  // Add stats from tech ecosystem data
  techEcosystemData.nodes.forEach(node => {
    stats.set(node.name, {
      proficiency: node.proficiency,
      projects: node.projects,
      trend: node.proficiency >= 85 ? 'rising' : 
             node.proficiency >= 70 ? 'stable' : 'declining'
    })
  })

  // Add stats from skills data
  skillsData.forEach(category => {
    category.skills.forEach(skill => {
      if (!stats.has(skill.name)) {
        stats.set(skill.name, {
          proficiency: skill.level,
          projects: skill.projects,
          trend: skill.level >= 85 ? 'rising' :
                 skill.level >= 70 ? 'stable' : 'declining'
        })
      }
    })
  })

  return stats
}

export function getTechnologyConnections() {
  const connections = new Map<string, Set<string>>()

  // Add connections from tech ecosystem data
  techEcosystemData.nodes.forEach(node => {
    const connectedNodes = new Set<string>()
    node.connections.forEach(targetId => {
      const targetNode = techEcosystemData.nodes.find(n => n.id === targetId)
      if (targetNode) {
        connectedNodes.add(targetNode.name)
      }
    })
    connections.set(node.name, connectedNodes)
  })

  // Add connections from skills data based on shared tools
  skillsData.forEach(category => {
    category.skills.forEach(skill => {
      if (!connections.has(skill.name)) {
        const connectedSkills = new Set<string>()
        const skillTools = new Set(skill.tools || [])

        category.skills.forEach(otherSkill => {
          if (skill.name !== otherSkill.name) {
            const otherTools = new Set(otherSkill.tools || [])
            const commonTools = [...skillTools].filter(tool => otherTools.has(tool))
            if (commonTools.length > 0) {
              connectedSkills.add(otherSkill.name)
            }
          }
        })

        connections.set(skill.name, connectedSkills)
      }
    })
  })

  return connections
}

export function getTechnologyMetrics() {
  const allTechs = new Map<string, {
    usage: number
    proficiency: number
  }>()

  // Add metrics from tech ecosystem data
  techEcosystemData.nodes.forEach(node => {
    allTechs.set(node.name, {
      usage: node.projects,
      proficiency: node.proficiency
    })
  })

  // Add metrics from skills data
  skillsData.forEach(category => {
    category.skills.forEach(skill => {
      if (!allTechs.has(skill.name)) {
        allTechs.set(skill.name, {
          usage: skill.projects,
          proficiency: skill.level
        })
      }
    })
  })

  const topTechs = [...allTechs.entries()]
    .sort((a, b) => b[1].usage - a[1].usage)
    .slice(0, 3)
    .map(([name, metrics]) => ({
      name,
      usage: metrics.usage,
      trend: metrics.proficiency >= 85 ? 'rising' as const :
             metrics.proficiency >= 70 ? 'stable' as const : 'declining' as const
    }))

  return {
    totalTechnologies: allTechs.size,
    averageProficiency: Math.round(
      [...allTechs.values()].reduce((sum, tech) => sum + tech.proficiency, 0) / 
      allTechs.size
    ),
    topTechnologies: topTechs
  }
}

export function calculateNodePositions(nodes: TechNode[], width: number, height: number) {
  const positions = new Map<string, { x: number; y: number }>()
  const categories = new Set(nodes.map(node => node.category))
  const categoryAngles = new Map<string, number>()

  // Assign angles to categories
  Array.from(categories).forEach((category, index) => {
    categoryAngles.set(category, (index / categories.size) * 2 * Math.PI)
  })

  // Position nodes within their category
  nodes.forEach((node, index) => {
    const categoryAngle = categoryAngles.get(node.category) || 0
    const categoryNodes = nodes.filter(n => n.category === node.category)
    const nodeIndex = categoryNodes.indexOf(node)
    const angle = categoryAngle + (nodeIndex / categoryNodes.length) * (Math.PI / 2)
    const radius = Math.min(width, height) * 0.35

    positions.set(node.id, {
      x: width / 2 + radius * Math.cos(angle),
      y: height / 2 + radius * Math.sin(angle)
    })
  })

  return positions
}

export function calculateConnectionStrength(
  source: TechNode,
  target: TechNode,
  connections: Map<string, Set<string>>
) {
  const sourceConnections = connections.get(source.name)
  const targetConnections = connections.get(target.name)

  if (!sourceConnections || !targetConnections) {
    return 0
  }

  const commonConnections = new Set(
    [...sourceConnections].filter(id => targetConnections.has(id))
  )

  return commonConnections.size / Math.max(sourceConnections.size, targetConnections.size)
} 