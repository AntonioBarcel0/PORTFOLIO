import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { projects } from '@/data/projects'
import { useLang } from '@/context/LangContext'
import ProjectItem from './ProjectItem'
import styles from './Projects.module.scss'

export default function Projects() {
  const headerRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    gsap.fromTo(
      headerRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true },
      }
    )
  }, [])

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        <header ref={headerRef} className={styles.header}>
          <p className={`${styles.sectionLabel} t-label`} data-reveal>{t('projects.label')}</p>
          <h2 className={`${styles.sectionTitle} t-label`} data-reveal style={{ color: 'var(--text-faint)' }}>
            {t('projects.count')(projects.length)}
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
