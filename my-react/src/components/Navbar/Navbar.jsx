import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Link as ScrollLink } from 'react-scroll';
import { FaSignInAlt } from 'react-icons/fa';

function Navbar() {
  return (
    
    <>
  

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
            <li>
                <ScrollLink to="features" smooth={true} duration={500} className="nav-link">
                    <Link to="#features" className="nav-link">Fonctionnalités</Link>
                  </ScrollLink>
              </li>
            <li>
              <ScrollLink to="how-it-works" smooth={true} duration={500} className="nav-link">
                  <Link to="#how-it-works" className="nav-link">Comment ça marche</Link>
              </ScrollLink>
            </li>

            {/* <li>
              <ScrollLink to="contact" smooth={true} duration={500} className="nav-link">
                <Link to="#contact" className="nav-link">Contact</Link>
              </ScrollLink>
            </li> */}
          </ul>
          
          <div className="auth-buttons">
            {/* <Link to="/register" className="signup-btn">
              <FaUserPlus className="btn-icon" /> S'inscrire
            </Link> */}
            <Link to="/login" className="login-btn">
              <FaSignInAlt className="btn-icon" /> Deconnexion
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
};

export default Navbar;