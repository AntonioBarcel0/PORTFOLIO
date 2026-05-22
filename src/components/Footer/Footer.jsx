import { useLang } from '@/context/LangContext'
import styles from './Footer.module.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <p className={`${styles.left} mono`}>
          © {year} Antonio Ginés Barceló Berlanga
        </p>
        <p className={`${styles.right} mono`}>
          {t('footer.right')}
        </p>
      </div>
    </footer>
  )
}
