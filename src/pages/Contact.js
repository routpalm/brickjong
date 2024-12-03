import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import './Contact.css';

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
            <li><b>Jordan:</b> Developed the Generative Algorithms for Art</li>
            <li><b>Nick:</b> Worked closely with all team members to integrate the various components seamlessly.</li>
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

