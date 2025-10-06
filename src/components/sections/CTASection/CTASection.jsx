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
          bg="footerBg"
          borderRadius="20px"
          p={5}
          position="relative"
          overflow="hidden"
          border="1px solid"
          borderColor="transparent"
          minH={{ base: "400px", md: "400px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
              color="fg"
              mb={6}
              lineHeight="1.2"
              fontFamily="body"
            >
              {translations.title}
            </Heading>

            <Text 
              fontSize={{ base: "lg", md: "xl" }}
              color="fg"
              mb={8}
              lineHeight="1.6"
              maxW="2xl"
              mx="auto"
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
                fontSize="18px"
              />
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
