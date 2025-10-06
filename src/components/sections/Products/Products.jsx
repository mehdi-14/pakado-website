import { 
  Box, 
  Container, 
  Heading, 
  Text,
  Grid,
  GridItem,
  Image,
  Button,
  useBreakpointValue
} from "@chakra-ui/react"
import { useState, useRef, useEffect, useCallback, useMemo, memo, startTransition } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import SectionBadge from "../../ui/SectionBadge"

// Import des styles Swiper
import 'swiper/css'
import 'swiper/css/pagination'

// ✅ Données des produits avec priority hints
const productsData = {
  alimentaires: [
    { id: 1, key: 'sandwich_box', image: "/images/about-pakado.webp", priority: true },
    { id: 2, key: 'pizza_box', image: "/images/about-pakado.webp" },
    { id: 3, key: 'burger_box', image: "/images/about-pakado.webp" },
    { id: 4, key: 'sushi_box', image: "/images/about-pakado.webp" },
    { id: 5, key: 'salad_box', image: "/images/about-pakado.webp" },
    { id: 6, key: 'pasta_box', image: "/images/about-pakado.webp" }
  ],
  barquettes: [
    { id: 7, key: 'plastic_container', image: "/images/about-pakado.webp", priority: true },
    { id: 8, key: 'cardboard_bowl', image: "/images/about-pakado.webp" },
    { id: 9, key: 'aluminum_container', image: "/images/about-pakado.webp" },
    { id: 10, key: 'soup_bowl', image: "/images/about-pakado.webp" }
  ],
  gobelets: [
    { id: 11, key: 'custom_cup', image: "/images/about-pakado.webp", priority: true },
    { id: 12, key: 'plastic_lid', image: "/images/about-pakado.webp" },
    { id: 13, key: 'cardboard_cup', image: "/images/about-pakado.webp" }
  ],
  sacs: [
    { id: 14, key: 'kraft_bag', image: "/images/about-pakado.webp", priority: true },
    { id: 15, key: 'plastic_bag', image: "/images/about-pakado.webp" },
    { id: 16, key: 'reusable_bag', image: "/images/about-pakado.webp" }
  ],
  accessoires: [
    { id: 17, key: 'custom_napkins', image: "/images/about-pakado.webp", priority: true },
    { id: 18, key: 'placemats', image: "/images/about-pakado.webp" },
    { id: 19, key: 'disposable_cutlery', image: "/images/about-pakado.webp" }
  ]
}

// ✅ Tabs optimisé avec performance et CLS prevention
const ScrollableTabs = memo(({ categories, activeTab, onTabChange }) => {
  const tabsRef = useRef([])
  const containerRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const animationFrameRef = useRef()
  const rafIdRef = useRef()

  // ✅ Optimisation INP: requestAnimationFrame avec startTransition
  const updateIndicatorPosition = useCallback(() => {
    if (!isDesktop) return

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const activeIndex = Object.keys(categories).indexOf(activeTab)
      const activeTabElement = tabsRef.current[activeIndex]
      
      if (activeTabElement && containerRef.current) {
        const { offsetLeft, offsetWidth } = activeTabElement
        
        startTransition(() => {
          setIndicatorStyle({
            left: offsetLeft,
            width: offsetWidth
          })
        })
      }
    })
  }, [isDesktop, activeTab, categories])

  // ✅ ResizeObserver optimisé
  useEffect(() => {
    if (!isDesktop || !containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      rafIdRef.current = requestAnimationFrame(updateIndicatorPosition)
    })

    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [isDesktop, updateIndicatorPosition])

  useEffect(() => {
    if (isDesktop) updateIndicatorPosition()
  }, [isDesktop, updateIndicatorPosition])

  // ✅ INP optimized click handler
  const handleTabClick = useCallback((category) => {
    startTransition(() => {
      onTabChange(category)
    })
  }, [onTabChange])

  return (
    <Box
      position="relative"
      bg="rgba(217, 217, 217, 0.1)"
      backdropFilter="blur(12px)"
      borderRadius="10px"
      border="1px solid"
      borderColor="transparent"
      overflow="hidden"
      willChange="transform" // ✅ CLS prevention
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px", 
        borderRadius: "10px",
        background: "linear-gradient(90deg, rgba(243, 146, 0, 0.1) 0%, #EA5C16 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
      py="0"
      px="0"
      mb={8}
    >
      {isDesktop && (
        <Box
          position="absolute"
          top="0"
          bg="primary"
          borderRadius="10px"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          zIndex={1}
          h="100%"
          willChange="transform, width" // ✅ CLS prevention
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            transform: 'translateZ(0)' // ✅ GPU acceleration
          }}
        />
      )}

      <Box
        ref={containerRef}
        display="flex"
        overflowX="auto"
        overflowY="hidden"
        gap={2}
        position="relative"
        zIndex={2}
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {Object.keys(categories).map((category, index) => (
          <Button
            key={category}
            ref={(el) => {
              tabsRef.current[index] = el
            }}
            size="md"
            variant="ghost"
            bg={
              isDesktop 
                ? "transparent"
                : (activeTab === category ? "primary" : "transparent")
            }
            color={activeTab === category ? "white" : "fg"}
            _hover={{ 
              bg: isDesktop 
                ? "none" 
                : (activeTab === category ? "primary" : "bgMuted")
            }}
            borderRadius="10px"
            px={6}
            py={6}
            fontSize="sm"
            fontWeight="500"
            whiteSpace="nowrap"
            flexShrink={0}
            onClick={() => handleTabClick(category)}
            transition={isDesktop ? "color 0.3s ease" : "all 0.2s ease"}
            position="relative"
            zIndex={3}
            willChange="background-color" // ✅ CLS prevention
          >
            {categories[category]}
          </Button>
        ))}
      </Box>
    </Box>
  )
})
ScrollableTabs.displayName = 'ScrollableTabs'

