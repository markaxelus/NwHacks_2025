import React, { useState, useEffect } from "react";
import Logo from "../assets/MindMap.png";
import styles from "../styles/Generation.module.css";



const navLinks = [
  {
    name: "Link",
    url: "/",
    icon: Logo,
  },
  {
    name: "Save as Image",
    url: "",
    className: styles.saveImage,
  },
  {
    name: "Finish Editing",
    url: "",
    className: styles.finish,
  },
];

const Diagram = () => {


  return (
    <div className="">
      {/* Nav Component */}
      <nav
        className={`fixed top-0 w-full flex justify-between items-center py-4 pl-10 font-primary bg-white shadow-md z-50`}
      >
        {/* Left : Logo */}
        <div className="flex space-x-4 font-bold text-3xl ">
          <a href={navLinks[0].url} className="flex items-center ">
            {navLinks[0].icon && (
              <img src={navLinks[0].icon} alt="logo" className="mr-2" />
            )}
            {navLinks[0].name}
          </a>
        </div>

        <div>Instructions if needed</div>

        {/* Right : Navigation */}
        <div className="space-x-8 mr-12 ">
          {navLinks.slice(1).map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`text-md ${link.className || ""}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Diagram Component 
                    1. IDE for code
                    2. Canvas for Diagram
                    3. AI Chatbox
                Note: Each container must have adjustable width with a slider
                      The Canvas container must be draggable (possibly infinite, check requirements)*/}
     
    </div>
  );
};

export default Diagram;
