"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const skillCategories = [
  {
    category: 'Machine Learning & AI',
    skills: [
      { name: 'Machine Learning', level: 'Expert', years: 4, endorsed: 15 },
      { name: 'Deep Learning', level: 'Expert', years: 3, endorsed: 12 },
      { name: 'NLP', level: 'Expert', years: 4, endorsed: 10 },
      { name: 'Voice Cloning', level: 'Expert', years: 3, endorsed: 3 },
      { name: 'Computer Vision', level: 'Advanced', years: 3, endorsed: 8 },
      { name: 'Reinforcement Learning', level: 'Advanced', years: 2, endorsed: 6 },
      { name: 'Generative AI', level: 'Expert', years: 3, endorsed: 9 },
      { name: 'MLOps', level: 'Advanced', years: 3, endorsed: 7 },
    ],
    icon: '🤖'
  },
  {
    category: 'Data Engineering & Analytics',
    skills: [
      { name: 'Data Engineering', level: 'Expert', years: 4, endorsed: 12 },
      { name: 'Data Analytics', level: 'Expert', years: 5, endorsed: 12 },
      { name: 'Data Mining', level: 'Advanced', years: 3, endorsed: 8 },
      { name: 'Data Structures', level: 'Expert', years: 4, endorsed: 10 },
      { name: 'Hadoop', level: 'Advanced', years: 2, endorsed: 6 },
      { name: 'NoSQL', level: 'Advanced', years: 3, endorsed: 7 },
      { name: 'MySQL', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Dataset Management', level: 'Expert', years: 4, endorsed: 9 },
    ],
    icon: '📊'
  },
  {
    category: 'Quantitative Analysis',
    skills: [
      { name: 'Quantitative Analytics', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Quantitative Research', level: 'Expert', years: 3, endorsed: 7 },
      { name: 'Risk Analysis', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'Risk Management', level: 'Advanced', years: 3, endorsed: 5 },
      { name: 'Statistical Analysis', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Business Analysis', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'Mathematical Modeling', level: 'Expert', years: 4, endorsed: 7 },
    ],
    icon: '📈'
  },
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python', level: 'Expert', years: 5, endorsed: 19 },
      { name: 'C++', level: 'Advanced', years: 4, endorsed: 9 },
      { name: 'JavaScript', level: 'Advanced', years: 3, endorsed: 7 },
      { name: 'R', level: 'Advanced', years: 3, endorsed: 7 },
      { name: 'MATLAB', level: 'Expert', years: 4, endorsed: 12 },
      { name: 'C#', level: 'Advanced', years: 2, endorsed: 5 },
      { name: 'C', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'SQL', level: 'Expert', years: 4, endorsed: 8 },
    ],
    icon: '💻'
  },
  {
    category: 'Software Development',
    skills: [
      { name: 'Object-Oriented Programming', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Software Development', level: 'Expert', years: 4, endorsed: 7 },
      { name: 'Git', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Project Management', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'Agile Methodologies', level: 'Advanced', years: 3, endorsed: 5 },
      { name: 'System Design', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'API Development', level: 'Expert', years: 3, endorsed: 7 },
    ],
    icon: '⚙️'
  },
  {
    category: 'Cloud & Infrastructure',
    skills: [
      { name: 'AWS', level: 'Expert', years: 3, endorsed: 1 },
      { name: 'GCP', level: 'Advanced', years: 2, endorsed: 1 },
      { name: 'Docker', level: 'Expert', years: 3, endorsed: 3 },
      { name: 'Kubernetes', level: 'Advanced', years: 2, endorsed: 2 },
      { name: 'CI/CD', level: 'Advanced', years: 3, endorsed: 2 },
      { name: 'Microservices', level: 'Advanced', years: 2, endorsed: 2 },
      { name: 'DevOps', level: 'Advanced', years: 3, endorsed: 2 },
    ],
    icon: '☁️'
  },
  {
    category: 'AI Frameworks & Tools',
    skills: [
      { name: 'PyTorch', level: 'Expert', years: 3, endorsed: 4 },
      { name: 'TensorFlow', level: 'Expert', years: 4, endorsed: 4 },
      { name: 'Scikit-learn', level: 'Expert', years: 4, endorsed: 3 },
      { name: 'Hugging Face', level: 'Expert', years: 2, endorsed: 2 },
      { name: 'CUDA', level: 'Advanced', years: 2, endorsed: 2 },
      { name: 'TensorRT', level: 'Advanced', years: 2, endorsed: 1 },
      { name: 'MLflow', level: 'Advanced', years: 2, endorsed: 2 },
    ],
    icon: '🛠️'
  },
  {
    category: 'Engineering Tools',
    skills: [
      { name: 'SolidWorks', level: 'Advanced', years: 3, endorsed: 7 },
      { name: 'AutoCAD', level: 'Advanced', years: 3, endorsed: 7 },
      { name: 'Arduino', level: 'Advanced', years: 3, endorsed: 8 },
      { name: 'Microsoft Excel', level: 'Expert', years: 5, endorsed: 15 },
      { name: 'Technical Documentation', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Engineering Design', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'CAD/CAM', level: 'Advanced', years: 3, endorsed: 5 },
    ],
    icon: '🔧'
  },
  {
    category: 'Research & Academia',
    skills: [
      { name: 'Research', level: 'Expert', years: 5, endorsed: 9 },
      { name: 'Teaching', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Public Speaking', level: 'Advanced', years: 3, endorsed: 7 },
      { name: 'Technical Writing', level: 'Expert', years: 4, endorsed: 8 },
      { name: 'Academic Research', level: 'Expert', years: 4, endorsed: 7 },
      { name: 'Curriculum Development', level: 'Advanced', years: 3, endorsed: 6 },
      { name: 'Mentoring', level: 'Expert', years: 4, endorsed: 7 },
    ],
    icon: '📚'
  }
]

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Expert':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'Advanced':
      return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
    case 'Intermediate':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

const getProgressValue = (level: string) => {
  switch (level) {
    case 'Expert':
      return 100
    case 'Advanced':
      return 75
    case 'Intermediate':
      return 50
    default:
      return 25
  }
}

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel
      return matchesSearch && matchesLevel
    })
  })).filter(category => 
    selectedCategory === 'all' || 
    category.category === selectedCategory
  )

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setSelectedLevel('all')}>All</TabsTrigger>
                <TabsTrigger value="Expert" onClick={() => setSelectedLevel('Expert')}>Expert</TabsTrigger>
                <TabsTrigger value="Advanced" onClick={() => setSelectedLevel('Advanced')}>Advanced</TabsTrigger>
                <TabsTrigger value="Intermediate" onClick={() => setSelectedLevel('Intermediate')}>Intermediate</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category, index) => (
              category.skills.length > 0 && (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  layout
                >
                  <Card className="h-full transform transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            <Badge
                              className={cn(
                                "cursor-pointer transition-all duration-300",
                                getLevelColor(skill.level),
                                hoveredSkill === skill.name && "scale-110"
                              )}
                              variant="outline"
                            >
                              {skill.name}
                              {hoveredSkill === skill.name && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute -bottom-12 left-0 bg-background border rounded-md p-2 shadow-lg w-48 z-50"
                                >
                                  <div className="text-xs space-y-1">
                                    <p>Level: {skill.level}</p>
                                    <p>Experience: {skill.years} years</p>
                                    <Progress value={getProgressValue(skill.level)} className="h-1" />
                                  </div>
                                </motion.div>
                              )}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="mt-8 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor('Expert')} variant="outline">Expert</Badge>
            <span className="text-sm text-muted-foreground">4+ years</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor('Advanced')} variant="outline">Advanced</Badge>
            <span className="text-sm text-muted-foreground">2-4 years</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getLevelColor('Intermediate')} variant="outline">Intermediate</Badge>
            <span className="text-sm text-muted-foreground">1-2 years</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

