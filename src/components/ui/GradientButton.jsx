import { Button, Box } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function GradientButton({ 
  children, 
  to, 
  onClick, 
  size = "md", 
  variant = "primary",
  isFullWidth = false,
  scrollTo = null, // ✅ NOUVELLE PROP
  ...props 
}) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  
  const localizedTo = to ? `/${i18n.language}${to}` : undefined

  // ✅ NOUVELLE FONCTION
const handleScrollToSection = (sectionId) => {
  if (location.pathname !== `/${i18n.language}`) {
    navigate(`/${i18n.language}`)
    
    // Fonction récursive pour attendre que l'élément existe
    const scrollToElement = () => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerOffset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        // Réessayer si l'élément n'existe pas encore
        setTimeout(scrollToElement, 100)
      }
    }
    
    // Attendre que la navigation soit terminée
    setTimeout(scrollToElement, 300)
  } else {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

  const baseStyles = {
    background: "linear-gradient(90deg, #EA5C16 0%, #FF8A50 100%)",
    color: "white",
    fontWeight: "600",
    borderRadius: "12px",
    textDecoration: "none",
    border: "none",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(135deg, #d44a0c 0%, #e6743d 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
      zIndex: -1,
    },
    _hover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(234, 92, 22, 0.3)",
      _before: {
        opacity: 1,
      }
    },
    _active: {
      transform: "translateY(0)",
    },
  }

  const sizeStyles = {
    sm: { height: "36px", px: "4", fontSize: "14px" },
    md: { height: "52px", px: "8", fontSize: "16px" },
    lg: { height: "52px", px: "8", fontSize: "18px" },
  }

  // ✅ NOUVELLE CONDITION
  if (scrollTo) {
    return (
      <Button
        onClick={() => {
          handleScrollToSection(scrollTo)
          if (onClick) onClick()
        }}
        {...baseStyles}
        {...sizeStyles[size]}
        w={isFullWidth ? "full" : "auto"}
        {...props}
      >
        <Box as="span" position="relative" zIndex={1}>
          {children}
        </Box>
      </Button>
    )
  }

  if (localizedTo) {
    return (
      <Button
        as={RouterLink}
        to={localizedTo}
        {...baseStyles}
        {...sizeStyles[size]}
        w={isFullWidth ? "full" : "auto"}
        {...props}
      >
        <Box as="span" position="relative" zIndex={1}>
          {children}
        </Box>
      </Button>
    )
  }

  return (
    <Button
      onClick={onClick}
      {...baseStyles}
      {...sizeStyles[size]}
      w={isFullWidth ? "full" : "auto"}
      {...props}
    >
      <Box as="span" position="relative" zIndex={1}>
        {children}
      </Box>
    </Button>
  )
}