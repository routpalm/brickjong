// ./src/components/Header.js
// purpose: renders the header component for the homepage, providing branding, a slogan, and a call-to-action button
// creation date: 2024-11-15
// authors: Tong Guan
// integrates with `AuthContext` to customize navigation based on user authentication status
// modifications: none

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.js';
import './Header.css';
import Image1 from '../images/HomePage1.png';
import Image2 from '../images/HomePage2.png';

/**
 * header component that includes branding, images, and navigation functionality.
 * dynamically adjusts navigation target based on user authentication status.
 *
 * @returns {JSX.Element} header UI
 */
const Header = () => {
  const { isAuthenticated } = useAuth(); // checks user authentication status
  const navigate = useNavigate(); // allows programmatic navigation

  /**
   * handles the call-to-action button click.
   * navigates to '/weave-artwork' if authenticated, otherwise navigates to the homepage ('/').
   */
  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate('/weave-artwork'); // redirect authenticated users to the weave artwork page
    } else {
      navigate('/'); // redirect unauthenticated users to the homepage
    }
  };

  return (
    // main header wrapper
    <header className="header">
      {/* left section of the header containing branding and a CTA */}
      <div className="header-left">
        <h1 className="header-logo">VisuaLoom</h1> {/* application name */}
        <p className="header-slogan">Turn your photo gallery into something new.</p> {/* tagline */}
        <button onClick={handleButtonClick} className="cta-button">BEGIN</button> {/* call-to-action button */}
      </div>

      {/* right section of the header containing decorative images */}
      <div className="header-right">
        <img src={Image1} alt="Decorative pattern 1" className="header-image" /> {/* decorative image 1 */}
        <img src={Image2} alt="Decorative pattern 2" className="header-image" /> {/* decorative image 2 */}
      </div>
    </header>
  );
};

export default Header;
