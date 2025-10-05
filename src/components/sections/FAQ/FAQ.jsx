import { 
  Box, 
  Container, 
  Heading, 
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Collapsible, // ✅ Collapsible au lieu de Collapse
  IconButton
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useMemo, memo } from 'react'
import { HiPlus, HiMinus } from 'react-icons/hi'
import SectionBadge from "../../ui/SectionBadge"
import GradientButton from "../../ui/GradientButton"

// ✅ Composant FAQ Item mémorisé pour éviter re-renders
const FAQItem = memo(({ faq, isOpen, onToggle, index, isRTL }) => {
  const { t } = useTranslation()
  
  // ✅ Mémoriser les textes pour éviter recalculs
  const question = useMemo(() => t(faq.questionKey), [t, faq.questionKey])
  const answer = useMemo(() => t(faq.answerKey), [t, faq.answerKey])
  
  return (
    <Box
      position="relative"
      bg="footerBg"
      backdropFilter="blur(12px)"
      borderRadius="16px"
      border="1px solid"
      borderColor="transparent"
      overflow="hidden"
      mb={1}
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
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* ✅ Collapsible Root */}
      <Collapsible.Root open={isOpen} onOpenChange={() => onToggle()}>
        
        {/* ✅ Header clickable avec Collapsible Trigger */}
        <Collapsible.Trigger asChild>
          <Box
            as="button"
            w="100%"
            textAlign="left"
            p={4}
            cursor="pointer"
            transition="background-color 0.2s ease"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={isRTL ? "row-reverse" : "row"}
            bg="transparent"
            border="none"
            _focus={{
              outline: "none",
            }}
          >
            <Text
              fontSize="md"
              fontWeight="600"
              color="fg"
              lineHeight="1.4"
              flex="1"
              pr={isRTL ? 0 : 4}
              pl={isRTL ? 4 : 0}
              textAlign={isRTL ? "right" : "left"}
            >
              {question}
            </Text>
            
            {/* ✅ Icône avec transition */}
            <Box
              as="span"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="32px"
              h="32px"
              borderRadius="50px"
              bg="transparent"
              color="primary"
              transition="all 0.3s ease"
              transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
              _hover={{ bg: "primary", color: "white" }}
            >
              {isOpen ? <HiMinus size={18} /> : <HiPlus size={18} />}
            </Box>
          </Box>
        </Collapsible.Trigger>

        {/* ✅ Contenu avec Collapsible Content */}
        <Collapsible.Content>
          <Box px={6} pb={6}>
            <Text
              color="textSecondary"
              fontSize="sm"
              lineHeight="1.6"
              textAlign={isRTL ? "right" : "left"}
            >
              {answer}
            </Text>
          </Box>
        </Collapsible.Content>
        
      </Collapsible.Root>
    </Box>
  )
})
FAQItem.displayName = 'FAQItem'

// ✅ Composant FAQ List mémorisé
const FAQList = memo(({ faqs, openIndex, onToggle, isRTL }) => {
  return (
    <VStack spacing={0} align="stretch">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => onToggle(index)}
          isRTL={isRTL}
        />
      ))}
    </VStack>
  )
})
FAQList.displayName = 'FAQList'

export default function FAQ() {
  const { t, i18n } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)
  const isRTL = i18n.language === 'ar'

  // ✅ Handler optimisé avec useCallback
  const handleToggle = useCallback((index) => {
    setOpenIndex(prevIndex => prevIndex === index ? null : index)
  }, [])

  // ✅ Données FAQ mémorisées
  const faqs = useMemo(() => [
    {
      id: 'design-service',
      questionKey: 'faq.questions.designService.question',
      answerKey: 'faq.questions.designService.answer'
    },
    {
      id: 'custom-packaging',
      questionKey: 'faq.questions.customPackaging.question', 
      answerKey: 'faq.questions.customPackaging.answer'
    },
    {
      id: 'packaging-types',
      questionKey: 'faq.questions.packagingTypes.question',
      answerKey: 'faq.questions.packagingTypes.answer'
    },
    {
      id: 'eco-friendly',
      questionKey: 'faq.questions.ecoFriendly.question',
      answerKey: 'faq.questions.ecoFriendly.answer'
    },
    {
      id: 'delivery-details',
      questionKey: 'faq.questions.deliveryDetails.question',
      answerKey: 'faq.questions.deliveryDetails.answer'
    }
  ], [])

  // ✅ Traductions mémorisées
  const translations = useMemo(() => ({
    badge: t('faq.badge'),
    title: t('faq.title'),
    titleHighlight: t('faq.titleHighlight'), 
    description: t('faq.description'),
    buttonText: t('faq.buttoncta')
  }), [t])

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        
        {/* ✅ Grid responsive avec direction RTL/LTR */}
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={12}
          alignItems="start"
          dir={isRTL ? "rtl" : "ltr"}
        >
          
          {/* ✅ Section contenu textuel - Toujours première dans l'ordre DOM */}
          <GridItem>
            <VStack 
              align="flex-start"
              spacing={6}
            >
              
              {/* Badge */}
              <Box alignSelf="flex-start">
                <SectionBadge centerAlign={false} variant="primary" size="md">
                  {translations.badge}
                </SectionBadge>
              </Box>

              {/* Titre */}
              <Heading 
                as="h2" 
                size={{ base: "2xl", md: "4xl" }}
                fontWeight="bold"
                color="fg"
                lineHeight="1.2"
                fontFamily="body"
                textAlign={isRTL ? "right" : "left"}
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

              {/* Description */}
              <Text 
                fontSize={{ base: "md", md: "md" }}
                color="textSecondary"
                lineHeight="1.7"
                maxW="500px"
                textAlign={isRTL ? "right" : "left"}
              >
                {translations.description}
              </Text>

              {/* CTA Button */}
              <Box pt={3} alignSelf="flex-start">
                <GradientButton to="/contact" size="md">
                  {translations.buttonText}
                </GradientButton>
              </Box>
              
            </VStack>
          </GridItem>
          
          {/* ✅ Section FAQ - Toujours deuxième dans l'ordre DOM */}
          <GridItem>
            <FAQList 
              faqs={faqs}
              openIndex={openIndex}
              onToggle={handleToggle}
              isRTL={isRTL}
            />
          </GridItem>
          
        </Grid>
        
      </Container>
    </Box>
  )
}