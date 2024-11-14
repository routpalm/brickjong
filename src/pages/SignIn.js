// src/pages/SignIn.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ onClose }) => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    try {
      await googleSignIn(response.credential);
      onClose(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error during Google login:', error);
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


