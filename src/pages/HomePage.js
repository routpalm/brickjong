// src/pages/Homepage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './HomePage.css'
import FeaturedImages from '../components/FeaturedImages';
import Footer from '../components/Footer';

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


