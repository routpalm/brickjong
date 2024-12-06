// src/App.js
// Brick Jong
// purpose: structure the different base components of the app like routes and Google OAuth provider client + Auth wrapper
// author: Tong Guan
// creation date: 10-25-24

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './AuthContext.js';

/**
 * initializes the app with the necessary structures
 * 
 * this component returns the basic element of any web app, the app itself, with essential wrappers
 * 
 * - GoogleOAuthProvider: allows the use of Google OAuth on our website
 * - AuthProvider: Provides extra functions for authenticating users with the backend and session management
 * - AppRoutes: Initializes app routes for site navigation
 *
 * @returns {JSX.Element} app
 */
const App = () => {
  //<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;



