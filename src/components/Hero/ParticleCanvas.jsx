import { useEffect, useRef } from 'react'
import styles from './Hero.module.scss'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let width, height

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
    }

    const PARTICLE_COUNT = Math.min(60, Math.floor(window.innerWidth / 24))

    class Particle {
      constructor() {
        this.init()
      }

      init() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.alpha = Math.random() * 0.3 + 0.05
        this.r = Math.random() * 1.2 + 0.4
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -10) this.x = width + 10
        if (this.x > width + 10) this.x = -10
        if (this.y < -10) this.y = height + 10
        if (this.y > height + 10) this.y = -10
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 169, 110, ${this.alpha})`
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())
    }

    const drawEdges = () => {
      const MAX_DIST = 160
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = 0.07 * (1 - dist / MAX_DIST)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201, 169, 110, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    let opacity = 0
    const fadeDuration = 120 // frames

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      if (opacity < 1) opacity = Math.min(1, opacity + 1 / fadeDuration)
      ctx.globalAlpha = opacity
      particles.forEach((p) => { p.update(); p.draw() })
      drawEdges()
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    const onResize = () => resize()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
