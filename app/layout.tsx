import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { DotGridBackground } from '@/components/ui/dot-grid-background'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Shaquille Williams - Software Engineer & AI Specialist',
  description: 'Portfolio showcasing AI/ML projects, full-stack development, and cloud architecture expertise',
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Portfolio',
    'React',
    'Next.js',
    'TypeScript'
  ],
  authors: [{ name: 'Shaquille Williams' }],
  creator: 'Shaquille Williams',
  publisher: 'Shaquille Williams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} relative min-h-screen bg-background`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <DotGridBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
