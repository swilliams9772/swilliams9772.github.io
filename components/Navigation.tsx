"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ClientIcon } from '@/components/ui/client-icon'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/data/personal-info'
import { MobileNav } from '@/components/MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'

const navItems = [
  { label: 'About', href: '#about', icon: Icons.User },
  { label: 'Technology', href: '#technology', icon: Icons.Brain },
  { label: 'Experience', href: '#experience', icon: Icons.History },
  { label: 'Projects', href: '#projects', icon: Icons.Briefcase },
  { label: 'Education', href: '#education', icon: Icons.GraduationCap },
  { label: 'Contact', href: '#contact', icon: Icons.Mail }
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
      setIsFloating(scrollPosition > 200)

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
        )}
      >
        <div className="container mx-auto">
          <nav className="flex items-center justify-between h-16 px-4">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <ClientIcon icon={Icons.Brain} className="h-8 w-8 text-primary" />
              <span className="font-semibold text-lg hidden sm:inline-block">
                {personalInfo.name}
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <a
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "hover:bg-muted flex items-center gap-2",
                      activeSection === item.href.slice(1) && "text-primary bg-muted"
                    )}
                  >
                    <ClientIcon icon={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              {/* Contact Button */}
              <Button className="hidden sm:flex" size="sm" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  Get in Touch
                  <ClientIcon icon={Icons.Send} className="ml-2 h-4 w-4" />
                </a>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <ClientIcon icon={Icons.Menu} className="h-6 w-6" />
              </Button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Floating Sidebar */}
      <AnimatePresence>
        {isFloating && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={cn(
              "fixed left-4 top-1/2 -translate-y-1/2 z-50",
              "hidden md:block"
            )}
          >
            <motion.div
              className={cn(
                "bg-background/80 backdrop-blur-lg rounded-lg shadow-lg border p-2",
                "transition-all duration-300",
                isCollapsed ? "w-12" : "w-48"
              )}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ x: 2 }}
                  >
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md transition-colors",
                        "hover:bg-muted group",
                        activeSection === item.href.slice(1) && "text-primary bg-muted"
                      )}
                    >
                      <ClientIcon 
                        icon={item.icon} 
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          "group-hover:text-primary"
                        )} 
                      />
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </a>
                  </motion.div>
                ))}

                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-2"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <ClientIcon 
                    icon={isCollapsed ? Icons.ChevronRight : Icons.ChevronLeft} 
                    className="h-4 w-4" 
                  />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            items={navItems}
            activeSection={activeSection}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
} 