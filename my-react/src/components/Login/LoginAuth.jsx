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
    <>

    <div class="wrapper">
            <div class="title">
                Connexion
            </div>
            <form onSubmit={handleLogin}>
                <div class="field">
                <input
              type='email'
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
                </div>
                <div class="field">
                <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
                  <label>Password</label>
                </div>
                <div class="content">
                  <div class="checkbox">
                      <input type="checkbox" id="remember-me" />
                      <label for="remember-me">Remember me</label>
                  </div>
                  <div class="pass-link">
                    <Link to="#">Forgot password?</Link>
                  </div>
                </div>
                <div class="field">
                  <input type="submit" value="Login" />
                </div>
                <div class="signup-link">
                  Pas Inscrire? <Link to="/register">Inscription</Link>
                </div>
            </form>
          </div>
        
    </>
  );
}

export default Login;
