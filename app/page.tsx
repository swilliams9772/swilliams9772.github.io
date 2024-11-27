"use client"

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Dynamically import heavy components with error boundaries
const SkillsGlobe = dynamic(() => import('@/components/SkillsGlobe').catch(() => () => null), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

const Timeline3D = dynamic(() => import('@/components/Timeline3D').catch(() => () => null), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

const TechnologyOverview = dynamic(() => import('@/components/TechnologyOverview').catch(() => () => null), {
  loading: () => <LoadingSpinner />,
  ssr: false
})

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <Hero />
        <About />
        <Experience />
        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
          <SkillsGlobe skills={[
            { name: "Machine Learning", value: 95 },
            { name: "Computer Vision", value: 90 },
            { name: "NLP", value: 92 },
            { name: "Python", value: 95 },
            { name: "React", value: 88 },
            { name: "TypeScript", value: 85 },
            { name: "AWS", value: 85 },
            { name: "Docker", value: 82 }
          ]} />
          <Timeline3D data={[
            { date: "2024", value: 95, label: "AI Engineering" },
            { date: "2023", value: 90, label: "Full Stack" },
            { date: "2022", value: 85, label: "ML Ops" },
            { date: "2021", value: 80, label: "Cloud" },
            { date: "2020", value: 75, label: "DevOps" }
          ]} />
          <TechnologyOverview />
        </Suspense>
        <Contact />
      </main>
      <Footer />
    </>
  )
} 