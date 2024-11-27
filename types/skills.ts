import { Icons } from '@/components/icons'

export interface Skill {
  name: string;
  level: number;
  description: string;
  projects: number;
  experience: string;
  endorsements: number;
  tools?: string[];
  stack?: string[];
}

export interface SkillCategory {
  name: string;
  icon: keyof typeof Icons;
  color: string;
  skills: Skill[];
}

export interface LearningPath {
  id: string;
  title: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
  resources: string[];
  milestones: {
    title: string;
    date: string;
    status: 'completed' | 'in-progress' | 'planned';
    description: string;
  }[];
  projects: string[];
  metrics?: {
    proficiency: number;
    projectsCompleted: number;
    hoursSpent: number;
  };
} 