import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import { FaUserCircle, FaChevronDown } from "react-icons/fa"; // To get icons
import { LuMenu } from "react-icons/lu";


function Header(props) {
  const userExists = !!localStorage.getItem("user")

const handleLogout = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  window.location.href = "/index.html"
}

function logoutAlert() {
  const choice = confirm("Are you sure you want to log out?")

  if (choice) {
    handleLogout()
  } else {
  }
}
  return (
    <header className="header">
      <a href="about.html"><h2 className="header-about">About</h2></a>
      {userExists ? (
        <a href="index.html">
          <h1 className="header-app-name" 
        style={
        { marginLeft: 101
        }
      }>MovieMaze</h1>
      </a>

      ) : (
        <a href="index.html"><h1 className="header-app-name">MovieMaze</h1></a>
      )}
      
      <div className="header-user">
        {userExists ? (
          <button className="header-user-btn" onClick={logoutAlert} 
          style={{ 
              marginRight: -46, 
              marginBottom: -11,
              paddingTop: 12
            }}>
          <p id="logout">Logout</p> <FaUserCircle />
          </button>
            
        ) : (

          <a href="Login.html" className="header-user-btn">
            <FaUserCircle />
          </a>
        )}
      </div>
      
    </header>
  );
}

export default Header;
