// /src/components/Navbar.js
// Brick Jong
// purpose: provides a navbar at the top of the screen that is present on each page for ease of navigation
// authors: Nicholas Anthony, Tong Guan
// Nick: finished integration of signin and modal closing/opening, as well as profile styling
// Tong: Styling and initial prototyping
// creation date: 10-18-2024
// this file is part of the ui layer, handling top-level navigation, linking to different views of the site, and integrating with auth state

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignIn from '../pages/SignIn.js';
import { useAuth } from '../AuthContext.js';
import './Navbar.css';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

/**
 * renders a navigation bar at the top of each page.
 *
 * @returns {JSX.Element} a navbar component with navigation links, sign in/out functionality,
 * and user info. responds dynamically based on authentication status.
 */
const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth(); // checks auth state and retrieves user info if logged in
  const navigate = useNavigate(); // allows programmatic navigation to routes
  const location = useLocation(); // tracks current path for highlighting active links
  const [showSignIn, setShowSignIn] = useState(false); // controls visibility of the sign-in modal
  const [showEmail, setShowEmail] = useState(false); // toggles between showing user name or email

  /**
   * toggles the sign-in modal to visible state.
   */
  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  /**
   * toggles email display for authenticated user on clicking the user-name-button.
   */
  const handleToggleEmail = () => {
    setShowEmail((prev) => !prev);
  };

  /**
   * closes the sign-in modal when triggered.
   */
  const handleCloseModal = () => {
    setShowSignIn(false);
  };

  /**
   * navigates to the given path if user is authenticated, otherwise opens sign-in modal.
   *
   * @param {string} path - the route to navigate to.
   */
  const handleProtectedClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowSignIn(true);
    }
  };

  // if user becomes authenticated, ensure sign-in modal closes automatically
  useEffect(() => {
    if (isAuthenticated) {
      setShowSignIn(false);
    }
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      {/* left section: team name */}
      <div className="navbar-left">
        <span className="team-name" data-testid="team-name">brick jong</span>
      </div>

      {/* center section: navigation buttons linking to key pages */}
      <div className="navbar-center">
        <button
          data-testid="weave-artwork-button"
          onClick={() => handleProtectedClick('/weave-artwork')}
          className={`nav-button ${location.pathname === '/weave-artwork' ? 'active-link' : ''}`}
        >
          Weave Artwork
        </button>
        <button
          data-testid="explore-seeds-button"
          onClick={() => handleProtectedClick('/explore-seeds')}
          className={`nav-button ${location.pathname === '/explore-seeds' ? 'active-link' : ''}`}
        >
          Explore Seeds
        </button>
        <button
          data-testid="my-gallery-button"
          onClick={() => handleProtectedClick('/my-gallery')}
          className={`nav-button ${location.pathname === '/my-gallery' ? 'active-link' : ''}`}
        >
          My Gallery
        </button>
      </div>

      {/* right section: home button and user auth actions */}
      <div className="navbar-right">
        <button
          data-testid="home-button"
          onClick={() => navigate('/')}
          className={`home-button ${location.pathname === '/' ? 'active-link' : ''}`}
        >
          <FaHome />
        </button>
        {isAuthenticated ? (
          <>
            <button
              data-testid="user-button"
              className="user-name-button"
              onClick={handleToggleEmail}
            >
              {showEmail ? user.email : user.name}
            </button>
            <button
              data-testid="sign-out-button"
              onClick={signOut}
              className="sign-out-button"
            >
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <button
            data-testid="sign-in-button"
            className="sign-in-link"
            onClick={handleSignInClick}
          >
            sign in
          </button>
        )}
      </div>

      {/* conditional rendering of sign-in modal */}
      {showSignIn && <SignIn onClose={handleCloseModal} />}
    </nav>
  );
};

export default Navbar;