import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  
  const toggleColorMode = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])
  
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode()
    
    return (
      <ClientOnly fallback={<Skeleton boxSize='40px' borderRadius="md" />}>
        <IconButton
          onClick={toggleColorMode}
          variant='ghost'
          aria-label='Toggle color mode'
          size='sm'
          ref={ref}
          color="#050404"
          _dark={{ color: "white" }}
          _hover={{ bg: "#F39200" }}
          borderRadius="md"
          px="2"
          py="2"
          transition="background-color 0.2s ease-out"
          {...props}
        >
          <ColorModeIcon />
        </IconButton>
      </ClientOnly>
    )
  },
)