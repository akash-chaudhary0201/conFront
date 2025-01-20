This project provides an application that allows users to upload PDF or image files (JPEG/PNG). The server extracts text from the files using optical character recognition (OCR) for images and text parsing for PDFs. Additionally, it integrates an AI API for generating content suggestions to enhance engagement.

Features:
File Upload: Upload PDF, JPEG, or PNG files.
Text Extraction: Extracts text from PDF and images using OCR.
AI Suggestions: Get engagement suggestions for the extracted text, such as hashtags and bullet points.

FRONTEND :- 

The frontend is developed using React.js and React Dropzone to provide a smooth file upload experience. It interacts with the backend API to upload files and display extracted text. It also integrates with the Cohere AI API to provide content suggestions based on the extracted text.
Technologies Used:
React.js
React Dropzone: Drag-and-drop file upload.
Axios: For making HTTP requests.
Cohere AI API: To generate content suggestions

Setup:
1. Clone the repository:
    git clone https://github.com/your-username/repo-name.git
2. Install dependencies:
   cd frontend
    npm install
3. Run the application:
   npm run dev

The frontend will run on http://localhost:5173.


