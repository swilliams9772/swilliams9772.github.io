"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, ChevronRight, Home, Code, Briefcase, Book, GraduationCap, Mail, Microscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from '@/lib/utils'
import { transitions, gradients, hoverEffects } from '@/lib/utils/theme-config'

const navItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: Code },
  { name: 'Case Studies', href: '#case-studies', icon: Microscope },
  { name: 'Publications', href: '#publications', icon: Book },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
] as const

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight
        }
        return false
      })

      setActiveSection(currentSection || '')
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 }
  }

  return (
    <motion.header
      variants={headerVariants}
      animate={isScrolled ? 'visible' : 'hidden'}
      initial="visible"
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur",
        transitions.medium,
        isScrolled ? 'bg-background/95 supports-[backdrop-filter]:bg-background/60' : 'bg-background'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <motion.a 
            href="/"
            className={cn(
              "flex items-center gap-2",
              hoverEffects.scale,
              transitions.fast
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              gradients.primary,
              "text-xl font-bold"
            )}>
              SW
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Shaquille Williams
              </span>
              <span className="text-xs text-muted-foreground">
                AI Engineer & Community Builder
              </span>
            </div>
          </motion.a>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-md",
                transitions.fast,
                activeSection === item.href.substring(1)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.name}</span>
            </motion.a>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn("ml-2", transitions.fast)}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open Menu"
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-md",
                    transitions.fast,
                    activeSection === item.href.substring(1)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  )}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </motion.a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

