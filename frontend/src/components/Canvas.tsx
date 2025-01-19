import React, { useEffect } from "react";
import mermaid from "mermaid";

interface CanvasProps {
  mermaidCode: string;
}

const Canvas: React.FC<CanvasProps> = ({ mermaidCode }) => {
  useEffect(() => {
    // Initialize and trigger Mermaid rendering
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  
  return (
    <div className="flex justify-center items-center  ">
      {/* Mermaid diagram will replace this <pre> */}
      <pre className="mermaid">
          {`
          ${mermaidCode}
          `}
        </pre>
    </div>
  );
};

export default Canvas;