// ✅ ProductCard ULTRA-OPTIMISÉ - Simple et performant
const ProductCard = memo(({ product, priority = false }) => {
  const { t } = useTranslation()
  
  // ✅ Mémoriser les traductions
  const productName = useMemo(() => 
    t(`products.items.${product.key}.name`), 
    [t, product.key]
  )
  
  const productDescription = useMemo(() => 
    t(`products.items.${product.key}.description`), 
    [t, product.key]
  )
  
  return (
    <Box
      position="relative"
      bg="footerBg"
      backdropFilter="blur(12px)"
      borderRadius="16px"
      border="1px solid"
      borderColor="transparent"
      overflow="hidden"
      willChange="transform" // ✅ CLS prevention
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        padding: "1px",
        borderRadius: "16px",
        background: "linear-gradient(90deg, rgba(243, 146, 0, 0.1) 0%, rgba(234, 92, 22, 0.1) 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      transition="all 0.3s ease"
      h="350px" // ✅ Fixed height prevents CLS
      display="flex"
      flexDirection="column"
    >
      <Box p={4} h="100%" display="flex" flexDirection="column">
        
        <Box 
          position="relative" 
          h="200px" // ✅ Fixed height prevents CLS
          mb={4} 
          borderRadius="12px" 
          overflow="hidden"
        >
          <Image
            src={product.image}
            alt={productName}
            width={400} 
            height={300}
            w="100%"
            h="100%"
            objectFit="cover"
            loading={priority ? "eager" : "lazy"} // ✅ LCP optimization
            decoding={priority ? "sync" : "async"}
            fallback={
              <Box
                w="100%"
                h="100%"
                bg="linear-gradient(135deg, rgba(243, 146, 0, 0.1) 0%, rgba(234, 92, 22, 0.1) 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="12px"
              >
                <Text color="primary" fontSize="sm" textAlign="center">
                  {productName}
                </Text>
              </Box>
            }
          />
        </Box>

        <Box px={0} pb={4} flex="1" display="flex" flexDirection="column">
          <Heading 
            size="md" 
            mb={2} 
            color="fg" 
            fontFamily="body"
            fontSize="lg"
            lineHeight="1.2"
            minH="48px" 
            display="flex"
            alignItems="center"
          >
            {productName}
          </Heading>
          
          <Text 
            color="textSecondary" 
            fontSize="sm" 
            lineHeight="1.4"
            flex="1"
            overflow="hidden"
            display="-webkit-box"
            minH="60px" // ✅ Fixed height prevents CLS
            style={{
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical"
            }}
          >
            {productDescription}
          </Text>
        </Box>
      </Box>
    </Box>
  )
})
ProductCard.displayName = 'ProductCard'

