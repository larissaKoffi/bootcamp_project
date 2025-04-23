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

    <>

  <div className="wrapper">
        <div className="title">Inscription</div>
        <form onSubmit={handleRegister}>

        <div className="field">
        <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
                {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            </div>



          
          <div className="field">
          <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>

          <div className="field">
            <input
                type="password"
                placeholder="MOT DE PASSE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          </div>



          <div className="field">
          <input
                type="password"
                placeholder="MOT DE PASSE VALIDATION"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
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
            <button type="submit" className="submit-btn">INSCRIPTION</button>
          </div>

          <div className="signup-link">
            Déjà inscrire ? <Link to="/login">Connexion</Link>
          </div>
        </form>
      </div>
      
      
    </>

  );
}

export default Register;
