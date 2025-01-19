import React, { useState, useEffect } from "react";
import Logo from "../assets/MindMap.png";
import styles from "../styles/Generation.module.css";

import Ide from "../components/Ide";
import Canvas from "../components/Canvas";
import ChatBox from "../components/ChatBox";

import mermaid from "mermaid";

const navLinks = [
  {
    name: "Synapse",
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

const Generation = () => {
  const [code, setCode] = useState<string>(`
    connect lambda here

        `);

    const [mermaidCode, setMermaidCode] = useState<string>(`
      graph TD;
        A[Start] --> B{Decision};
        B -->|Yes| C[Do Something];
        B -->|No| D[Do Nothing];
        C --> D;
    `);



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
      */}
      <div className="flex h-screen">
        {/* Left Section: editor */}
          <div className="w-1/2 ide-background">
            <div className="h-45%]">
              <Ide code={code} setCode={setCode} />
            </div>

            <div className=" ">
              
              <ChatBox />
            </div>
          </div>

        {/* Container where the Diagram and Chatbox for AI prompts will be placed */}

        <div className="w-1/2 mx-8 mt-28 mb-8 bg-gray-900/[0.1] rounded-3xl">
          <div className="h-[85%]">
            <Canvas mermaidCode={mermaidCode}/>
          </div>
        </div>  

      </div>
    </div>
  );
};

export default Generation;
