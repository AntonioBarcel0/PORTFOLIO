import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLang } from '@/context/LangContext'
import styles from './Projects.module.scss'

export default function ProjectItem({ project, index }) {
  const itemRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const { lang, t } = useLang()

  // Pick localized field, fall back to base field
  const pick = (field) =>
    lang === 'es' && project[`${field}_es`] ? project[`${field}_es`] : project[field]

  useEffect(() => {
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: index * 0.04,
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    )
  }, [index])

  const toggle = () => setExpanded((v) => !v)

  return (
    <article
      ref={itemRef}
      className={`${styles.item} ${expanded ? styles.itemExpanded : ''}`}
    >
      <div
        className={styles.itemMain}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => e.key === 'Enter' && toggle()}
      >
        <span className={styles.number}>{project.id}</span>

        <div className={styles.itemCenter}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.subtitle}>{pick('subtitle')}</span>
        </div>

        <div className={styles.itemRight}>
          <span className={styles.year}>{project.year}</span>
          <span className={`${styles.arrow} ${expanded ? styles.arrowOpen : ''}`} aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
      </div>

      <div className={styles.itemDetails} aria-hidden={!expanded}>
        <div className={styles.detailsInner}>
          <div />
          <div className={styles.detailsContent}>
            <p className={styles.description}>{pick('description')}</p>

            <div className={styles.detailBlock}>
              <p className={styles.detailLabel}>Stack</p>
              <div className={styles.tagList}>
                {project.stack.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.detailBlock}>
              <p className={styles.detailLabel}>{t('projects.role')}</p>
              <p className={styles.description} style={{ maxWidth: 'none' }}>{pick('role')}</p>
            </div>

            <div className={styles.detailLinks}>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                className={styles.detailLink} onClick={(e) => e.stopPropagation()}>
                Demo <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                className={styles.detailLink} onClick={(e) => e.stopPropagation()}>
                GitHub <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5v4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
