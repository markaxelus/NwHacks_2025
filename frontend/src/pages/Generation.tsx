import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/MindMap.png";
import DLogo from "../assets/dark/D_Mind_Map.png";
import styles from "../styles/Generation.module.css";

import Ide from "../components/Ide";
import Canvas, { ExportFunctions } from "../components/Canvas";
import ChatBox from "../components/ChatBox";

import { useLocation } from "react-router-dom";
import { useDarkMode } from "../components/DarkMode";

const navLinks = [
  {
    name: "Synapse",
    url: "/",
  },
  {
    name: "Save as...",
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

  // Create a ref to access export functions in Canvas
  const canvasRef = useRef<ExportFunctions>(null);

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

  // Handle export based on type
  const handleExport = (type: string) => {
    if (canvasRef.current) {
      switch (type) {
        case "png":
          canvasRef.current.exportAsPng();
          break;
        case "jpeg":
          canvasRef.current.exportAsJpeg();
          break;
        case "pdf":
          canvasRef.current.exportAsPdf();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="">
      {/* Nav Component */}
      <nav
        className={`fixed top-0 w-full flex justify-between items-center py-4 pl-10 font-primary bg-white shadow-md z-50 dark:bg-black`}
      >
        {/* Left : Logo */}
        <div className="flex space-x-4 font-bold text-3xl ">
          <a
            href={navLinks[0].url}
            className="flex items-center dark:bg-clip-text 
              dark:bg-gradient-to-r 
              dark:from-[#60DDD9] 
              dark:to-[#347775]
              dark:text-transparent"
          >
            {Logo && (
              <img src={darkMode ? DLogo : Logo} alt="logo" className="mr-2" />
            )}
            {navLinks[0].name}
          </a>
        </div>

        <div></div>

        {/* Right : Navigation */}
        <div className="flex space-x-8 mr-12">
          {navLinks.map((link, index) => {
            if (link.name.trim() === "Save as...") {
              return (
                <div key={index} className="relative group">
                  <button
                    className={`text-md ${link.className || ""} focus:outline-none`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {link.name}
                  </button>
                  {/* Dropdown Menu */}
                  <div
                    className="absolute right-0 top-full  w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg hidden group-hover:block"
                    role="menu"
                    aria-label="Save as options"
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExport("png");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      PNG
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExport("jpeg");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      JPG
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleExport("pdf");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      PDF
                    </a>
                    {/* Add more options if needed */}
                  </div>
                </div>
              );
            } else {
              return (
                <a
                  key={index}
                  href={link.url}
                  className={`text-md ${link.className || ""}`}
                >
                  {link.name}
                </a>
              );
            }
          })}
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

        <div className="w-1/2">
          <div className="w-full h-full flex justify-center items-center">
            <Canvas ref={canvasRef} mermaidCode={mermaidCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generation;
