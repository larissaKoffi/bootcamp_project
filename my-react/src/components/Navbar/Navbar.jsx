import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Link as ScrollLink } from 'react-scroll';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <>
      <header className="app-header">
        <nav className="navbar">
          <div className="logo-container">
            <h1 className="logo">
              <Link to="/">ID<span>Extract</span></Link>
            </h1>
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
              <ScrollLink to="features" smooth={true} duration={500} className="nav-link">Fonctionnalités</ScrollLink>
            </li>
            <li>
              <ScrollLink to="how-it-works" smooth={true} duration={500} className="nav-link">Comment ça marche</ScrollLink>
            </li>
          </ul>

          <div className="auth-buttons">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="login-btn">
                <FaSignOutAlt className="btn-icon" /> Déconnexion
              </button>
            ) : (
              <Link to="/login" className="login-btn">
                <FaSignInAlt className="btn-icon" /> Déconnexion
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
