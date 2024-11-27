import { Project, ProjectMetric } from '@/types/project'
import { Icons } from '@/components/icons'

export const calculateProjectImpact = (project: Project): number => {
  if (!project.metrics?.length) return 0;
  
  return project.metrics.reduce((total, metric) => {
    if (metric.improvement) {
      const value = parseFloat(metric.improvement.replace(/[^0-9.-]/g, ''));
      return total + (isNaN(value) ? 0 : value);
    }
    return total;
  }, 0) / project.metrics.length;
};

export const getProjectDuration = (timeline: string): number => {
  const [start, end] = timeline.split('-').map(date => new Date(date));
  return end ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;
};

export const getProjectStatus = (project: Project): {
  label: string;
  color: string;
  icon: keyof typeof Icons;
} => {
  const statusMap = {
    completed: {
      label: 'Completed',
      color: 'text-green-500',
      icon: 'CheckCircle' as const
    },
    'in-progress': {
      label: 'In Progress',
      color: 'text-blue-500',
      icon: 'Clock' as const
    },
    planned: {
      label: 'Planned',
      color: 'text-amber-500',
      icon: 'Calendar' as const
    }
  } as const;
  
  return statusMap[project.status] || {
    label: 'Unknown',
    color: 'text-gray-500',
    icon: 'HelpCircle' as const
  };
};

export const filterProjects = (
  projects: Project[],
  filters: ProjectFilters
): Project[] => {
  return projects.filter(project => {
    if (filters.search && !project.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && project.category !== filters.category) {
      return false;
    }
    if (filters.technology && !project.technologies.includes(filters.technology)) {
      return false;
    }
    if (filters.difficulty !== null && project.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.status && project.status !== filters.status) {
      return false;
    }
    if (filters.featured && !project.featured) {
      return false;
    }
    return true;
  });
};

export const sortProjects = (
  projects: Project[],
  sortBy: 'date' | 'difficulty' | 'impact'
): Project[] => {
  return [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.timeline).getTime() - new Date(a.timeline).getTime();
      case 'difficulty':
        return b.difficulty - a.difficulty;
      case 'impact':
        return calculateProjectImpact(b) - calculateProjectImpact(a);
      default:
        return 0;
    }
  });
}; 