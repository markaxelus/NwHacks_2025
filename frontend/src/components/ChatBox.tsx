import React from "react";

const ChatBox = ({
  regenerate,
  fileName,
}: {
  regenerate: (fileName: string) => void;
  fileName: string; // Pass fileName as a prop
}) => {
  return (
    <div className="h-full w-full pb-4 bg-gray-900/[0.1] p-4 rounded-3xl flex flex-col items-center justify-between filter dark:invert">
      {/* Button Container */}
      <div className="m-4 w-[95%] h-[70%] flex items-right justify-right overflow-y-auto filter dark:invert">
        <button
          onClick={() => regenerate(fileName)} // Call regenerate with fileName
          className="border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900"
        >
          Regenerate
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
