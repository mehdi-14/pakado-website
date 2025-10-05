import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import des traductions
import fr from './locales/fr.json'
import ar from './locales/ar.json'
import en from './locales/en.json'
import es from './locales/es.json' // ← AJOUT

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      ar: { translation: ar },
      en: { translation: en },
      es: { translation: es } // ← AJOUT
    },
    lng: 'fr',
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n