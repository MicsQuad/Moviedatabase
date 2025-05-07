
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

function SearchBar() {
    return (
      <div className='input-wrapper'>
        <FaSearch id="search-icon"/>
        <input placeholder="Search for movie..."/>
      </div>
    )
}

export default SearchBar