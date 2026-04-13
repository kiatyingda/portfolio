'use client'

import { useEffect, useRef } from 'react'

export default function SlideKeyboardNav() {
  const isScrolling = useRef(false)

  useEffect(() => {
    function getSlides(): HTMLElement[] {
      // Each slide is a direct child of the page wrapper that has min-h-screen,
      // or a section/div that acts as a full-viewport slide
      const wrapper = document.querySelector('.overflow-x-hidden')
      if (!wrapper) return []

      const slides: HTMLElement[] = []
      wrapper.querySelectorAll(':scope > *').forEach((el) => {
        if (el instanceof HTMLElement) {
          slides.push(el)
        }
      })
      return slides
    }

    function getCurrentSlideIndex(slides: HTMLElement[]): number {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      let closest = 0
      let closestDist = Infinity

      for (let i = 0; i < slides.length; i++) {
        const top = slides[i].offsetTop
        const dist = Math.abs(scrollY - top)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      }

      // If we're more than 30% into the current slide, count as "on" it
      const currentTop = slides[closest].offsetTop
      const currentHeight = slides[closest].offsetHeight
      if (scrollY > currentTop + currentHeight * 0.3 && closest < slides.length - 1) {
        closest++
      }

      return closest
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== ' ' && e.key !== 'PageDown' && e.key !== 'PageUp') return

      // Don't hijack if user is in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return

      e.preventDefault()

      if (isScrolling.current) return
      isScrolling.current = true

      const slides = getSlides()
      if (slides.length === 0) { isScrolling.current = false; return }

      const current = getCurrentSlideIndex(slides)
      let target: number

      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        target = Math.min(current + 1, slides.length - 1)
      } else {
        target = Math.max(current - 1, 0)
      }

      const targetTop = slides[target].offsetTop

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      })

      // Debounce — allow next keypress after scroll settles
      setTimeout(() => {
        isScrolling.current = false
      }, 600)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}
