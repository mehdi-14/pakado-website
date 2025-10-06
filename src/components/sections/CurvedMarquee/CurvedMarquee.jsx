import { Box, Container } from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import CurvedLoop from './CurvedLoop'
import './CurvedMarquee.css'

export default function CurvedMarquee() {
  const { t } = useTranslation()

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        
        <Box
          position="relative"
          bg="footerBg"
          backdropFilter="blur(12px)"
          borderRadius="24px"
          border="1px solid"
          borderColor="transparent"
          overflow="hidden"
          py={0}
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            padding: "1px",
            borderRadius: "24px",
            background: "linear-gradient(90deg, rgba(243, 146, 0, 0.3) 0%, rgba(234, 92, 22, 0.3) 100%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        >
          <CurvedLoop 
            marqueeText="Infographie ✦ Conseils personnalisés ✦ Impression offset de qualité ✦ Production & livraison rapide ✦"
            speed={2}
            curveAmount={80}
            direction="left"
            interactive={true}
            className="pakado-curved-text"
          />
        </Box>
        
      </Container>
    </Box>
  )
}