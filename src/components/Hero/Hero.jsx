import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { projects } from '@/data/projects'
import styles from './Hero.module.scss'

function HeroProject({ project }) {
  const titleRef = useRef(null)

  const onEnter = () => {
    gsap.to(titleRef.current, {
      rotateY:              6,
      z:                    10,
      transformPerspective: 900,
      ease:                 'power2.out',
      duration:             0.45,
      overwrite:            true,
    })
  }

  const onLeave = () => {
    gsap.to(titleRef.current, {
      rotateY:  0,
      z:        0,
      duration: 0.9,
      ease:     'elastic.out(1, 0.4)',
      overwrite: true,
    })
  }

  return (
    <a
      href={project.links.demo}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.pRow} hero-project`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className={styles.pMeta}>
        <span className={styles.pYear}>{project.year}</span>
        <span className={styles.pSlash}>/</span>
      </span>
      <span
        ref={titleRef}
        className={styles.pTitle}
        style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
      >
        {project.title}
      </span>
    </a>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states via GSAP (not CSS) so fallback is always visible
      gsap.set('.hero-name-line', { yPercent: 110 })
      gsap.set('.hero-fade',      { opacity: 0, y: 10 })
      gsap.set('.hero-project',   { opacity: 0, x: 30 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 })

      tl.to('.hero-name-line', {
          yPercent: 0,
          duration: 1.1,
          stagger:  0.08,
        })
        .to('.hero-fade', {
          opacity:  1,
          y:        0,
          duration: 0.8,
          stagger:  0.07,
        }, '-=0.6')
        .to('.hero-project', {
          opacity:  1,
          x:        0,
          duration: 0.7,
          stagger:  0.1,
        }, '-=0.7')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scroll = (e, id) => {
    e.preventDefault()
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={`${styles.layout} container`}>

        {/* ── LEFT: Identity ── */}
        <div className={styles.left}>
          <div className={styles.nameBlock}>
            {['Antonio', 'Ginés', 'Barceló'].map((word) => (
              <div key={word} className={styles.lineWrap}>
                <span className={`${styles.nameLine} hero-name-line`}>{word}</span>
              </div>
            ))}
          </div>

          <div className={styles.leftInfo}>
            <p className={`${styles.infoLine} hero-fade`}>Full-stack Developer</p>
            <p className={`${styles.infoLine} ${styles.infoMuted} hero-fade`}>España</p>

            <div className={`${styles.infoLinks} hero-fade`}>
              <a
                href="#contact"
                className={styles.infoLink}
                onClick={(e) => scroll(e, '#contact')}
              >
                hello@antonio.dev
              </a>
            </div>

            <div className={`${styles.infoNav} hero-fade`}>
              {['Work', 'About', 'Contact'].map((label, i) => (
                <span key={label} className={styles.infoNavItem}>
                  <span className={styles.infoNavNum}>0{i + 1}</span>
                  <a
                    href={`#${label.toLowerCase()}`}
                    className={styles.infoNavLink}
                    onClick={(e) => scroll(e, `#${label.toLowerCase()}`)}
                  >
                    {label}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Projects ── */}
        <div className={styles.right}>
          {projects.map((p) => (
            <HeroProject key={p.id} project={p} />
          ))}
        </div>

      </div>
    </section>
  )
}
