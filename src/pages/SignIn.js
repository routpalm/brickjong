// src/pages/SignIn.js
// Brick Jong
// purpose: integrates with the google login client to provide a sign in modal for users that opens at the top right of the screen
// authors: Nicholas Anthony, Tong Guan
// Nick: integrated JWT functionality and session management
// Tong: Styling, modal design, initial sign in functions
// creation date: 10-25-24

import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../AuthContext.js';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const BACKEND_AUTH_URL = 'https://visualoom-8a10785743bd.herokuapp.com/auth/oauth2'

/**
 * handles successful login attempts by sending the Google ID token to the backend for verification.
 * upon success, retrieves a JWT and passes it to auth context to set user state
 *
 * @param {Object} credentialResponse - object containing credential info from google login
 * no return value, but updates authentication state indirectly
 */
const handleLoginSuccess = async (credentialResponse, googleSignIn) => {
  try {
    const idToken = credentialResponse.credential;

    // sends the id token to backend for verification
    const response = await fetch(BACKEND_AUTH_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();
    if (data.token) {
      // pass the JWT to auth context
      googleSignIn(data.token);
    } else {
      console.error('failed to obtain jwt from server');
    }
  } catch (error) {
    console.error('error during authentication:', error);
  }
};

/**
 * handles login errors from google login attempts
 * logs an error to the console
 */
const handleLoginError = () => {
  console.error('google login failed');
};

/**
 * renders a sign-in modal component
 *
 * @param {Function} onClose - callback triggered when user clicks outside or on the close button of the modal
 * @returns {JSX.Element} sign-in modal ui
 * this component:
 *  - displays a google login button
 *  - integrates with auth context to update user state upon successful login
 *  - redirects user upon successful authentication
 */
const SignIn = ({ onClose }) => {
  const { googleSignIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if user is authenticated, close the modal and navigate home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    // modal background that closes on click outside content
    <div className="modal-background" onClick={onClose}>
      {/* modal content that stops event propagation to prevent closing when clicked inside */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>x</button>
        <h2 className="sign-in-title gradient-text">Sign in to VisuaLoom</h2>
        <p> By signing in, you agree that during the trial period, your generated artworks will be displayed on the Explore Seeds page.</p>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse, googleSignIn)}
          onError={handleLoginError}
          size="large"
          theme="outline"
          shape="rectangular"
        />
      </div>
    </div>
  );
};

export default SignIn;