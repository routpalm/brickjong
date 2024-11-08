// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store User Information

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser)); 
    }
  }, []);

  // Mock: Google Login
  const googleSignIn = async () => {
    const fakeUser = {
      name: "User1",
      email: "user1@example.com"
    };
    const fakeToken = "fake_jwt_token";

    // Store user information at localStorage
    localStorage.setItem('jwt', fakeToken);
    localStorage.setItem('user', JSON.stringify(fakeUser));

    // Updated Frontend 
    setIsAuthenticated(true);
    setUser(fakeUser);
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, googleSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

