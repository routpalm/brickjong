import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Initialize the user state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    //console.log("raw token:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        //console.log('Token:', decoded); 
        setUser(decoded);
      } catch (error) {
        console.error('Failed to decode stored token:', error);
        localStorage.removeItem('jwt'); // Clear invalid token
      }
    }
  }, []);

  const googleSignIn = async (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded); // Update user state
      localStorage.setItem('jwt', token); // Store JWT
    } catch (error) {
      console.error('Failed to decode Google token:', error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('jwt'); // Clear JWT
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, googleSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
