"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Trophy, 
  ChartBar, 
  Target,
  Users,
  Briefcase,
  Clock
} from 'lucide-react'
import { SectionHeader } from './ui/section-header'
import { SectionLayout } from './ui/section-layout'

const experiences = [
  {
    role: 'Technical Program Director',
    company: 'Rose from Concrete',
    period: 'January 2021 - Present',
    description: [
      'Forged strategic partnerships with 40+ community centers across Brooklyn, deploying ML models to assess and optimize program reach',
      'Developed predictive models using Python, Scikit-learn, and Geopandas on GCP to impact over 20,000 NYC residents',
      'Led implementation of community-focused programs using AWS Lambda and Docker for scalable resource management',
      'Designed decentralized energy solutions and AI-powered monitoring tools for program sustainability',
    ],
    skills: ['Python', 'Machine Learning', 'AWS', 'Docker', 'GCP', 'Community Development'],
    impact: 'Positively impacted over 20,000 NYC residents through data-driven community programs',
    metrics: [
      { label: 'Community Centers', value: '40+' },
      { label: 'Residents Impacted', value: '20,000+' },
      { label: 'Team Size', value: '15' },
    ],
    projects: [
      {
        name: 'Community Impact Analytics Platform',
        description: 'Built ML-powered platform to measure and optimize program effectiveness',
        outcome: '35% improvement in resource allocation'
      },
      {
        name: 'Automated Grant Distribution System',
        description: 'Developed system to streamline funding allocation',
        outcome: '50% reduction in processing time'
      }
    ],
    team: [
      { role: 'Data Scientists', count: 4 },
      { role: 'Engineers', count: 6 },
      { role: 'Program Managers', count: 5 }
    ],
    timeline: [
      { phase: 'Program Development', duration: '6 months' },
      { phase: 'ML Infrastructure Setup', duration: '8 months' },
      { phase: 'Community Expansion', duration: '12 months' },
      { phase: 'Impact Scaling', duration: 'Ongoing' }
    ],
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    role: 'Lead AP Physics Teacher',
    company: 'Success Academy High School of the Liberal Arts',
    period: 'July 2019 - 2022',
    description: [
      'Applied advanced data analysis and statistical techniques in Python, optimizing lesson plans for 150+ students',
      'Awarded the "Teacher Excellence Award" for exceptional instructional strategies',
      'Led a team of 13 teachers, fostering a collaborative academic environment',
      'Integrated social and economic justice perspectives into physics curricula',
    ],
    skills: ['Leadership', 'Data Analysis', 'Education', 'Team Management', 'Curriculum Development'],
    impact: 'Significantly improved student performance outcomes and fostered STEM education',
    metrics: [
      { label: 'Students', value: '150+' },
      { label: 'Awards', value: '1' },
      { label: 'Team Size', value: '13' },
    ],
    projects: [
      {
        name: 'Student Performance Improvement Initiative',
        description: 'Implemented data-driven strategies to improve student performance',
        outcome: '10% increase in average test scores'
      },
      {
        name: 'Curriculum Alignment Project',
        description: 'Developed curriculum alignment tools to ensure curriculum consistency',
        outcome: '95% alignment with state standards'
      }
    ],
    team: [
      { role: 'Lead Teacher', count: 1 },
      { role: 'Assistant Teachers', count: 12 },
      { role: 'Support Staff', count: 2 }
    ],
    timeline: [
      { phase: 'Curriculum Development', duration: '4 months' },
      { phase: 'Data-Driven Teaching', duration: '12 months' },
      { phase: 'Team Leadership', duration: '18 months' },
      { phase: 'Program Optimization', duration: '6 months' }
    ],
    color: 'from-green-500/20 to-lime-500/20'
  },
  {
    role: 'Risk/Quantitative Summer Analyst',
    company: 'BlackRock',
    period: 'June 2018 - August 2018',
    description: [
      'Automated data processing pipelines in Python and SQL, reducing manual effort by 30%',
      'Implemented ML algorithms for portfolio anomaly detection, saving $30,000 annually',
      'Finalist in firm-wide portfolio competition with highest active return in cohort',
      'Built visualization dashboards for data-driven decision making',
    ],
    skills: ['Python', 'SQL', 'Machine Learning', 'Financial Analysis', 'Data Visualization'],
    impact: 'Improved portfolio management accuracy for $98 Billion AUM',
    metrics: [
      { label: 'Savings', value: '$30,000' },
      { label: 'Portfolio Size', value: '$98 Billion' },
      { label: 'Competition', value: '1st' },
    ],
    projects: [
      {
        name: 'Portfolio Optimization Tool',
        description: 'Developed tool to optimize portfolio allocation',
        outcome: '15% improvement in portfolio return'
      },
      {
        name: 'Risk Assessment Dashboard',
        description: 'Created dashboard to assess portfolio risk',
        outcome: 'Reduced portfolio risk by 20%'
      }
    ],
    team: [
      { role: 'Quantitative Analyst', count: 2 },
      { role: 'Data Scientists', count: 3 },
      { role: 'Software Engineers', count: 2 }
    ],
    timeline: [
      { phase: 'Training & Onboarding', duration: '2 weeks' },
      { phase: 'Portfolio Analysis', duration: '4 weeks' },
      { phase: 'Model Development', duration: '4 weeks' },
      { phase: 'Competition & Presentation', duration: '2 weeks' }
    ],
    color: 'from-red-500/20 to-orange-500/20'
  },
  {
    role: 'Program Manager Apprentice',
    company: 'NYC Mayor\'s Office of Operations',
    period: 'January 2017 - June 2017',
    description: [
      'Led UX/UI improvements and accessibility enhancements for city websites',
      'Collaborated on wireframes, user flows, and storyboards for intuitive interfaces',
      'Presented design concepts to stakeholders and incorporated feedback',
      'Improved resident engagement through user-centered design',
    ],
    skills: ['UI/UX Design', 'Project Management', 'Stakeholder Management', 'Public Sector'],
    impact: 'Enhanced accessibility and user experience of NYC digital resources',
    metrics: [
      { label: 'Websites', value: '100+' },
      { label: 'Residents Impacted', value: '100,000+' },
      { label: 'Stakeholders', value: '100+' },
    ],
    projects: [
      {
        name: 'Accessibility Audit',
        description: 'Conducted accessibility audit of city websites',
        outcome: 'Improved accessibility for 90% of websites'
      },
      {
        name: 'User Feedback Integration',
        description: 'Integrated user feedback into website design process',
        outcome: 'Increased user satisfaction by 20%'
      }
    ],
    team: [
      { role: 'UI/UX Designer', count: 1 },
      { role: 'Project Manager', count: 1 },
      { role: 'Stakeholder Liaison', count: 1 }
    ],
    timeline: [
      { phase: 'Initial Assessment', duration: '1 month' },
      { phase: 'UX Research', duration: '2 months' },
      { phase: 'Implementation', duration: '2 months' },
      { phase: 'Evaluation', duration: '1 month' }
    ],
    color: 'from-yellow-500/20 to-pink-500/20'
  },
]

const Experience = () => {
  return (
    <SectionLayout id="experience" pattern="grid">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Professional Experience" 
          subtitle="A timeline of my professional journey and key achievements"
        />
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Rest of the component implementation */}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionLayout>
  )
}

export default Experience

