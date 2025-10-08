import { 
  Box, 
  Container, 
  Heading, 
  Text,
  VStack,
  HStack,
  Input,
  Field,
  Circle,
  Combobox,
  Select,
  Portal,
  Slider,
  Flex,
  createListCollection,
  useListCollection,
  useFilter
} from "@chakra-ui/react"
import emailjs from '@emailjs/browser'
import { useTranslation } from 'react-i18next'
import { useState, useCallback, useMemo, memo, useId } from 'react'
import SectionBadge from "../../ui/SectionBadge"
import GradientButton from "../../ui/GradientButton"


// 🔑 Configuration EmailJS - REMPLACE PAR TES VRAIES CLÉS
const EMAILJS_CONFIG = {
  publicKey: 'KrsymJ5Qb52JA8aPa',      // ⚠️ À remplacer
  serviceId: 'service_qoqkqpi',      // ⚠️ À remplacer
  templateId: 'template_ncs45pe'     // ⚠️ À remplacer
}

// 📧 VERSION DEBUG - Pour voir ce qui est envoyé
const sendQuoteEmail = async (formData) => {
  try {
    // 🎨 Labels des produits en français
    const productLabels = {
      'crepe-box': 'Boite à crêpe',
      'pizza-box': 'Boite à pizza',
      'food-box': 'Boite alimentaire',
      'custom-cup': 'Gobelet personnalisé',
      'kraft-bag': 'Sac kraft',
      'plastic-bag': 'Sac plastique',
      'food-container': 'Barquette alimentaire',
      'sandwich-wrap': 'Emballage sandwich',
      'pastry-box': 'Boite pâtisserie',
      'burger-box': 'Emballage burger'
    }

    const colorCountLabels = {
      '1': '1 couleur',
      '2': '2 couleurs',
      '3': '3 couleurs',
      '4': '4 couleurs',
      '5+': '+5 couleurs'
    }

const formattedBudget = formData.step3.budget 
  ? new Intl.NumberFormat('fr-DZ', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(formData.step3.budget) + ' DA'
  : 'Non spécifié'

const templateParams = {
  firstName: formData.step1.firstName,
  lastName: formData.step1.lastName,
  company: formData.step1.company,
  phone: formData.step1.phone,
  product: formData.step2.customDimensions 
    ? `Dimensions personnalisées: ${formData.step2.customDimensions.length}mm x ${formData.step2.customDimensions.width}mm x ${formData.step2.customDimensions.height}mm`
    : productLabels[formData.step2.product] || formData.step2.product,
  colorCount: colorCountLabels[formData.step2.colorCount] || formData.step2.colorCount,
  primaryColor: formData.step2.primaryColor,
  quantity: formData.step3.quantity,
  budget: formattedBudget
}

    // 🐛 AFFICHE LES DONNÉES DANS LA CONSOLE
    console.log('📧 Données envoyées à EmailJS:')
    console.log('Config:', EMAILJS_CONFIG)
    console.log('Template Params:', templateParams)

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    )

    console.log('✅ Succès:', response)
    return { success: true, response }
  } catch (error) {
    console.error('❌ Erreur complète:', error)
    console.error('Status:', error.status)
    console.error('Text:', error.text)
    return { success: false, error }
  }
}

// ✅ Toast personnalisé en BAS À DROITE avec animation améliorée
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
      bottom="20px" // ✅ En bas au lieu d'en haut
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
          animation="slideInUp 0.4s ease-out" // ✅ Animation du bas vers le haut
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

// ✅ Composant Step Indicator avec bg footerBg et bordures
const StepIndicator = memo(({ stepNumber, isActive, isCompleted }) => {
  return (
    <Circle
      size={{ base: "40px", md: "50px" }}
      bg={isActive ? "white" : "footerBg"}
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="transparent"
      color={isActive ? "primary" : isCompleted ? "fg" : "textSecondary"}
      fontWeight="600"
      fontSize={{ base: "md", md: "lg" }}
      position="relative"
      flexShrink={0}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px",
        borderRadius: "50%",
        background: "linear-gradient(45deg, rgba(243, 146, 0, 0.1) 0%, #EA5C16 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
      transition="all 0.2s ease"
    >
      {stepNumber}
    </Circle>
  )
})
StepIndicator.displayName = 'StepIndicator'

