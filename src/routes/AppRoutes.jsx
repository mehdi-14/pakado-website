import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from '../components/layout/Layout'
import PageLoader from '../components/ui/PageLoader'
import useLanguageRoute from '../hooks/useLanguageRoute'

const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))  
const Contact = lazy(() => import('../pages/Contact/Contact'))

export default function AppRoutes() {
  useLanguageRoute()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route 
          index 
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } 
        />
        <Route 
          path="a-propos" 
          element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          } 
        />
        <Route 
          path="contact" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          } 
        />
      </Route>
    </Routes>
  )
}