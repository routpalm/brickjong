// src/components/MiniNavbar.js
// Brick Jong
// purpose: provides a miniature navbar for the explore-seeds page that can filter and search posts.
// author: Tong Guan
// creation date: 11-27-2024
import React from 'react';
import './MiniNavbar.css';
/**
 * renders a mini navbar component with search and filter options
 * @param {function} onSearch - callback triggered when user types in search input
 * @param {function} onFilterChange - callback triggered when filter buttons are clicked
 * @param {string} currentFilter - the currently selected filter (e.g. 'newest', 'mostLiked')
 * @returns {JSX.Element} mini navbar ui
 */
const MiniNavbar = ({ onSearch, onFilterChange, currentFilter }) => {
  return (
    // main container for the mini navbar
    <div className="mini-navbar">
      {/* search input field for filtering displayed seeds */}
      <input
        type="text"
        placeholder="search"
        onChange={(e) => onSearch(e.target.value)}  
        className="mini-navbar-search"
      />

      {/* container holding filter buttons */}
      <div className="mini-navbar-filters">
        <button
          className={`mini-navbar-button ${currentFilter === 'newest' ? 'active' : ''}`}
          onClick={() => onFilterChange('newest')}
        >
          Newest
        </button>
        <button
          className={`mini-navbar-button ${currentFilter === 'mostLiked' ? 'active' : ''}`}
          onClick={() => onFilterChange('mostLiked')}
        >
          Most Liked
        </button>
      </div>
    </div>
  );
};

export default MiniNavbar;










