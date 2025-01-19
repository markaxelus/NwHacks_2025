import React, { useEffect, useState } from "react";
import { useDarkMode } from "../components/DarkMode";

import MLogo from "../assets/MindMap.png";
import MDLogo from "../assets/dark/2_D_Mind_Map.png";
import ArrowDown from "../assets/arrow-down.png";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const darkMode = useDarkMode();

  return (
    <div
      id="home"
      className="flex justify-center items-center pb-[2rem] h-[110vh] flex-col space-y-12 text-center 
      "
    >
      <Navbar />
      <h1 className="
      font-bold text-4xl dark:text-transparent 
        dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775] ">
        Welcome to Synapse</h1>
      <img src={darkMode ? MDLogo : MLogo} alt="logo" className="w-[100px] h-[100px]" />

      <div className="font-bold">
        <p>
          Discover a faster, clearer way to learn! Upload PDFs and watch them <br />
          transform into easy-to-understand diagrams designed for visual thinkers
        </p>
      </div>

      <button
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
        onClick={() => navigate("/upload")}
      >
        Generate a Diagram
      </button>

      <div className="pt-4">
        <a href="#process">
          <button className="border-2 border-black p-3 rounded-full filter dark:invert">
            <img
              src={ArrowDown}
              alt="arrow-down"
              className="w-6 h-6 transition-transform duration-300 ease-in-out transform hover:scale-60 hover:translate-y-1 "
            />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Home;
