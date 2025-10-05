import { Provider } from './components/ui/provider'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = localStorage.getItem('pakado-language') || 'fr'
    
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
    }
    
    const direction = savedLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', direction)
    document.documentElement.setAttribute('lang', savedLanguage)
  }, [i18n])

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          {/* Redirection racine vers langue par défaut */}
          <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
          
          {/* Routes avec préfixe de langue */}
          <Route path="/:lang/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App