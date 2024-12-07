// src/pages/Homepage.js
// Brick Jong
// purpose: provide a landing page for any user who enters our website, with links to everything a user might use
// author: Tong Guan
// creation date: 10-24-24
/**
 * renders the homepage with a navbar, header, featured images, and footer
 * no arguments
 * returns: jsx element representing the homepage ui
 * integrates auth state to control navigation to protected routes
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';
import './HomePage.css';
import FeaturedImages from '../components/FeaturedImages.js';
import Footer from '../components/Footer.js';

const Homepage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /**
   * navigates to a given path if user is authenticated, else redirects to sign-in page
   * currently unused in production, but helpful in development
   * @param {string} path - the route to navigate to
   */
  const handleProtectedClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/sign-in');
    }
  };

  return (
    // main homepage container
    <div className="homepage">
      <Navbar /> {/* top-level navigation bar */}
      <Header /> {/* page header with branding and call to action */}
      <FeaturedImages /> {/* displays a grid of featured sample images */}
      <Footer /> {/* footer with additional navigation or info */}
    </div>
  );
};

export default Homepage;