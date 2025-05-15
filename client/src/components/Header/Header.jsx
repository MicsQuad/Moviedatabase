import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import { FaUserCircle, FaChevronDown } from "react-icons/fa"; // To get icons
import { LuMenu } from "react-icons/lu";

function Header(props) {
  return (
    <header className="header">
      <a href="about.html"><h2 className="header-about">About</h2></a>
      <a href="index.html"><h1 className="header-app-name">MovieMaze</h1></a>
      <a href="Login.html" className="header-user-btn">
        <FaUserCircle />
      </a>
    </header>
  );
}

export default Header;
