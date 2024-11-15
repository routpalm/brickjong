// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignIn from '../pages/SignIn.js';
import { useAuth } from '../AuthContext.js';
import './Navbar.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [showSignIn, setShowSignIn] = useState(false); 

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleCloseModal = () => {
    setShowSignIn(false);
  };

  const handleProtectedClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowSignIn(true); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="team-name">Brick Jong</span>
      </div>
      <div className="navbar-center">
        <button
          onClick={() => handleProtectedClick('/weave-artwork')}
          className={`nav-button ${location.pathname === '/weave-artwork' ? 'active-link' : ''}`}
        >
          Weave Artwork
        </button>
        <button
          onClick={() => handleProtectedClick('/explore-seeds')}
          className={`nav-button ${location.pathname === '/explore-seeds' ? 'active-link' : ''}`}
        >
          Explore Seeds
        </button>
        <button
          onClick={() => handleProtectedClick('/my-gallery')}
          className={`nav-button ${location.pathname === '/my-gallery' ? 'active-link' : ''}`}
        >
          My Gallery
        </button>
      </div>
      <div className="navbar-right">
        <button
          onClick={() => navigate('/')}
          className={`home-button ${location.pathname === '/' ? 'active-link' : ''}`}
        >
          <FaHome />
        </button>
        {isAuthenticated ? (
          <>
            <span className="user-name-button">{user.name}</span>
            <button onClick={signOut} className="sign-out-button">
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <button className="sign-in-link" onClick={handleSignInClick}>
            Sign In
          </button>
        )}
      </div>
      {showSignIn && <SignIn onClose={handleCloseModal} />}
    </nav>
  );
};

export default Navbar;








