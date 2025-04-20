import React from 'react';
import { Link } from 'react-router-dom';
function Register() {
  return (
    <>
          <section class="container">
            <div class="login-container">
                <div class="circle circle-one"></div>
                <div class="form-container">
                    <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
                    <h1 class="opacity">INSCRIPTION</h1>
                    <form>
                        <input type='email' placeholder="EMAIL" />
                        <input type="password" placeholder="MOT DE PASSE" />
                        <input type="password" placeholder="MOT DE PASSE VALIDATION" />
                        <button class="opacity">S'INSCRIRE</button>
                    </form>
                    <div class="register-forget opacity">
                      <Link to="/login">CONNECTION</Link>
                      <Link to="#">FORGOT PASSWORD</Link>
                    </div>
                </div>
                <div class="circle circle-two"></div>
            </div>
            <div class="theme-btn-container"></div>
        </section>
        </>
  );
}

export default Register;