import { 
  Box, 
  Container, 
  Heading, 
  Text,
  VStack
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import SectionBadge from "../../../ui/SectionBadge"

export default function LocationSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Mémoriser les traductions
  const translations = useMemo(() => ({
    badge: t('contact.location.badge'),
    title: t('contact.location.title'),
    description: t('contact.location.description'),
    address: t('contact.location.address')
  }), [t])

  return (
    <Box as="section" py={{ base: 10, md: 12 }}>
      <Container maxW="7xl">
        
        {/* En-tête de section */}
        <VStack spacing={6} textAlign="center" mb={10}>
          <SectionBadge variant="primary" size="md">
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
            {translations.title}
          </Heading>

          <Text 
            fontSize={{ base: "md", md: "lg" }}
            color="textSecondary"
            lineHeight="1.6"
            maxW="2xl"
          >
            {translations.description}
          </Text>
        </VStack>

        {/* Carte Google Maps */}
        <Box
          position="relative"
          borderRadius="20px"
          overflow="hidden"
          border="1px solid"
          borderColor="primary"
          h={{ base: "300px", md: "400px", lg: "500px" }}
          w="100%"
        >
          {/* Iframe Google Maps */}
          <Box
            as="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3199.0750302618285!2d4.0477511758336195!3d36.69673487227684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128dc992c4d45811%3A0xa6263bb52816f9f6!2sPAKADO%20STYLE!5e0!3m2!1sfr!2sdz!4v1759796138911!5m2!1sfr!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            position="relative"
            zIndex={2}
            borderRadius="20px"
          />
          
          {/* Overlay d'adresse */}
          <Box
            position="absolute"
            bottom={4}
            left={4}
            right={4}
            bg="footerBg"
            backdropFilter="blur(12px)"
            borderRadius="12px"
            p={4}
            border="1px solid"
            borderColor="primary"
            zIndex={3}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="600"
              color="#000000"
              lineHeight="1.4"
            >
              📍 {translations.address}
            </Text>
          </Box>
        </Box>
        
      </Container>
    </Box>
  )
}
