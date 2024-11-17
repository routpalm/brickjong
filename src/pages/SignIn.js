import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

//const BACKEND_AUTH_URL = 'https://visualoom-8a10785743bd.herokuapp.com/auth/oauth2'
const BACKEND_AUTH_URL = 'http://localhost:3001/auth/oauth2'

const SignIn = ({ onClose }) => {
  const { googleSignIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      // Send ID token to the backend for verification
      const response = await fetch(BACKEND_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      if (data.token) {
        // Pass the JWT to AuthContext
        googleSignIn(data.token);
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className="sign-in-title gradient-text">Sign in to Visualoom</h2>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
