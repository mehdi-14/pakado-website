import { Box } from "@chakra-ui/react"
import useSEO from '../../hooks/useSEO'
import ContactHeader from "../../components/sections/ContactSections/ContactHeader/ContactHeader"
import ContactCards from "../../components/sections/ContactSections/ContactCards/ContactCards"
import WhatsAppSection from "../../components/sections/ContactSections/WhatsAppSection/WhatsAppSection"
import ContactForm from "../../components/sections/ContactSections/ContactForm/ContactForm"
import LocationSection from "../../components/sections/ContactSections/LocationSection/LocationSection"


// tes composants

export default function Contact() {

    const seoTags = useSEO({
      title: "Pakado - Solutions Emballage et Packaging Premium | Leader France",
      description: "Pakado, expert en emballage packaging sur-mesure. Solutions d'emballage écologiques, packaging personnalisé pour entreprises. Devis gratuit 24h.",
      keywords: "pakado, emballage, packaging, emballage carton, packaging personnalisé, emballage écologique, solutions packaging france",
      canonical: "/",
    })

  return (
       <Box>
         {seoTags}
         
         <ContactHeader />
         <ContactCards />
         <WhatsAppSection />
         <ContactForm />
         <LocationSection />
       </Box>
  )
}
