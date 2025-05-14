// src/components/Header/Header.jsx
import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Dameer Ahmed</div>
      <nav>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
