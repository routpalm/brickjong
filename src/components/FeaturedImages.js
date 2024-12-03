// ./src/components/FeaturedImages.js
// purpose: displays a gallery of featured sample artwork images in a consistent layout
// creation date: 2024-11-24
// authors: Tong Guan
// this simple component showcases sample images on the algorithm selector page
// modifications: none

import React from 'react';
import Seed1 from '../images/Seed1.png';
import Seed2 from '../images/Seed2.png';
import Seed3 from '../images/Seed3.png';
import Seed4 from '../images/Seed4.png';
import Seed5 from '../images/Seed5.png';
import Seed6 from '../images/Seed6.png';
import Seed7 from '../images/Seed7.png';

/**
 * renders a gallery of featured images.
 *
 * @returns {JSX.Element} a container holding a set of featured images.
 */
const FeaturedImages = () => {
  return (
    // div container holding all featured images
    <div className="featured-images">
      {/* individual image elements displaying sample artwork */}
      <img src={Seed7} alt="Sample Artwork 1" />
      <img src={Seed4} alt="Sample Artwork 2" />
      <img src={Seed3} alt="Sample Artwork 3" />
      <img src={Seed5} alt="Sample Artwork 4" />
      <img src={Seed6} alt="Sample Artwork 5" />
      <img src={Seed2} alt="Sample Artwork 6" />
      <img src={Seed1} alt="Sample Artwork 7" />
    </div>
  );
};

export default FeaturedImages;
