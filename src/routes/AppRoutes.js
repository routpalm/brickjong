// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/HomePage';
import WeaveArtwork from '../pages/WeaveArtwork';
import ExploreSeeds from '../pages/ExploreSeeds';
import MyGallery from '../pages/MyGallery';
import GeneratedArtwork from '../pages/GeneratedArtwork';
import Info from '../pages/Info';
import Privacy from '../pages/Privacy';
import Contact from '../pages/Contact';
import { useAuth } from '../AuthContext';

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

