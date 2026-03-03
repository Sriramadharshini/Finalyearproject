import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ResumePreview.css";

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [resumeData, setResumeData] = useState(null);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    // Get data passed from Templates page
    if (location.state) {
      setTemplate(location.state.template);
      setResumeData(location.state.profile);
    }
  }, [location.state]);

  if (!resumeData || !template) {
    return (
      <div className="error-container">
        <h2>No Data Found</h2>
        <button onClick={() => navigate('/templates')}>
          Back to Templates
        </button>
      </div>
    );
  }

  // Helper to split comma-separated skills
  const getSkillsArray = (skills) => {
    if (!skills) return [];
    return skills.split(',').map(s => s.trim());
  };

  // Modern Professional Template
  const renderModernTemplate = () => (
    <div className="resume-modern">
      {/* Header with User Data */}
      <div className="modern-header" style={{ background: template.color }}>
        <h1>{resumeData.fullName || 'Your Name'}</h1>
        <p className="title">{resumeData.roleCategory || 'Professional'}</p>
        <div className="contact-info">
          {resumeData.email && <span>📧 {resumeData.email}</span>}
          {resumeData.phone && <span>📞 {resumeData.phone}</span>}
          {resumeData.location && <span>📍 {resumeData.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="section">
          <h2>Professional Summary</h2>
          <p>{resumeData.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="two-column">
        {/* Left Column */}
        <div className="left-col">
          {/* Education */}
          {(resumeData.university || resumeData.degree) && (
            <div className="section">
              <h2>Education</h2>
              <div className="education-item">
                <h3>{resumeData.degree}</h3>
                <p className="institution">{resumeData.university}</p>
                <p className="year">{resumeData.graduationYear}</p>
                {resumeData.cgpa && <p>CGPA: {resumeData.cgpa}</p>}
              </div>
            </div>
          )}

          {/* Links */}
          {(resumeData.linkedin || resumeData.github || resumeData.portfolio) && (
            <div className="section">
              <h2>Links</h2>
              {resumeData.linkedin && <p>🔗 LinkedIn: {resumeData.linkedin}</p>}
              {resumeData.github && <p>🐙 GitHub: {resumeData.github}</p>}
              {resumeData.portfolio && <p>🌐 Portfolio: {resumeData.portfolio}</p>}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-col">
          {/* Skills */}
          {resumeData.technicalSkills && (
            <div className="section">
              <h2>Technical Skills</h2>
              <div className="skills-list">
                {getSkillsArray(resumeData.technicalSkills).map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {resumeData.softSkills && (
            <div className="section">
              <h2>Soft Skills</h2>
              <p>{resumeData.softSkills}</p>
            </div>
          )}

          {resumeData.tools && (
            <div className="section">
              <h2>Tools</h2>
              <p>{resumeData.tools}</p>
            </div>
          )}

          {resumeData.languages && (
            <div className="section">
              <h2>Languages</h2>
              <p>{resumeData.languages}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Minimal Elegant Template
  const renderMinimalTemplate = () => (
    <div className="resume-minimal">
      <div className="minimal-header">
        <h1>{resumeData.fullName || 'Your Name'}</h1>
        <p className="subtitle">{resumeData.roleCategory || 'Professional'}</p>
        <div className="minimal-contact">
          {resumeData.email && <div>✉️ {resumeData.email}</div>}
          {resumeData.phone && <div>📱 {resumeData.phone}</div>}
        </div>
      </div>

      {resumeData.summary && (
        <div className="minimal-section">
          <h2>About</h2>
          <p>{resumeData.summary}</p>
        </div>
      )}

      <div className="minimal-grid">
        <div className="minimal-col">
          <h2>Education</h2>
          <div className="minimal-item">
            <h3>{resumeData.degree}</h3>
            <p>{resumeData.university}</p>
            <p className="date">{resumeData.graduationYear}</p>
          </div>
        </div>

        <div className="minimal-col">
          <h2>Skills</h2>
          <div className="minimal-skills">
            {getSkillsArray(resumeData.technicalSkills).map((skill, i) => (
              <span key={i} className="minimal-skill">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render based on selected template
  const renderResume = () => {
    switch(template.id) {
      case 1:
        return renderModernTemplate();
      case 2:
        return renderMinimalTemplate();
      case 3:
        return renderModernTemplate(); // Add more templates as needed
      case 4:
        return renderMinimalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="preview-page">
      <div className="preview-header">
        <button onClick={() => navigate('/templates')}>← Back</button>
        <h2>Resume Preview</h2>
        <button onClick={() => window.print()}>Download PDF</button>
      </div>

      <div className="resume-container">
        {renderResume()}
      </div>
    </div>
  );
};

export default ResumePreview;