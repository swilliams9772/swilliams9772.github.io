export const TECH_STATUS = {
  ACTIVE: 'active',
  LEARNING: 'learning',
  PLANNED: 'planned',
  MASTERED: 'mastered',
  MENTORING: 'mentoring'
} as const;

export const TECH_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  EXPERIMENTAL: 'experimental',
  EMERGING: 'emerging',
  CORE: 'core',
  SPECIALIZED: 'specialized'
} as const;

export const STATUS_COLORS = {
  [TECH_STATUS.ACTIVE]: 'text-green-500 border-green-500',
  [TECH_STATUS.LEARNING]: 'text-blue-500 border-blue-500',
  [TECH_STATUS.PLANNED]: 'text-amber-500 border-amber-500',
  [TECH_STATUS.MASTERED]: 'text-purple-500 border-purple-500',
  [TECH_STATUS.MENTORING]: 'text-pink-500 border-pink-500'
} as const;

export const TYPE_COLORS = {
  [TECH_TYPE.PRIMARY]: 'from-primary/10 to-primary/5',
  [TECH_TYPE.SECONDARY]: 'from-secondary/10 to-secondary/5',
  [TECH_TYPE.EXPERIMENTAL]: 'from-muted/10 to-muted/5',
  [TECH_TYPE.EMERGING]: 'from-blue-500/10 to-blue-500/5',
  [TECH_TYPE.CORE]: 'from-purple-500/10 to-purple-500/5',
  [TECH_TYPE.SPECIALIZED]: 'from-amber-500/10 to-amber-500/5'
} as const;

export const PROFICIENCY_LEVELS = {
  EXPERT: 90,
  ADVANCED: 75,
  INTERMEDIATE: 60,
  BEGINNER: 40,
  LEARNING: 25
} as const;

export const PROFICIENCY_COLORS = {
  [PROFICIENCY_LEVELS.EXPERT]: 'bg-green-500',
  [PROFICIENCY_LEVELS.ADVANCED]: 'bg-blue-500',
  [PROFICIENCY_LEVELS.INTERMEDIATE]: 'bg-yellow-500',
  [PROFICIENCY_LEVELS.BEGINNER]: 'bg-orange-500',
  [PROFICIENCY_LEVELS.LEARNING]: 'bg-red-500'
} as const;

export const TECH_CATEGORIES = {
  AI_ML: 'AI & Machine Learning',
  DATA_SCIENCE: 'Data Science',
  WEB_DEV: 'Web Development',
  MOBILE_DEV: 'Mobile Development',
  CLOUD: 'Cloud & DevOps',
  SECURITY: 'Security & Privacy',
  SYSTEMS: 'Systems & Infrastructure',
  EMERGING: 'Emerging Technologies'
} as const;

export const SKILL_METRICS = {
  IMPACT: {
    HIGH: 'High Impact',
    MEDIUM: 'Medium Impact',
    LOW: 'Low Impact'
  },
  GROWTH: {
    RAPID: 'Rapid Growth',
    STEADY: 'Steady Growth',
    STABLE: 'Stable'
  },
  DEMAND: {
    HIGH: 'High Demand',
    MODERATE: 'Moderate Demand',
    NICHE: 'Niche'
  }
} as const;

export const EXPERIENCE_LEVELS = {
  EXPERT: {
    label: 'Expert',
    years: '5+ years',
    description: 'Deep expertise, can architect solutions and mentor others'
  },
  ADVANCED: {
    label: 'Advanced',
    years: '3-5 years',
    description: 'Strong proficiency, can handle complex projects independently'
  },
  INTERMEDIATE: {
    label: 'Intermediate',
    years: '1-3 years',
    description: 'Good working knowledge, can handle most tasks'
  },
  BEGINNER: {
    label: 'Beginner',
    years: '0-1 years',
    description: 'Basic understanding, learning fundamentals'
  }
} as const;

export const PROJECT_COMPLEXITY = {
  VERY_HIGH: {
    level: 5,
    label: 'Very High',
    description: 'Cutting-edge, research-level complexity'
  },
  HIGH: {
    level: 4,
    label: 'High',
    description: 'Complex architecture, multiple integrations'
  },
  MODERATE: {
    level: 3,
    label: 'Moderate',
    description: 'Standard business applications'
  },
  LOW: {
    level: 2,
    label: 'Low',
    description: 'Simple, straightforward solutions'
  },
  BASIC: {
    level: 1,
    label: 'Basic',
    description: 'Learning projects and experiments'
  }
} as const; 