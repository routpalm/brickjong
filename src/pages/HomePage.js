// src/pages/Homepage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';
import './HomePage.css'
import FeaturedImages from '../components/FeaturedImages.js';
import Footer from '../components/Footer.js';

const Homepage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

   const handleProtectedClick = (path) => {
     if (isAuthenticated) {
       navigate(path); 
     } else {
       navigate('/sign-in'); 
     }
   };

  return (
    <div className="homepage">
      <Navbar />
      <Header />
      <FeaturedImages />
      <Footer />
    </div>
  );
};

export default Homepage;


