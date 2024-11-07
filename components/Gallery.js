// components/Gallery.js
import React from 'react';
import './Gallery.css';

function Gallery() {
  const images = [
    'path-to-image1.png',
    'path-to-image2.png',
    'path-to-image3.png',
    'path-to-image4.png',
    'path-to-image5.png',
    'path-to-image6.png'
  ];

  return (
    <section className="gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Artwork ${index + 1}`} className="gallery-image" />
      ))}
    </section>
  );
}

export default Gallery;
