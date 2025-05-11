import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar(props) {
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search for movie..."
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
      <button onClick={() => props.setShowFilters(!props.showFilters)}>
        <FaFilter id="filter-icon" />
      </button>
    </div>
  );
}

export default SearchBar;
