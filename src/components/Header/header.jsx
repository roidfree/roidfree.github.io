// src/components/Header/Header.jsx
import React from 'react';
import './header.css'; // Importing specific styles for Header

const Header = () => {
  return (
    <header className="header">
      <h1>Dameer Ahmed</h1>
      <img src='../../assets/images/brain.png' />
      <nav>
        <a href="#about">About Me</a>
        <a href="#projects">Projects</a>
      </nav>
    </header>
  );
};

export default Header;
