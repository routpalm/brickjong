// src/pages/Info.js
// Brick Jong
// purpose: provide an info page that explains to an uninformed user the concept of algorithmic art.
// author: Tong Guan
// creation date: 11-27-24

import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Info1 from '../images/Info1.png';
import Info2 from '../images/Info2.png';
import './Info.css';

/**
 * renders the info page
 * arguments: none
 * returns: jsx element representing the info page
 */
const Info = () => {
  return (
    <div className="info">
      <Navbar />
      <h2>What is Algorithmic Art? </h2>
      <p>
        Algorithm art is a form of generative art created with a predefined criteria put into an algorithm. Users have a say on what the input criteria is, but not on the outcome. 
        The algorithmic art generator comes up with that itself.
      </p>
      <p>
        AI-generated art and algorithmically generated art are not the same thing. AI art uses machine learning techniques, whereas algorithm art – as the name suggests – uses algorithms. With this, algorithmic generative art places a great emphasis on randomness and geometry.
      </p>
      <p>Source: Adobe "An In-Depth Guide to Algorithmic Art"</p>

      <h2>Algorithmically Generated Art (FKA “Generative Art”)</h2>
      <p>
        Within the practice of algorithmic generative art, the algorithms used to generate art can range from simple mathematical formulas to more complex, self-generating programs. The artist typically sets parameters for the algorithm, such as color schemes or geometric shapes, but the final outcome is determined by the algorithm itself.
      </p>

      <p>
      One example is using fractals, geometric shapes that can be split into smaller versions of themselves, which the artist can manipulate to create unique, complex images.
      </p>

      <img className="image" src={Info1} alt="Algorithmic Art Info Image 1" />

      <p>Another example is creating generative art using cellular automation, which uses relatively simple algorithms to trigger unpredictable and complex emergent outputs. Consider the simplicity of a single ant compared to the emergent complexity and intelligence of a large ant colony. </p>

      <p>Generative artists can create intricate, lifelike patterns on a computer screen by programming a large number of entities to follow basic rules and interact with each other. They are not simply recreating images from our world, but rather, they are designing the rules for their own unique worlds and observing the emergent behaviors that result.</p>

      <p>Some of today’s most popular generative artists include Jared S Tarbell, Tyler Hobbs, and Manolo Gamboa Naon and some of the most successful collections include Hobbs’ Fidenzas, Autoglyphs from the team behind CryptoPunks, Ringers by Dmitri Cherniak, and Chromie Squiggle by SnoFro, though this is a deeply abbreviated and insufficient list. </p>
      
      <img className="image" src={Info2} alt="Algorithmic Art Info Image 2" />

      <p>Source: MakersPlace "What is Generative Art? Algorithmic vs. AI</p>

      <h2>Related Articles about Algorithmic Art</h2>
      <ul>
        <li>
          <a 
            href="https://en.wikipedia.org/wiki/Algorithmic_art" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Wikipedia: Algorithmic Art
          </a>
        </li>
        <li>
          <a 
            href="https://creativepinellas.org/magazine/algorithmic-art/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Creative Pinellas: On Algorithmic Art
          </a>
        </li>
        <li>
          <a 
            href="https://www.zazow.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Zazow :: Algorithmic Generative Art
          </a>
        </li>
      </ul>

      <Footer />
    </div>
  );
};

export default Info;
