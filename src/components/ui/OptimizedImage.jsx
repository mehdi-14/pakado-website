import { useState } from 'react'
import { Box, Spinner, Image } from '@chakra-ui/react'

export default function OptimizedImage({ 
  src, 
  alt, 
  width,
  height,
  aspectRatio = "16/9", // Ratio par défaut
  className = '', 
  priority = false,
  ...props 
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Calcul des dimensions pour éviter les layout shifts
  const containerStyle = {
    width: width || '100%',
    height: height || 'auto',
    aspectRatio: aspectRatio,
    position: 'relative'
  }

  return (
    <Box 
      style={containerStyle}
      className={className}
      bg={loading ? "gray.50" : "transparent"}
    >
      {loading && !error && (
        <Box 
          position="absolute" 
          top="50%" 
          left="50%" 
          transform="translate(-50%, -50%)"
          zIndex={2}
        >
          <Spinner color="pakado.500" size="lg" />
        </Box>
      )}
      
      <Image
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'cover', // Maintient les proportions
          display: error ? 'none' : 'block',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
        // Force les dimensions pour éviter les shifts
        width={width}
        height={height}
        {...props}
      />
      
      {error && (
        <Box 
          position="absolute"
          inset={0}
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          bg="gray.100" 
          color="gray.500"
        >
          Image non disponible
        </Box>
      )}
    </Box>
  )
}
