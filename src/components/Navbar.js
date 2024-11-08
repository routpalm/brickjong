// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleProtectedClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <nav className="navbar">
      <button onClick={() => handleProtectedClick('/weave-artwork')}>Weave Artwork</button>
      <button onClick={() => handleProtectedClick('/explore-seeds')}>Explore Seeds</button>
      <button onClick={() => handleProtectedClick('/my-gallery')}>My Gallery</button>

      {isAuthenticated ? (
        <div className="user-info">
          <span>{user.name}</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => navigate('/sign-in')} className="sign-in-link">Sign In</button>
      )}
    </nav>
  );
};

export default Navbar;

