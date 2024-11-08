// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from '../pages/HomePage';
import WeaveArtwork from '../pages/WeaveArtwork';
import ExploreSeeds from '../pages/ExploreSeeds';
import MyGallery from '../pages/MyGallery';
import SignIn from '../pages/SignIn';
import { useAuth } from '../AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> 
      <Route
        path="/weave-artwork"
        element={isAuthenticated ? <WeaveArtwork /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/explore-seeds"
        element={isAuthenticated ? <ExploreSeeds /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/my-gallery"
        element={isAuthenticated ? <MyGallery /> : <Navigate to="/sign-in" />}
      />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