// ✅ Composant Stepper Header responsive pour petits écrans
const StepperHeader = memo(({ currentStep, totalSteps }) => {
  const steps = useMemo(() => Array.from({ length: totalSteps }, (_, i) => i + 1), [totalSteps])
  
  return (
    <HStack 
      justify="center" 
      spacing={{ base: 4, md: 8 }}
      mb={8}
      h={{ base: "40px", md: "50px" }}
      align="center"
      px={{ base: 2, md: 0 }}
    >
      {steps.map((step, index) => (
        <HStack key={step} spacing={0} align="center">
          <StepIndicator
            stepNumber={step}
            isActive={currentStep === step}
            isCompleted={currentStep > step}
          />
          {index < steps.length - 1 && (
            <Box
              w={{ base: "30px", sm: "45px", md: "60px" }}
              h="2px"
              bg={currentStep > step ? "primary" : "rgba(243, 146, 0, 0.3)"}
              mx={{ base: 2, md: 4 }}
              transition="background-color 0.2s ease"
              flexShrink={0}
            />
          )}
        </HStack>
      ))}
    </HStack>
  )
})
StepperHeader.displayName = 'StepperHeader'

// ✅ Composant Input optimisé avec Field v3
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

// ✅ Composant Combobox Chakra UI v3.27.0
const OptimizedCombobox = memo(({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  options,
  error,
  onErrorClear,
  required = false
}) => {
  const fieldId = useId()

  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({
    initialItems: options,
    filter: contains,
  })

  const handleValueChange = useCallback((details) => {
    const selectedValue = details.value?.[0] || ''
    onChange(selectedValue)
    
    if (error && selectedValue) {
      onErrorClear(id)
    }
  }, [onChange, onErrorClear, error, id])

  const handleInputChange = useCallback((e) => {
    filter(e.inputValue)
  }, [filter])

  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label 
        fontSize="sm"
        fontWeight="600" 
        color="textSecondary"
        mb={2}
        htmlFor={fieldId}
      >
        {label}
        {required && <Field.RequiredIndicator color="red.500" ml={1} />}
      </Field.Label>
      
      <Combobox.Root
        collection={collection}
        onValueChange={handleValueChange}
        onInputValueChange={handleInputChange}
        value={value ? [value] : []}
        openOnClick={true}
        width="100%"
      >
        <Combobox.Control
          bg="footerBg"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="primary"
          borderRadius="8px"
          h="48px"
          _focusWithin={{
            borderColor: "primary",
          }}
        >
          <Combobox.Input 
            placeholder={placeholder}
            bg="transparent"
            border="none"
            color="fg"
            _placeholder={{ color: "textSecondary" }}
            h="46px"
            _focus={{ outline: "none", boxShadow: "none" }}
          />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger color="textSecondary" />
            <Combobox.Trigger color="textSecondary" />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content
              bg="footerBg"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="primary"
              borderRadius="8px"
              maxH="200px"
              overflowY="auto"
              zIndex={1000}
            >
              <Combobox.Empty p={3} color="textSecondary" fontSize="sm">
                Aucun produit trouvé
              </Combobox.Empty>
              {collection.items.map((item) => (
                <Combobox.Item 
                  key={item.value} 
                  item={item}
                  p={3}
                  color="fg"
                  _hover={{ bg: "primary" }}
                  _selected={{ bg: "primary", color: "white" }}
                  cursor="pointer"
                >
                  {item.label}
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>
      
      {error && (
        <Field.ErrorText fontSize="xs" color="red.500" mt={1} minH="16px">
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
})
OptimizedCombobox.displayName = 'OptimizedCombobox'

// ✅ Composant Select Chakra UI v3.27.0
const OptimizedSelect = memo(({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  options,
  error,
  onErrorClear,
  required = false
}) => {
  const fieldId = useId()
  
  const collection = useMemo(() => 
    createListCollection({ items: options }), 
    [options]
  )

  const handleValueChange = useCallback((details) => {
    const selectedValue = details.value?.[0] || ''
    onChange(selectedValue)
    
    if (error && selectedValue) {
      onErrorClear(id)
    }
  }, [onChange, onErrorClear, error, id])
  
  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label 
        fontSize="sm"
        fontWeight="600" 
        color="textSecondary"
        mb={2}
        htmlFor={fieldId}
      >
        {label}
        {required && <Field.RequiredIndicator color="red.500" ml={1} />}
      </Field.Label>
      
      <Box
        bg="footerBg"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="primary"
        borderRadius="8px"
        h="48px"
        width="100%"
        position="relative"
        _hover={{
          borderColor: "primary"
        }}
        _focusWithin={{
          borderColor: "primary",
        }}
      >
        <Select.Root
          collection={collection}
          onValueChange={handleValueChange}
          value={value ? [value] : []}
          size="md"
          width="100%"
        >
          <Select.HiddenSelect />
          <Select.Control
            bg="transparent"
            border="none"
            borderRadius="8px"
            h="48px"
            _focusWithin={{
              boxShadow: "none"
            }}
          >
            <Select.Trigger
              border="none"
              bg="transparent"
            >
              <Select.ValueText 
                placeholder={placeholder}
                color="fg"
                _placeholder={{ color: "textSecondary" }}
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator color="textSecondary" />
            </Select.IndicatorGroup>
          </Select.Control>

          <Portal>
            <Select.Positioner>
              <Select.Content
                bg="footerBg"
                backdropFilter="blur(12px)"
                border="1px solid"
                borderColor="primary"
                borderRadius="8px"
                zIndex={1000}
              >
                {options.map((option) => (
                  <Select.Item 
                    key={option.value} 
                    item={option}
                    p={3}
                    color="fg"
                    _hover={{ bg: "primary" }}
                    _selected={{ bg: "primary", color: "white" }}
                    cursor="pointer"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>
      
      {error && (
        <Field.ErrorText fontSize="xs" color="red.500" mt={1} minH="16px">
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
})
OptimizedSelect.displayName = 'OptimizedSelect'

// ✅ Composant ColorPicker SIMPLIFIÉ avec input color HTML natif
const OptimizedColorPicker = memo(({ 
  id, 
  label, 
  value, 
  onChange, 
  error,
  onErrorClear,
  required = false
}) => {
  const fieldId = useId()

  const handleInputChange = useCallback((e) => {
    const colorValue = e.target.value
    onChange(colorValue)
    
    if (error && colorValue) {
      onErrorClear(id)
    }
  }, [onChange, onErrorClear, error, id])

  const handleColorChange = useCallback((e) => {
    const colorValue = e.target.value
    onChange(colorValue)
    
    if (error && colorValue) {
      onErrorClear(id)
    }
  }, [onChange, onErrorClear, error, id])

  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label 
        fontSize="sm"
        fontWeight="600" 
        color="textSecondary"
        mb={2}
        htmlFor={fieldId}
      >
        {label}
        {required && <Field.RequiredIndicator color="red.500" ml={1} />}
      </Field.Label>
      
      <HStack spacing={3} align="center">
        <Input
          id={fieldId}
          type="text"
          value={value || '#EB5E41'}
          onChange={handleInputChange}
          placeholder="#EB5E41"
          bg="footerBg"
          backdropFilter="blur(12px)"
          border="1px solid"
          borderColor="primary"
          borderRadius="8px"
          color="fg"
          h="48px"
          w="120px"
          _focus={{
            borderColor: "primary",
            boxShadow: "none"
          }}
        />
        
        <Input
          type="color"
          value={value || '#EB5E41'}
          onChange={handleColorChange}
          w="48px"
          h="48px"
          p={0}
          border="2px solid"
          borderColor="primary"
          borderRadius="6px"
          cursor="pointer"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s ease"
          sx={{
            '&::-webkit-color-swatch-wrapper': {
              padding: 0,
            },
            '&::-webkit-color-swatch': {
              border: 'none',
              borderRadius: '4px',
            }
          }}
        />
        
        <Text fontSize="sm" color="textSecondary">
          Couleur principale
        </Text>
      </HStack>
      
      {error && (
        <Field.ErrorText fontSize="xs" color="red.500" mt={1} minH="16px">
          {error}
        </Field.ErrorText>
      )}
    </Field.Root>
  )
})
OptimizedColorPicker.displayName = 'OptimizedColorPicker'


// ✅ Modal personnalisé pour les dimensions
const DimensionsModal = memo(({ isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation()
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: ''
  })

  const handleInputChange = useCallback((field) => (e) => {
    setDimensions(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }, [])

const handleConfirm = useCallback(() => {
  // ✅ Validation basique
  if (!dimensions.length || !dimensions.width || !dimensions.height) {
    console.warn('Toutes les dimensions sont requises')
    return
  }

  // ✅ Sauvegarder les dimensions et fermer
  onConfirm(dimensions)
  setDimensions({ length: '', width: '', height: '' })
  onClose()
}, [dimensions, onClose, onConfirm])

  const handleCancel = useCallback(() => {
    setDimensions({ length: '', width: '', height: '' })
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.6)"
      backdropFilter="blur(8px)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      onClick={onClose}
    >
      <Box
        bg="bg"
        border="1px solid"
        borderColor="primary"
        borderRadius="16px"
        p={{ base: 4, md: 6 }}
        maxW="500px"
        w="100%"
        onClick={(e) => e.stopPropagation()}
      >
        <Text 
          fontSize="lg" 
          fontWeight="600" 
          color="fg" 
          mb={6} 
          textAlign="center"
        >
          {t('quote.dimensionsModal.title')}
        </Text>

        <HStack spacing={4} mb={6} align="flex-start">
          {/* Longueur */}
          <Box flex={1}>
            <Text 
              fontSize="sm" 
              fontWeight="600" 
              color="textSecondary" 
              mb={2}
            >
              {t('quote.dimensionsModal.length')}
            </Text>
            <Input
              type="number"
              placeholder="0"
              value={dimensions.length}
              onChange={handleInputChange('length')}
              bg="footerBg"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="primary"
              borderRadius="8px"
              h="48px"
              color="fg"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "primary",
                outline: "none"
              }}
              textAlign="center"
            />
            <Text 
              fontSize="xs" 
              color="textSecondary" 
              mt={1} 
              textAlign="center"
            >
              mm
            </Text>
          </Box>

          {/* Largeur */}
          <Box flex={1}>
            <Text 
              fontSize="sm" 
              fontWeight="600" 
              color="textSecondary" 
              mb={2}
            >
              {t('quote.dimensionsModal.width')}
            </Text>
            <Input
              type="number"
              placeholder="0"
              value={dimensions.width}
              onChange={handleInputChange('width')}
              bg="footerBg"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="primary"
              borderRadius="8px"
              h="48px"
              color="fg"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "primary",
                outline: "none"
              }}
              textAlign="center"
            />
            <Text 
              fontSize="xs" 
              color="textSecondary" 
              mt={1} 
              textAlign="center"
            >
              mm
            </Text>
          </Box>

          {/* Hauteur */}
          <Box flex={1}>
            <Text 
              fontSize="sm" 
              fontWeight="600" 
              color="textSecondary" 
              mb={2}
            >
              {t('quote.dimensionsModal.height')}
            </Text>
            <Input
              type="number"
              placeholder="0"
              value={dimensions.height}
              onChange={handleInputChange('height')}
              bg="footerBg"
              backdropFilter="blur(12px)"
              border="1px solid"
              borderColor="primary"
              borderRadius="8px"
              h="48px"
              color="fg"
              _placeholder={{ color: "textSecondary" }}
              _focus={{
                borderColor: "primary",
                outline: "none"
              }}
              textAlign="center"
            />
            <Text 
              fontSize="xs" 
              color="textSecondary" 
              mt={1} 
              textAlign="center"
            >
              mm
            </Text>
          </Box>
        </HStack>

        {/* Boutons alignés à droite */}
        <HStack spacing={3} justify="flex-end">
          <Box
            as="button"
            onClick={handleCancel}
            px={6}
            py={2}
            h="48px"
            bg="transparent"
            border="1px solid"
            borderColor="fg"
            color="fg"
            borderRadius="8px"
            fontSize="md"
            fontWeight="600"
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{
              bg: "fg",
              color: "bg"
            }}
          >
            {t('quote.dimensionsModal.cancel')}
          </Box>
          
          <GradientButton
            onClick={handleConfirm}
            size="md"
          >
            {t('quote.dimensionsModal.confirm')}
          </GradientButton>
        </HStack>
      </Box>
    </Box>
  )
})
DimensionsModal.displayName = 'DimensionsModal'




// ✅ Slider SIMPLE avec bordures comme circles [attached_image:2]
const SimpleSlider = memo(({ 
  min, 
  max, 
  step, 
  value, 
  onChange, 
  formatValue 
}) => {
  const handleChange = useCallback((e) => {
    const newValue = parseInt(e.target.value)
    onChange(newValue)
  }, [onChange])

  // ✅ Calcul du pourcentage pour la barre de progression
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <Box position="relative" w="100%">
      {/* ✅ Track du slider avec bg footerBg et bordures */}
      <Box
        position="relative"
        h="8px"
        bg="footerBg"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="primary"
        borderRadius="8px"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          padding: "1px",
          borderRadius: "8px",
          background: "linear-gradient(90deg, rgba(243, 146, 0, 0.1) 0%, #EA5C16 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      >
        {/* ✅ Barre de progression */}
        <Box
          position="absolute"
          left={0}
          top={0}
          h="100%"
          w={`${percentage}%`}
          bg="primary"
          borderRadius="8px"
          transition="width 0.2s ease"
        />
      </Box>

      {/* ✅ Input range invisible par-dessus */}
      <Input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        position="absolute"
        top="-4px"
        left={0}
        w="100%"
        h="16px"
        opacity={0}
        cursor="pointer"
        sx={{
          '&::-webkit-slider-thumb': {
            appearance: 'none',
            w: '20px',
            h: '20px',
            bg: 'fg',
            border: '2px solid',
            borderColor: 'primary',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: 1,
            transition: 'transform 0.2s ease',
            _hover: { transform: 'scale(1.1)' }
          },
          '&::-moz-range-thumb': {
            appearance: 'none',
            w: '20px',
            h: '20px',
            bg: 'fg',
            border: '2px solid',
            borderColor: 'primary',
            borderRadius: '50%',
            cursor: 'pointer',
          }
        }}
      />

      {/* ✅ Thumb visible avec couleur fg */}
      <Box
        position="absolute"
        top="50%"
        left={`${percentage}%`}
        transform="translate(-50%, -50%)"
        w="20px"
        h="20px"
        bg="fg"
        border="2px solid"
        borderColor="primary"
        borderRadius="50%"
        pointerEvents="none"
        transition="left 0.2s ease"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      />
    </Box>
  )
})
SimpleSlider.displayName = 'SimpleSlider'

// ✅ Composant Step 1 avec effacement d'erreurs temps réel
const Step1PersonalInfo = memo(({ formData, updateFormData, errors, clearFieldError }) => {
  const { t } = useTranslation()

  const handleInputChange = useCallback((field) => (e) => {
    updateFormData('step1', { 
      ...formData.step1, 
      [field]: e.target.value 
    })
  }, [formData.step1, updateFormData])

  const fields = useMemo(() => [
    {
      id: 'firstName',
      label: t('quote.step1.firstName'),
      placeholder: t('quote.step1.firstNamePlaceholder'),
      value: formData.step1?.firstName || '',
      required: true
    },
    {
      id: 'lastName', 
      label: t('quote.step1.lastName'),
      placeholder: t('quote.step1.lastNamePlaceholder'),
      value: formData.step1?.lastName || '',
      required: true
    },
    {
      id: 'company',
      label: t('quote.step1.company'),
      placeholder: t('quote.step1.companyPlaceholder'),
      value: formData.step1?.company || '',
      required: true
    },
    {
      id: 'phone',
      label: t('quote.step1.phone'),
      placeholder: t('quote.step1.phonePlaceholder'),
      value: formData.step1?.phone || '',
      required: true,
      type: 'tel'
    }
  ], [t, formData.step1])

  return (
    <VStack spacing={6} align="stretch">
      <Box h="32px" display="flex" alignItems="center" justifyContent="center">
        <Text
          fontSize="xl"
          fontWeight="600"
          color="fg"
          textAlign="center"
        >
          {t('quote.step1.title')}
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={4}
        minH="240px"
      >
        {fields.map((field) => (
          <OptimizedField
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            value={field.value}
            onChange={handleInputChange(field.id)}
            error={errors.step1?.[field.id]}
            onErrorClear={clearFieldError}
            required={field.required}
            type={field.type}
          />
        ))}
      </Box>
    </VStack>
  )
})
Step1PersonalInfo.displayName = 'Step1PersonalInfo'

// ✅ Composant Step 2 - Détails du projet
const Step2ProjectDetails = memo(({ formData, updateFormData, errors, clearFieldError }) => {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)

const handleOpenModal = useCallback(() => {
  setIsModalOpen(true)
}, [])

const handleCloseModal = useCallback(() => {
  setIsModalOpen(false)
}, [])

const handleModalConfirm = useCallback((dimensions) => {
  // ✅ Sauvegarder les dimensions dans le formData
  updateFormData('step2', { 
    ...formData.step2, 
    customDimensions: dimensions
  })
}, [formData.step2, updateFormData])

  const productOptions = useMemo(() => [
    { label: 'Boite à crêpe', value: 'crepe-box' },
    { label: 'Boite à pizza', value: 'pizza-box' },
    { label: 'Boite alimentaire', value: 'food-box' },
    { label: 'Gobelet personnalisé', value: 'custom-cup' },
    { label: 'Sac kraft', value: 'kraft-bag' },
    { label: 'Sac plastique', value: 'plastic-bag' },
    { label: 'Barquette alimentaire', value: 'food-container' },
    { label: 'Emballage sandwich', value: 'sandwich-wrap' },
    { label: 'Boite pâtisserie', value: 'pastry-box' },
    { label: 'Emballage burger', value: 'burger-box' }
  ], [])

  const colorCountOptions = useMemo(() => [
    { label: '1 couleur', value: '1' },
    { label: '2 couleurs', value: '2' },
    { label: '3 couleurs', value: '3' },
    { label: '4 couleurs', value: '4' },
    { label: '+5 couleurs', value: '5+' }
  ], [])

  const handleProductChange = useCallback((value) => {
    updateFormData('step2', { 
      ...formData.step2, 
      product: value 
    })
  }, [formData.step2, updateFormData])

  const handleColorCountChange = useCallback((value) => {
    updateFormData('step2', { 
      ...formData.step2, 
      colorCount: value 
    })
  }, [formData.step2, updateFormData])

  const handlePrimaryColorChange = useCallback((value) => {
    updateFormData('step2', { 
      ...formData.step2, 
      primaryColor: value 
    })
  }, [formData.step2, updateFormData])

  return (
    <VStack spacing={6} align="stretch">
      <Box h="32px" display="flex" alignItems="center" justifyContent="center">
        <Text
          fontSize="xl"
          fontWeight="600"
          color="fg"
          textAlign="center"
        >
          {t('quote.step2.title')}
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        minH="120px"
      >
        <OptimizedCombobox
          id="product"
          label={t('quote.step2.product')}
          placeholder={t('quote.step2.productPlaceholder')}
          value={formData.step2?.product || ''}
          onChange={handleProductChange}
          options={productOptions}
          error={errors.step2?.product}
          onErrorClear={clearFieldError}
          required={!formData.step2?.customDimensions}
        />

        <OptimizedSelect
          id="colorCount"
          label={t('quote.step2.colorCount')}
          placeholder={t('quote.step2.colorCountPlaceholder')}
          value={formData.step2?.colorCount || ''}
          onChange={handleColorCountChange}
          options={colorCountOptions}
          error={errors.step2?.colorCount}
          onErrorClear={clearFieldError}
          required={true}
        />
      </Box>

      <Box>
        <OptimizedColorPicker
          id="primaryColor"
          label={t('quote.step2.primaryColor')}
          value={formData.step2?.primaryColor || '#EB5E41'}
          onChange={handlePrimaryColorChange}
          error={errors.step2?.primaryColor}
          onErrorClear={clearFieldError}
          required={false}
        />
      </Box>


<Box textAlign="center" mt={3}>
  <Text fontSize="sm" color="textSecondary">
    {t('quote.step2.notFound')}{' '}
    <Text
      as="span"
      color="primary"
      fontWeight="600"
      cursor="pointer"
      textDecoration="underline"
      onClick={handleOpenModal}
      _hover={{ opacity: 0.8 }}
    >
      {t('quote.step2.clickHere')}
    </Text>
  </Text>
</Box>

<DimensionsModal 
  isOpen={isModalOpen} 
  onClose={handleCloseModal}
  onConfirm={handleModalConfirm}
/>
    </VStack>
  )
})
Step2ProjectDetails.displayName = 'Step2ProjectDetails'

// ✅ Composant Step 3 - Quantité & Budget avec slider simplifié
// ✅ Composant Step 3 - Quantité & Budget SANS slider
const Step3QuantityBudget = memo(({ formData, updateFormData, errors, clearFieldError }) => {
  const { t } = useTranslation()

  const handleQuantityChange = useCallback((e) => {
    updateFormData('step3', { 
      ...formData.step3, 
      quantity: e.target.value 
    })
  }, [formData.step3, updateFormData])

  const handleBudgetChange = useCallback((e) => {
    updateFormData('step3', { 
      ...formData.step3, 
      budget: e.target.value 
    })
  }, [formData.step3, updateFormData])

  return (
    <VStack spacing={6} align="stretch">
      <Box h="32px" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="xl" fontWeight="600" color="fg" textAlign="center">
          {t('quote.step3.title')}
        </Text>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        minH="200px"
      >
        {/* ✅ Input quantité */}
        <OptimizedField
          id="quantity"
          label={t('quote.step3.quantity')}
          placeholder={t('quote.step3.quantityPlaceholder')}
          value={formData.step3?.quantity || ''}
          onChange={handleQuantityChange}
          error={errors.step3?.quantity}
          onErrorClear={clearFieldError}
          required={true}
          type="number"
        />

        {/* ✅ Input budget (comme quantité) */}
        <OptimizedField
          id="budget"
          label={t('quote.step3.budget')}
          placeholder="Ex: 500000"
          value={formData.step3?.budget || ''}
          onChange={handleBudgetChange}
          error={errors.step3?.budget}
          onErrorClear={clearFieldError}
          required={true}
          type="number"
        />
      </Box>
    </VStack>
  )
})

Step3QuantityBudget.displayName = 'Step3QuantityBudget'

// ✅ Composant principal avec toast en bas à droite et bouton responsive
export default function QuoteForm() {
  const { t } = useTranslation()
  const { showToast, ToastContainer } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [customDimensions, setCustomDimensions] = useState(null)
  const [formData, setFormData] = useState({
    step1: {
      firstName: '',
      lastName: '',
      company: '',
      phone: ''
    },
    step2: {
      product: '',
      colorCount: '',
      primaryColor: '#EB5E41'
    },
    step3: {
      quantity: '',
      budget: ''
    }
  })
  const [errors, setErrors] = useState({})

  const updateFormData = useCallback((step, data) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }))
  }, [])

  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => ({
      ...prev,
      [`step${currentStep}`]: {
        ...prev[`step${currentStep}`],
        [fieldName]: undefined
      }
    }))
  }, [currentStep])

  // ✅ Validation avec step 3
  const validateCurrentStep = useCallback(() => {
    const currentStepData = formData[`step${currentStep}`]
    const stepErrors = {}

    if (currentStep === 1) {
      if (!currentStepData?.firstName?.trim()) {
        stepErrors.firstName = t('quote.validation.required')
      }
      if (!currentStepData?.lastName?.trim()) {
        stepErrors.lastName = t('quote.validation.required')
      }
      if (!currentStepData?.company?.trim()) {
        stepErrors.company = t('quote.validation.required')
      }
      if (!currentStepData?.phone?.trim()) {
        stepErrors.phone = t('quote.validation.required')
      } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(currentStepData.phone)) {
        stepErrors.phone = t('quote.validation.invalidPhone')
      }
    }

if (currentStep === 2) {
  // ✅ Le produit est obligatoire SAUF si des dimensions custom sont définies
  if (!currentStepData?.customDimensions && !currentStepData?.product?.trim()) {
    stepErrors.product = t('quote.validation.required')
  }
  if (!currentStepData?.colorCount?.trim()) {
    stepErrors.colorCount = t('quote.validation.required')
  }
}

if (currentStep === 3) {
  if (!currentStepData?.quantity?.trim()) {
    stepErrors.quantity = t('quote.validation.required')
  } else if (!/^\d+$/.test(currentStepData.quantity) || parseInt(currentStepData.quantity) <= 0) {
    stepErrors.quantity = t('quote.validation.invalidQuantity')
  }

  // ✅ Validation du budget
  if (!currentStepData?.budget) {
    stepErrors.budget = t('quote.validation.required')
  } else if (!/^\d+$/.test(currentStepData.budget.toString()) || parseInt(currentStepData.budget) <= 0) {
    stepErrors.budget = 'Le budget doit être un nombre positif'
  }
}

    setErrors(prev => ({
      ...prev,
      [`step${currentStep}`]: stepErrors
    }))

    return Object.keys(stepErrors).length === 0
  }, [currentStep, formData, t])

  // ✅ Handler pour soumission finale avec toast en bas à droite
