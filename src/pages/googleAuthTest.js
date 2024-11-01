import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function GoogleAuthTest() {
  const handleLoginSuccess = async () => {
    // call backend to initiate google oauth
    const response = await fetch('/auth/google/callback');
    const data = await response.json();
  
  if (data.token) {
    // store jwt in localstorage
    localStorage.setItem('jwt', data.token);
    setIsAuthenticated(true);  // update state
  } else {
    console.error('failed to obtain JWT');
  }
};

  const handleLoginError = () => {
    console.log('login failed');
  };

  return (
    <div>
      <h2>Google Authentication Test</h2>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
}

export default GoogleAuthTest;
