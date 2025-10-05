import { 
  Box, 
  Container, 
  Heading, 
  Text,
  Grid,
  GridItem,
  HStack,
  VStack
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react'
import { useState, useEffect, useRef } from 'react'
import { 
  FaLeaf, 
  FaCertificate, 
  FaCogs, 
  FaUserFriends 
} from 'react-icons/fa'
import SectionBadge from "../../ui/SectionBadge"

// ✅ Hook personnalisé pour l'animation de compteur avec Intersection Observer
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return [count, elementRef]
}

// ✅ Composant Feature Card avec blur background
const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Box
      position="relative"
      bg="footerBg"
      backdropFilter="blur(12px)"
      borderRadius="16px"
      border="1px solid"
      borderColor="transparent"
      overflow="hidden"
      p={6}
      h="157px"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px",
        borderRadius: "16px",
        background: "linear-gradient(90deg, rgba(243, 146, 0, 0.1) 0%, #EA5C16 100%)",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      transition="all 0.3s ease"
    >
      {/* Header avec icon et titre */}
      <HStack spacing={4} mb={4} alignItems="center">
        {/* ✅ Icon avec même background que le header */}
  <Box
          position="relative"
          bg="rgba(217, 217, 217, 0.1)"
          backdropFilter="blur(12px)"
          borderRadius="12px"
          border="1px solid"
          borderColor="transparent"
          overflow="hidden"
          w="50px"
          h="50px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            padding: "1px", 
            borderRadius: "12px",
            background: "linear-gradient(90deg, rgba(243, 146, 0, 0.1) 0%, #EA5C16 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        >
          <Icon size={24} color="fg" />
        </Box>

        {/* Titre */}
        <Heading 
          size="md"
          color="fg"
          fontWeight="600"
          lineHeight="1.3"
          flex="1"
        >
          {title}
        </Heading>
      </HStack>

      {/* Description */}
      <Text 
        color="textSecondary" 
        fontSize="sm" 
        lineHeight="1.5"
        overflow="hidden"
        display="-webkit-box"
        style={{
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical"
        }}
      >
        {description}
      </Text>
    </Box>
  )
}

// ✅ Composant Stats Counter
const StatsCounter = ({ value, label, suffix = "" }) => {
  const [count, ref] = useCountUp(value, 2500)

  return (
    <VStack spacing={3} textAlign="center" ref={ref} py={2}>
      {/* ✅ Nombre plus grand */}
      <Heading 
        size={{ base: "2xl", md: "4xl" }} 
        fontWeight="bold"
        background="linear-gradient(90deg, #F39200 0%, #EA5C16 100%)"
        bgClip="text"
        color="transparent"
        lineHeight="1"
      >
        +{count.toLocaleString()}{suffix}
      </Heading>
      
      {/* Label */}
      <Text 
        color="textSecondary" 
        fontSize={{ base: "sm", md: "md" }}
        fontWeight="500"
        lineHeight="1.2"
      >
        {label}
      </Text>
    </VStack>
  )
}

