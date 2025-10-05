import { useState } from 'react'
import useSEO from '../../hooks/useSEO'


// tes composants

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    telephone: '',
    message: '',
    typeEmballage: 'carton'
  })

  useSEO({
    title: 'Contact Pakado - Devis Emballage Packaging Gratuit 24h',
    description: 'Contactez Pakado pour un devis personnalisé. Expert en emballage packaging, nous répondons sous 24h. Devis gratuit et sans engagement.',
    keywords: 'contact pakado, devis emballage gratuit, contact packaging, pakado téléphone, devis carton personnalisé',
    canonical: '/contact'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Intégrer avec votre système d'envoi (EmailJS, API, etc.)
    alert('Merci ! Nous vous répondons sous 24h. 🚀')
    console.log('Formulaire soumis:', formData)
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    marginBottom: '16px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#2D3748'
  }

  return (
    <div>
      <div className="container" style={{ padding: '80px 20px' }}>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="text-center" style={{ marginBottom: '40px' }}>
              <h1 style={{ color: '#EA5C16', marginBottom: '16px', fontSize: '2.5rem' }}>
                Contactez Pakado
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#4A5568' }}>
                Devis personnalisé gratuit sous 24h 📞
              </p>
            </div>

            <div className="row" style={{ marginBottom: '40px' }}>
              <div className="col-md-4 text-center" style={{ marginBottom: '24px' }}>
                <div style={{ 
                  backgroundColor: '#FEF2E8', 
                  padding: '24px', 
                  borderRadius: '12px',
                  height: '100%'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📞</div>
                  <h3 style={{ color: '#EA5C16', fontSize: '1.2rem', marginBottom: '8px' }}>
                    Téléphone
                  </h3>
                  <p style={{ fontSize: '1rem', margin: '0' }}>
                    +33 1 XX XX XX XX<br/>
                    <small>Lun-Ven 9h-18h</small>
                  </p>
                </div>
              </div>
              
              <div className="col-md-4 text-center" style={{ marginBottom: '24px' }}>
                <div style={{ 
                  backgroundColor: '#FFF9E6', 
                  padding: '24px', 
                  borderRadius: '12px',
                  height: '100%'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📧</div>
                  <h3 style={{ color: '#F39200', fontSize: '1.2rem', marginBottom: '8px' }}>
                    Email
                  </h3>
                  <p style={{ fontSize: '1rem', margin: '0' }}>
                    contact@pakado.fr<br/>
                    <small>Réponse sous 24h</small>
                  </p>
                </div>
              </div>
              
              <div className="col-md-4 text-center" style={{ marginBottom: '24px' }}>
                <div style={{ 
                  backgroundColor: '#F0F4F8', 
                  padding: '24px', 
                  borderRadius: '12px',
                  height: '100%'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📍</div>
                  <h3 style={{ color: '#2D3748', fontSize: '1.2rem', marginBottom: '8px' }}>
                    Adresse
                  </h3>
                  <p style={{ fontSize: '1rem', margin: '0' }}>
                    Paris, France<br/>
                    <small>Livraison nationale</small>
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '40px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #E2E8F0'
            }}>
              <h2 style={{ color: '#EA5C16', marginBottom: '24px', textAlign: 'center' }}>
                Demande de Devis Gratuit 📝
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label style={labelStyle}>Nom / Prénom *</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#EA5C16'}
                      onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#EA5C16'}
                      onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <label style={labelStyle}>Entreprise</label>
                    <input
                      type="text"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#EA5C16'}
                      onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label style={labelStyle}>Téléphone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#EA5C16'}
                      onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />
                  </div>
                </div>
                
                <label style={labelStyle}>Type d'emballage souhaité</label>
                <select
                  name="typeEmballage"
                  value={formData.typeEmballage}
                  onChange={handleChange}
                  style={{...inputStyle, cursor: 'pointer'}}
                  onFocus={(e) => e.target.style.borderColor = '#EA5C16'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                >
                  <option value="carton">📦 Emballage Carton</option>
                  <option value="alimentaire">🍽️ Packaging Alimentaire</option>
                  <option value="ecologique">🌱 Solutions Écologiques</option>
                  <option value="personnalise">✨ Packaging Personnalisé</option>
                  <option value="autre">🎯 Autre (préciser dans le message)</option>
                </select>
                
                <label style={labelStyle}>Votre projet / Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{...inputStyle, resize: 'vertical', minHeight: '120px'}}
                  onFocus={(e) => e.target.style.borderColor = '#EA5C16'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                  placeholder="Décrivez votre projet : type d'emballage, quantités, délais, budget..."
                />
                
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#EA5C16',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.2s',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#d44a0c'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#EA5C16'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Envoyer ma demande de devis 🚀
                </button>
                
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#718096', 
                  textAlign: 'center', 
                  marginTop: '16px',
                  marginBottom: '0'
                }}>
                  * Champs obligatoires - Réponse garantie sous 24h
                </p>
              </form>
            </div>
            
            <div style={{ 
              backgroundColor: '#FEF2E8', 
              padding: '24px', 
              borderRadius: '12px', 
              marginTop: '40px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#EA5C16', marginBottom: '12px' }}>
                ⚡ Pourquoi choisir Pakado ?
              </h3>
              <div className="row">
                <div className="col-md-3 col-6" style={{ marginBottom: '16px' }}>
                  <strong>📞 Réponse 24h</strong><br/>
                  <small>Devis rapide</small>
                </div>
                <div className="col-md-3 col-6" style={{ marginBottom: '16px' }}>
                  <strong>🏆 Qualité premium</strong><br/>
                  <small>Matériaux certifiés</small>
                </div>
                <div className="col-md-3 col-6" style={{ marginBottom: '16px' }}>
                  <strong>🌱 Eco-responsable</strong><br/>
                  <small>Solutions durables</small>
                </div>
                <div className="col-md-3 col-6" style={{ marginBottom: '16px' }}>
                  <strong>🚚 Livraison rapide</strong><br/>
                  <small>Partout en France</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
