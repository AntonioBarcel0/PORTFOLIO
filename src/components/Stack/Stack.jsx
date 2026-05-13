import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stack } from '@/data/stack'
import styles from './Stack.module.scss'

export default function Stack() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 16 },
      {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 84%' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="stack">
      <div className="container">
        <header className={styles.header}>
          <p className={`${styles.sectionLabel} t-label`} data-reveal>03 — Expertise</p>
          <h2 className={`${styles.sectionTitle} t-label`} data-reveal style={{ color: 'var(--text-faint)' }}>
            Tools & approach
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
          <p>
            I don't chase frameworks — I look for the right tool for each problem.
            My focus is writing code that is clear, maintainable, and purposeful.
            Accessibility and performance aren't afterthoughts; they're part of the brief from the start.
          </p>
        </div>
      </div>
    </section>
  )
}
