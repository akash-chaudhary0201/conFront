import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [suggestedText, setSuggestedText] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setMessage("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select or drop a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://con-back.vercel.app/upload",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      setInputText(response.data.extractedText);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setMessage("File upload failed. Please try again.");
    }
  };

  // Function to handle input for AI Api :-
  const handleAiApi = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cohere.com/v2/chat",
        {
          stream: false,
          model: "command-r",
          messages: [
            {
              role: "user",
              content: `${inputText} this is the content I want you to give me suggestion for engagement improvements in the form of hashtags some bullet points which I can add to make this more better and please don't give answers in more that 100 words.`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer BOa3ZG8Tl8MVAKFXxSRpqbpliHI9yHmTJjsykdDz`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuggestedText(response.data.message.content[0].text);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Upload Your File
          </h1>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg py-10 px-4 flex flex-col items-center justify-center transition ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500 font-medium">Drop the file here...</p>
            ) : (
              <p className="text-gray-500">
                Drag & drop a file here, or{" "}
                <span className="text-blue-500 font-medium cursor-pointer">
                  click to select one
                </span>
              </p>
            )}
          </div>
          {file && (
            <p className="text-gray-700 mt-2">
              Selected File: <span className="font-medium">{file.name}</span>
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:outline-none transition"
          >
            Upload
          </button>
          <button
            onClick={handleAiApi}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 focus:outline-none transition"
          >
            {loading ? "Please Wait..." : "Get Suggestions"}
          </button>
          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("failed")
                  ? "text-red-500"
                  : "text-green-500 font-medium"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-800">Suggestions</h2>
          {suggestedText ? (
            <p className="text-gray-700 mt-2">{suggestedText}</p>
          ) : (
            <p className="text-gray-500 mt-2">No Suggestions Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
