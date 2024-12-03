// components/MiniNavbar.js
import React from 'react';
import './MiniNavbar.css';

const MiniNavbar = ({ onSearch, onFilterChange, currentFilter }) => {
  return (
    <div className="mini-navbar">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}  
        className="mini-navbar-search"
      />
      <div className="mini-navbar-filters">
        <button className={`mini-navbar-button ${currentFilter === 'newest' ? 'active' : ''}`}
          onClick={() => onFilterChange('newest')}>Newest</button>
        <button className={`mini-navbar-button ${currentFilter === 'mostLiked' ? 'active' : ''}`}
          onClick={() => onFilterChange('mostLiked')}>Most Liked</button>
      </div>
    </div>
  );
};

export default MiniNavbar;
