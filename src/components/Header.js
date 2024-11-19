// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import './Header.css';
import Image1 from '../images/HomePage1.png';
import Image2 from '../images/HomePage2.png';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/weave-artwork');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">VisuaLoom</h1>
        <p className="header-slogan">
          Turn your photo gallery into something new.
        </p>
        <button onClick={handleButtonClick} className="cta-button">
          BEGIN
        </button>
      </div>
      <div className="header-right">
        <img src={Image1} alt="Decorative pattern 1" className="header-image" />
        <img src={Image2} alt="Decorative pattern 2" className="header-image" />
      </div>
    </header>
  );
};

export default Header;

