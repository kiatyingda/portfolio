'use client'

import { useEffect, useRef } from 'react'

export default function DotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gap = 32
    const dotBase = 0.06
    const dotHover = 0.35
    const radius = 0.8
    const hoverRadius = 200

    let raf: number
    let w = 0
    let h = 0
    let dpr = 1

    function resize() {
      dpr = window.devicePixelRatio || 1
      w = window.innerWidth
      h = document.documentElement.scrollHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.scale(dpr, dpr)
    }

    function draw(time: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const scrollY = window.scrollY
      const my = mouse.current.y + scrollY
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.0015)

      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const t = Math.max(0, 1 - dist / hoverRadius)
          const hoverAlpha = dotHover * (0.7 + 0.3 * pulse)
          const alpha = dotBase + (hoverAlpha - dotBase) * t * t

          ctx!.beginPath()
          ctx!.arc(x, y, radius, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx!.fill()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    function onMouseLeave() {
      mouse.current.x = -1000
      mouse.current.y = -1000
    }

    resize()
    raf = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
