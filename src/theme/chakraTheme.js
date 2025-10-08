import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        pakado: {
          500: { value: "#EA5C16" },
          400: { value: "#F39200" },
          600: { value: "#D44B0A" },
        },
        dark: {
          900: { value: "#050404" },
        },
      },
      fonts: {
        heading: { value: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif" },
        body: { value: "'Urbanist', -apple-system, BlinkMacSystemFont, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        // ========== COULEURS DE BASE ==========
        bg: {
          DEFAULT: { 
            value: { _light: "#ffffff", _dark: "#050404" }
          },
        },
        fg: {
          DEFAULT: { 
            value: { _light: "#050404", _dark: "#ffffff" }
          },
        },
        mg: {
          DEFAULT: { 
            value: { _light: "#ffffffs", _dark: "#050404" }
          },
        },
        primary: {
          DEFAULT: { 
            value: { _light: "#EA5C16", _dark: "#EA5C16" }
          },
        },
        
        // ========== FOOTER COLORS ==========
        footerBg: {
          DEFAULT: { 
            value: { _light: "rgba(217, 217, 217, 0.1)", _dark: "rgba(234, 92, 22, 0.1)" }
          },
        },
        footerTitle: {
          DEFAULT: { 
            value: { _light: "#050404", _dark: "#ffffff" }
          },
        },
        footerLink: {
          DEFAULT: { 
            value: { _light: "#374151", _dark: "#d1d5db" }
          },
        },
        footerMuted: {
          DEFAULT: { 
            value: { _light: "#6b7280", _dark: "#9ca3af" }
          },
        },
        
        // ========== HEADER COLORS ==========
        headerBg: {
          DEFAULT: { 
            value: { _light: "rgba(217, 217, 217, 0.1)", _dark: "rgba(5, 4, 4, 0.1)" }
          },
        },
        navLink: {
          DEFAULT: { 
            value: { _light: "#050404", _dark: "#ffffff" }
          },
        },
        navLinkActive: {
          DEFAULT: { 
            value: { _light: "#EA5C16", _dark: "#EA5C16" }
          },
        },
        
        // ========== GÉNÉRAL ==========
        textSecondary: {
          DEFAULT: { 
            value: { _light: "#374151", _dark: "#d1d5db" }
          },
        },
        textMuted: {
          DEFAULT: { 
            value: { _light: "#6b7280", _dark: "#9ca3af" }
          },
        },
        border: {
          DEFAULT: { 
            value: { _light: "#e2e8f0", _dark: "#4a5568" }
          },
        },
        surface: {
          DEFAULT: { 
            value: { _light: "#ffffff", _dark: "#1a1a1a" }
          },
        },
        bgMuted: {
          DEFAULT: { 
            value: { _light: "#f7fafc", _dark: "#2d3748" }
          },
        },
        hover: {
          DEFAULT: { 
            value: { _light: "#F39200", _dark: "#F39200" }
          },
        },
        focus: {
          DEFAULT: { 
            value: { _light: "#EA5C16", _dark: "#EA5C16" }
          },
        },
        drawerBg: {
          DEFAULT: { 
            value: { _light: "#ffffff", _dark: "#050404" }
          },
        },
        backdrop: {
          DEFAULT: { 
            value: { _light: "rgba(0, 0, 0, 0.3)", _dark: "rgba(0, 0, 0, 0.5)" }
          },
        },
      },
    },
  },
  globalCss: {
    "html": {
      scrollBehavior: "smooth",
      colorScheme: "light dark",
    },
    "body": {
      fontFamily: "body",
      lineHeight: "1.6",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      bg: "bg",
      color: "fg",
      minHeight: "100vh",
      transition: "background-color 0.2s ease, color 0.2s ease",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
      fontWeight: "600",
      color: "fg",
    },
    "*:focus-visible": {
      outline: "2px solid",
      outlineColor: "focus",
      outlineOffset: "2px",
    },
    "*:focus:not(:focus-visible)": {
      outline: "none",
    },
  },
})

export const system = createSystem(defaultConfig, config)
export default system
