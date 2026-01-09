import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, disabled }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !disabled) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products (e.g., iPhone 15, Laptop, Headphones)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={disabled}
        />
        <button
          type="submit"
          className="search-button"
          disabled={disabled || !query.trim()}
        >
          {disabled ? 'Searching...' : '🔍 Search'}
        </button>
      </form>
      <div className="platform-tags">
        <span className="platform-tag">Amazon</span>
        <span className="platform-tag">Flipkart</span>
        <span className="platform-tag">Myntra</span>
        <span className="platform-tag">Nykaa</span>
        <span className="platform-tag">+ More</span>
      </div>
    </div>
  );
}

export default SearchBar;
