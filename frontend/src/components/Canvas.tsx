import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface CanvasProps {
  mermaidCode: string;
}

const Canvas: React.FC<CanvasProps> = ({ mermaidCode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidCode && containerRef.current) {
        try {
          // Clear any existing diagram
          containerRef.current.innerHTML = "";

          // Render the diagram asynchronously
          const renderResult = await mermaid.render(
            "mermaid-diagram",
            mermaidCode
          );

          // Set the rendered SVG to the container
          containerRef.current.innerHTML = renderResult.svg;
        } catch (error) {
          console.error("Error rendering Mermaid diagram:", error);
        }
      }
    };

    renderDiagram();
  }, [mermaidCode]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full h-full"
    ></div>
  );
};

export default Canvas;
