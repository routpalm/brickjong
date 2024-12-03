import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy">
      <Navbar />
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p>We value your privacy and are committed to protecting your personal information. Below, we outline the types of information we collect and how it is used:</p>

        <h2>1. Information We Collect</h2>
        <p>
          When you sign in using Google Sign-In, we automatically collect the following information:
        </p>
        <ul>
          <li>Your Google ID</li>
          <li>Your username</li>
          <li>Your email address</li>
        </ul>
        <p>
          Additionally, our backend assigns a unique user ID to each user for internal identification purposes.
        </p>

        <h2>2. Image Uploads</h2>
        <p>
          When you upload your own images, we extract certain color-related parameters from the image. However:
        </p>
        <ul>
          <li>We do not store the uploaded images.</li>
          <li>Stored parameters cannot be used to recreate or reverse-engineer your original images.</li>
        </ul>

        <h2>3. Artwork Storage</h2>
        <p>
          During the development phase, if you choose the "Save Artwork to My Gallery" option, the generated image will be showcased in the <b>Explore Seeds Page</b> as an inspiration for others. 
          However, if you do not select this option, our backend will not store your generated images.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to request deletion of your data at any time. For questions or concerns about our privacy practices, please contact us.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
