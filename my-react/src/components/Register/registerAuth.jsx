import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== password2) {
      setErrors({ password2: "Les mots de passe ne correspondent pas." });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
        password2,
      });

      

      console.log("Inscription réussie :", response.data);
      alert("Inscription réussie !");
      navigate('/home');
    } catch (error) {
      const apiErrors = error.response?.data || {};
      setErrors(apiErrors);
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
          <h1 className="opacity">INSCRIPTION</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}

            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <input
              type="password"
              placeholder="MOT DE PASSE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

            <input
              type="password"
              placeholder="MOT DE PASSE VALIDATION"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}

            <button className="opacity" type="submit">S'INSCRIRE</button>
          </form>
          <div className="register-forget opacity">
            <Link to="/login">CONNEXION</Link>
            <Link to="#">MOT DE PASSE OUBLIÉ</Link>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
      <div className="theme-btn-container"></div>
    </section>
  );
}

export default Register;
