import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaFileUpload } from "react-icons/fa";
import "../styles/Onboarding.css";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-wrapper">
      <div className="onboarding-container">

        <h1>Welcome to Career Insight ✨</h1>
        <p className="subtitle">
          Let’s build your professional journey step by step 🎯
        </p>

        <div className="option-grid">

          {/* Create Profile */}
          <div
            className="option-card glass"
            onClick={() => navigate("/PersonalInfo")}
          >
            <div className="icon-circle">
              <FaUserEdit size={30} />
            </div>
            <h3>👤 Create Profile</h3>
            <p>
              Enter your academic and personal details to build your
              professional profile.
            </p>
          </div>

          {/* Upload Resume */}
          <div
            className="option-card glass"
            onClick={() => navigate("/resume-upload")}
          >
            <div className="icon-circle">
              <FaFileUpload size={30} />
            </div>
            <h3>📄 Upload Resume</h3>
            <p>
              Upload your resume and get AI-based skill gap analysis instantly.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Onboarding;
