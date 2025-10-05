import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  HStack,
  Button
} from "@chakra-ui/react"
import { HiArrowUpRight } from "react-icons/hi2"
import { useTranslation } from 'react-i18next'
import LightRays from "../../ui/LightRays/LightRays"
import GradientButton from "../../ui/GradientButton"
import SectionBadge from "../../ui/SectionBadge" 

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  return (
    <Box as="section" position="relative" overflow="hidden" mt="-72px">
      {/* === BACKGROUND LightRays=== */}
      <Box
        position="absolute"
        inset="0"
        zIndex={0}
        w="100%"
        h="100%"
        opacity={0.6}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#EA5C16"
          raysSpeed={1.5}
          lightSpread={2}
          rayLength={0.5}
          followMouse={true}
          mouseInfluence={0.4}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </Box>

      {/* === CONTENT HERO === */}
      <Container
        maxW="7xl"
        position="relative"
        zIndex={1}
        pt={{ base: 24, md: 40 }}
        pb={{ base: 10, md: 10 }}
        textAlign="center"
      >
        {/* Badge Pakado Style */}
       <SectionBadge centerAlign={true} size="md" variant="primary">
          {t('hero.badge')}
        </SectionBadge>

        {/* Titre principal */}
<Heading
  as="h1"
  size={{ base: "4xl", md: "7xl" }}
  fontWeight="bold"
  color="fg"
  mb={6}
  lineHeight="1.1"
  fontFamily="heading"
>
  {/* Version française */}
  {i18n.language === 'fr' && (
    <>
      <Text as="span" color="fg">Packaging{" "}</Text>
      <Text as="span" background="linear-gradient(90deg, #F39200 0%, #EA5C16 50%, #F39200 100%)"
        backgroundSize="300% 100%" bgClip="text" color="transparent"
        animation="gradientMove 4s ease-in-out infinite"
        sx={{ '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }}}
      >
        Sur Mesure
      </Text>
    </>
  )}
  
  {/* Version anglaise */}
  {i18n.language === 'en' && (
    <>
      <Text as="span" color="fg">Custom{" "}</Text>
      <Text as="span" background="linear-gradient(90deg, #F39200 0%, #EA5C16 50%, #F39200 100%)"
        backgroundSize="300% 100%" bgClip="text" color="transparent"
        animation="gradientMove 4s ease-in-out infinite"
        sx={{ '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }}}
      >
        Packaging
      </Text>
    </>
  )}
  
  {/* Version espagnole */}
  {i18n.language === 'es' && (
    <>
      <Text as="span" color="fg">Embalaje{" "}</Text>
      <Text as="span" background="linear-gradient(90deg, #F39200 0%, #EA5C16 50%, #F39200 100%)"
        backgroundSize="300% 100%" bgClip="text" color="transparent"
        animation="gradientMove 4s ease-in-out infinite"
        sx={{ '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }}}
      >
        Personalizado
      </Text>
    </>
  )}
  
  {/* Version arabe */}
  {i18n.language === 'ar' && (
    <>
      <Text as="span" color="fg">التعبئة والتغليف{" "}</Text>
      <Text as="span" background="linear-gradient(90deg, #F39200 0%, #EA5C16 50%, #F39200 100%)"
        backgroundSize="300% 100%" bgClip="text" color="transparent"
        animation="gradientMove 4s ease-in-out infinite"
        sx={{ '@keyframes gradientMove': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }}}
      >
        حسب الطلب
      </Text>
    </>
  )}
</Heading>
        {/* Description */}
        <Text 
          fontSize={{ base: "md", md: "md" }}
          color="textSecondary" 
          maxW="4xl" 
          mx="auto" 
          mb={10}
          lineHeight="1.6"
        >
          {t('hero.description')}
        </Text>

        {/* Boutons CTA - Responsive côte à côte sur desktop */}
        <HStack 
          spacing={{ base: 0, sm: 4 }}
          align="center"
          justifyContent="center"
          flexDirection={{ base: "column", sm: "row" }}
          gap={{ base: 4, md: 6 }}
          w="full"
        >
          {/* Bouton Demander un devis - Gradient */}
          <Box w={{ base: "full", sm: "auto" }}>
            <GradientButton 
              to="/contact"
              size="md"
              isFullWidth={{ base: true, sm: false }}
            >
              {t('hero.buttons.quote')}
            </GradientButton>
          </Box>

{/* Bouton Découvrir nos produits - Transparent avec bordure */}
<Box w={{ base: "full", sm: "auto" }}>
  <Button
    size="md"
    variant="outline"
    borderColor="primary"
    color="fg"
    bg="transparent"
    _hover={{
      bg: "primary",
      color: "white",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(234, 92, 22, 0.2)"
    }}
    _active={{
      transform: "translateY(0)",
    }}
    transition="all 0.3s ease"
    px={5}
    h="52px"
    fontSize="16px"
    fontWeight="600"
    borderRadius="12px"
    w={{ base: "full", sm: "auto" }}
  >
    {t('hero.buttons.products')}
    <Box 
      as={HiArrowUpRight}  
      ml={isRTL ? 0 : 2}
      mr={isRTL ? 2 : 0}
      transform={isRTL ? 'rotate(180deg)' : 'none'}
    />
  </Button>
</Box>
        </HStack>
      </Container>
    </Box>
  )
}
