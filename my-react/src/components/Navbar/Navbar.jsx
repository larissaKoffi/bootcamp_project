import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    
    <>
    <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Deconnexion</Link>
    </div>
    </>
  )
};

export default Navbar;