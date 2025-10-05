import { 
  Box, 
  Container, 
  Heading, 
  Text,
  HStack
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import SectionBadge from "../../ui/SectionBadge"

// Logos SVG temporaires (tu pourras les remplacer)
const LogoCompany1 = memo(() => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="8" fill="currentColor" opacity="0.1"/>
    <text x="60" y="35" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="600">
      MUST
    </text>
  </svg>
))

const LogoCompany2 = memo(() => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="8" fill="currentColor" opacity="0.1"/>
    <circle cx="30" cy="30" r="15" fill="currentColor" opacity="0.2"/>
    <text x="65" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
      Istanbul Jungle
    </text>
  </svg>
))

const LogoCompany3 = memo(() => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="8" fill="currentColor" opacity="0.1"/>
    <path d="M40 20 L50 35 L40 45 L35 40 L42 30 L35 20 Z" fill="currentColor" opacity="0.3"/>
    <text x="75" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
      TechCorp
    </text>
  </svg>
))

const LogoCompany4 = memo(() => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="8" fill="currentColor" opacity="0.1"/>
    <rect x="25" y="25" width="20" height="10" rx="2" fill="currentColor" opacity="0.2"/>
    <text x="75" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
      Innovation Co
    </text>
  </svg>
))

const LogoCompany5 = memo(() => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="8" fill="currentColor" opacity="0.1"/>
    <polygon points="35,20 45,20 40,30 50,30 40,45 30,35 40,35 30,25" fill="currentColor" opacity="0.3"/>
    <text x="75" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
      StartupXYZ
    </text>
  </svg>
))

const LogoCompany6 = memo(() => (
  <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
    <rect width="120" height="60" rx="8" fill="currentColor" opacity="0.1"/>
    <circle cx="35" cy="25" r="8" fill="currentColor" opacity="0.2"/>
    <circle cx="35" cy="40" r="5" fill="currentColor" opacity="0.3"/>
    <text x="75" y="35" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">
      GlobalTech
    </text>
  </svg>
))

// Composant pour un logo individual
const LogoItem = memo(({ children }) => (
  <Box
    minW="120px"
    h="60px"
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="textMuted"
    _hover={{ 
      color: "fg",
      transform: "scale(1.05)"
    }}
    transition="all 0.3s ease"
    mx={4}
  >
    {children}
  </Box>
))

export default function TrustedCompanies() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Array des logos (dupliqué pour l'effet infini)
  const logos = [
    <LogoCompany1 key="logo1" />,
    <LogoCompany2 key="logo2" />,
    <LogoCompany3 key="logo3" />,
    <LogoCompany4 key="logo4" />,
    <LogoCompany5 key="logo5" />,
    <LogoCompany6 key="logo6" />
  ]

  return (
    <Box as="section" py={{ base: 10, md: 10 }} overflow="hidden">
      <Container maxW="7xl" textAlign="center">
        
        {/* Badge */}
        <SectionBadge centerAlign={true} variant="primary" size="md" mb={6}>
          {t('trustedCompanies.badge')}
        </SectionBadge>

        {/* Titre */}
        <Heading 
          as="h2" 
          size={{ base: "md", md: "2xl" }}
          color="fg"
          mb={12}
          fontFamily="heading"
        >
          <Text as="span" color="textSecondary">
            {t('trustedCompanies.title')}{" "}
          </Text>
          <Text 
            as="span" 
            background="linear-gradient(90deg, #F39200 0%, #EA5C16 50%, #F39200 100%)"
            backgroundSize="200% 100%"
            bgClip="text"
            color="transparent"
            animation="gradientMove 3s ease-in-out infinite"
            sx={{
              '@keyframes gradientMove': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' }
              }
            }}
          >
            {t('trustedCompanies.titleHighlight')}
          </Text>
        </Heading>

        {/* Logos qui défilent */}
        <Box
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100px",
            height: "100%",
            background: `linear-gradient(90deg, var(--chakra-colors-bg) 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: "none"
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "100px", 
            height: "100%",
            background: `linear-gradient(270deg, var(--chakra-colors-bg) 0%, transparent 100%)`,
            zIndex: 2,
            pointerEvents: "none"
          }}
        >
          {/* Container qui défile */}
          <HStack
            spacing={0}
            animation={`scroll ${isRTL ? 'rtl' : 'ltr'} 30s linear infinite`}
            sx={{
              '@keyframes scroll': {
                ltr: {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' }
                },
                rtl: {
                  '0%': { transform: 'translateX(-50%)' },
                  '100%': { transform: 'translateX(0)' }
                }
              }
            }}
            _hover={{
              animationPlayState: "paused"
            }}
            w="200%" // Double largeur pour l'effet infini
          >
            {/* Premier set de logos */}
            {logos.map((logo, index) => (
              <LogoItem key={`first-${index}`}>
                {logo}
              </LogoItem>
            ))}
            
            {/* Deuxième set de logos (dupliqué) */}
            {logos.map((logo, index) => (
              <LogoItem key={`second-${index}`}>
                {logo}
              </LogoItem>
            ))}
          </HStack>
        </Box>
        
      </Container>
    </Box>
  )
}
