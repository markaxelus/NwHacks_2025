import React from "react";

const ChatBox = ({
  regenerate,
  fileName,
}: {
  regenerate: (fileName: string) => void;
  fileName: string; // Pass fileName as a prop
}) => {
  return (
    <div className="h-full w-full rounded-3xl flex flex-col items-center justify-between filter dark:invert">
      {/* Button Container */}
      <div className="m-4 w-[100%] h-[90%] pl-8 flex items-center justify-right overflow-y-auto filter dark:invert ">
        <button
          onClick={() => regenerate(fileName)} // Call regenerate with fileName
          className="border-2 h-full w-1/5 border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
