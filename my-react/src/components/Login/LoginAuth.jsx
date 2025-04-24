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
    <div className="wrapper">
      <div className="title">Connexion</div>
      <form onSubmit={handleLogin}>
        <div className="field">
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <div className="pass-link">
            <Link to="#">Forgot password?</Link>
          </div>
        </div>

        <div className="field">
          <button type="submit" className="submit-btn">SE CONNECTER</button>
        </div>

        <div className="signup-link">
          Pas encore inscrit ? <Link to="/register">Inscription</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;