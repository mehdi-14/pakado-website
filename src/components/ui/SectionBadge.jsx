import { Badge, Text, Box } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { memo } from "react"

const SectionBadge = memo(({ 
  children,
  icon = "✦",
  variant = "primary",
  size = "md",
  centerAlign = false,
  mb = 8,
  ...props 
}) => {

      // ✅ Ajouter le hook i18n pour détecter RTL
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  
  // Variantes de style
  const variants = {
    primary: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "primary",
      color: "fg",
      iconColor: "primary"
    },
    secondary: {
      bg: "bgMuted",
      border: "1px solid",
      borderColor: "border",
      color: "textSecondary",
      iconColor: "textSecondary"
    },
    solid: {
      bg: "primary",
      border: "none",
      borderColor: "transparent",
      color: "white",
      iconColor: "white"
    }
  }

  // Tailles
  const sizes = {
    sm: {
      px: 3,
      py: 1,
      fontSize: "xs",
      iconSize: "md"
    },
    md: {
      px: 4,
      py: 2,
      fontSize: "sm",
      iconSize: "lg"
    },
    lg: {
      px: 6,
      py: 3,
      fontSize: "md",
      iconSize: "xl"
    }
  }

  const variantStyles = variants[variant] || variants.primary
  const sizeStyles = sizes[size] || sizes.md

  return (
    <Box 
      mb={mb} 
      textAlign={centerAlign ? "center" : (isRTL ? "right" : "left")} 
      display={centerAlign ? "flex" : "block"}
      justifyContent={centerAlign ? "center" : "flex-start"}
    >
      <Badge
        bg={variantStyles.bg}
        border={variantStyles.border}
        borderColor={variantStyles.borderColor}
        color={variantStyles.color}
        px={sizeStyles.px}
        py={sizeStyles.py}
        borderRadius="5px"
        fontSize={sizeStyles.fontSize}
        fontWeight="500"
        textTransform="none"
        display="inline-flex"
        alignItems="center"
        gap={2}
        _dark={{
          borderColor: variant === "primary" ? "primary" : variantStyles.borderColor,
          color: variant === "primary" ? "fg" : variantStyles.color,
          bg: variantStyles.bg
        }}
        {...props}
      >
        {icon && (
          <Text 
            as="span" 
            fontSize={sizeStyles.iconSize} 
            color={variantStyles.iconColor}
            lineHeight="1"
          >
            {icon}
          </Text>
        )}
        {children}
      </Badge>
    </Box>
  )
})

SectionBadge.displayName = 'SectionBadge'

export default SectionBadge
