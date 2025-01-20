import React, { useEffect, useRef, useImperativeHandle } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CanvasProps {
  mermaidCode: string;
}

export interface ExportFunctions {
  exportAsPng: () => void;
  exportAsJpeg: () => void;
  exportAsPdf: () => void;
}

const Canvas = React.forwardRef<ExportFunctions, CanvasProps>(({ mermaidCode }, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRendering, setIsRendering] = React.useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidCode && containerRef.current) {
        try {
          setIsRendering(true);
          containerRef.current.innerHTML = "";

          // Initialize mermaid if not already initialized
          mermaid.initialize({ startOnLoad: false });

          // Render the diagram asynchronously
          const renderResult = await mermaid.render("mermaid-diagram", mermaidCode);

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

  // Export as PNG
  const exportAsPng = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "diagram.png";
        link.click();
      } catch (error) {
        console.error("Error exporting diagram as PNG:", error);
      }
    }
  };

  // Export as JPEG
  const exportAsJpeg = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);
        const image = canvas.toDataURL("image/jpeg", 1.0); 

        const link = document.createElement("a");
        link.href = image;
        link.download = "diagram.jpg";
        link.click();
      } catch (error) {
        console.error("Error exporting diagram as JPEG:", error);
      }
    }
  };

  // Export as PDF
  const exportAsPdf = async () => {
    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);
        const image = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(image, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("diagram.pdf");
      } catch (error) {
        console.error("Error exporting diagram as PDF:", error);
      }
    }
  };

  // Expose the export functions to the parent component
  useImperativeHandle(ref, () => ({
    exportAsPng,
    exportAsJpeg,
    exportAsPdf,
  }));

  return (
    <div className="w-full h-full pt-24">
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full h-full"
      ></div>
      {isRendering && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <span>Rendering...</span>
        </div>
      )}
    </div>
  );
});

export default Canvas;
