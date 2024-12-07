// ./src/AuthContext.js
// Brick Jong
// purpose: manages authentication state for the application, handling jwt tokens, user decoding, and sign-in/out actions
// this file is part of the global state layer, providing a react context to access user authentication info throughout the app
// authors: Nicholas Anthony, Tong Guan
// Nick: JWT session management & sign in prototypes
// Tong: context integration, final google sign in/out functionality
// creation date: 10-26-24

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

/**
 * provides auth context to the app
 * handles checking for stored jwt on mount, decoding user info, and updating global user state
 * returns a provider that wraps the entire app
 *
 * @param {object} props - the component props
 * @param {React.ReactNode} props.children - the components wrapped by auth provider
 * @returns {JSX.Element} auth context provider that gives access to user, isAuthenticated, googleSignIn, and signOut
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // on mount, load any stored JWT and decode user if present
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // console.log("raw token:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log('Token:', decoded);
        setUser(decoded);
      } catch (error) {
        console.error('failed to decode stored token:', error);
        localStorage.removeItem('jwt'); // clear invalid token if decoding fails
      }
    }
  }, []);

  /**
   * processes a google token after login, decoding user info and storing the token locally
   * @param {string} token - the jwt token returned by backend after google login verification
   * no return value, but updates global user state
   */
  const googleSignIn = async (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded); // update user state with decoded user info
      localStorage.setItem('jwt', token); // store jwt for persistence
    } catch (error) {
      console.error('failed to decode google token:', error);
    }
  };

  /**
   * signs the user out by clearing user state and removing stored JWT
   * no arguments, no return value
   */
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('jwt');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, googleSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * custom hook to access auth context easily
 * @returns {object} an object containing user data, isAuthenticated flag, googleSignIn, and signOut functions
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
