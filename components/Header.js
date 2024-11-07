// components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Brick Jong</div>
      <nav>
        <ul>
          <li>Weave Artwork</li>
          <li>Explore Seeds</li>
          <li>My Gallery</li>
          <li><button className="sign-in">SIGN IN</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
