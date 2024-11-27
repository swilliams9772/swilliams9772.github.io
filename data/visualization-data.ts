import { Icons } from '@/components/icons'
import { TechEcosystem } from '@/types/technology'
import { skillsData } from './skills-data'
import { TechnologyNode, TechnologyLink } from '@/types'

// Helper function to extract color from gradient
const extractColor = (gradient: string) => {
  const match = gradient.match(/from-(\w+)-500/)
  return match ? `#${match[1]}` : '#6366f1'
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  description: string;
  metrics: {
    totalTechnologies: number;
    activeTechnologies: number;
    averageProficiency: number;
    totalProjects: number;
    learningPath: {
      current: string[];
      next: string[];
      recommended: string[];
    };
  };
}

export interface TechNode {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  experience: string;
  projects: number;
  status: string;
  description: string;
  connections: string[];
  tools: string[];
  skills: string[];
  timeline?: {
    started: string;
    milestones: {
      date: string;
      title: string;
      type: string;
    }[];
  };
}

export interface TechEcosystem {
  categories: Category[];
  nodes: TechNode[];
  timeRange: string;
  summary: {
    totalTechnologies: number;
    activeTechnologies: number;
    averageProficiency: number;
  };
}

export const techEcosystemData: TechEcosystem = {
  categories: [
    {
      name: "AI & Machine Learning",
      icon: "Brain",
      color: "#3B82F6",
      description: "Deep learning, computer vision, NLP, and voice cloning systems",
      metrics: {
        totalTechnologies: 4,
        activeTechnologies: 4,
        averageProficiency: 92,
        totalProjects: 45,
        learningPath: {
          current: ["Voice Cloning", "Advanced GANs"],
          next: ["Multi-modal AI", "Advanced LLMs"],
          recommended: ["AI Systems Design", "Edge AI"]
        }
      }
    },
    {
      name: "Software Engineering",
      icon: "Code",
      color: "#22C55E",
      description: "Full-stack development, cloud architecture, and systems design",
      metrics: {
        totalTechnologies: 3,
        activeTechnologies: 3,
        averageProficiency: 92,
        totalProjects: 100,
        learningPath: {
          current: ["Edge Computing", "System Design"],
          next: ["Distributed Systems", "Microservices"],
          recommended: ["WebAssembly", "Rust"]
        }
      }
    },
    {
      name: "Community Tech",
      icon: "Users",
      color: "#A855F7",
      description: "Community tools, impact measurement, and social tech",
      metrics: {
        totalTechnologies: 3,
        activeTechnologies: 3,
        averageProficiency: 92,
        totalProjects: 30,
        learningPath: {
          current: ["Impact Analytics", "Community Platforms"],
          next: ["Decentralized Systems", "P2P Networks"],
          recommended: ["DAO Tools", "Web3 Social"]
        }
      }
    },
    {
      name: "Education & STEM",
      icon: "GraduationCap",
      color: "#F59E0B",
      description: "Physics education, data analysis, and curriculum development",
      metrics: {
        totalTechnologies: 3,
        activeTechnologies: 3,
        averageProficiency: 92,
        totalProjects: 45,
        learningPath: {
          current: ["EdTech Innovation", "Data-Driven Learning"],
          next: ["AI in Education", "Adaptive Learning"],
          recommended: ["VR/AR Education", "Gamification"]
        }
      }
    }
  ],
  nodes: [
    {
      id: "ml1",
      name: "TensorFlow",
      category: "AI & Machine Learning",
      proficiency: 95,
      experience: "8+ years",
      projects: 12,
      status: "active",
      description: "Deep learning framework for neural networks and AI models",
      connections: ["ml2", "ml3", "ml4"],
      tools: ["Keras", "TPU", "GPU Computing"],
      skills: ["Model Architecture", "Training", "Deployment"],
      timeline: {
        started: "2016",
        milestones: [
          {
            date: "2016-Q1",
            title: "Started with TensorFlow",
            type: "learning"
          },
          {
            date: "2018-Q2",
            title: "Advanced ML Projects",
            type: "project"
          },
          {
            date: "2020-Q3",
            title: "Community Impact AI",
            type: "achievement"
          },
          {
            date: "2023-Q4",
            title: "Voice Cloning Systems",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "ml2",
      name: "Computer Vision",
      category: "AI & Machine Learning",
      proficiency: 90,
      experience: "5+ years",
      projects: 10,
      status: "active",
      description: "Image processing and visual AI systems",
      connections: ["ml1", "ml3", "ml4"],
      tools: ["OpenCV", "YOLOv9", "MediaPipe"],
      skills: ["Object Detection", "Image Processing", "Video Analysis"],
      timeline: {
        started: "2019",
        milestones: [
          {
            date: "2019-Q2",
            title: "Started CV Projects",
            type: "learning"
          },
          {
            date: "2021-Q3",
            title: "Advanced Object Detection",
            type: "project"
          },
          {
            date: "2024-Q1",
            title: "YOLOv9 Implementation",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "ml3",
      name: "NLP & Voice",
      category: "AI & Machine Learning",
      proficiency: 95,
      experience: "4+ years",
      projects: 15,
      status: "active",
      description: "Natural language processing and voice cloning",
      connections: ["ml1", "ml2"],
      tools: ["Hugging Face", "Whisper", "TTS"],
      skills: ["Text Processing", "Voice Synthesis", "Language Models"],
      timeline: {
        started: "2020",
        milestones: [
          {
            date: "2020-Q3",
            title: "Started NLP Projects",
            type: "learning"
          },
          {
            date: "2022-Q2",
            title: "Voice Cloning Systems",
            type: "project"
          },
          {
            date: "2023-Q4",
            title: "Advanced Audio Processing",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "se1",
      name: "Python Development",
      category: "Software Engineering",
      proficiency: 95,
      experience: "15+ years",
      projects: 50,
      status: "active",
      description: "Primary programming language for AI and backend",
      connections: ["se2", "se3"],
      tools: ["Django", "Flask", "FastAPI"],
      skills: ["Backend", "Data Processing", "API Development"],
      timeline: {
        started: "2009",
        milestones: [
          {
            date: "2009-Q1",
            title: "Started Python",
            type: "learning"
          },
          {
            date: "2015-Q3",
            title: "Advanced Backend Systems",
            type: "project"
          },
          {
            date: "2020-Q2",
            title: "AI Systems Architecture",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "se2",
      name: "Full-Stack Development",
      category: "Software Engineering",
      proficiency: 90,
      experience: "10+ years",
      projects: 30,
      status: "active",
      description: "End-to-end web development",
      connections: ["se1", "se3"],
      tools: ["React", "Node.js", "TypeScript"],
      skills: ["Frontend", "Backend", "Database Design"],
      timeline: {
        started: "2014",
        milestones: [
          {
            date: "2014-Q2",
            title: "Web Development",
            type: "learning"
          },
          {
            date: "2018-Q3",
            title: "Full-Stack Applications",
            type: "project"
          },
          {
            date: "2021-Q4",
            title: "Community Platforms",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "se3",
      name: "Cloud & DevOps",
      category: "Software Engineering",
      proficiency: 90,
      experience: "8+ years",
      projects: 20,
      status: "active",
      description: "Cloud architecture and deployment",
      connections: ["se1", "se2"],
      tools: ["AWS", "Docker", "Kubernetes"],
      skills: ["Infrastructure", "CI/CD", "Scaling"],
      timeline: {
        started: "2016",
        milestones: [
          {
            date: "2016-Q3",
            title: "Cloud Infrastructure",
            type: "learning"
          },
          {
            date: "2019-Q2",
            title: "Container Orchestration",
            type: "project"
          },
          {
            date: "2022-Q1",
            title: "Advanced DevOps",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "ct1",
      name: "Impact Analytics",
      category: "Community Tech",
      proficiency: 95,
      experience: "5+ years",
      projects: 8,
      status: "active",
      description: "Community program impact measurement",
      connections: ["ct2"],
      tools: ["Data Analysis", "Visualization", "Reporting"],
      skills: ["Impact Assessment", "Data Collection", "Metrics"],
      timeline: {
        started: "2019",
        milestones: [
          {
            date: "2019-Q3",
            title: "Started Impact Analysis",
            type: "learning"
          },
          {
            date: "2021-Q2",
            title: "Community Analytics Platform",
            type: "project"
          },
          {
            date: "2023-Q4",
            title: "20,000+ Residents Served",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "ct2",
      name: "Community Platforms",
      category: "Community Tech",
      proficiency: 90,
      experience: "5+ years",
      projects: 12,
      status: "active",
      description: "Tools for community engagement and support",
      connections: ["ct1"],
      tools: ["Web Apps", "Mobile Apps", "APIs"],
      skills: ["UX Design", "Community Engagement", "Support Systems"],
      timeline: {
        started: "2019",
        milestones: [
          {
            date: "2019-Q4",
            title: "Community Tools",
            type: "learning"
          },
          {
            date: "2021-Q3",
            title: "Engagement Platforms",
            type: "project"
          },
          {
            date: "2023-Q2",
            title: "AI-Powered Solutions",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "ed1",
      name: "Physics Education",
      category: "Education & STEM",
      proficiency: 95,
      experience: "4+ years",
      projects: 15,
      status: "active",
      description: "Advanced physics curriculum development",
      connections: ["ed2"],
      tools: ["Educational Software", "Lab Equipment", "Simulations"],
      skills: ["Curriculum Design", "Teaching", "Assessment"],
      timeline: {
        started: "2019",
        milestones: [
          {
            date: "2019-Q3",
            title: "Started Teaching",
            type: "learning"
          },
          {
            date: "2021-Q2",
            title: "Innovative Curriculum",
            type: "project"
          },
          {
            date: "2023-Q1",
            title: "Social Justice Integration",
            type: "achievement"
          }
        ]
      }
    },
    {
      id: "ed2",
      name: "Data Analysis",
      category: "Education & STEM",
      proficiency: 90,
      experience: "8+ years",
      projects: 20,
      status: "active",
      description: "Educational data analysis and visualization",
      connections: ["ed1"],
      tools: ["Python", "R", "Visualization Tools"],
      skills: ["Statistical Analysis", "Data Visualization", "Reporting"],
      timeline: {
        started: "2016",
        milestones: [
          {
            date: "2016-Q2",
            title: "Data Analysis",
            type: "learning"
          },
          {
            date: "2019-Q3",
            title: "Educational Analytics",
            type: "project"
          },
          {
            date: "2022-Q4",
            title: "Impact Measurement",
            type: "achievement"
          }
        ]
      }
    }
  ],
  timeRange: "2009-2024",
  summary: {
    totalTechnologies: 10,
    activeTechnologies: 10,
    averageProficiency: 92
  }
} 