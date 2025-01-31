import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('name');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim(), searchOption);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search by Name, Profession or Location"
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <div className='search-buttons'>
      <select
        value={searchOption}
        onChange={handleOptionChange}
        className="search-option"
      >
        <option value="name">Name</option>
        <option value="profession">Profession</option>
        <option value="location">Location</option>
      </select>
      <button type="submit" className="search-button">
        Search
      </button>
      </div>
    </form>
  );
};

export default SearchBar;
