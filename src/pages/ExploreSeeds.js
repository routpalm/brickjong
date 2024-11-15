// src/pages/ExploreSeeds.js
import React from 'react';
import SeedItem from '../components/SeedItem.js';
import { useNavigate } from 'react-router-dom';
import './ExploreSeeds.css'; 
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Seed1 from '../images/Seed1.png';
import Seed2 from '../images/Seed2.png';
import Seed3 from '../images/Seed3.png';
import Seed4 from '../images/Seed4.png';
import Seed5 from '../images/Seed5.png';
import Seed6 from '../images/Seed6.png';
import Seed7 from '../images/Seed7.png';
import Seed8 from '../images/Seed8.png';

const ExploreSeeds = () => {
  const navigate = useNavigate();

  // Sample Photos for Algorithms
  const seedData = [
    { id: 1, imageSrc: Seed1, name: 'Seed1' },
    { id: 2, imageSrc: Seed2, name: 'Seed2' },
    { id: 3, imageSrc: Seed3, name: 'Seed3' },
    { id: 4, imageSrc: Seed4, name: 'Seed4' },
    { id: 5, imageSrc: Seed5, name: 'Seed5' },
    { id: 6, imageSrc: Seed6, name: 'Seed6' },
    { id: 7, imageSrc: Seed7, name: 'Seed7' },
    { id: 8, imageSrc: Seed8, name: 'Seed8' },
  ];

  // Click for the details of the seeds
  const handleSeedClick = (seed) => {
    navigate(`/seed-detail/${seed.id}`, { state: seed });
  };

  return (
    <div className="explore-seeds">
      <Navbar />
      <h1>Explore Seeds</h1>
      <div className="seeds-grid">
        {seedData.map((seed) => (
          <SeedItem
            key={seed.id}
            imageSrc={seed.imageSrc}
            seedName={seed.name}
            onClick={() => handleSeedClick(seed)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ExploreSeeds;
