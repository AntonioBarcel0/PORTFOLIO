import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Nav.module.scss'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      aria-label="Primary navigation"
    >
      <div className={styles.inner}>
        <a href="#" className={styles.logo} aria-label="Back to top">
          <span className={styles.logoMark}>AGB</span>
        </a>

        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={styles.link}
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}
