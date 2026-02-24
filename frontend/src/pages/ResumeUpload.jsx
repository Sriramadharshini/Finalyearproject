import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResumeUpload.css";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a resume first");
      return;
    }

    // Store file name temporarily
    localStorage.setItem("uploadedResume", file.name);

    navigate("/analyze");
  };

  return (
    <div className="resume-wrapper">
      <div className="resume-card">

        <h2>Upload Your Resume 📄</h2>
        <p className="subtitle">
          Select your resume PDF to continue
        </p>

        <div className="drop-zone">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
          />
          <p>Click to Upload Resume</p>
        </div>

        {file && (
          <div className="file-preview">
            <p>Selected File:</p>
            <strong>{file.name}</strong>
          </div>
        )}

        <button
          className="analyze-btn"
          onClick={handleUpload}
        >
          Upload Resume
        </button>

      </div>
    </div>
  );
}

export default ResumeUpload;