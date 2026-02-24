import { useState } from "react";
import "../styles/ResumeUpload.css";

function ResumeAnalyze() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const resumeName = localStorage.getItem("uploadedResume");

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {

      // 🔥 Simulated Section Scores
      const sectionScores = {
        personal: Math.floor(Math.random() * 20) + 80,
        education: Math.floor(Math.random() * 20) + 70,
        skills: Math.floor(Math.random() * 25) + 65,
        projects: Math.floor(Math.random() * 30) + 60,
        certifications: Math.floor(Math.random() * 20) + 70,
        professional: Math.floor(Math.random() * 25) + 65
      };

      // 🔥 Calculate Overall Score
      const overall =
        (sectionScores.personal * 0.10) +
        (sectionScores.education * 0.15) +
        (sectionScores.skills * 0.25) +
        (sectionScores.projects * 0.25) +
        (sectionScores.certifications * 0.10) +
        (sectionScores.professional * 0.15);

      setResults({
        ...sectionScores,
        overall: Math.round(overall)
      });

      setAnalyzing(false);

    }, 2000);
  };

  return (
    <div className="resume-wrapper">
      <div className="resume-card">

        <h2>Resume Analysis Report 📊</h2>

        <div className="file-preview">
          <p>Uploaded Resume:</p>
          <strong>{resumeName}</strong>
        </div>

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
        >
          {analyzing ? "Analyzing..." : "Analyze Resume"}
        </button>

        {results && (
          <div style={{ marginTop: "30px", textAlign: "left" }}>

            <h3>Section Scores</h3>

            <ScoreBar title="Personal Information" value={results.personal} />
            <ScoreBar title="Education" value={results.education} />
            <ScoreBar title="Skills" value={results.skills} />
            <ScoreBar title="Projects" value={results.projects} />
            <ScoreBar title="Certifications" value={results.certifications} />
            <ScoreBar title="Professional Summary" value={results.professional} />

            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <h2>Overall Resume Score</h2>
              <div style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "#6366f1"
              }}>
                {results.overall}%
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// 🔥 Reusable Score Bar Component
function ScoreBar({ title, value }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <p style={{ marginBottom: "5px" }}>{title}</p>
      <div style={{
        background: "#e2e8f0",
        borderRadius: "10px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${value}%`,
          padding: "8px",
          background: "linear-gradient(90deg,#6366f1,#06b6d4)",
          color: "white",
          fontSize: "13px",
          fontWeight: "600"
        }}>
          {value}%
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyze;