// Create a custom hook for handling visualization resizing
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { debounce, throttle } from '@/lib/utils'

interface Dimensions {
  width: number;
  height: number;
}

interface UseVisualizationResizeProps {
  aspectRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  debounceMs?: number;
  preserveAspectRatio?: boolean;
  onResize?: (dimensions: Dimensions) => void;
}

export function useVisualizationResize({
  aspectRatio = 16 / 9,
  maxWidth = 1200,
  maxHeight = 800,
  minWidth = 300,
  minHeight = 200,
  debounceMs = 250,
  preserveAspectRatio = true,
  onResize
}: UseVisualizationResizeProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
  const [isResizing, setIsResizing] = useState(false)

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return { width: 0, height: 0 }

    const containerWidth = containerRef.current.clientWidth
    let width = Math.min(Math.max(containerWidth, minWidth), maxWidth)
    let height = preserveAspectRatio ? width / aspectRatio : containerRef.current.clientHeight

    if (preserveAspectRatio && height > maxHeight) {
      height = maxHeight
      width = height * aspectRatio
    }

    height = Math.min(Math.max(height, minHeight), maxHeight)

    return { width, height }
  }, [aspectRatio, maxWidth, maxHeight, minWidth, minHeight, preserveAspectRatio])

  const updateDimensions = useCallback(() => {
    const newDimensions = calculateDimensions()
    setDimensions(newDimensions)
    onResize?.(newDimensions)
    setIsResizing(false)
  }, [calculateDimensions, onResize])

  // Debounced resize handler
  const debouncedUpdateDimensions = debounce(updateDimensions, debounceMs)

  // Add memoization for expensive calculations
  const memoizedDimensions = useMemo(() => calculateDimensions(), [
    aspectRatio,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    preserveAspectRatio,
    containerRef.current?.clientWidth
  ])

  // Add throttling for resize events
  const throttledUpdateDimensions = useCallback(
    throttle(updateDimensions, 16), // ~60fps
    [updateDimensions]
  )

  useEffect(() => {
    updateDimensions()

    const resizeObserver = new ResizeObserver(() => {
      setIsResizing(true)
      throttledUpdateDimensions()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
      debouncedUpdateDimensions.cancel()
    }
  }, [debouncedUpdateDimensions, throttledUpdateDimensions])

  return {
    containerRef,
    isResizing,
    ...dimensions
  }
} 