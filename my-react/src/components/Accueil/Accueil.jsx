import React from 'react';
import './Accueil.css'
import { Link} from 'react-router-dom';
function Accueil() {
  return (
    <>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/register">INSCRIPTION</Link>
        <Link to="/login">CONNEXION</Link>
    </div>
    </>
  )
};

export default Accueil;