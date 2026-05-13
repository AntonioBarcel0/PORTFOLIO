import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.scss'

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className="t-label" data-reveal>02 — About</p>
            <h2 className={`${styles.heading} t-display`} data-reveal>
              Developer.<br /><em>Detail-oriented.</em>
            </h2>
          </div>

          <div className={styles.right}>
            <p className="t-body" data-reveal>
              I'm Antonio Ginés, a full-stack web developer based in Spain.
              I work across the entire stack, but frontend is where I'm most
              at home — the intersection of architecture, interface, and experience.
            </p>
            <p className="t-body" data-reveal>
              I build web applications that hold up under scrutiny: clean code,
              solid structure, and interfaces that feel effortless to use.
              I care about the details that most people don't notice until they're missing.
            </p>
            <p className="t-body" data-reveal>
              My work tends toward products that need to function reliably and look
              deliberately designed — not decorated, but considered.
            </p>

            <div className={styles.facts} data-reveal>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Based in</span>
                <span className={styles.factValue}>Spain</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Focus</span>
                <span className={styles.factValue}>Frontend / Full-stack</span>
              </div>
              <div className={styles.fact}>
                <span className={styles.factLabel}>Status</span>
                <span className={styles.factAvailable}>Available for projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
