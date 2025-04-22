import React from 'react';
import './Accueil.css'
import { Link} from 'react-router-dom';
function Accueil() {
  return (
    <>

<header class="header">
      <nav class="navbar">
        <h2 class="logo"><a href="#">CodingNepal</a></h2>
        <input type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" id="hamburger-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </label>
        <ul class="links">
          <Link to="/">Home</Link>
        </ul>
        <div class="buttons">
          <Link to="/register">INSCRIPTION</Link>
          <Link to="/login">CONNEXION</Link>
        </div>
      </nav>
    </header>
    <section class="hero-section">
      <div class="hero">
        <h2>Mobile App Development</h2>
        <p>
          Join us in the exciting world of programming and turn your ideas into
          reality. Unlock the world of endless possibilities - learn to code and
          shape the digital future with us.
        </p>
        <div class="buttons">
          <Link to="#" class="join">Join Now</Link>
          <Link to="#" class="learn">Learn More</Link>
        </div>
      </div>
      <div class="img">
        <img src="https://s.smallpdf.com/static/cms/f/102628/528x476/6f2813d069/extract-pdf-pages.png" alt="hero image" />
      </div>
    </section>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/register">INSCRIPTION</Link>
        <Link to="/login">CONNEXION</Link>
    </div>
    </>
  )
};

export default Accueil;