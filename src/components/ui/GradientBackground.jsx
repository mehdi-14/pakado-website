import { Box } from "@chakra-ui/react"

// Composant pour les nuances de fond
export const GradientBackground = () => {
  return (
    <Box
      position="absolute"
      inset="0"
      overflow="hidden"
      pointerEvents="none"
      zIndex="0"
    >
      {/* Blob 1 - Haut gauche */}
      <Box
        position="absolute"
        top="-10%"
        left="-5%"
        width="500px"
        height="500px"
        borderRadius="full"
        bg="primary"
        opacity="0.15"
        filter="blur(120px)"
        animation="float 20s ease-in-out infinite"
      />
      
      {/* Blob 2 - Centre droit */}
      <Box
        position="absolute"
        top="40%"
        right="-10%"
        width="600px"
        height="600px"
        borderRadius="full"
        bg="pakado.400"
        opacity="0.12"
        filter="blur(130px)"
        animation="float 25s ease-in-out infinite reverse"
      />
      
      {/* Blob 3 - Bas centre */}
      <Box
        position="absolute"
        bottom="-15%"
        left="30%"
        width="550px"
        height="550px"
        borderRadius="full"
        bg="primary"
        opacity="0.1"
        filter="blur(140px)"
        animation="float 30s ease-in-out infinite"
      />
      
      {/* Animation CSS */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(30px, -30px) scale(1.05);
            }
            50% {
              transform: translate(-20px, 20px) scale(0.95);
            }
            75% {
              transform: translate(20px, 30px) scale(1.02);
            }
          }
        `}
      </style>
    </Box>
  )
}