import { 
  Box, 
  Container, 
  Heading, 
  Text,
  VStack,
  Textarea,
  Input,
  Field
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { useState, useCallback, useMemo, memo, useId } from 'react'
import SectionBadge from "../../../ui/SectionBadge"
import GradientButton from "../../../ui/GradientButton"

// 🔑 Configuration EmailJS pour le formulaire de contact
const EMAILJS_CONFIG = {
  publicKey: 'KrsymJ5Qb52JA8aPa',        // ✅ Même clé que le formulaire de devis
  serviceId: 'service_qoqkqpi',         // ✅ Même service
  templateId: 'template_9l371fr'         // ⚠️ CRÉE UN NOUVEAU TEMPLATE pour le contact
}

// 📧 Fonction d'envoi d'email pour le formulaire de contact
const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    }

    console.log('📧 Envoi email contact:', templateParams)

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('✅ Email contact envoyé:', response)
    return { success: true, response }
  } catch (error) {
    console.error('❌ Erreur envoi email contact:', error)
    return { success: false, error }
  }
}


// ✅ Toast personnalisé en BAS À DROITE
const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(({ title, description, type = 'success', duration = 3000 }) => {
    const id = Date.now()
    const newToast = { id, title, description, type }
    
    setToasts(prev => [...prev, newToast])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const ToastContainer = () => (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex={9999}
      pointerEvents="none"
    >
      {toasts.map(toast => (
        <Box
          key={toast.id}
          bg={toast.type === 'error' ? "red.500" : "green.500"}
          color="white"
          p={4}
          mb={2}
          borderRadius="md"
          boxShadow="lg"
          maxW="300px"
          animation="slideInUp 0.4s ease-out"
          sx={{
            '@keyframes slideInUp': {
              '0%': { transform: 'translateY(100%)', opacity: 0 },
              '100%': { transform: 'translateY(0)', opacity: 1 }
            }
          }}
        >
          <Text fontWeight="600" fontSize="sm">
            {toast.title}
          </Text>
          {toast.description && (
            <Text fontSize="xs" mt={1}>
              {toast.description}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  )

  return { showToast, ToastContainer }
}

// ✅ Composant Input optimisé
const OptimizedField = memo(({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  error,
  onErrorClear,
  required = false,
  type = "text"
}) => {
  const fieldId = useId()

  const handleChange = useCallback((e) => {
    const newValue = e.target.value
    onChange(e)
    
    if (error && newValue.trim() !== '') {
      onErrorClear(id)
    }
  }, [onChange, onErrorClear, error, id])

  return (
    <Field.Root 
      invalid={!!error}
      required={required}
    >
      <Field.Label 
        fontSize="sm"
        fontWeight="600" 
        color="textSecondary"
        mb={2}
        htmlFor={fieldId}
      >
        {label}
        {required && (
          <Field.RequiredIndicator color="red.500" ml={1} />
        )}
      </Field.Label>
      
      <Input
        id={fieldId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        bg="footerBg"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="primary"
        borderRadius="8px"
        overflow="hidden"
        size="lg"
        h="48px"
        position="relative"
        _hover={{
          borderColor: "primary"
        }}
        _focus={{
          borderColor: "primary",
          outline: "none"
        }}
        color="fg"
        _placeholder={{ color: "textSecondary" }}
        transition="all 0.15s ease"
        willChange="transform"
      />
      
      {error && (
        <Field.ErrorText 
          fontSize="xs" 
          color="red.500"
          mt={1}
          minH="16px"
        >
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
})
OptimizedField.displayName = 'OptimizedField'

// ✅ Composant Textarea optimisé
const OptimizedTextarea = memo(({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  error,
  onErrorClear,
  required = false,
  rows = 5
}) => {
  const fieldId = useId()

  const handleChange = useCallback((e) => {
    const newValue = e.target.value
    onChange(e)
    
    if (error && newValue.trim() !== '') {
      onErrorClear(id)
    }
  }, [onChange, onErrorClear, error, id])

  return (
    <Field.Root 
      invalid={!!error}
      required={required}
    >
      <Field.Label 
        fontSize="sm"
        fontWeight="600" 
        color="textSecondary"
        mb={2}
        htmlFor={fieldId}
      >
        {label}
        {required && (
          <Field.RequiredIndicator color="red.500" ml={1} />
        )}
      </Field.Label>
      
      <Textarea
        id={fieldId}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        bg="footerBg"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="primary"
        borderRadius="8px"
        overflow="hidden"
        resize="vertical"
        rows={rows}
        _hover={{
          borderColor: "primary"
        }}
        _focus={{
          borderColor: "primary",
          outline: "none"
        }}
        color="fg"
        _placeholder={{ color: "textSecondary" }}
        transition="all 0.15s ease"
        willChange="transform"
      />
      
      {error && (
        <Field.ErrorText 
          fontSize="xs" 
          color="red.500"
          mt={1}
          minH="16px"
        >
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
})
OptimizedTextarea.displayName = 'OptimizedTextarea'

export default function ContactForm() {
  const { t } = useTranslation()
  const { showToast, ToastContainer } = useToast()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  // Mémoriser les traductions
  const translations = useMemo(() => ({
    badge: t('contact.form.badge'),
    title: t('contact.form.title'),
    description: t('contact.form.description'),
    firstName: t('contact.form.firstName'),
    firstNamePlaceholder: t('contact.form.firstNamePlaceholder'),
    lastName: t('contact.form.lastName'),
    lastNamePlaceholder: t('contact.form.lastNamePlaceholder'),
    email: t('contact.form.email'),
    emailPlaceholder: t('contact.form.emailPlaceholder'),
    phone: t('contact.form.phone'),
    phonePlaceholder: t('contact.form.phonePlaceholder'),
    message: t('contact.form.message'),
    messagePlaceholder: t('contact.form.messagePlaceholder'),
    submitButton: t('contact.form.submitButton')
  }), [t])

  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }, [])

  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: undefined
    }))
  }, [])

  // ✅ Validation du formulaire
  const validateForm = useCallback(() => {
    const newErrors = {}

    if (!formData.firstName?.trim()) {
      newErrors.firstName = t('contact.form.validation.required')
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = t('contact.form.validation.required')
    }
    if (!formData.email?.trim()) {
      newErrors.email = t('contact.form.validation.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.validation.invalidEmail')
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = t('contact.form.validation.required')
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = t('contact.form.validation.invalidPhone')
    }
    if (!formData.message?.trim()) {
      newErrors.message = t('contact.form.validation.required')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, t])

  // ✅ Handler pour soumission
const handleSubmit = useCallback(async () => {
  if (validateForm()) {
    // 📧 Envoi de l'email via EmailJS
    const emailResult = await sendContactEmail(formData)

    if (emailResult.success) {
      showToast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
        type: 'success',
        duration: 3000
      })

      // Reset formulaire après 1 seconde
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        })
        setErrors({})
      }, 1000)
    } else {
      // ❌ Gestion d'erreur
      showToast({
        title: 'Erreur',
        description: "Impossible d'envoyer le message. Réessayez plus tard.",
        type: 'error',
        duration: 5000
      })
    }
  }
}, [validateForm, showToast, t, formData])

  const formFields = useMemo(() => [
    {
      id: 'firstName',
      label: translations.firstName,
      placeholder: translations.firstNamePlaceholder,
      value: formData.firstName,
      required: true,
      type: 'text'
    },
    {
      id: 'lastName', 
      label: translations.lastName,
      placeholder: translations.lastNamePlaceholder,
      value: formData.lastName,
      required: true,
      type: 'text'
    },
    {
      id: 'email',
      label: translations.email,
      placeholder: translations.emailPlaceholder,
      value: formData.email,
      required: true,
      type: 'email'
    },
    {
      id: 'phone',
      label: translations.phone,
      placeholder: translations.phonePlaceholder,
      value: formData.phone,
      required: true,
      type: 'tel'
    }
  ], [translations, formData])

  return (
    <>
      {/* ✅ Toast Container en BAS À DROITE */}
      <ToastContainer />
      
      <Box as="section" py={{ base: 10, md: 10 }}>
        <Container maxW="4xl" px={{ base: 4, md: 8 }}>
          
          <SectionBadge centerAlign={true} variant="primary" size="md" mb={6}>
            {translations.badge}
          </SectionBadge>

          <Heading 
            as="h2" 
            size={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            color="fg"
            lineHeight="1.2"
            fontFamily="body"
            textAlign="center"
            mb={6}
          >
            {translations.title}
          </Heading>

          <Text 
            fontSize={{ base: "md", md: "md" }}
            color="textSecondary"
            mb={8}
            lineHeight="1.7"
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            {translations.description}
          </Text>
          
          <Box
            position="relative"
            bg="transparent"
            backdropFilter="blur(12px)"
            borderRadius="24px"
            border="1px solid"
            borderColor="primary"
            overflow="hidden"
            p={{ base: 4, md: 8 }}
          >
            
            <VStack spacing={6} align="stretch">
              
              {/* Champs Nom et Prénom */}
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={4}
              >
                {formFields.slice(0, 2).map((field) => (
                  <OptimizedField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={handleInputChange(field.id)}
                    error={errors[field.id]}
                    onErrorClear={clearFieldError}
                    required={field.required}
                    type={field.type}
                  />
                ))}
              </Box>

              {/* Champs Email et Téléphone */}
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={4}
              >
                {formFields.slice(2, 4).map((field) => (
                  <OptimizedField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={handleInputChange(field.id)}
                    error={errors[field.id]}
                    onErrorClear={clearFieldError}
                    required={field.required}
                    type={field.type}
                  />
                ))}
              </Box>

              {/* Champ Message */}
              <OptimizedTextarea
                id="message"
                label={translations.message}
                placeholder={translations.messagePlaceholder}
                value={formData.message}
                onChange={handleInputChange('message')}
                error={errors.message}
                onErrorClear={clearFieldError}
                required={true}
                rows={5}
              />

              {/* Bouton de soumission */}
              <Box display="flex" justifyContent="center" pt={4}>
                <GradientButton 
                  onClick={handleSubmit}
                  size={{ base: "md", md: "lg" }}
                  px={{ base: 6, md: 8 }}
                >
                  {translations.submitButton}
                </GradientButton>
              </Box>

            </VStack>
            
          </Box>
          
        </Container>
      </Box>
    </>
  )
}
