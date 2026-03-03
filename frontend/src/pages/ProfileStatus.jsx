import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';
import './ProfileStatus.css';
import { useProfile } from "../context/ProfileContext";  

const ProfileStatus = () => {
  const { profile, profileCompletion, getMissingSections } = useProfile();
  const navigate = useNavigate();

  if (!profile) return null;

  const missingSections = getMissingSections();
  const isComplete = missingSections.length === 0;

  return (
    <div className="profile-status-card">
      <div className="status-header">
        <h3>Profile Completion</h3>
        <span className={`completion-badge ${isComplete ? 'complete' : 'incomplete'}`}>
          {profileCompletion}%
        </span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${profileCompletion}%` }}
        ></div>
      </div>

      {!isComplete && (
        <div className="missing-sections">
          <p>Missing sections:</p>
          <div className="section-tags">
            {missingSections.map(section => (
              <span key={section} className="section-tag">
                {section}
              </span>
            ))}
          </div>
          <button 
            className="complete-now-btn"
            onClick={() => navigate('/profile/personal')}
          >
            Complete Profile
          </button>
        </div>
      )}

      {isComplete && (
        <div className="profile-complete-message">
          <span className="complete-icon">✅</span>
          <p>Your profile is complete! Ready to generate resumes.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;