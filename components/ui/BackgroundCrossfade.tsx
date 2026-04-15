'use client'

import { useEffect, useState } from 'react'

/**
 * Fixed background that crossfades between dark (#000) and light (#fff)
 * based on which section is currently dominant in the viewport.
 * Each section needs a data-bg="dark" or data-bg="light" attribute.
 */
export default function BackgroundCrossfade() {
  const [bgColor, setBgColor] = useState('#000000')

  useEffect(() => {
    function update() {
      const sections = document.querySelectorAll('[data-bg]')
      const viewH = window.innerHeight
      let bestOverlap = 0
      let bestBg = 'dark'

      sections.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const top = Math.max(0, rect.top)
        const bottom = Math.min(viewH, rect.bottom)
        const overlap = Math.max(0, bottom - top)
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestBg = (el as HTMLElement).dataset.bg || 'light'
        }
      })

      setBgColor(bestBg === 'dark' ? '#000000' : '#ffffff')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  )
}
