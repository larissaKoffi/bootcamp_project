import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginAuth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });

      console.log("Connexion réussie :", response.data);
      alert("Connexion réussie !");

      //redirection
    const { token, role } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data || error);
      alert(error.response?.data?.detail || "Email/password Incorrect.");
    }
  };

  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">CONNEXION</h1>
          <form onSubmit={handleLogin}>
            <input
              type='email'
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="opacity">SE CONNECTER</button>
          </form>
          <div className="register-forget opacity">
            <Link to="/register">INSCRIPTION</Link>
            <Link to="#">MOT DE PASSE OUBLIÉ</Link>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
}

export default Login;
