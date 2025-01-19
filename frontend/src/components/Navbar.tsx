import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDarkMode } from '../components/DarkMode';
import TLogo from "../assets/MindMap.png"; // Light mode logo
import TDLogo from "../assets/dark/D_Mind_Map.png"; // Dark mode logo
import styles from '../styles/Navbar.module.css';

const navLinks = [
  {
    name: 'Synapse',
    url: '/',
  },
  {
    name: 'Mode',
    className: styles.mode,
  },
  {
    name: 'Explore Product',
    url: '/generation',
    className: styles.exploreproduct,
  },
];

const hideNav = ['/generation'];

const Navbar = () => {
  const location = useLocation();
  const darkMode = useDarkMode(); 

  const shouldHideNav = hideNav.includes(location.pathname);

  if (shouldHideNav) {
    return null; // Don't render the navbar on specific routes
  }

  return (
    <nav
      className={`fixed top-0 w-full flex justify-between items-center py-4 pl-10 font-primary bg-white dark:bg-black`}
    >
      {/* Left: Logo */}
      <div className="flex space-x-4 font-bold text-3xl ">
        <a href={navLinks[0].url} className="flex items-center dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent">
          {/* Render logo based on dark mode */}
          <img
            src={darkMode ? TDLogo : TLogo}
            alt="logo"
            className="mr-2"
          />
          {navLinks[0].name}
        </a>
      </div>

      {/* Right: Navigation */}
      <div className="space-x-8 mr-20">
        {navLinks.slice(1).map((link, index) => (
          <a
            key={index}
            href={link.url}
            className={`text-md ${link.className || ''}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
