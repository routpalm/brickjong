// src/index.js
// Brick Jong
// purpose: the root file of our web app, this file initializes the web app and further integrates Google OAuth.
// author: Tong Guan
// creation date: 09-24-2024

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App.js"
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// create root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);