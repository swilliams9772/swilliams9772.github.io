import { Icons } from '@/components/icons'

export interface ProjectMetric {
  name: string;
  value: string;
  improvement?: string;
  status?: 'improved' | 'declined' | 'stable';
  target?: string;
}

export interface ProjectTechnology {
  name: string;
  category: string;
  proficiency: number;
  experience: string;
}

export interface ProjectOutcome {
  description: string;
  metrics?: ProjectMetric[];
  impact: 'high' | 'medium' | 'low';
}

export interface ProjectTechnical {
  architecture?: string;
  scalability?: string;
  pipeline?: {
    name: string;
    performance: {
      value: string;
      percentage: number;
    };
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  timeline: string;
  endDate?: string;
  tags: string[];
  technologies: string[];
  outcomes: string[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  difficulty: number;
  github?: string;
  demo?: string;
  technical?: ProjectTechnical;
  team?: {
    size: number;
    roles: string[];
  };
}

export interface ProjectViewProps {
  project: Project;
  onClose?: () => void;
}

export type ProjectViewMode = 'grid' | 'timeline' | 'kanban' | 'analytics' | 'relationships' | 'matrix' | 'metrics';

export interface ProjectFilters {
  search: string;
  category: string;
  technology: string;
  difficulty: number | null;
  status: string;
  featured: boolean;
} 