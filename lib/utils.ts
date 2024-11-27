import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  function debounced(this: any, ...args: Parameters<T>) {
    const context = this

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined
      func.apply(context, args)
    }, wait)
  }

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return debounced
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let lastRun = 0

  function throttled(this: any, ...args: Parameters<T>) {
    const context = this
    const now = Date.now()

    if (lastRun && now < lastRun + wait) {
      // Hold on to the latest arguments
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        lastRun = now
        func.apply(context, args)
      }, wait)
    } else {
      lastRun = now
      func.apply(context, args)
    }
  }

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return throttled
}

export function generateProjectShareLink(project: Project) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
  const params = new URLSearchParams({
    id: project.id,
    view: 'details'
  })
  return `${baseUrl}/projects?${params.toString()}`
}

export function exportProjectData(project: Project, format: 'json' | 'pdf') {
  if (format === 'json') {
    const dataStr = JSON.stringify(project, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const exportName = `${project.title.toLowerCase().replace(/\s+/g, '-')}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportName)
    linkElement.click()
  }
  // Add PDF export logic
}
