import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CanvasProps {
  mermaidCode: string;
}

const Canvas: React.FC<CanvasProps> = ({ mermaidCode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRendering, setIsRendering] = React.useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidCode && containerRef.current) {
        try {
          setIsRendering(true);
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
        } finally {
          setIsRendering(false);
        }
      }
    };

    renderDiagram();
  }, [mermaidCode]);

  const exportAsImage = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "diagram.png";
        link.click();
      } catch (error) {
        console.error("Error exporting diagram as image:", error);
      }
    }
  };

  const exportAsPdf = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);
        const image = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgWidth = 210; // A4 paper width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(image, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("diagram.pdf");
      } catch (error) {
        console.error("Error exporting diagram as PDF:", error);
      }
    }
  };

  return (
    <div className="w-full h-full">
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full h-full"
      ></div>
    </div>
  );
};

export default Canvas;
