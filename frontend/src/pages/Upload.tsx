// src/components/UploadPage.jsx
import React, { useState, ChangeEvent } from "react";
import styles from "../styles/Upload.module.css";
import { useNavigate } from "react-router-dom";
import Trash from "../assets/Icon.png";
import axios from "axios";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      setError(null);
    } else {
      console.log("No file uploaded");
      setUploadedFile(null);
    }
  };

  const handleFileDelete = () => {
    setUploadedFile(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!uploadedFile) {
      setError("No file uploaded.");
      return;
    }
    const apiUrl = "http://localhost:3000/dev/test";

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setUploading(false);
      // Navigate to the generation page or show success message
      navigate("/generation");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || "An error occurred during upload."
      );
      setUploading(false);
    }
    // Trigger Lambda
    try {
      const lambdaResponse = await fetch(apiUrl, {
        method: "GET",
      });
      const result = await lambdaResponse.json();
      console.log("Lambda Response:", result);
    } catch (err) {
      console.error("Error invoking Lambda", err);
    }
  };

  return (
    <div
      className={`${styles.uploadPageContainer} h-[100vh] flex justify-center items-center text-center`}
    >
      <div className="w-full h-full justify-center items-center flex flex-col space-y-3">
        <h1 className="font-bold text-4xl ">Welcome to Synapse</h1>

        {/* Upload PDF Box */}
        {uploadedFile ? (
          <div className="bg-white w-5/12 rounded-xl shadow-xl text-left p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="font-bold text-xl">Upload a PDF</h2>
              <p>
                Please upload a file in pdf format and make sure the file size
                is under 5 MB.
              </p>
            </div>

            <div className="flex bg-pdfbg h-16 items-center px-4 py-2 rounded-xl space-x-3">
              <img
                src={Trash}
                alt="Delete"
                className="w-7 h-7 cursor-pointer"
                onClick={handleFileDelete}
              />
              <div>{uploadedFile.name}</div>
            </div>

            {/* Cancel & Generate Button */}
            <div className="flex justify-center space-x-4 w-full font-bold">
              <button
                className="border-2 border-gray-300 px-14 py-2 rounded-lg text-primary bg-secondary mr-4 w-1/2"
                onClick={() => navigate("/")}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                className="border-2 border-black px-14 py-2 rounded-lg text-white bg-primary w-1/2"
                onClick={handleGenerate}
                disabled={uploading}
              >
                {uploading ? "Generating..." : "Generate"}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        ) : (
          <div className="bg-white w-5/12 rounded-xl shadow-xl text-left p-6 space-y-8">
            <div className="space-y-2">
              <h2 className="font-bold text-xl">Upload a PDF</h2>
              <p>
                Please upload a file in pdf format and make sure the file size
                is under 5 MB.
              </p>
            </div>

            <div className="flex flex-col font-bold border-dashed border-2 border-gray-900 rounded-xl h-24 hover:border-gray-400">
              <label
                htmlFor="upload"
                className="flex w-full h-24 items-center justify-center text-center bg-gray-900/[.10] px-8 py-2 text-left cursor-pointer"
              >
                Drop file or Browse <br />
                Format: pdf & Max file size: 5MB
              </label>
              <input
                type="file"
                id="upload"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Cancel Button */}
            <div className="flex justify-center space-x-4 w-full font-bold">
              <button
                className="border-2 border-gray-300 px-14 py-2 rounded-lg text-primary bg-secondary mr-4 w-1/2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
