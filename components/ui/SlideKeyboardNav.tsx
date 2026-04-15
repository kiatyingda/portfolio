'use client'

import { useEffect, useRef } from 'react'

// Cinematic slide transition — cubic-bezier(0.4, 0, 0.2, 1), per design system spec.
// Deliberate, mechanical, no bounce. Durations picked to feel filmic (850ms slide,
// 640ms paginate-within-slide) so the rhythm telegraphs "new thought" vs "continuation".
const SLIDE_MS = 850
const PAGE_MS = 640

// Sample cubic-bezier(0.4, 0, 0.2, 1) via Newton's method — matches CSS easing exactly.
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  function bezier(t: number, p1: number, p2: number) {
    return 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t
  }
  return function (t: number) {
    // Solve for t where bezier(t, x1, x2) = input t; then return bezier(t, y1, y2).
    let x = t
    for (let i = 0; i < 8; i++) {
      const xEst = bezier(x, x1, x2)
      const dx = 3 * (1 - x) * (1 - x) * x1 + 6 * (1 - x) * x * (x2 - x1) + 3 * x * x * (1 - x2)
      if (Math.abs(dx) < 1e-6) break
      x -= (xEst - t) / dx
    }
    return bezier(x, y1, y2)
  }
}

const easeOutExpo = cubicBezier(0.4, 0, 0.2, 1)

export default function SlideKeyboardNav() {
  const isScrolling = useRef(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    // Animated scroll — custom RAF loop so we control duration + easing precisely.
    // Canceling mid-flight (user hammers ArrowDown) is safe: the lock blocks new keys
    // until the current animation finishes, so cancellation only happens on unmount.
    function animateScroll(targetY: number, durationMs: number, onDone: () => void) {
      const startY = window.scrollY
      const delta = targetY - startY
      if (Math.abs(delta) < 1) { onDone(); return }
      const startTime = performance.now()

      function frame(now: number) {
        const elapsed = now - startTime
        const t = Math.min(1, elapsed / durationMs)
        const eased = easeOutExpo(t)
        window.scrollTo(0, Math.round(startY + delta * eased))
        if (t < 1) {
          rafId.current = requestAnimationFrame(frame)
        } else {
          rafId.current = null
          onDone()
        }
      }
      rafId.current = requestAnimationFrame(frame)
    }

    function getSections(): HTMLElement[] {
      // Only count meaningful slide landmarks — skip zero-height / display:none sections
      // so "ghost" wrappers (e.g. sections that render nothing) don't eat ArrowDown presses.
      const sections: HTMLElement[] = []
      document.querySelectorAll('section, footer').forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        if (el.offsetHeight <= 1) return
        if (getComputedStyle(el).display === 'none') return
        sections.push(el)
      })
      return sections
    }

    // Where a section *lands* in the viewport when navigated to.
    // Centering logic MUST match handleKeyDown or detection gets out of sync with scrolling.
    // Clamp is only needed when the PREVIOUS section is a full-viewport "take-over" slide
    // (hero with data-slide-align="top") — otherwise centering a short section would bleed
    // the hero's black background into the top of the new slide. For regular content-to-
    // content transitions a small sliver of the previous section is fine editorially.
    function landingYFor(el: HTMLElement, sections: HTMLElement[]): number {
      const alignTop = el.dataset.slideAlign === 'top'
      const centerOffset = alignTop ? 0 : Math.max(0, (window.innerHeight - el.offsetHeight) / 2)
      const natural = Math.max(0, el.offsetTop - centerOffset)
      const idx = sections.indexOf(el)
      if (idx > 0) {
        const prev = sections[idx - 1]
        const prevIsTakeover = prev.dataset.slideAlign === 'top'
        if (prevIsTakeover) {
          const prevBottom = prev.offsetTop + prev.offsetHeight
          return Math.max(natural, prevBottom)
        }
      }
      return natural
    }

    function getCurrentSectionIndex(sections: HTMLElement[]): number {
      // Pick the section whose landing-Y is closest to the current scroll position.
      // Bias slightly so we prefer the section we're INSIDE over the next one:
      // landing-Y <= scrollY + small epsilon counts as "we are on this section".
      const scrollY = window.scrollY
      const epsilon = 2
      let chosen = 0
      let closestDist = Infinity
      for (let i = 0; i < sections.length; i++) {
        const landing = landingYFor(sections[i], sections)
        const dist = Math.abs(scrollY - landing)
        if (dist < closestDist - epsilon) {
          closestDist = dist
          chosen = i
        }
      }
      return chosen
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== ' ' && e.key !== 'PageDown' && e.key !== 'PageUp') return

      // Don't hijack if user is in an input or iframe
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return
      if (document.activeElement?.tagName === 'IFRAME') return

      e.preventDefault()
      if (isScrolling.current) return

      const sections = getSections()
      if (sections.length === 0) return

      const goingDown = e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown'
      const current = getCurrentSectionIndex(sections)
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const currentEl = sections[current]
      const currentTop = currentEl.offsetTop
      const currentBottom = currentTop + currentEl.offsetHeight
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh)

      // ── Paged scroll inside tall sections ───────────────────────────────
      // If the current section overflows the viewport, paginate through it
      // before jumping to the next section. ~85% viewport step keeps overlap.
      const pagedStep = Math.round(vh * 0.85)
      if (goingDown) {
        const viewportBottom = scrollY + vh
        // Do we still have unseen content in the current section below the fold?
        if (currentBottom - viewportBottom > 120) {
          const nextY = Math.min(scrollY + pagedStep, currentBottom - vh, maxScroll)
          if (nextY > scrollY + 4) {
            isScrolling.current = true
            triggerExplosion()
            animateScroll(nextY, PAGE_MS, () => { isScrolling.current = false })
            return
          }
        }
      } else {
        // Unseen content above the fold in the current section?
        if (scrollY - currentTop > 120) {
          const prevY = Math.max(scrollY - pagedStep, currentTop)
          if (prevY < scrollY - 4) {
            isScrolling.current = true
            triggerExplosion()
            animateScroll(prevY, PAGE_MS, () => { isScrolling.current = false })
            return
          }
        }
      }

      // ── Section advancement ────────────────────────────────────────────
      // Deterministic current ± 1. No ambiguous findIndex — we've already
      // handled the "still scrolling through a tall section" case above.
      const targetIdx = goingDown
        ? Math.min(current + 1, sections.length - 1)
        : Math.max(current - 1, 0)
      const targetTop = Math.min(landingYFor(sections[targetIdx], sections), maxScroll)

      // No movement to make: we're already at the destination (e.g. at first/last section).
      if (Math.abs(targetTop - scrollY) < 4) return

      isScrolling.current = true
      triggerExplosion()
      animateScroll(targetTop, SLIDE_MS, () => { isScrolling.current = false })
    }

    function triggerExplosion() {
      const iframe = document.querySelector('iframe[title="ASCII Background"]') as HTMLIFrameElement | null
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage('explode', '*')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return null
}
