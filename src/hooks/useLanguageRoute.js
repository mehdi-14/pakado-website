import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function useLanguageRoute() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const supportedLanguages = ['fr', 'en', 'ar', 'es']
    
    if (!supportedLanguages.includes(lang)) {
      navigate(`/fr${window.location.pathname.replace(`/${lang}`, '')}`, { replace: true })
      return
    }

    if (lang !== i18n.language) {
      i18n.changeLanguage(lang)
      localStorage.setItem('pakado-language', lang)
      
      const direction = lang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.setAttribute('dir', direction)
      document.documentElement.setAttribute('lang', lang)
    }
  }, [lang, i18n, navigate])

  return { lang, i18n }
}