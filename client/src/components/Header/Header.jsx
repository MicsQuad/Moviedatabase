import React from 'react';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa'; // To get icons
import { LuMenu } from "react-icons/lu";

function Header() {
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
        <SearchBar />
        
        <button className="header-user-btn header-btn">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
}

export default Header;
