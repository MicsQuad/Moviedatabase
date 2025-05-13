import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
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
      <button
        className="search-bar-button"
        onClick={() =>
          props.showFilters === "movieDetails"
            ? props.setShowFilters("none")
            : props.setShowFilters("movieDetails")
        }
      >
        <FaFilter id="filter-icon" />
      </button>
      {/* {localStorage.getItem("isLoggedIn") === "true" && (
        <button
          className="search-bar-button"
          onClick={() =>
            props.showFilters === "libraryStatus"
              ? props.setShowFilters("none")
              : props.setShowFilters("libraryStatus")
          }
        >
          <FaBookOpen id="library-icon" />
        </button>
      )} */}
      <button
        className="search-bar-button"
        onClick={() =>
          props.showFilters === "libraryStatus"
            ? props.setShowFilters("none")
            : props.setShowFilters("libraryStatus")
        }
      >
        <FaBookOpen id="library-icon" />
      </button>
    </div>
  );
}

export default SearchBar;
