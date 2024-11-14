// src/components/FeaturedImages.js
import React from 'react';
import Seed1 from '../images/Seed1.png';
import Seed2 from '../images/Seed2.png';
import Seed3 from '../images/Seed3.png';
import Seed4 from '../images/Seed4.png';
import Seed5 from '../images/Seed5.png';
import Seed6 from '../images/Seed6.png';
import Seed7 from '../images/Seed7.png';

const FeaturedImages = () => {
  return (
    <div className="featured-images">
      <img src={Seed7} alt="Sample Artwork 2" />
      <img src={Seed4} alt="Sample Artwork 3" />
      <img src={Seed3} alt="Sample Artwork 3" />
      <img src={Seed5} alt="Sample Artwork 3" />
      <img src={Seed6} alt="Sample Artwork 3" />
      <img src={Seed2} alt="Sample Artwork 3" />
      <img src={Seed1} alt="Sample Artwork 3" />
    </div>
  );
};

export default FeaturedImages;
