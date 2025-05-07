import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'; // To get icons
import { LuMenu } from "react-icons/lu";

function Header(props) {
  return (
    <header className="header">
      <div className="header-left-side">
        <button className="header-menu-btn header-btn">
          <LuMenu />
        </button>
        <h1 className="header-app-name">MovieMaze</h1>
        <button className="header-dropdown-btn header-btn">
          <FaChevronDown className="header-dropdown-icon" />
        </button>
      </div>
      
      <div className="header-right-side">
        <SearchBar value={props.searchText} setValue={props.setSearchText} />
        
        <a href='Login.html' className="header-user-btn header-btn">
          <FaUserCircle />
        </a>
      </div>
    </header>
  );
}

export default Header;
