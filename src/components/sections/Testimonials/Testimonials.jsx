import { 
  Box, 
  Container, 
  Heading, 
  Text,
  VStack
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import { useMemo, memo } from 'react'
import SectionBadge from "../../ui/SectionBadge"
import './Testimonials.css'

// ✅ Données des témoignages
const testimonialsData = [
  {
    id: 1,
    name: "Pizzeria Bella",
    location: "Alger",
    text: "Depuis que nous travaillons avec Pakado Style, nos boîtes à pizza sont non seulement solides mais aussi super esthétiques. Nos clients remarquent la différence !"
  },
  {
    id: 2,
    name: "Restaurant Le Gourmet",
    location: "Oran",
    text: "La qualité des emballages Pakado a transformé notre service de livraison. Nos plats arrivent parfaits et chauds chez nos clients."
  },
  {
    id: 3,
    name: "Café Milano",
    location: "Constantine",
    text: "Les gobelets personnalisés ont vraiment boosté notre image de marque. Le service client est exceptionnel !"
  },
  {
    id: 4,
    name: "Burger House",
    location: "Annaba",
    text: "Emballages écologiques et de qualité supérieure. Nos clients adorent, et nous aussi !"
  },
  {
    id: 5,
    name: "Sushi Paradise",
    location: "Alger",
    text: "Les barquettes sont parfaites pour nos sushis. Design élégant et fonctionnel à 100%."
  },
  {
    id: 6,
    name: "La Boulangerie",
    location: "Blida",
    text: "Sacs kraft personnalisés magnifiques ! Nos clients les réutilisent, c'est une super publicité."
  },
  {
    id: 7,
    name: "Tacos King",
    location: "Tizi Ouzou",
    text: "Rapport qualité-prix imbattable. Les emballages gardent nos tacos bien chauds pendant le transport."
  },
  {
    id: 8,
    name: "Smoothie Bar",
    location: "Oran",
    text: "Gobelets de qualité premium avec nos couleurs. Livraison rapide et service impeccable !"
  }
]

// ✅ Composant TestimonialCard
const TestimonialCard = memo(({ testimonial }) => {
  return (
    <Box
      position="relative"
      bg="footerBg"
      backdropFilter="blur(12px)"
      borderRadius="16px"
      border="1px solid"
      borderColor="primary"
      overflow="hidden"
      minW="350px"
      maxW="350px"
      h="auto"
      p={6}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px",
        borderRadius: "16px",
        background: "linear-gradient(90deg, rgba(243, 146, 0, 0.2) 0%, rgba(234, 92, 22, 0.2) 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 30px rgba(243, 146, 0, 0.15)"
      }}
      transition="all 0.3s ease"
    >
      <VStack align="flex-start" spacing={4}>
        
        {/* Texte du témoignage */}
        <Text 
          color="textSecondary" 
          fontSize="sm" 
          lineHeight="1.6"
          fontStyle="italic"
        >
          "{testimonial.text}"
        </Text>
        
        {/* Nom et localisation */}
        <Box>
          <Text 
            color="fg" 
            fontSize="md" 
            fontWeight="bold"
            mb={1}
          >
            {testimonial.name}
          </Text>
          <Text 
            color="primary" 
            fontSize="sm"
            fontWeight="500"
          >
            {testimonial.location}
          </Text>
        </Box>
        
      </VStack>
    </Box>
  )
})
TestimonialCard.displayName = 'TestimonialCard'

// ✅ Composant TestimonialRow
const TestimonialRow = memo(({ testimonials, direction = "right" }) => {
  return (
    <Box
      position="relative"
      overflow="hidden"
      py={3}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "200px",
        background: "linear-gradient(90deg, #0A0A0A 0%, rgba(10, 10, 10, 0.8) 40%, transparent 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }}
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: "200px",
        background: "linear-gradient(270deg, #0A0A0A 0%, rgba(10, 10, 10, 0.8) 40%, transparent 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }}
    >
      <Box
        className={direction === "right" ? "slider-track-right" : "slider-track-left"}
        display="flex"
        gap={4}
      >
        {/* Première série */}
        {testimonials.map((testimonial) => (
          <TestimonialCard 
            key={`first-${testimonial.id}`}
            testimonial={testimonial}
          />
        ))}
        
        {/* Deuxième série (copie pour effet infini) */}
        {testimonials.map((testimonial) => (
          <TestimonialCard 
            key={`second-${testimonial.id}`}
            testimonial={testimonial}
          />
        ))}
        
        {/* Troisième série (pour garantir la continuité) */}
        {testimonials.map((testimonial) => (
          <TestimonialCard 
            key={`third-${testimonial.id}`}
            testimonial={testimonial}
          />
        ))}
      </Box>
    </Box>
  )
})
TestimonialRow.displayName = 'TestimonialRow'

// ✅ Composant principal
export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'

  // ✅ Diviser les témoignages en 2 lignes
  const firstRowTestimonials = useMemo(() => 
    testimonialsData.filter((_, index) => index < 4), 
    []
  )
  
  const secondRowTestimonials = useMemo(() => 
    testimonialsData.filter((_, index) => index >= 4), 
    []
  )

  return (
    <Box as="section" py={{ base: 10, md: 10 }} overflow="hidden">
      <Container maxW="7xl">
        
        {/* En-tête de section */}
        <VStack spacing={6} mb={12}>
          
          <SectionBadge centerAlign={true} variant="primary" size="md">
            {t('testimonials.badge')}
          </SectionBadge>

          <Heading 
            as="h2" 
            size={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            color="fg"
            lineHeight="1.2"
            fontFamily="body"
            textAlign="center"
          >
            <Text as="span" color="fg">
              {t('testimonials.title')}{" "}
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
              {t('testimonials.titleHighlight')}
            </Text>
          </Heading>

          <Text 
            fontSize={{ base: "md", md: "md" }}
            color="textSecondary"
            lineHeight="1.7"
            textAlign="center"
            maxW="3xl"
          >
            {t('testimonials.description')}
          </Text>
          
        </VStack>
        
      </Container>

      {/* Sliders avec direction RTL-aware */}
      <VStack spacing={4} w="100%">
        
        {/* Première ligne - Slide vers la droite (ou gauche en RTL) */}
        <TestimonialRow 
          testimonials={firstRowTestimonials}
          direction={isRTL ? "left" : "right"}
        />
        
        {/* Deuxième ligne - Slide vers la gauche (ou droite en RTL) */}
        <TestimonialRow 
          testimonials={secondRowTestimonials}
          direction={isRTL ? "right" : "left"}
        />
        
      </VStack>
      
    </Box>
  )
}