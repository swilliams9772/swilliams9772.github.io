import { LucideIcon } from 'lucide-react';

export interface Contributor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  commits: number;
  additions: number;
  deletions: number;
  reviews: number;
  issues: number;
}

export interface Collaboration {
  source: string;
  target: string;
  type: 'review' | 'coauthor' | 'discussion' | 'bugfix';
  count: number;
}

export interface LearningMilestone {
  id: string;
  title: string;
  date: string;
  type: 'course' | 'certification' | 'project' | 'achievement';
  description: string;
  skills: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  resources?: string[];
  outcomes?: string[];
  next?: string[];
  status?: 'completed' | 'in-progress' | 'planned';
  duration?: string;
  provider?: string;
  certificate?: string;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  milestones: LearningMilestone[];
  category: string;
  icon: LucideIcon;
  progress: number;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'planned';
}

export interface TechNode {
  id: string;
  name: string;
  category: string;
  icon: string;
  proficiency: number;
  experience: string;
  projects: number;
  connections: string[];
  description: string;
  skills: string[];
  tools: string[];
  status: 'active' | 'learning' | 'planned';
}

export interface TechCategory {
  name: string;
  color: string;
  icon: string;
  description?: string;
}

export interface ProjectMetric {
  id: string;
  name: string;
  category: string;
  value: number;
  previousValue: number;
  target: number;
  unit: string;
  description: string;
  timeline: number[];
  relatedMetrics: string[];
  status: 'improved' | 'declined' | 'stable';
  impact: 'high' | 'medium' | 'low';
}

export interface VisualizationData<T> {
  data: T;
  timeRange?: string;
  summary?: Record<string, number>;
  loading?: boolean;
  error?: Error;
}

export type VisualizationClickHandler<T> = (item: T, event: React.MouseEvent) => void;

// Add other shared interfaces... 