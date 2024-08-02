
import React, { useState } from 'react';

const YouTubeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
            alt="YouTube Logo"
            className="logo-image"
          />
        </div>

        <input
          type="text"
          placeholder="Search"
          className="search-bar"
        />

        <button className="menu-button" onClick={toggleMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>

        <div  className={`navbar-links ${isMenuOpen ? '' : ''}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/" className="nav-link">Trending</a>
          <a href="/" className="nav-link">Subscriptions</a>
          <button className="upload-button">Upload</button>
          <img
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
            alt="User Profile"
            className="profile-image"
          />
        </div>
      </div>
    </nav>
  );
};

export default YouTubeNavbar;
