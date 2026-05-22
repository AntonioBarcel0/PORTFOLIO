import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/context/LangContext'
import styles from './About.module.scss'

export default function About() {
  const sectionRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className="t-label" data-reveal>{t('about.label')}</p>
            <h2 className={`${styles.heading} t-display`} data-reveal>
              {t('about.heading1')}<br /><em>{t('about.heading2')}</em>
            </h2>
          </div>

          <div className={styles.right}>
            <p className="t-body" data-reveal>{t('about.p1')}</p>
            <p className="t-body" data-reveal>{t('about.p2')}</p>
            <p className="t-body" data-reveal>{t('about.p3')}</p>

            <div className={styles.facts} data-reveal>
              <div className={styles.fact}>
                <span className={styles.factLabel}>{t('about.fact.based')}</span>
                <span className={styles.factValue}>{t('about.fact.based.value')}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>{t('about.fact.focus')}</span>
                <span className={styles.factValue}>{t('about.fact.focus.value')}</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>{t('about.fact.status')}</span>
                <span className={styles.factAvailable}>{t('about.fact.status.value')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
