"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Building2, 
  Trophy, 
  ChartBar, 
  Target,
  Users,
  Briefcase,
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Clock
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

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
  const [activeTab, setActiveTab] = useState<'role' | 'impact' | 'achievements'>('role')

  return (
    <section id="experience" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Professional Journey</h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="transform transition-all duration-300"
            >
              <Card className={`overflow-hidden bg-gradient-to-r ${exp.color}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-2xl mb-1">{exp.role}</CardTitle>
                        <div className="flex items-center text-muted-foreground">
                          <Building2 className="h-4 w-4 mr-2" />
                          {exp.company}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-background/50">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="role" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="role">Role & Responsibilities</TabsTrigger>
                      <TabsTrigger value="impact">Impact & Metrics</TabsTrigger>
                      <TabsTrigger value="achievements">Key Achievements</TabsTrigger>
                    </TabsList>

                    <TabsContent value="role">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-primary" />
                              Core Responsibilities
                            </h4>
                            <ul className="space-y-3">
                              {exp.description.map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * i }}
                                  className="flex items-start"
                                >
                                  <ArrowRight className="h-4 w-4 mt-1 mr-2 text-primary flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Technologies & Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill) => (
                                <motion.div
                                  key={skill}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Badge 
                                    variant="outline"
                                    className="bg-background/50 hover:bg-background transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Clock className="h-5 w-5 text-primary" />
                              Project Timeline
                            </h4>
                            <div className="space-y-2">
                              {exp.timeline.map((phase, i) => (
                                <div key={i} className="flex justify-between items-center bg-background/50 p-3 rounded-lg">
                                  <span>{phase.phase}</span>
                                  <Badge variant="outline">{phase.duration}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="impact">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <ChartBar className="h-5 w-5 text-primary" />
                              Impact Metrics
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                              {exp.metrics.map((metric, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 * i }}
                                  className="bg-background/50 p-4 rounded-lg text-center"
                                >
                                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Target className="h-5 w-5 text-primary" />
                              Overall Impact
                            </h4>
                            <p className="text-muted-foreground">{exp.impact}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Team Impact
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {exp.team.map((member, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-background/50 p-4 rounded-lg text-center"
                              >
                                <div className="text-2xl font-bold text-primary">{member.count}</div>
                                <div className="text-sm text-muted-foreground">{member.role}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements">
                      <div className="grid md:grid-cols-2 gap-6">
                        {exp.projects.map((project, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-background/50 p-6 rounded-lg"
                          >
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-primary" />
                              {project.name}
                            </h4>
                            <p className="text-muted-foreground mb-4">{project.description}</p>
                            <Badge variant="outline" className="bg-background/30">
                              {project.outcome}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

