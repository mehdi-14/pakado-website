import { useEffect } from 'react'

// hooks/useSEO.jsx
export default function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/pakado-og.jpg',
  lang = 'fr',
  type = 'website'
}) {
  const siteUrl = 'https://pakado.com'
  
  return (
    <>
      {/* ✅ React 19 gère automatiquement le placement dans <head> */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={`${siteUrl}${canonical}`} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'ar_AR'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Canonical */}
      <link rel="canonical" href={`${siteUrl}${canonical}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pakado",
          "description": description,
          "url": siteUrl,
          "logo": `${siteUrl}/images/pakado-logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+33-770-55-39-75",
            "contactType": "Service Client"
          }
        })}
      </script>
    </>
  )
}
