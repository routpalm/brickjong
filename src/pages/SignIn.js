// src/pages/SignIn.js
import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await googleSignIn();
    navigate('/'); 
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleLogin}>Sign In with Google (Simulated)</button>
    </div>
  );
};

export default SignIn;

