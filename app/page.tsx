"use client"

import React from 'react'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Experience } from '@/components/Experience'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { CaseStudies } from '@/components/CaseStudies'
import { Publications } from '@/components/Publications'
import { Blog } from '@/components/Blog'
import { Contributions } from '@/components/Contributions'
import { Education } from '@/components/Education'
import { Contact } from '@/components/Contact'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
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
    </main>
  )
}

