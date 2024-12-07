// src/routes/AppRoutes.js
// Brick Jong
// purpose: provide a centralized routes component to be placed in App.js. 
// author: Tong Guan
// creation date: 10-26-24

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/HomePage.js';
import WeaveArtwork from '../pages/WeaveArtwork.js';
import ExploreSeeds from '../pages/ExploreSeeds.js';
import MyGallery from '../pages/MyGallery.js';
import GeneratedArtwork from '../pages/GeneratedArtwork.js';
import Info from '../pages/Info.js';
import Privacy from '../pages/Privacy.js';
import Contact from '../pages/Contact.js';
import { useAuth } from '../AuthContext.js';

/**
 * organizes the website's routes
 * 
 * this component structures the routes of the website and also protects the sign-in protected pages 
 * by requiring the user to be authenticated.
 *
 * @returns {JSX.Element} app routes
 */
const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/weave-artwork"
        element={isAuthenticated ? <WeaveArtwork /> : <Homepage />}
      />
      <Route
        path="/explore-seeds"
        element={isAuthenticated ? <ExploreSeeds /> : <Homepage />}
      />
      <Route
        path="/my-gallery"
        element={isAuthenticated ? <MyGallery /> : <Homepage />}
      />
      <Route path="/generated-artwork" element={<GeneratedArtwork />} />
      <Route path="/info" element={<Info />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;

