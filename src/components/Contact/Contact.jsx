import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Contact.module.scss'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      <div className="container">
        <p className={`${styles.sectionLabel} t-label`} data-reveal>04 — Contact</p>

        <div className={styles.main}>
          <h2 className={`${styles.heading} t-display`} data-reveal>
            Let's build<br /><em>something precise.</em>
          </h2>

          <div className={styles.right}>
            <p className="t-body" data-reveal>
              I'm open to freelance projects, full-time roles, and interesting
              collaborations. If you're building something and need a developer
              who cares about both the code and the craft — let's talk.
            </p>

            <div className={styles.links} data-reveal>
              <a href="mailto:antonio@example.com" className={styles.emailLink}>
                antonio@example.com
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 13L13 3M13 3H6.5M13 3v6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <div className={styles.socials}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
                <span className={styles.divider}>/</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
