import React from 'react';
import './LoginRegister.css';
const LoginRegister = () => {
    return(
        <div className='wrapper'>
            <div className="form-box login">
                <form action="">
                    <h1>login</h1>
                    <div className="input-box">
                        <input type="text"placeholder='Username' required />
                    </div>
                    <div className="input-box">
                        <input type="password"placeholder='Password' required />
                    </div>
                    <div className="remenber-forget">
                        <label> <input type="checkbox"/>Remenber me</label>
                        <a href="#">Forget Password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have account? <a href="#">Register</a></p>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default LoginRegister;