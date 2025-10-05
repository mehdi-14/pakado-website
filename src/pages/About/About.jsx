import useSEO from '../../hooks/useSEO'

export default function About() {
  useSEO({
    title: 'À propos de Pakado - Expert Emballage Packaging France',
    description: 'Découvrez Pakado, spécialiste en solutions d\'emballage et packaging. Notre expertise au service des entreprises françaises depuis 10 ans.',
    keywords: 'pakado à propos, histoire pakado, expertise emballage, équipe packaging, entreprise française emballage',
    canonical: '/a-propos'
  })

  return (
    <div>
      <div className="container" style={{ padding: '80px 20px' }}>
        <h1 style={{ color: '#EA5C16', marginBottom: '16px', fontSize: '2.5rem' }}>
          À propos de Pakado
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '24px' }}>
          Expert français en solutions d'emballage et packaging sur-mesure 📦
        </p>
        
        <div className="row" style={{ marginTop: '40px' }}>
          <div className="col-md-6">
            <h2 style={{ color: '#EA5C16', fontSize: '1.75rem', marginBottom: '16px' }}>
              Notre Mission
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Pakado accompagne les entreprises dans leurs besoins d'emballage avec des solutions 
              personnalisées, écologiques et innovantes. Notre expertise couvre tous les secteurs 
              d'activité pour valoriser vos produits.
            </p>
            
            <h3 style={{ color: '#F39200', fontSize: '1.5rem', marginBottom: '12px' }}>
              Nos Valeurs
            </h3>
            <ul style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              <li>🌱 <strong>Écologie :</strong> Emballages durables et recyclables</li>
              <li>🎯 <strong>Qualité :</strong> Matériaux premium et finitions soignées</li>
              <li>⚡ <strong>Réactivité :</strong> Devis sous 24h, livraison rapide</li>
              <li>🤝 <strong>Proximité :</strong> Accompagnement personnalisé</li>
            </ul>
          </div>
          
          <div className="col-md-6">
            <h2 style={{ color: '#EA5C16', fontSize: '1.75rem', marginBottom: '16px' }}>
              Notre Expertise
            </h2>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#F39200', marginBottom: '8px' }}>Emballage Carton</h4>
              <p style={{ fontSize: '0.95rem' }}>
                Boîtes sur-mesure, présentoirs, étuis personnalisés
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#F39200', marginBottom: '8px' }}>Packaging Alimentaire</h4>
              <p style={{ fontSize: '0.95rem' }}>
                Emballages certifiés contact alimentaire, barquettes, sachets
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#F39200', marginBottom: '8px' }}>Solutions Écologiques</h4>
              <p style={{ fontSize: '0.95rem' }}>
                Matériaux biodégradables, emballages compostables
              </p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#F39200', marginBottom: '8px' }}>Impression & Design</h4>
              <p style={{ fontSize: '0.95rem' }}>
                Création graphique, impression haute qualité, finitions premium
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '40px', 
          borderRadius: '12px', 
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#EA5C16', marginBottom: '16px' }}>
            +10 ans d'expérience
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
            Plus de 1000 entreprises nous font confiance pour leurs solutions d'emballage
          </p>
          <a 
            href="/contact" 
            style={{
              backgroundColor: '#EA5C16',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'inline-block',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#d44a0c'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#EA5C16'}
          >
            Découvrir nos solutions 🚀
          </a>
        </div>
      </div>
    </div>
  )
}
