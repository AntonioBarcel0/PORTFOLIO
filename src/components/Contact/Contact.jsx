import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '@/context/LangContext'
import styles from './Contact.module.scss'

export default function Contact() {
  const sectionRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      <div className="container">
        <p className={`${styles.sectionLabel} t-label`} data-reveal>{t('contact.label')}</p>

        <div className={styles.main}>
          <h2 className={`${styles.heading} t-display`} data-reveal>
            {t('contact.heading1')}<br /><em>{t('contact.heading2')}</em>
          </h2>

          <div className={styles.right}>
            <p className="t-body" data-reveal>{t('contact.body')}</p>

            <div className={styles.links} data-reveal>
              <a href="mailto:antoniogibarber99@gmail.com" className={styles.emailLink}>
                antoniogibarber99@gmail.com
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 13L13 3M13 3H6.5M13 3v6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div className={styles.socials}>
                <a href="https://github.com/AntonioBarcel0" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
                <span className={styles.divider}>/</span>
                <a href="https://www.linkedin.com/in/antoniobarceloberlanga/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
