import React from "react";
import { useDarkMode } from "../components/DarkMode";

import Sparkling from "../assets/Sparkling.png";
import DSparkling from "../assets/dark/DSparkling.png";

const ChatBox = ({
  regenerate,
  fileName,
}: {
  regenerate: (fileName: string) => void;
  fileName: string; // Pass fileName as a prop
}) => {

  const { darkMode } = useDarkMode(); 
  return (
    <div className=" w-full rounded-3xl filter dark:invert">
      {/* Button Container */}
      <div className="m-24 h-[40%] overflow-y-auto  filter dark:invert ">
        <button
          onClick={() => regenerate(fileName)} // Call regenerate with fileName
          className="border-2 flex justify-between items-center border-black dark:border-white w-[35%] px-12 py-2 rounded  hover:text-gray-500 transition duration-300 ease-in-out dark:bg-gradient-to-r 
          dark:from-[#60DDD9] 
          dark:to-[#347775]"
        >
          Regenerate
          <img src={darkMode ? DSparkling : Sparkling} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
