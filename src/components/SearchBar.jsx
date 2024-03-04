import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by name, profession, or location"
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
