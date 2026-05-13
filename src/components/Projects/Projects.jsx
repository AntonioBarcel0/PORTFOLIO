import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import ProjectItem from './ProjectItem'
import styles from './Projects.module.scss'

export default function Projects() {
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%' },
      }
    )
  }, [])

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        <header ref={headerRef} className={styles.header}>
          <p className={`${styles.sectionLabel} t-label`} data-reveal>02 — Selected Work</p>
          <h2 className={`${styles.sectionTitle} t-label`} data-reveal style={{ color: 'var(--text-faint)' }}>
            {projects.length} projects
          </h2>
        </header>

        <div>
          {projects.map((project, i) => (
            <ProjectItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
