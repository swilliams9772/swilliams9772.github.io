import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Analytics } from '@/components/analytics'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Shaquille Williams - Software Engineer Portfolio',
  description: 'Full-stack developer specializing in AI/ML, web development, and cloud architecture.',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://swilliams9772.github.io',
    title: 'Shaquille Williams - Software Engineer Portfolio',
    description: 'Full-stack developer specializing in AI/ML, web development, and cloud architecture.',
    siteName: 'Shaquille Williams Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shaquille Williams Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaquille Williams - Software Engineer Portfolio',
    description: 'Full-stack developer specializing in AI/ML, web development, and cloud architecture.',
    creator: '@swilliams9772',
    images: ['/og-image.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <ScrollToTop />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
