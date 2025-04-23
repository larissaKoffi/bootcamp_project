import React from 'react';
import './Accueil.css';
import { Link } from 'react-router-dom';
import { FaCamera, FaBrain, FaCheckCircle, FaFileExport, FaArrowRight, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

function Accueil() {
  return (
    <div className="app-container">
      {/* Header avec animation */}
      <header className="app-header">
        <nav className="navbar">
          <div className="logo-container">
            <h1 className="logo"><Link to="/">ID<span>Extract</span></Link></h1>
            <p className="logo-subtitle">AI-Powered ID Processing</p>
          </div>
          
          <input type="checkbox" id="menu-toggle" className="menu-toggle" />
          <label htmlFor="menu-toggle" className="hamburger-btn">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </label>
          
          <ul className="nav-links">
            <li><Link to="/" className="nav-link active">Accueil</Link></li>
            <li><Link to="/features" className="nav-link">Fonctionnalités</Link></li>
            <li><Link to="/how-it-works" className="nav-link">Comment ça marche</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
          
          <div className="auth-buttons">
            <Link to="/register" className="signup-btn">
              <FaUserPlus className="btn-icon" /> S'inscrire
            </Link>
            <Link to="/login" className="login-btn">
              <FaSignInAlt className="btn-icon" /> Connexion
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section avec effet de verre */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">
              <span className="highlight">Extraction intelligente</span> des données de cartes d'identité
            </h2>
            <p className="hero-description">
              Notre solution IA révolutionnaire transforme vos documents d'identité en données structurées 
              en quelques secondes, avec une précision inégalée.
            </p>
            <div className="hero-cta">
              <Link to="/upload" className="cta-primary">
                Essayer maintenant <FaArrowRight className="cta-icon" />
              </Link>
              <Link to="/demo" className="cta-secondary">
                Voir la démo
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="card-animation">
              <div className="card-base"></div>
              <div className="card-overlay">
                <div className="scan-line"></div>
              </div>
              <div className="data-points">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="data-point" style={{ '--delay': i * 0.1 + 's' }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section avec cartes animées */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Fonctionnalités clés</h2>
            <p className="section-subtitle">Découvrez la puissance de notre technologie</p>
            <div className="divider"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaCamera className="feature-icon" />
              </div>
              <h3 className="feature-title">Capture avancée</h3>
              <p className="feature-description">
                Prenez une photo ou importez une image existante avec notre système de détection automatique des documents.
              </p>
              <div className="feature-wave"></div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaBrain className="feature-icon" />
              </div>
              <h3 className="feature-title">IA intelligente</h3>
              <p className="feature-description">
                Notre algorithme détecte et extrait automatiquement tous les champs pertinents avec une précision de 99.7%.
              </p>
              <div className="feature-wave"></div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaCheckCircle className="feature-icon" />
              </div>
              <h3 className="feature-title">Vérification facile</h3>
              <p className="feature-description">
                Interface intuitive pour vérifier et corriger les données extraites avant finalisation.
              </p>
              <div className="feature-wave"></div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-container">
                <FaFileExport className="feature-icon" />
              </div>
              <h3 className="feature-title">Intégration complète</h3>
              <p className="feature-description">
                Exportez vers JSON, CSV ou XML, ou connectez directement à votre système via API.
              </p>
              <div className="feature-wave"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section avec timeline moderne */}
      <section className="process-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Comment ça marche</h2>
            <p className="section-subtitle">Simple, rapide et efficace</p>
            <div className="divider"></div>
          </div>
          
          <div className="process-timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Téléversez votre document</h3>
                <p className="timeline-description">
                  Chargez une photo claire de votre pièce d'identité (recto ou verso) directement depuis votre appareil.
                </p>
              </div>
              <div className="timeline-image">
                <div className="upload-animation">
                  <div className="upload-icon"></div>
                  <div className="progress-bar"></div>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Traitement automatique</h3>
                <p className="timeline-description">
                  Notre IA analyse le document, détecte les zones de texte et extrait les informations pertinentes.
                </p>
              </div>
              <div className="timeline-image">
                <div className="scan-animation">
                  <div className="scan-beam"></div>
                  <div className="document-preview"></div>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Vérification</h3>
                <p className="timeline-description">
                  Consultez les données extraites et apportez les corrections nécessaires via notre interface intuitive.
                </p>
              </div>
              <div className="timeline-image">
                <div className="verify-animation">
                  <div className="checkmark"></div>
                  <div className="data-fields">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="data-field"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Exportez vos données</h3>
                <p className="timeline-description">
                  Téléchargez les données dans le format de votre choix ou intégrez-les directement à votre système.
                </p>
              </div>
              <div className="timeline-image">
                <div className="export-animation">
                  <div className="file-icon json"></div>
                  <div className="file-icon csv"></div>
                  <div className="file-icon xml"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section avec drag & drop visuel */}
      <section className="upload-section">
        <div className="section-container">
          <div className="upload-container">
            <h2 className="upload-title">Prêt à essayer ?</h2>
            <p className="upload-subtitle">Téléversez votre première pièce d'identité</p>
            
            <div className="upload-box">
              <div className="upload-icon-container">
                <div className="upload-icon-animated">
                  <div className="upload-cloud"></div>
                  <div className="upload-arrow"></div>
                </div>
              </div>
              <p className="upload-instruction">Glissez-déposez votre fichier ici ou</p>
              <label htmlFor="file-upload" className="upload-btn">
                Parcourir les fichiers
              </label>
              <input id="file-upload" type="file" accept="image/*" className="file-input" />
              <p className="upload-hint">Formats supportés: JPG, PNG, PDF (max. 10MB)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer élégant */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="footer-logo">ID<span>Extract</span></h3>
              <p className="footer-tagline">L'extraction intelligente pour l'ère numérique</p>
              <div className="footer-social">
                <Link to="#" className="social-icon">Twitter</Link>
                <Link to="#" className="social-icon">LinkedIn</Link>
                <Link to="#" className="social-icon">GitHub</Link>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="link-group">
                <h4 className="link-title">Produit</h4>
                <Link to="/features" className="footer-link">Fonctionnalités</Link>
                <Link to="/pricing" className="footer-link">Tarifs</Link>
                <Link to="/updates" className="footer-link">Nouveautés</Link>
              </div>
              
              <div className="link-group">
                <h4 className="link-title">Ressources</h4>
                <Link to="/documentation" className="footer-link">Documentation</Link>
                <Link to="/api" className="footer-link">API</Link>
                <Link to="/help" className="footer-link">Aide</Link>
              </div>
              
              <div className="link-group">
                <h4 className="link-title">Entreprise</h4>
                <Link to="/about" className="footer-link">À propos</Link>
                <Link to="/careers" className="footer-link">Carrières</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} IDExtract. Tous droits réservés.</p>
            <div className="legal-links">
              <Link to="/privacy" className="legal-link">Confidentialité</Link>
              <Link to="/terms" className="legal-link">Conditions</Link>
              <Link to="/cookies" className="legal-link">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Accueil;