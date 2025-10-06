import { Box } from "@chakra-ui/react/box"
import { Suspense, lazy } from 'react'
import useSEO from "../../hooks/useSEO"

// ✅ Chargement critique immédiat
import Hero from "../../components/sections/Hero/Hero"
import TrustedCompanies from "../../components/sections/TrustedCompanies/TrustedCompanies"

// ✅ Lazy loading pour les sections non-critiques
const About = lazy(() => import("../../components/sections/About/About"))
const Products = lazy(() => import("../../components/sections/Products/Products"))
const WhyChooseUs = lazy(() => import("../../components/sections/whyChooseUs/whyChooseUs"))
const FAQ = lazy(() => import("../../components/sections/FAQ/FAQ"))
const PackagingShowcase = lazy(() => import("../../components/sections/PackagingShowcase/PackagingShowcase"))
const Testimonials = lazy(() => import("../../components/sections/Testimonials/Testimonials"))
const QuoteForm = lazy(() => import("../../components/sections/QuoteForm/QuoteForm"))
const CurvedMarquee = lazy(() => import("../../components/sections/CurvedMarquee/CurvedMarquee"))
const CTASection = lazy(() => import("../../components/sections/CTASection/CTASection"))

export default function Home() {
  const seoTags = useSEO({
    title: "Pakado - Solutions Emballage et Packaging Premium | Leader France",
    description: "Pakado, expert en emballage packaging sur-mesure. Solutions d'emballage écologiques, packaging personnalisé pour entreprises. Devis gratuit 24h.",
    keywords: "pakado, emballage, packaging, emballage carton, packaging personnalisé, emballage écologique, solutions packaging france",
    canonical: "/",
  })

  return (
    <Box>
      {seoTags}
      
      {/* ✅ Sections critiques - chargement immédiat */}
      <Hero />
      <TrustedCompanies />
      
      {/* ✅ Sections non-critiques - lazy loading avec intersection observer */}
      <Suspense fallback={<div style={{height: '200px'}} />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<div style={{height: '300px'}} />}>
        <Products />
      </Suspense>

      <Suspense fallback={<div style={{height: '150px'}} />}>
        <CurvedMarquee />
      </Suspense>
      
      <Suspense fallback={<div style={{height: '250px'}} />}>
        <WhyChooseUs />
      </Suspense>
      
      <Suspense fallback={<div style={{height: '400px'}} />}>
        <PackagingShowcase />
      </Suspense>
      
      <Suspense fallback={<div style={{height: '300px'}} />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div style={{height: '200px'}} />}>
        <QuoteForm />
      </Suspense>
      
      <Suspense fallback={<div style={{height: '250px'}} />}>
        <FAQ />
      </Suspense>

            <Suspense fallback={<div style={{height: '200px'}} />}>
        <CTASection/>
      </Suspense>
    </Box>
  )
}
