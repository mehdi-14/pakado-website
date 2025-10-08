import { 
  Box, 
  Container, 
  SimpleGrid,
  VStack,
  Text,
  Icon
} from "@chakra-ui/react"
import { HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding } from "react-icons/hi"
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export default function ContactCards() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // Mémoriser les traductions
  const translations = useMemo(() => ({
    email: {
      title: t('contact.cards.email.title'),
      value: t('contact.cards.email.value')
    },
    phone: {
      title: t('contact.cards.phone.title'),
      value: t('contact.cards.phone.value')
    },
    office: {
      title: t('contact.cards.office.title'),
      value: t('contact.cards.office.value')
    }
  }), [t])

  const contactData = [
    {
      icon: HiOutlineMail,
      title: translations.email.title,
      value: translations.email.value
    },
    {
      icon: HiOutlinePhone,
      title: translations.phone.title,
      value: translations.phone.value
    },
    {
      icon: HiOutlineOfficeBuilding,
      title: translations.office.title,
      value: translations.office.value
    }
  ]

  return (
    <Box as="section" py={{ base: 8, md: 0 }}>
      <Container maxW="7xl">
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 4, md: 4 }}  
          dir={isRTL ? "rtl" : "ltr"}
        >
          {contactData.map((item, index) => (
            <Box
              key={index}
              bg="footerBg"
              borderRadius="20px"
              px={2}
              py={8}
              m={2}
              textAlign="center"
              border="1px solid"
              borderColor="transparent"
              position="relative"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(234, 92, 22, 0.1)"
              }}
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
              <VStack spacing={4} position="relative" zIndex={2}>
                <Icon
                  as={item.icon}
                  boxSize={{ base: "48px", md: "56px" }}
                  color="fg"
                />
                
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  color="fg"
                  fontFamily="body"
                >
                  {item.title}
                </Text>
                
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="fg"
                  opacity={0.8}
                  lineHeight="1.5"
                >
                  {item.value}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
