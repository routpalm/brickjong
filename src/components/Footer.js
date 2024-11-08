// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/info">Info & Articles</Link>
      <Link to="/privacy">Privacy & Teams</Link>
      <Link to="/contact">Contact Us</Link>
    </footer>
  );
};

export default Footer;
