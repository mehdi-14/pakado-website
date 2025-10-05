import { Button, Box } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function GradientButton({ 
  children, 
  to, 
  onClick, 
  size = "md", 
  variant = "primary",
  isFullWidth = false,
  ...props 
}) {
  const { i18n } = useTranslation()
  
  // Ajouter le préfixe de langue à l'URL si 'to' est fourni
  const localizedTo = to ? `/${i18n.language}${to}` : undefined

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

  // Si un lien est fourni, utiliser RouterLink
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

  // Sinon, utiliser un bouton normal avec onClick
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