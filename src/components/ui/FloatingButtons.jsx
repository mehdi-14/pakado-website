import { Box, IconButton, VStack } from '@chakra-ui/react'
import { useState, useEffect, useCallback } from 'react'
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa'
import { Tooltip } from '../ui/tooltip' // ✅ Import correct pour v3

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  // ✅ Détecter le scroll pour afficher/masquer le bouton
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    setShowBackToTop(scrollTop > 300) // Apparaît après 300px de scroll
  }, [])

  // ✅ Scroll vers le haut avec animation
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  // ✅ Redirection vers WhatsApp
  const openWhatsApp = useCallback(() => {
    const phoneNumber = "213797413910"
    const message = "Bonjour, j'aimerais avoir plus d'informations sur vos services d'emballage."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }, [])

  // ✅ Event listener pour le scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      {/* ✅ Styles CSS globaux dans le head */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes slideInUp {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .whatsapp-pulse {
            animation: pulse 2s infinite;
          }
          .back-to-top-enter {
            animation: slideInUp 0.3s ease-out;
          }
        `
      }} />

      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={1000}
        pointerEvents="auto"
      >
        <VStack spacing={3}>
          {/* ✅ Bouton WhatsApp - toujours visible avec Tooltip v3 */}
          <Tooltip content="Contactez-nous sur WhatsApp" placement="left">
            <IconButton
              onClick={openWhatsApp}
              bg="green.500"
              color="white"
              size="lg"
              borderRadius="full"
              boxShadow="lg"
              className={!showBackToTop ? "whatsapp-pulse" : ""}
              _hover={{
                bg: "green.600",
                transform: "scale(1.1)",
                boxShadow: "xl"
              }}
              _active={{
                bg: "green.700",
                transform: "scale(0.95)"
              }}
              transition="all 0.2s ease"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size="24px" />
            </IconButton>
          </Tooltip>

          {/* ✅ Bouton Back to Top - apparaît après scroll */}
          {showBackToTop && (
            <Tooltip content="Retour en haut" placement="left">
              <IconButton
                onClick={scrollToTop}
                bg="primary"
                color="white"
                size="lg"
                borderRadius="full"
                boxShadow="lg"
                className="back-to-top-enter"
                _hover={{
                  bg: "orange.600",
                  transform: "scale(1.1)",
                  boxShadow: "xl"
                }}
                _active={{
                  bg: "orange.700",
                  transform: "scale(0.95)"
                }}
                transition="all 0.2s ease"
                aria-label="Retour en haut"
              >
                <FaArrowUp size="20px" />
              </IconButton>
            </Tooltip>
          )}
        </VStack>
      </Box>
    </>
  )
}

export default FloatingButtons
