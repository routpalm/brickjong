// components/MainContent.js
import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <main className="main-content">
      <h1 className="title">VisuaLoom</h1>
      <p className="tagline">Weave. <span className="highlight">Share.</span> Explore.</p>
      <button className="lets-go-button">LET'S GO</button>
      <div className="art-previews">
        <img src="path-to-image1.png" alt="Art preview 1" className="art-preview" />
        <img src="path-to-image2.png" alt="Art preview 2" className="art-preview" />
      </div>
    </main>
  );
}

export default MainContent;
