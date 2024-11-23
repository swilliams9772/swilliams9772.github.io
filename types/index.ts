import { LucideIcon } from 'lucide-react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
      iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
      header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export interface BaseProps {
  children?: React.ReactNode
  className?: string
}

export interface Project {
  title: string
  category: string
  difficulty: number
  completionDate: string
  teamSize: number
  technologies: string[]
  impact: string
  github: string
  demo?: string
  challenges: string
  achievements: string
  description: string
  featured?: boolean
  images?: string[]
  videoPreview?: string
  metrics?: Metric[]
  timeline?: TimelineItem[]
  team?: TeamMember[]
  status?: 'completed' | 'in-progress' | 'planned'
}

export interface Metric {
  label: string
  value: string
  icon?: LucideIcon
  description?: string
}

export interface TimelineItem {
  phase: string
  duration: string
  description?: string
  milestones?: string[]
}

export interface TeamMember {
  role: string
  count: number
  responsibilities?: string[]
}

export interface Publication {
  title: string
  type: string
  date: string
  description: string
  link: string
}

export interface Workshop {
  title: string
  event: string
  date: string
  description: string
  materials: string
}

export interface OpenSourceProject {
  title: string
  description: string
  github: string
  stars: string
}

export interface Skill {
  name: string
  level: 'Expert' | 'Advanced' | 'Intermediate'
  years: number
}

export interface SkillCategory {
  category: string
  skills: Skill[]
  icon: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string[]
  skills: string[]
  impact: string
  metrics: Metric[]
  achievements?: string[]
  technologies?: string[]
  location?: string
  type?: 'full-time' | 'contract' | 'freelance'
  remote?: boolean
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  details: string
  gpa?: string
  coursework: string[]
  research?: ResearchProject[]
  skills: {
    name: string
    level: number
  }[]
  achievements: {
    title: string
    description: string
    icon: LucideIcon
  }[]
}

export interface ResearchProject {
  title: string
  description: string
  outcomes: string[]
}

export interface ContactInfo {
  icon: LucideIcon
  label: string
  value: string
  href: string | null
}

export interface SocialLink {
  href: string
  icon: LucideIcon
  label: string
}

export interface NavItem {
  name: string
  href: string
  icon?: LucideIcon
  external?: boolean
}

export interface ThemeConfig {
  name: string
  className: string
}

export type Theme = 'light' | 'dark' | 'system' 