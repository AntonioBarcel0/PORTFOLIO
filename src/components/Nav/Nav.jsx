import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLang } from '@/context/LangContext'
import styles from './Nav.module.scss'

export default function Nav() {
  const navRef  = useRef(null)
  const menuRef = useRef(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { lang, setLang, t } = useLang()

  const desktopLinks = [
    { label: t('nav.about'),   href: '#about' },
    { label: t('nav.stack'),   href: '#stack' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  const mobileLinks = [
    { label: t('nav.work'),    href: '#hero',    num: '01' },
    { label: t('nav.about'),   href: '#about',   num: '02' },
    { label: t('nav.stack'),   href: '#stack',   num: '03' },
    { label: t('nav.contact'), href: '#contact', num: '04' },
  ]

  // Nav entrance + menu initial hidden state
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
    )
    gsap.set(menuRef.current, { autoAlpha: 0 })

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const openMenu = () => {
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'

    const items = menuRef.current.querySelectorAll('[data-menu-item]')
    gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
  }

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setMenuOpen(false)
        document.body.style.overflow = ''
      },
    })
  }

  const handleDesktopClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleMobileClick = (e, href) => {
    e.preventDefault()
    closeMenu()
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 350)
  }

  return (
    <>
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
            {desktopLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={styles.link}
                  onClick={(e) => handleDesktopClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.right}>
            <a
              href="https://github.com/AntonioBarcel0"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              GitHub
            </a>

            <div className={styles.langSwitch} role="group" aria-label="Language">
              <button
                className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <span className={styles.langDivider}>/</span>
              <button
                className={`${styles.langBtn} ${lang === 'es' ? styles.langActive : ''}`}
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
              >
                ESP
              </button>
            </div>

            <button
              className={styles.hamburger}
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className={styles.hLine} />
              <span className={styles.hLine} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay — always in DOM so GSAP can target it */}
      <div
        ref={menuRef}
        className={styles.mobileMenu}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className={styles.menuInner}>

          <div className={styles.menuHeader}>
            <span className={styles.menuLogoMark}>AGB</span>
            <button
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ←
            </button>
          </div>

          <div className={styles.menuBody}>
            <div className={styles.menuIdentity} data-menu-item>
              <p className={styles.menuRole}>{t('hero.role')}</p>
              <p className={styles.menuLocation}>{t('hero.location')}</p>
              <a href="mailto:antoniogibarber99@gmail.com" className={styles.menuEmail}>
                antoniogibarber99@gmail.com
              </a>
            </div>

            <nav className={styles.menuNav}>
              {mobileLinks.map(({ label, href, num }) => (
                <a
                  key={href}
                  href={href}
                  className={styles.menuLink}
                  onClick={(e) => handleMobileClick(e, href)}
                  data-menu-item
                >
                  <span className={styles.menuNum}>{num}</span>
                  <span className={styles.menuLabel}>{label}</span>
                </a>
              ))}
            </nav>
          </div>

          <p className={styles.menuCopy} data-menu-item>
            {t('menu.copy')}
          </p>
        </div>
      </div>
    </>
  )
}
