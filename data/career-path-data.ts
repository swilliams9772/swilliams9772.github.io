import { Brain, Code, Database, Cloud, Globe, Server, Shield, Terminal } from 'lucide-react'

export const careerPathData = {
  milestones: [
    {
      id: "ml-engineer-2024",
      title: "Senior Machine Learning Engineer",
      date: "2024",
      type: "role",
      description: "Leading ML infrastructure and model development",
      skills: ["PyTorch", "MLOps", "System Design"],
      icon: "Brain",
      status: "in-progress",
      organization: "Tech Corp",
      location: "San Francisco, CA",
      highlights: [
        "Built scalable ML pipeline",
        "Reduced inference latency by 40%",
        "Mentored junior engineers"
      ],
      metrics: [
        {
          label: "Team Size",
          value: "8",
          change: "+3"
        },
        {
          label: "Projects",
          value: "12",
          change: "+5"
        }
      ]
    },
    // Add more milestones...
  ],
  skills: [
    {
      category: "Technical Skills",
      skills: [
        {
          name: "Machine Learning",
          level: 90,
          endorsements: 25
        },
        {
          name: "Python",
          level: 95,
          endorsements: 30
        }
      ]
    },
    {
      category: "Soft Skills",
      skills: [
        {
          name: "Leadership",
          level: 85,
          endorsements: 15
        },
        {
          name: "Communication",
          level: 90,
          endorsements: 18
        }
      ]
    }
  ]
}; 