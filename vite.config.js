import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // ✅ Optimisations pour éliminer les violations
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      '@chakra-ui/react',
      '@emotion/react', 
      '@emotion/styled',
      'react-i18next',
      'i18next',
      'react-icons/fa',
      'swiper/react',
      'swiper/modules'
    ],
    exclude: ['bootstrap'], // ✅ Exclure si pas utilisé activement 
    force: true, // ✅ Force la re-optimisation au démarrage
    holdUntilCrawlEnd: true // ✅ Évite les reloads fréquents
  },

  // ✅ Configuration de développement optimisée
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: false // ✅ Réduit les interruptions visuelles
    },
    fs: {
      strict: false // ✅ Évite certains warnings de performance
    }
  },

  // ✅ Build optimisé pour la performance
  build: {
    target: 'esnext', // ✅ Cible les navigateurs modernes = build plus rapide
    sourcemap: false, // ✅ Pas de sourcemap en prod = plus rapide
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          chakra: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          swiper: ['swiper/react', 'swiper/modules'], // ✅ Chunk séparé pour Swiper
          i18n: ['react-i18next', 'i18next'],
          icons: ['react-icons/fa'] // ✅ Chunk séparé pour les icônes
        }
      }
    },
    
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // ✅ esbuild plus rapide que terser
    
    // ✅ Options esbuild optimisées
    esbuild: {
      drop: ['console', 'debugger'], // ✅ Supprime console.log en prod
      legalComments: 'none', // ✅ Supprime les commentaires légaux
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    },
    
    // ✅ CSS optimisé
    cssCodeSplit: true, // ✅ Split CSS en chunks séparés
    cssMinify: 'esbuild' // ✅ Minification CSS rapide
  },

  // ✅ Résolution des modules optimisée  
  resolve: {
    alias: {
      '@': '/src' // ✅ Évite les chemins relatifs longs
    }
  },

  preview: {
    port: 4173
  },

  // ✅ Configuration pour réduire les reflows
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
})
