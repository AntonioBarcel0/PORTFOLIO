import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stack } from '@/data/stack'
import { useLang } from '@/context/LangContext'
import styles from './Stack.module.scss'

export default function Stack() {
  const sectionRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 84%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="stack">
      <div className="container">
        <header className={styles.header}>
          <p className={`${styles.sectionLabel} t-label`} data-reveal>{t('stack.label')}</p>
          <h2 className={`${styles.sectionTitle} t-label`} data-reveal style={{ color: 'var(--text-faint)' }}>
            {t('stack.title')}
          </h2>
        </header>

        <div className={styles.grid}>
          {stack.map((group) => (
            <div key={group.category} className={styles.group} data-reveal>
              <h3 className={styles.groupTitle}>{group.category}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.philosophy} data-reveal>
          <p>{t('stack.philosophy')}</p>
        </div>
      </div>
    </section>
  )
}
