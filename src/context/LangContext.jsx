import { createContext, useCallback, useContext, useState } from 'react'
import { translations } from '@/data/i18n'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')

  // Stable reference — only changes when lang changes, not on every render
  const t = useCallback(
    (key) => translations[lang][key] ?? translations['en'][key] ?? key,
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
