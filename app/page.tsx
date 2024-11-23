"use client"

import React from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { About } from '@/components/About'
import { Blog } from '@/components/Blog'
import { CaseStudies } from '@/components/CaseStudies'
import { Contact } from '@/components/Contact'
import { Contributions } from '@/components/Contributions'
import { Education } from '@/components/Education'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Publications } from '@/components/Publications'
import { Skills } from '@/components/Skills'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <CaseStudies />
      <Publications />
      <Blog />
      <Contributions />
      <Education />
      <Contact />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </main>
  )
}

