// src/components/Footer.js
// purpose: provides styling and links to privacy, info, and contact pages 
// creation date: 11-08-24
// author: Tong Guan
// footer element used in all pages that provdes users a way to find out more information about the website
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * renders a footer component with auxiliary website info links.
 *
 * @returns {JSX.Element} footer UI
 */
const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/info">Info & Articles</Link>
      <Link to="/privacy">Privacy & Terms</Link>
      <Link to="/contact">Contact Us</Link>
    </footer>
  );
};

export default Footer;
