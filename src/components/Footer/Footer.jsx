import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={`${styles.left} mono`}>
          © {year} Antonio Ginés Barceló Berlanga
        </p>
        <p className={`${styles.right} mono`}>
          Designed & built with care
        </p>
      </div>
    </footer>
  )
}
