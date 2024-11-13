// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async (credential) => {
    try {
      const decoded = jwtDecode(credential); 
      setUser(decoded);
    } catch (error) {
      console.error('Failed to decode Google token:', error);
    }
  };

  const signOut = () => {
    setUser(null);
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


