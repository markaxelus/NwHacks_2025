import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDarkMode } from '../components/DarkMode'; 
import TLogo from "../assets/MindMap.png"; // Light mode logo
import TDLogo from "../assets/dark/D_Mind_Map.png"; // Dark mode logo
import styles from '../styles/Navbar.module.css';
import Sun from '../assets/sun.png';
import Moon from '../assets/moon.png';

const navLinks = [
  {
    name: 'Synapse',
    url: '/',
  },
  // This entry used to point to "Mode"
  {
    name: 'Mode',
    className: `${styles.mode} `,
  },
  {
    name: 'Explore Product',
    url: '/generation',
    className: `${styles.exploreproduct} dark:bg-gradient-to-r 
          dark:from-[#60DDD9] 
          dark:to-[#347775]
          dark:text-black`,
  },
];

// Hide the entire navbar on these routes
const hideNav = ['/generation'];

const Navbar = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const shouldHideNav = hideNav.includes(location.pathname);
  if (shouldHideNav) {
    return null;
  }

  return (
    <nav
      className="fixed top-0 w-full flex justify-between items-center py-4 pl-10 font-primary 
                 bg-white dark:bg-black"
    >
      {/* Left: Logo */}
      <div className="flex space-x-4 font-bold text-3xl ">
        <a
          href={navLinks[0].url}
          className="flex items-center 
                     dark:bg-clip-text 
                     dark:bg-gradient-to-r 
                     dark:from-[#60DDD9] 
                     dark:to-[#347775]
                     dark:text-transparent"
        >
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
        {/* Mode button */}
        <button onClick={toggleDarkMode} className={`text-md ${styles.mode} filter dark:invert`}>
        {darkMode ? (
          <img src={Sun} className="w-4 h-4 object-contain filter dark:invert" />
        ) : (
          <img src={Moon} className="w-4 h-4 object-contain" />
        )}
      </button>


        {/* Explore Product link */}
        <a
          href={navLinks[2].url}
          className={`text-md ${navLinks[2].className || ''}`}
        >
          {navLinks[2].name}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
