import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { system } from '../../theme/chakraTheme' // Import du system, pas du thème

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}> {/* Utilise le system exporté */}
      <ThemeProvider 
        attribute="class" 
        disableTransitionOnChange
        defaultTheme="light"
        enableSystem={false}
        storageKey="pakado-theme"
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
