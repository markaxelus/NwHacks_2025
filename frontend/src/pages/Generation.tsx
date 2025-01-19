import React, { useState, useEffect } from "react";
import Logo from "../assets/MindMap.png";
import DLogo from "../assets/dark/D_Mind_Map.png";
import styles from "../styles/Generation.module.css";

import Ide from "../components/Ide";
import Canvas from "../components/Canvas";
import ChatBox from "../components/ChatBox";

import mermaid from "mermaid";
import { useLocation } from "react-router-dom";
import { useDarkMode } from "../components/DarkMode";

const navLinks = [
  {
    name: "Synapse",
    url: "/",
  },
  {
    name: "Save as...   ",
    url: "",
    className: styles.saveImage,
  },
];

const Generation = () => {
  const location = useLocation();
  const fileName = location.state?.fileName || "";
  const darkMode = useDarkMode();

  const [code, setCode] = useState<string>("");
  const [mermaidCode, setMermaidCode] = useState<string>("");

  const fetchDiagramOutput = async () => {
    try {
      const lamdaUrl = "http://localhost:3000/dev/test";

      const response = await fetch(lamdaUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch diagram output");
      }

      const data = await response.json();

      setCode(data.firstOutput || "No diagram output received");
      setMermaidCode(data.firstOutput || "No diagram output received");
    } catch (error) {
      console.error("Error fetching diagram output:", error);
    }
  };

  useEffect(() => {
    fetchDiagramOutput();
  }, []);

  return (
    
    <div className="">
      {/* Nav Component */}
      <nav
        className={`fixed top-0 w-full flex justify-between items-center py-4 pl-10 font-primary bg-white shadow-md z-50 dark:bg-black`}
      >
        {/* Left : Logo */}
        <div className="flex space-x-4 font-bold text-3xl ">
          <a href={navLinks[0].url} className="flex items-center dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent">
            {Logo && (
              <img src={darkMode ? DLogo : Logo} alt="logo" className="mr-2" />
            )}
            {navLinks[0].name}
          </a>
        </div>

        <div></div>

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
      */}
      <div className="flex h-screen">
        {/* Left Section: editor */}
        <div className="w-1/2 z-10 ">
          <div className="h-[70%] ">
            <Ide code={mermaidCode} setCode={setMermaidCode} />
          </div>
          <div className="h-[30%] m-4 pb-8 ">
            <ChatBox />
          </div>
        </div>

        {/* Container where the Diagram and Chatbox for AI prompts will be placed */}

        <div className="w-1/2  ">
          <div className="w-full h-full flex justify-center items-center ">
            <Canvas mermaidCode={mermaidCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
