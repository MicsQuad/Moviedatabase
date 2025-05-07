
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

function SearchBar(props) {
    return (
      <div className='input-wrapper'>
        <FaSearch id="search-icon"/>
        <input placeholder="Search for movie..." value={props.value} onChange={(e) => props.setValue(e.target.value)}/>
      </div>
    )
}

export default SearchBar