import { 
  Box, 
  Container, 
  Heading, 
  Text,
  Grid,
  GridItem,
  VStack,
  Image
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import { useMemo, memo } from 'react'
import SectionBadge from "../../ui/SectionBadge"
import './PackagingShowcase.css'

const ImageSliderColumn = memo(({ images, direction = "up" }) => {
  return (
    <Box
      position="relative"
      h="400px"
      overflow="hidden"
      borderRadius="16px"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "linear-gradient(180deg, var(--chakra-colors-bg) 0%, transparent 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }}
      _after={{
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "linear-gradient(0deg, var(--chakra-colors-bg) 0%, transparent 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }}
    >
      <Box
        className={direction === "up" ? "slider-track-up" : "slider-track-down"}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* Première série */}
        {images.map((image, index) => (
          <Box
            key={`first-${index}`}
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            bg="footerBg"
            backdropFilter="blur(12px)"
            border="1px solid"
            borderColor="transparent"
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
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
            }}
            transition="all 0.3s ease"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={200}
              w="100%"
              h="200px"
              objectFit="cover"
              loading="lazy"
            />
          </Box>
        ))}
        
        {/* Deuxième série (copie pour effet infini) */}
        {images.map((image, index) => (
          <Box
            key={`second-${index}`}
            position="relative"
            borderRadius="12px"
            overflow="hidden"
            bg="footerBg"
            backdropFilter="blur(12px)"
            border="1px solid"
            borderColor="transparent"
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
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
            }}
            transition="all 0.3s ease"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={200}
              w="100%"
              h="200px"
              objectFit="cover"
              loading="lazy"
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
})
ImageSliderColumn.displayName = 'ImageSliderColumn'

export default function PackagingShowcase() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  const images = useMemo(() => [
    { src: "/images/about-pakado.webp", alt: "Packaging Pakado Style 1" },
    { src: "/images/about-pakado.webp", alt: "Packaging Pakado Style 2" },
    { src: "/images/about-pakado.webp", alt: "Packaging Pakado Style 3" },
    { src: "/images/about-pakado.webp", alt: "Packaging Pakado Style 4" },
    { src: "/images/about-pakado.webp", alt: "Packaging Pakado Style 5" },
    { src: "/images/about-pakado.webp", alt: "Packaging Pakado Style 6" }
  ], [])

  const leftColumnImages = useMemo(() => 
    images.filter((_, index) => index % 2 === 0), 
    [images]
  )
  
  const rightColumnImages = useMemo(() => 
    images.filter((_, index) => index % 2 === 1), 
    [images]
  )

  const translations = useMemo(() => ({
    badge: t('showcase.badge'),
    title: t('showcase.title'),
    titleHighlight: t('showcase.titleHighlight'),
    description: t('showcase.description')
  }), [t])

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={12}
          alignItems="center"
          dir={isRTL ? "rtl" : "ltr"}
        >
          
          {/* Colonne Texte */}
          <GridItem>
            <VStack align="flex-start" spacing={6}>
              
              <SectionBadge centerAlign={false} variant="primary" size="md">
                {translations.badge}
              </SectionBadge>

              <Heading 
                as="h2" 
                size={{ base: "2xl", md: "4xl" }}
                fontWeight="bold"
                color="fg"
                lineHeight="1.2"
                fontFamily="body"
              >
                <Text as="span" color="fg">
                  {translations.title}{" "}
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
                  {translations.titleHighlight}
                </Text>
              </Heading>

              <Text 
                fontSize={{ base: "md", md: "md" }}
                color="textSecondary"
                lineHeight="1.7"
                maxW="500px"
              >
                {translations.description}
              </Text>
              
            </VStack>
          </GridItem>
          
          {/* Colonne Slider */}
          <GridItem>
            <Grid templateColumns="1fr 1fr" gap={4}>
              
              <GridItem>
                <ImageSliderColumn 
                  images={leftColumnImages} 
                  direction="up"
                />
              </GridItem>
              
              <GridItem>
                <ImageSliderColumn 
                  images={rightColumnImages} 
                  direction="down"
                />
              </GridItem>
              
            </Grid>
          </GridItem>
          
        </Grid>
        
      </Container>
    </Box>
  )
}