// ✅ ProductsDisplay ULTRA-OPTIMISÉ avec RTL fix sans remount
const ProductsDisplay = memo(({ products, isDesktop, language }) => {
  const isRTL = useMemo(() => language === 'ar', [language])
  const [swiperKey, setSwiperKey] = useState(0)
  
  // ✅ Recréer le Swiper lors du changement de langue
  useEffect(() => {
    if (!isDesktop) {
      setSwiperKey(prev => prev + 1)
    }
  }, [language, isDesktop])

  // ✅ Config Swiper mémorisée - SANS rtl prop qui cause l'erreur
  const swiperConfig = useMemo(() => ({
    modules: [Pagination, Autoplay],
    spaceBetween: 20,
    loop: true,
    dir: isRTL ? 'rtl' : 'ltr', // ✅ Utiliser 'dir' au lieu de 'rtl'
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: isRTL
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 }
    }
  }), [isRTL])

  // ✅ CSS injection optimisée
  useEffect(() => {
    if (isDesktop) return

    const style = document.createElement('style')
    style.id = 'products-swiper-styles'
    style.innerHTML = `
      .products-swiper {
        direction: ${isRTL ? 'rtl' : 'ltr'};
      }
      
      .products-swiper .swiper-wrapper {
        direction: ${isRTL ? 'rtl' : 'ltr'};
      }
      
      .products-swiper .swiper-pagination {
        bottom: 10px !important;
        direction: ltr !important;
      }
      
      .products-swiper .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background: rgba(243, 146, 0, 0.3);
        opacity: 1;
        transition: all 0.3s ease;
      }
      
      .products-swiper .swiper-pagination-bullet-active {
        background: #F39200;
        transform: scale(1.2);
      }
      
      .products-swiper .swiper-pagination-bullet:hover {
        background: #EA5C16;
      }
    `
    
    // Remplacer l'ancien style
    const existingStyle = document.getElementById('products-swiper-styles')
    if (existingStyle) existingStyle.remove()
    document.head.appendChild(style)

    return () => {
      const styleToRemove = document.getElementById('products-swiper-styles')
      if (styleToRemove) styleToRemove.remove()
    }
  }, [isDesktop, isRTL])

  // ✅ Slides mémorisées
  const swiperSlides = useMemo(() => 
    products.map((product, index) => (
      <SwiperSlide key={product.id}>
        <ProductCard 
          product={product} 
          priority={index === 0}
        />
      </SwiperSlide>
    )), 
    [products]
  )

  if (isDesktop) {
    return (
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)"
        }}
        gap={6}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {products.map((product, index) => (
          <GridItem key={product.id}>
            <ProductCard 
              product={product} 
              priority={index < 3}
            />
          </GridItem>
        ))}
      </Grid>
    )
  }

  return (
    <Box 
      position="relative" 
      dir={isRTL ? 'rtl' : 'ltr'}
      willChange="transform"
    >
      <Swiper
        key={swiperKey}
        {...swiperConfig}
        style={{
          paddingBottom: '50px',
          direction: isRTL ? 'rtl' : 'ltr'
        }}
        className="products-swiper"
      >
        {swiperSlides}
      </Swiper>
    </Box>
  )
})
ProductsDisplay.displayName = 'ProductsDisplay'

// ✅ Composant principal optimisé
export default function Products() {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState('alimentaires')
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  // ✅ Mémoriser les catégories pour éviter re-création
  const categories = useMemo(() => ({
    alimentaires: t('products.categories.alimentaires'),
    barquettes: t('products.categories.barquettes'),
    gobelets: t('products.categories.gobelets'),
    sacs: t('products.categories.sacs'),
    accessoires: t('products.categories.accessoires')
  }), [t])

  // ✅ Mémoriser les produits actuels
  const currentProducts = useMemo(() => 
    productsData[activeTab] || [], 
    [activeTab]
  )

  // ✅ INP optimized tab change avec startTransition
  const handleTabChange = useCallback((newTab) => {
    startTransition(() => {
      setActiveTab(newTab)
    })
  }, [])

  return (
    <Box as="section" py={{ base: 10, md: 10 }}>
      <Container maxW="7xl">
        
        <SectionBadge centerAlign={true} variant="primary" size="md" mb={6}>
          {t('products.badge')}
        </SectionBadge>

        <Heading 
          as="h2" 
          size={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          color="fg"
          mb={6}
          lineHeight="1.2"
          fontFamily="body"
          textAlign="center"
        >
          <Text as="span" color="fg">
            {t('products.title')}{" "}
          </Text>
          <Text 
            as="span" 
            background="linear-gradient(90deg, #F39200 0%, #EA5C16 50%, #F39200 100%)"
            backgroundSize="200% 100%"
            bgClip="text"
            color="transparent"
            willChange="background-position" // ✅ CLS prevention
            animation="gradientMove 3s ease-in-out infinite"
            sx={{
              '@keyframes gradientMove': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' }
              }
            }}
          >
            {t('products.titleHighlight')}
          </Text>
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
          {t('products.description')}
        </Text>

        <ScrollableTabs 
          categories={categories}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        <ProductsDisplay 
          products={currentProducts}
          isDesktop={isDesktop}
          language={i18n.language} // ✅ Pass language pour RTL
        />
        
      </Container>
    </Box>
  )
}
