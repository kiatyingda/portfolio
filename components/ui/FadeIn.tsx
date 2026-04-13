'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  once?: boolean
}

export default function FadeIn({
  children,
  delay = 0,
  className = '',
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout>(undefined)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(() => setVisible(true), delay)
          if (once) observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timerRef.current)
    }
  }, [delay, once])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  )
}
