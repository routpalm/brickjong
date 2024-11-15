// src/pages/SignIn.js
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ onClose }) => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // extract the Google ID token
      const idToken = credentialResponse.credential;

      // send the ID token to your backend
      const response = await fetch('https://visualoom-8a10785743bd.herokuapp.com/auth/oauth2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }), // send ID token for verification
      });

      const data = await response.json();
      if (data.token) {
        // store JWT in localStorage
        localStorage.setItem('jwt', data.token);
        setIsAuthenticated(true); // update authenticated state
      } else {
        console.error('Failed to obtain JWT from server');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="sign-in-title gradient-text">Sign in to Visualoom</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          size="large"
          theme="outline"
          shape="rectangular"
        />
      </div>
    </div>
  );
};

export default SignIn;


