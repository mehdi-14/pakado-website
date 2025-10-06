import { 
  Box, 
  Container, 
  Heading, 
  Text,
  Button
} from "@chakra-ui/react"
import { HiArrowUpRight } from "react-icons/hi2"
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import Silk from './Silk'

export default function CTASection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Mémoriser les traductions
  const translations = useMemo(() => ({
    title: t('cta.title'),
    description: t('cta.description'),
    button: t('cta.button')
  }), [t])

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        <Box
          position="relative"
          borderRadius="20px"
          overflow="hidden"
          minH={{ base: "400px", md: "400px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Silk Background */}
          <Box
            position="absolute"
            inset={0}
            w="100%"
            h="100%"
            zIndex={1}
          >
            <Silk
              speed={5}
              scale={1}
              color="#EA5C16"
              noiseIntensity={1.5}
              rotation={0}
            />
          </Box>

          {/* Overlay pour améliorer la lisibilité du texte */}
          <Box
            position="absolute"
            inset={0}
            bg="blackAlpha.400"
            zIndex={2}
          />

          {/* Contenu CTA */}
          <Box
            position="relative"
            zIndex={3}
            textAlign="center"
            px={{ base: 6, md: 8 }}
            py={{ base: 8, md: 12 }}
            maxW="4xl"
            mx="auto"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <Heading 
              as="h2" 
              size={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
              color="white"
              mb={6}
              lineHeight="1.2"
              fontFamily="body"
            >
              {translations.title}
            </Heading>

            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              mb={8}
              lineHeight="1.6"
              maxW="2xl"
              mx="auto"
            >
              {translations.description}
            </Text>

            <Button
              size="lg"
              bg="transparent"
              color="white"
              border="2px solid"
              borderColor="white"
              _hover={{
                bg: "white",
                color: "black",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)"
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.3s ease"
              px={8}
              h="56px"
              fontSize="18px"
              fontWeight="600"
              borderRadius="12px"
            >
              {translations.button}
              <Box 
                as={HiArrowUpRight}
                ml={isRTL ? 0 : 2}
                mr={isRTL ? 2 : 0}
                transform={isRTL ? 'rotate(180deg)' : 'none'}
                fontSize="18px"
              />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
