// src/pages/Contact.js
// Brick Jong
// purpose: provide a contact page for more "about us"-style info and a way for users to provide feedback.
// author: Tong Guan
// creation date: 11-30-2024

import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import './Contact.css';

/**
 * renders a contact page showing project details, team members, and a github repository link.
 * no arguments expected
 * returns: jsx element representing a styled contact page with navbar, footer, and info sections.
 */
const Contact = () => {
  return (
    <div className="contact">
      <Navbar />
      <div className="contact-container">
        <div className="contact-left">
          <h1>About the Project</h1>
          <p>
            <b>Team Name:</b> Brick Jong <br />
            <b>Project Name:</b> Visualoom
          </p>
          <p>
            This project is a part of the CS422 <b>Software Methodology</b> course, developed during the <b>2024 Fall Semester</b> (September to December).
          </p>
          <p>
            Our team consists of four members, each contributing significantly to the project's success:
          </p>
          <ul>
            <li><b>Brett:</b> Backend development and Database Management.</li>
            <li><b>Tong:</b> UI/UX Design and Frontend Implementation.</li>
            <li><b>Jordan:</b> Developed the Generative Algorithms for Art.</li>
            <li><b>Nick:</b> Integrations, Prototypes, & Authentication Whiz.</li>
          </ul>
        </div>

        <div className="contact-right">
          <h1>Contact Us</h1>
          <p>
            Check out our project on <b>GitHub</b>:
          </p>
          <a 
            href="https://github.com/routpalm/visualoom" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
          >
            Visit GitHub Repository
          </a>
          <p>
            If you have any questions or feedback, please leave us a message on our GitHub page. We value your input and will respond as soon as possible.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

