import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './Header'
import FloatingButtons from '../ui/FloatingButtons'

// ✅ Lazy load du Footer (charge seulement quand visible)
const Footer = lazy(() => import('./Footer'))

export default function Layout() {
  return (
    <Box 
      minH="100vh" 
      display="flex" 
      flexDirection="column"
    >
      <Header />
      
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      
      {/* ✅ Footer lazy loadé avec fallback */}
      <Suspense 
        fallback={
          <Box 
            minH={{ base: "500px", md: "400px" }} 
            bg="transparent" 
          />
        }
      >
        <Footer />
      </Suspense>

      <FloatingButtons />
    </Box>
  )
}