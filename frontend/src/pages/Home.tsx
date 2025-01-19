import React from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../components/DarkMode";

import MLogo from "../assets/MindMap.png";
import MDLogo from "../assets/dark/2_D_Mind_Map.png";
import ArrowDown from "../assets/arrow-down.png";

import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  // If your DarkModeContext returns an object { darkMode, toggleDarkMode },
  // use destructuring. Otherwise, if it just returns a boolean, useDarkMode() as is.
  const { darkMode } = useDarkMode(); 

  return (
    <div
      id="home"
      className="
        flex 
        flex-col 
        items-center 
        justify-center 
        text-center 
        h-[110vh] 
        pb-[2rem] 
        space-y-12
      "
    >
      {/* Navbar (has the toggle button) */}
      <Navbar />

      {/* Heading: gradient in dark mode */}
      <h1
        className="
          text-4xl 
          font-bold 
          dark:text-transparent 
          dark:bg-clip-text 
          dark:bg-gradient-to-r 
          dark:from-[#60DDD9] 
          dark:to-[#347775]
        "
      >
        Welcome to Synapse
      </h1>

      {/* Logo: MLogo for light, MDLogo for dark */}
      <img
        src={darkMode ? MDLogo : MLogo}
        alt="logo"
        className="w-[100px] h-[100px]"
      />

      {/* Description */}
      <div className="font-bold">
        <p>
          Discover a faster, clearer way to learn! Upload PDFs and watch them <br />
          transform into easy-to-understand diagrams designed for visual thinkers
        </p>
      </div>

      {/* Button -> navigate to /upload */}
      <button
        onClick={() => navigate("/upload")}
        className="
          border-2 border-black 
          px-14 py-2 
          rounded-lg 
          text-white 
          bg-primary 
          dark:bg-gradient-to-r 
          dark:from-[#60DDD9] 
          dark:to-[#347775]
          transition 
          duration-300 
          ease-in-out
        "
      >
        Generate a Diagram
      </button>

      {/* Scroll-down arrow */}
      <div className="pt-4">
        <a href="#process">
          <button
            className="
              border-2 
              border-black 
              p-3 
              rounded-full 
              filter 
              dark:invert
            "
          >
            <img
              src={ArrowDown}
              alt="arrow-down"
              className="
                w-6 
                h-6 
                transform 
                transition-transform 
                duration-300 
                ease-in-out 
                hover:scale-60 
                hover:translate-y-1
              "
            />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
