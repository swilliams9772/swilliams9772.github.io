"use client"

import React, { createContext, useContext, useState } from 'react'
import { skillsData } from '@/data/skills-data'
import { SkillCategory } from '@/types'

interface SkillsContextType {
  skills: SkillCategory[];
  coreCompetencies: string[];
  topSkills: Array<{ name: string; level: number }>;
  getSkillsByCategory: (category: string) => SkillCategory['skills'];
  getTotalEndorsements: () => number;
  getAverageProficiency: () => number;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined)

export function SkillsProvider({ children }: { children: React.ReactNode }) {
  const [skills] = useState(skillsData)

  const coreCompetencies = skills
    .flatMap(cat => cat.skills)
    .filter(skill => skill.level >= 90)
    .sort((a, b) => b.level - a.level)
    .slice(0, 5)
    .map(skill => skill.name)

  const topSkills = skills
    .flatMap(cat => cat.skills)
    .sort((a, b) => b.level - a.level)
    .slice(0, 10)

  const getSkillsByCategory = (category: string) => {
    return skills.find(cat => cat.name === category)?.skills || []
  }

  const getTotalEndorsements = () => {
    return skills
      .flatMap(cat => cat.skills)
      .reduce((total, skill) => total + (skill.endorsements || 0), 0)
  }

  const getAverageProficiency = () => {
    const allSkills = skills.flatMap(cat => cat.skills)
    return Math.round(
      allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length
    )
  }

  return (
    <SkillsContext.Provider 
      value={{
        skills,
        coreCompetencies,
        topSkills,
        getSkillsByCategory,
        getTotalEndorsements,
        getAverageProficiency
      }}
    >
      {children}
    </SkillsContext.Provider>
  )
}

export function useSkills() {
  const context = useContext(SkillsContext)
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider')
  }
  return context
} 