const handleSubmitQuote = useCallback(async () => {
  if (validateCurrentStep()) {
    // 📧 Envoi de l'email via EmailJS
    const emailResult = await sendQuoteEmail(formData)

    if (emailResult.success) {
      showToast({
        title: t('quote.success.title'),
        description: t('quote.success.description'),
        type: 'success',
        duration: 3000
      })

      // ✅ Reset formulaire après 1 seconde
      setTimeout(() => {
        setFormData({
          step1: { firstName: '', lastName: '', company: '', phone: '' },
          step2: { product: '', colorCount: '', primaryColor: '#EB5E41' },
          step3: { quantity: '', budget: '' }
        })
        setErrors({})
        setCurrentStep(1)
      }, 1000)
    } else {
      // ❌ Gestion d'erreur
      showToast({
        title: 'Erreur',
        description: "Impossible d'envoyer le devis. Réessayez plus tard.",
        type: 'error',
        duration: 5000
      })
    }
  }
}, [validateCurrentStep, showToast, t, formData])

  const handleNext = useCallback(() => {
    if (currentStep === 3) {
      handleSubmitQuote()
    } else if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }, [currentStep, validateCurrentStep, handleSubmitQuote])

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }, [])

  const translations = useMemo(() => ({
    badge: t('quote.badge'),
    title: t('quote.title'),
    description: t('quote.description'),
    nextButton: currentStep === 3 ? t('quote.submitButton') : t('quote.nextButton'),
    previousButton: t('quote.previousButton')
  }), [t, currentStep])

  const renderCurrentStep = useMemo(() => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            clearFieldError={clearFieldError}
          />
        )
      case 2:
        return (
          <Step2ProjectDetails
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            clearFieldError={clearFieldError}
          />
        )
      case 3:
        return (
          <Step3QuantityBudget
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            clearFieldError={clearFieldError}
          />
        )
      default:
        return null
    }
  }, [currentStep, formData, updateFormData, errors, clearFieldError])

  return (
    <>
      {/* ✅ Toast Container en BAS À DROITE */}
      <ToastContainer />
      
      <Box 
        as="section" 
        py={{ base: 10, md: 10 }}
        minH="600px"
      >
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
          >
            {translations.title}
          </Heading>

          <Text 
            fontSize={{ base: "md", md: "md" }}
            color="textSecondary"
            mb={6}
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
            minH={"500px"}
          >
            
            <StepperHeader currentStep={currentStep} totalSteps={3} />
            
            <Box mb={3} minH="320px">
              {renderCurrentStep}
            </Box>
            
            <HStack justify="space-between" pt={1} minH="48px" align="center">
              <Box>
                {currentStep > 1 && (
                  <GradientButton 
                    variant="outline" 
                    onClick={handlePrevious}
                    size={{ base: "sm", md: "md" }} // ✅ Plus petit sur mobile
                  >
                    {translations.previousButton}
                  </GradientButton>
                )}
              </Box>
              
              <GradientButton 
                onClick={handleNext}
                size={{ base: "xs", md: "md" }} // ✅ Plus petit sur mobile
                fontSize={{ base: "xs", md: "md" }} // ✅ Texte plus petit
                px={{ base: 4, md: 6 }} // ✅ Padding réduit sur mobile
              >
                {translations.nextButton}
              </GradientButton>
            </HStack>
            
          </Box>
          
        </Container>
      </Box>
    </>
  )
}
