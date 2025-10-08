import { 
  Box, 
  Container, 
  Heading, 
  Text
} from "@chakra-ui/react"
import { HiOutlineMail } from "react-icons/hi"
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export default function ContactHeader() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Mémoriser les traductions
  const translations = useMemo(() => ({
    title: t('contact.header.title'), // "Contactez-nous"
    description: t('contact.header.description') // "Une équipe à votre écoute pour concrétiser vos projets dématérialisé personnalisé"
  }), [t])

  return (
    <Box as="section" py={{ base: 10, md: 16 }}>
      <Container maxW="7xl">
        <Box
          bg="footerBg"
          borderRadius="20px"
          p={8}
          position="relative"
          overflow="hidden"
          border="1px solid"
          borderColor="transparent"
          minH={{ base: "300px", md: "350px" }}
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
          {/* Icône email en arrière-plan à gauche */}
          <Box
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            zIndex={1}
            opacity={0.1}
          >
            <Box
              as={HiOutlineMail}
              fontSize={{ base: "150px", md: "200px", lg: "250px" }}
              color="primary"
            />
          </Box>

          {/* Contenu texte centré */}
          <Box
            position="relative"
            zIndex={3}
            textAlign="center"
            maxW="4xl"
            mx="auto"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <Heading 
              as="h1" 
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
              lineHeight="1.6"
              maxW="2xl"
              mx="auto"
            >
              {translations.description}
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
