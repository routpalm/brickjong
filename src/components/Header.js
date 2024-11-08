// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/weave-artwork'); 
    } else {
      navigate('/sign-in'); 
    }
  };

  return (
    <header className="header">
      <h1 className="logo">VisuaLoom</h1>
      <p className="slogan">Weave. Share. Explore.</p>
      <button onClick={handleButtonClick} className="cta-button">
        LET'S GO
      </button>
    </header>
  );
};

export default Header;

