// src/pages/GoogleAuthTest.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext';

function GoogleAuthTest({ onLoginSuccess }) {
  const { googleSignIn } = useAuth();

  const handleLoginSuccess = async () => {
    await googleSignIn();
    if (onLoginSuccess) onLoginSuccess(); 
  };

  const handleLoginError = () => {
    console.log('Google login failed');
  };

  return (
    <div>
      <h2>Google Authentication Test</h2>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
}

export default GoogleAuthTest;

