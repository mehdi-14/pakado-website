import { useMemo, memo } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const PakadoLogoFooter = memo(({ language }) => {
  return (
    <RouterLink to={`/${language}`} className="footer-logo">
      <svg 
        width="180" 
        height="120" 
        viewBox="0 0 228 170" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M33.136 1.25794C32.0248 1.90209 29.8071 3.23683 28.2069 4.22547C26.6074 5.21329 19.9762 9.13688 13.4702 12.944C6.96423 16.7511 1.63579 20.1031 1.62852 20.3922C1.61154 21.1308 4.59944 22.9712 47.0604 48.3777C67.8319 60.8064 84.6715 71.227 84.4823 71.5356C84.2932 71.8443 77.0308 76.6523 68.3427 82.2201C59.6554 87.7887 52.5441 92.5836 52.54 92.8768C52.536 93.17 57.4635 96.4111 63.4911 100.08C69.5178 103.748 77.0478 108.364 80.224 110.337C83.4002 112.311 86.2774 113.925 86.6176 113.925C86.9579 113.925 94.8903 109.33 104.246 103.714L121.255 93.503L121.04 71.0609L120.825 48.6187L111.127 42.8701C105.793 39.7088 92.1546 31.7232 80.8196 25.1252C69.4847 18.5265 55.1279 10.1548 48.9145 6.52115C42.7018 2.88747 37.0647 -0.0466706 36.3874 0.000562361C35.711 0.0477953 34.2473 0.613776 33.136 1.25794ZM17.5944 53.079L0.0323278 63.0272L0.0161643 113.381L0 163.733L2.62664 162.148C4.07169 161.276 9.98122 157.895 15.7598 154.635C21.5384 151.375 27.3574 148.048 28.691 147.241C30.0245 146.435 32.2971 145.163 33.7422 144.415L36.3688 143.056V93.0657C36.3688 65.5713 36.0965 43.0876 35.7627 43.1031C35.4289 43.1185 27.254 47.6073 17.5944 53.079ZM77.3177 123.426C77.0211 123.724 76.7786 129.221 76.7786 135.641V147.314H80.3622C83.6612 147.314 83.9683 147.136 84.2358 145.074L84.5276 142.835L85.6316 145.074C86.5829 147.002 87.2238 147.314 90.244 147.314C92.1723 147.314 93.7507 147.083 93.7507 146.802C93.7507 146.52 92.6314 144.319 91.2631 141.909L88.7755 137.528L91.331 134.277L93.8865 131.026H90.0686C87.3805 131.026 85.9331 131.448 85.1774 132.451C84.2504 133.682 84.1001 133.126 84.0783 128.38L84.0524 122.883H80.9546C79.2501 122.883 77.6135 123.127 77.3177 123.426ZM121.768 123.426C121.472 123.724 121.229 125.599 121.229 127.592C121.229 130.903 121.079 131.177 119.485 130.757C116.87 130.068 112.448 132.261 111.526 134.705C110.117 138.439 110.577 142.128 112.781 144.767C114.774 147.153 115.059 147.232 121.671 147.232H128.503V135.057V122.883H125.405C123.701 122.883 122.064 123.127 121.768 123.426ZM148.708 137.948C148.708 150.797 148.887 153.014 149.92 153.014C150.954 153.014 151.133 150.797 151.133 137.948C151.133 125.099 150.954 122.883 149.92 122.883C148.887 122.883 148.708 125.099 148.708 137.948ZM40.4098 135.505V147.314H43.6426C46.86 147.314 46.8754 147.298 46.8754 144.149C46.8754 141.014 46.9117 140.978 50.5704 140.425C56.5398 139.523 59.1705 135.487 57.6995 129.49C56.7127 125.468 53.1009 123.7 45.8651 123.699L40.4098 123.697V135.505ZM175.142 124.945C169.938 126.87 167.173 129.29 167.453 131.675C167.669 133.51 168.417 133.995 173.358 135.508L179.015 137.239L173.762 137.732C162.67 138.773 153.557 143.456 153.557 148.114C153.557 155.877 171.081 154.801 180.485 146.46C183.647 143.655 183.975 143.528 183.923 145.133C183.849 147.385 187.021 148.004 189.069 146.137C190.351 144.967 190.611 144.961 191.525 146.072C192.765 147.577 194.883 147.676 196.319 146.296C196.902 145.736 196.247 147.322 194.864 149.823C192.081 154.855 191.696 157.473 193.629 158.22C195.448 158.924 195.583 158.867 195.583 157.399C195.583 155.98 200.089 149.431 202.709 147.042C203.753 146.09 204.499 145.882 204.845 146.446C205.636 147.735 208.591 147.496 210.218 146.012C211.532 144.814 211.789 144.847 213.47 146.424C215.948 148.75 219.767 147.387 225.689 142.061C227.733 140.223 228.874 137.66 227.178 138.716C226.776 138.967 226.621 138.493 226.837 137.663C227.251 136.067 225.216 133.444 223.611 133.506C221.527 133.587 218.12 135.679 214.574 139.055C212.524 141.008 210.719 142.474 210.563 142.313C210.407 142.152 212.413 139.088 215.023 135.505C217.632 131.922 219.781 128.742 219.798 128.437C219.843 127.638 217.422 125.326 216.539 125.326C216.126 125.326 215.788 125.818 215.788 126.42C215.788 127.863 209.809 136.8 207.192 139.266L205.136 141.206L206.589 138.644C207.813 136.487 207.873 135.875 206.968 134.776C205.671 133.201 204.474 133.079 204.474 134.522C204.474 135.1 202.928 137.044 201.039 138.842C195.524 144.089 194.178 144.756 197.534 140.579C200.561 136.81 200.61 136.646 199.206 135.082C197.475 133.155 196.392 133.011 196.392 134.709C196.392 136.036 189.937 143.524 189.324 142.906C189.123 142.703 190.662 140.131 192.746 137.189L196.534 131.841H201.716C207.867 131.841 208.594 130.495 202.857 129.728C200.635 129.431 198.816 128.894 198.816 128.537C198.816 127.683 196.464 125.326 195.613 125.326C195.249 125.326 194.742 126.162 194.488 127.185C194.186 128.396 193.098 129.319 191.37 129.832C188.69 130.627 187.332 133.171 189.026 134.227C190.211 134.964 187.838 138.356 186.136 138.356C185.437 138.356 183.73 137.656 182.344 136.801C180.958 135.947 178.187 134.829 176.187 134.318C170.21 132.791 170.252 132.818 171.659 131.4C174.075 128.966 184.269 125.31 184.269 126.878C184.269 127.301 182.723 129.136 180.834 130.956C177.913 133.771 177.654 134.267 179.098 134.275C181.839 134.289 186.258 130.832 186.535 128.455C187.051 124.027 181.909 122.443 175.142 124.945ZM50.5123 132.248C50.5123 133.317 49.8875 133.966 48.6938 134.137C47.2019 134.351 46.8754 134.011 46.8754 132.248C46.8754 130.485 47.2019 130.145 48.6938 130.359C49.8875 130.53 50.5123 131.179 50.5123 132.248ZM62.6158 131.346C57.3649 133.657 56.602 142.654 61.3526 146.248C62.0889 146.805 65.3055 147.217 68.8987 147.216L75.1622 147.213V139.12V131.026H71.1875C69.0014 131.026 66.7279 130.856 66.1363 130.648C65.5439 130.442 63.9598 130.755 62.6158 131.346ZM96.8526 131.115C92.1546 132.891 90.8429 141.292 94.6301 145.353C96.1883 147.025 97.1266 147.232 103.148 147.232H109.915V139.089V130.946L106.076 131.045C103.964 131.1 101.509 130.955 100.62 130.723C99.7314 130.492 98.0358 130.668 96.8526 131.115ZM134.97 131.118C131.043 132.713 129.311 135.115 129.311 138.967C129.311 144.112 132.553 147.314 137.763 147.314C142.343 147.314 145.113 145.593 146.283 142.021C148.589 134.981 141.73 128.371 134.97 131.118ZM69.028 138.052C69.601 139.557 68.2174 141.613 66.6317 141.613C65.4113 141.613 64.3082 138.767 65.0549 137.549C65.8478 136.256 68.4712 136.588 69.028 138.052ZM103.181 138.012C103.767 139.549 101.551 142.037 100.294 141.254C99.3176 140.646 99.0986 138.125 99.9472 137.27C100.915 136.294 102.681 136.699 103.181 138.012ZM121.229 137.948C122.032 138.923 122.032 139.417 121.229 140.391C119.827 142.093 118.2 141.915 117.595 139.992C116.638 136.955 119.217 135.505 121.229 137.948ZM139.669 138.959C139.358 141.681 136.951 142.428 136.198 140.038C135.522 137.891 136.263 136.727 138.303 136.727C139.595 136.727 139.873 137.181 139.669 138.959ZM180.221 140.811C177.521 145.894 156.79 153.575 156.79 149.491C156.79 145.899 170.495 139.401 178.438 139.228C180.855 139.175 181.015 139.317 180.221 140.811ZM185.369 141.206C185.113 141.878 184.761 142.427 184.586 142.427C184.412 142.427 184.269 141.878 184.269 141.206C184.269 140.534 184.621 139.984 185.052 139.984C185.482 139.984 185.625 140.534 185.369 141.206ZM223.062 141.19C223.062 141.598 216.984 144.87 216.225 144.87C215.985 144.87 215.788 144.539 215.788 144.133C215.788 143.728 217.334 142.858 219.223 142.2C221.112 141.542 222.749 140.957 222.86 140.901C222.971 140.845 223.062 140.975 223.062 141.19ZM51.1184 169.912C84.7903 170.029 139.889 170.029 173.56 169.912C207.232 169.794 179.682 169.698 112.339 169.698C44.9963 169.698 17.4473 169.794 51.1184 169.912Z" 
          fill="currentColor"
        />
      </svg>
    </RouterLink>
  );
});
PakadoLogoFooter.displayName = 'PakadoLogoFooter';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const footerData = useMemo(() => ({
    entreprise: [
      { label: t('navigation.home'), to: `/${i18n.language}`, type: 'link' },
      { label: t('navigation.about'), to: 'about', type: 'scroll' },
      { label: t('navigation.contact'), to: `/${i18n.language}/contact`, type: 'link' }
    ],
    contact: {
      phones: ['0770553975'],
      email: 'pakadostyle@gmail.com',
      address: t('footer.contact.address')
    },
    legal: [
      { label: t('footer.legal.terms'), to: '/' },
      { label: t('footer.legal.privacy'), to: '/' }
    ],
    social: [
      { label: 'Instagram', href: 'https://instagram.com/pakadostyle' },
      { label: 'Facebook', href: 'https://facebook.com/pakadostyle' },
      { label: 'Twitter', href: 'https://twitter.com/pakadostyle' },
      { label: 'Tik Tok', href: 'https://tiktok.com/@pakadostyle' }
    ]
  }), [t, i18n.language]);

  const sectionTitles = useMemo(() => ({
    company: t('footer.sections.company'),
    contact: t('footer.sections.contact'),
    legal: t('footer.sections.legal'),
    social: t('footer.sections.social')
  }), [t]);

  const copyrightText = useMemo(() => t('footer.copyright'), [t]);

  // Fonction pour gérer le scroll vers une section
  const handleScrollToSection = (sectionId) => {
    // Si on n'est pas sur la home, aller d'abord à la home
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
      // Si on est déjà sur la home, juste scroller
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

  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-container">
          
          <div className="footer-grid-main">
            
            {/* Logo */}
            <div className="footer-logo-section">
              <PakadoLogoFooter language={i18n.language} />
            </div>
            
            {/* Colonnes */}
            <div className="footer-columns">
              
              {/* Entreprise */}
              <div className="footer-column">
                <h3 className="footer-title">{sectionTitles.company}</h3>
                <ul className="footer-links">
                  {footerData.entreprise.map((item, index) => (
                    <li key={index}>
                      {item.type === 'scroll' ? (
                        <button
                          onClick={() => handleScrollToSection(item.to)}
                          className="footer-link"
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            padding: 0,
                            font: 'inherit',
                            textAlign: 'left'
                          }}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <RouterLink to={item.to} className="footer-link">
                          {item.label}
                        </RouterLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact */}
              <div className="footer-column footer-column-contact">
                <h3 className="footer-title">{sectionTitles.contact}</h3>
                <ul className="footer-links">
                  {footerData.contact.phones.map((phone, index) => (
                    <li key={index} className="footer-text">{phone}</li>
                  ))}
                  <li>
                    <a href={`mailto:${footerData.contact.email}`} className="footer-link">
                      {footerData.contact.email}
                    </a>
                  </li>
                  <li className="footer-text footer-address">
                    {footerData.contact.address}
                  </li>
                </ul>
              </div>
              
              {/* Légal */}
              <div className="footer-column footer-column-legal">
                <h3 className="footer-title">{sectionTitles.legal}</h3>
                <ul className="footer-links">
                  {footerData.legal.map((item, index) => (
                    <li key={index}>
                      <RouterLink to={item.to} className="footer-link">
                        {item.label}
                      </RouterLink>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Social */}
              <div className="footer-column footer-column-social">
                <h3 className="footer-title">{sectionTitles.social}</h3>
                <ul className="footer-links">
                  {footerData.social.map((item, index) => (
                    <li key={index}>
                      <a href={item.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>
          
          {/* Copyright */}
          <div className="footer-bottom">
            <hr className="footer-separator" />
            <p className="footer-copyright">{copyrightText}</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}