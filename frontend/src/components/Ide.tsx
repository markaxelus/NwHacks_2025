import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useDarkMode } from "../components/DarkMode";

interface IdeProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const Ide: React.FC<IdeProps> = ({ code, setCode }) => {
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };
  const darkMode = useDarkMode();

  return (
    <div className="h-full w-full border-r-2 border-gray-200 filter dark:invert">
      <Editor
        height="100%"
        width="100%"
        language="mermaid"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollbar: {
            vertical: "auto",
          },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
        className="pt-24"
      />
    </div>
  );
};

export default Ide;