export default function WhyChooseUs() {
  const { t, i18n } = useTranslation()

  // ✅ Données des features
  const features = [
    {
      icon: FaLeaf,
      title: t('whyChooseUs.features.ecoResponsible.title'),
      description: t('whyChooseUs.features.ecoResponsible.description')
    },
    {
      icon: FaCertificate,
      title: t('whyChooseUs.features.qualityExpertise.title'),
      description: t('whyChooseUs.features.qualityExpertise.description')
    },
    {
      icon: FaCogs,
      title: t('whyChooseUs.features.customService.title'),
      description: t('whyChooseUs.features.customService.description')
    },
    {
      icon: FaUserFriends,
      title: t('whyChooseUs.features.customerProximity.title'),
      description: t('whyChooseUs.features.customerProximity.description')
    }
  ]

  // ✅ Données des statistiques
  const stats = [
    {
      value: 500,
      label: t('whyChooseUs.stats.projectsCompleted'),
      suffix: ""
    },
    {
      value: 100,
      label: t('whyChooseUs.stats.partners'),
      suffix: ""
    },
    {
      value: 10,
      label: t('whyChooseUs.stats.experience'),
      suffix: ""
    }
  ]

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        
        {/* ✅ Badge */}
        <SectionBadge centerAlign={true} variant="primary" size="md" mb={6}>
          {t('whyChooseUs.badge')}
        </SectionBadge>

        {/* ✅ Titre avec highlight */}
        <Heading 
          as="h2" 
          size={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          color="fg"
          mb={6}
          lineHeight="1.2"
          fontFamily="body"
          textAlign="center"
        >
          <Text as="span" color="fg">
            {t('whyChooseUs.title')}{" "}
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
            {t('whyChooseUs.titleHighlight')}
          </Text>
        </Heading>

        {/* ✅ Description */}
        <Text 
          fontSize={{ base: "md", md: "md" }}
          color="textSecondary"
          mb={6}
          lineHeight="1.7"
          textAlign="center"
          maxW="4xl"
          mx="auto"
        >
          {t('whyChooseUs.description')}
        </Text>

        {/* ✅ Grid des 4 feature cards */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={6}
          mb={6}
        >
          {features.map((feature, index) => (
            <GridItem key={index}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </GridItem>
          ))}
        </Grid>

        {/* ✅ Box statistiques avec compteurs animés */}
  <Box
  position="relative"
  bg="footerBg"
  backdropFilter="blur(12px)"
  borderRadius="20px"
  border="1px solid"
  borderColor="transparent"
  overflow="hidden"
  py={{ base: 8, md: 10 }}
  px={{ base: 4, md: 8 }}
  _before={{
    content: '""',
    position: "absolute",
    inset: 0,
    padding: "1px",
    borderRadius: "20px",
    background: "linear-gradient(90deg, rgba(243, 146, 0, 0.1) 0%, #EA5C16 100%)",
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  }}
>
  {/* ✅ Desktop: Flex avec space-between pour centrage parfait */}
  <HStack 
    display={{ base: "none", md: "flex" }}
    justify="space-between"
    align="center"
    w="100%"
  >
 {stats.map((stat, index) => (
    <Fragment key={stat.value}> {/* ✅ Key sur Fragment */}
      {/* Stats Counter */}
      <Box flex="1" textAlign="center">
        <StatsCounter 
          value={stat.value}
          label={stat.label}
          suffix={stat.suffix}
        />
      </Box>
      
      {/* ✅ Séparateur gradient (sauf pour le dernier) */}
      {index < stats.length - 1 && (
        <Box
          w="1px"
          h="80px"
          bg="linear-gradient(180deg, transparent 0%, rgba(243, 146, 0, 0.3) 50%, transparent 100%)"
          mx={4}
          flexShrink={0}
        />
      )}
    </Fragment>
  ))}
</HStack>

  {/* ✅ Mobile: VStack centré avec séparateurs gradient */}
  <VStack 
    display={{ base: "flex", md: "none" }}
    spacing={6}
    align="center"
    w="100%"
  >
{stats.map((stat, index) => (
    <Fragment key={stat.value}> {/* ✅ Key sur Fragment */}
      {/* Stats Counter */}
      <StatsCounter 
        value={stat.value}
        label={stat.label}
        suffix={stat.suffix}
      />
      
      {/* ✅ Séparateur gradient horizontal (sauf pour le dernier) */}
      {index < stats.length - 1 && (
        <Box
          w="80px"
          h="1px"
          bg="linear-gradient(90deg, transparent 0%, rgba(243, 146, 0, 0.3) 50%, transparent 100%)"
        />
      )}
    </Fragment>
  ))}
</VStack>
</Box>
        
      </Container>
    </Box>
  )
}
