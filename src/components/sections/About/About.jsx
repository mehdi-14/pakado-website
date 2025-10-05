import { 
  Box, 
  Container, 
  Grid, 
  GridItem,
  Heading, 
  Text,
  Button,
  Image
} from "@chakra-ui/react"
import { HiArrowUpRight } from "react-icons/hi2"
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import SectionBadge from "../../ui/SectionBadge"

export default function About() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Mémoriser les traductions
  const translations = useMemo(() => ({
    badge: t('about.badge'),
    title: t('about.title'),
    titleHighlight: t('about.titleHighlight'),
    description: t('about.description'),
    button: t('about.button')
  }), [t])

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        
        <Box
          bg="footerBg"
          borderRadius="20px"
          p={5}
          position="relative"
          overflow="hidden"
          border="1px solid"
          borderColor="transparent"
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
          
          <Grid 
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 8, lg: 12 }}
            alignItems="center"
            dir={isRTL ? "rtl" : "ltr"}
          >
            
            {/* Colonne de contenu */}
            <GridItem>
              
              <SectionBadge variant="primary" size="md">
                {translations.badge}
              </SectionBadge>

              <Heading 
                as="h2" 
                size={{ base: "2xl", md: "4xl" }}
                fontWeight="bold"
                color="fg"
                mb={6}
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
                mb={8}
                lineHeight="1.7"
              >
                {translations.description}
              </Text>

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
              >
                {translations.button}
                <Box 
                  as={HiArrowUpRight}
                  ml={isRTL ? 0 : 2}
                  mr={isRTL ? 2 : 0}
                  transform={isRTL ? 'rotate(180deg)' : 'none'}
                  fontSize="16px"
                />
              </Button>
              
            </GridItem>

            {/* Colonne image */}
            <GridItem>
              <Box
                position="relative"
                borderRadius="16px"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                }}
                transition="all 0.3s ease"
                w="100%"
                h={{ base: "300px", md: "400px" }}
              >
                <Image
                  src="/images/about-pakado.webp"
                  alt="Pakado Style - Emballages et impression"
                  width={600}
                  height={400}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  borderRadius="16px"
                  loading="lazy"
                  fallback={
                    <Box
                      w="100%"
                      h="100%"
                      bg="linear-gradient(135deg, rgba(243, 146, 0, 0.1) 0%, rgba(234, 92, 22, 0.1) 100%)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="16px"
                    >
                      <Text color="primary" fontSize="sm" textAlign="center">
                        Image Pakado Style
                        <br />
                        (Packaging & Printing)
                      </Text>
                    </Box>
                  }
                />
                
                <Box
                  position="absolute"
                  inset={0}
                  bg="linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(234, 92, 22, 0.1) 100%)"
                  borderRadius="16px"
                  opacity={0}
                  _hover={{ opacity: 1 }}
                  transition="opacity 0.3s ease"
                />
              </Box>
            </GridItem>
            
          </Grid>
          
        </Box>
        
      </Container>
    </Box>
  )
}