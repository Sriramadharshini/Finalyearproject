import { useState } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaCode,
  FaBriefcase,
  FaCertificate,
  FaTrophy,
  FaProjectDiagram
} from "react-icons/fa";
import "../styles/PersonalInfo.css";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

function PersonalInfo() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { saveProfile } = useProfile();
  
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    dob: "",
    nationality: "",
    gender: "",

    // Education
    university: "",
    degree: "",
    field: "",
    graduationYear: "",
    cgpa: "",
    startDate: "",
    endDate: "",
    studyMode: "",

    // Skills
    technicalSkills: "",
    softSkills: "",
    tools: "",
    languages: "",
    experienceLevel: "",

    // Internships
    company: "",
    role: "",
    internshipDuration: "",
    responsibilities: "",
    internshipTech: "",

    // Certifications
    certName: "",
    issueMonthYear: "",

    // Achievements
    yourAchievements: "",

    // Professional
    roleCategory: "",
    specialization: "",
    summary: "",
    careerObjective: ""
  });

  const [projects, setProjects] = useState([
    { title: "", domain: "", description: "", tech: "", duration: "" }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", domain: "", description: "", tech: "", duration: "" }
    ]);
  };

  const removeProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

 const handleSave = async () => {
  setLoading(true);
  
    
    // Format internships as array
    const internships = formData.company
      ? [
          {
            company: formData.company,
            role: formData.role,
            duration: formData.internshipDuration,
            responsibilities: formData.responsibilities,
            technologies: formData.internshipTech
          }
        ]
      : [];

    // Filter out empty projects
    const validProjects = projects.filter(p => p.title.trim() !== "");

    // Prepare data in the format expected by backend
    const finalData = {
      // Personal fields - top level
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      linkedin: formData.linkedin,
      github: formData.github,
      portfolio: formData.portfolio,
      dob: formData.dob,
      nationality: formData.nationality,
      gender: formData.gender,
      
      // Education fields
      university: formData.university,
      degree: formData.degree,
      field: formData.field,
      graduationYear: formData.graduationYear,
      cgpa: formData.cgpa,
      startYear: formData.startDate,
      endYear: formData.endDate,
      studyMode: formData.studyMode,
      
      // Skills
      technicalSkills: formData.technicalSkills,
      softSkills: formData.softSkills,
      tools: formData.tools,
      languages: formData.languages,
      experienceLevel: formData.experienceLevel,
      
      // Internships (array)
      internships: internships,
      
      // Projects (array)
      projects: validProjects.map(p => ({
        title: p.title,
        domain: p.domain,
        description: p.description,
        tech: p.tech,
        duration: p.duration
      })),
      
      // Certifications
      certName: formData.certName,
      certMonthYear: formData.issueMonthYear,
      
      // Achievements
      yourAchievements: formData.yourAchievements,
      
      // Professional
      roleCategory: formData.roleCategory,
      summary: formData.summary,
      careerObjective: formData.careerObjective
    };

    console.log("Submitting data:", finalData);

    try {
    // Your existing code to prepare finalData...
    
    const response = await API.post("/profile/create", finalData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("✅ Full response:", response);
    console.log("✅ Response data:", response.data);
    
    // Check different possible response structures
    if (response.status === 200 || response.status === 201) {
      console.log("✅ Profile saved successfully");
      
      // Try to save to context if needed
      try {
        await saveProfile(finalData);
      } catch (contextError) {
        console.warn("⚠️ Context save error:", contextError);
      }
      
      alert("Profile Created Successfully ✅");
      setLoading(false);
      navigate('/templates');
      return true;
    } else {
      throw new Error("Unexpected response status");
    }
    
  } catch (error) {
    console.error("❌ Full error:", error);
    console.error("❌ Error response:", error.response);
    console.error("❌ Error data:", error.response?.data);
    
    // Show more specific error message
    const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         error.message || 
                         "Error creating profile";
    
    alert(`❌ ${errorMessage}`);
    setLoading(false);
    return false;
  }
};
  const sections = [
    "personal",
    "education",
    "skills",
    "projects",
    "internships",
    "certifications",
    "achievements",
    "professional"
  ];

  const currentIndex = sections.indexOf(activeTab);

  const handleNext = () => {
    if (currentIndex < sections.length - 1)
      setActiveTab(sections[currentIndex + 1]);
  };

  const handleBack = () => {
    if (currentIndex > 0)
      setActiveTab(sections[currentIndex - 1]);
  };

  const renderSection = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="section-card">
            <h2>👤 Personal Information</h2>
            <div className="grid-2">
              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name *" required />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email *" required type="email" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone *" required />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
              <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" />
              <input name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Portfolio" />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" />
              <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="section-card">
            <h2>🎓 Education</h2>
            <div className="grid-2">
              <input name="university" value={formData.university} onChange={handleChange} placeholder="Institution/University *" required />
              <input name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree *" required />
              <input name="field" value={formData.field} onChange={handleChange} placeholder="Field of Study" />
              <input name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="Graduation Year" />
              <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA/Percentage" />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Start Date" />
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="End Date" />
              <select name="studyMode" value={formData.studyMode} onChange={handleChange}>
                <option value="">Study Mode</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Distance">Distance Learning</option>
              </select>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="section-card">
            <h2>💻 Skills</h2>
            <div className="grid-2">
              <textarea 
                name="technicalSkills" 
                value={formData.technicalSkills} 
                onChange={handleChange} 
                placeholder="Technical Skills (comma separated, e.g., JavaScript, React, Node.js)"
                rows="3"
              />
              <textarea 
                name="softSkills" 
                value={formData.softSkills} 
                onChange={handleChange} 
                placeholder="Soft Skills (comma separated, e.g., Communication, Leadership)"
                rows="3"
              />
              <input name="tools" value={formData.tools} onChange={handleChange} placeholder="Tools & Technologies" />
              <input name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages Known" />
              <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
                <option value="">Experience Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="section-card">
            <h2>📂 Projects</h2>
            {projects.map((proj, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h4>Project {index + 1}</h4>
                  {projects.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removeProject(index)}>✕</button>
                  )}
                </div>
                <div className="grid-2">
                  <input 
                    name="title" 
                    value={proj.title} 
                    onChange={(e) => handleProjectChange(index, e)} 
                    placeholder="Project Title" 
                  />
                  <input 
                    name="domain" 
                    value={proj.domain} 
                    onChange={(e) => handleProjectChange(index, e)} 
                    placeholder="Domain" 
                  />
                  <textarea 
                    name="description" 
                    value={proj.description} 
                    onChange={(e) => handleProjectChange(index, e)} 
                    placeholder="Project Description"
                    rows="2"
                  />
                  <input 
                    name="tech" 
                    value={proj.tech} 
                    onChange={(e) => handleProjectChange(index, e)} 
                    placeholder="Technologies Used" 
                  />
                  <input 
                    name="duration" 
                    value={proj.duration} 
                    onChange={(e) => handleProjectChange(index, e)} 
                    placeholder="Duration (e.g., 3 months)" 
                  />
                </div>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={addProject}>+ Add Another Project</button>
          </div>
        );

      case "internships":
        return (
          <div className="section-card">
            <h2>🏢 Internships</h2>
            <div className="grid-2">
              <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" />
              <input name="role" value={formData.role} onChange={handleChange} placeholder="Role/Position" />
              <input name="internshipDuration" value={formData.internshipDuration} onChange={handleChange} placeholder="Duration" />
              <textarea 
                name="responsibilities" 
                value={formData.responsibilities} 
                onChange={handleChange} 
                placeholder="Key Responsibilities"
                rows="3"
              />
              <input name="internshipTech" value={formData.internshipTech} onChange={handleChange} placeholder="Technologies Used" />
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="section-card">
            <h2>📜 Certifications</h2>
            <div className="grid-2">
              <input name="certName" value={formData.certName} onChange={handleChange} placeholder="Certification Name" />
              <input name="issueMonthYear" value={formData.issueMonthYear} onChange={handleChange} placeholder="Issue Month & Year (e.g., June 2024)" />
            </div>
          </div>
        );

      case "achievements":
        return (
          <div className="section-card">
            <h2>🏆 Achievements</h2>
            <textarea 
              name="yourAchievements" 
              value={formData.yourAchievements} 
              onChange={handleChange} 
              placeholder="Your Achievements (awards, hackathons, publications, etc.)"
              rows="5"
            />
          </div>
        );

      case "professional":
        return (
          <div className="section-card">
            <h2>🧾 Professional Summary</h2>
            <div className="grid-2">
              <select name="roleCategory" value={formData.roleCategory} onChange={handleChange}>
                <option value="">Select Target Role Category</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
                <option value="Cybersecurity Specialist">Cybersecurity Specialist</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Project Manager">Project Manager</option>
                <option value="UX Designer">UX Designer</option>
                <option value="UI Designer">UI Designer</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Technical Support">Technical Support</option>
                <option value="IT Consultant">IT Consultant</option>
                <option value="Other">Other</option>
              </select>
              
              {formData.roleCategory === "Other" && (
                <input 
                  name="specialization" 
                  value={formData.specialization} 
                  onChange={handleChange} 
                  placeholder="Please specify your role" 
                />
              )}
              
              <textarea 
                name="summary" 
                value={formData.summary} 
                onChange={handleChange} 
                placeholder="Professional Summary (2-3 sentences about your experience and goals)"
                rows="4"
                className="full-width"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar">
        <h2>Career Insight ✨</h2>
        <ul>
          <li 
            onClick={() => setActiveTab("personal")} 
            className={activeTab === "personal" ? "active" : ""}
          >
            <FaUser /> Personal
          </li>
          <li 
            onClick={() => setActiveTab("education")} 
            className={activeTab === "education" ? "active" : ""}
          >
            <FaGraduationCap /> Education
          </li>
          <li 
            onClick={() => setActiveTab("skills")} 
            className={activeTab === "skills" ? "active" : ""}
          >
            <FaCode /> Skills
          </li>
          <li 
            onClick={() => setActiveTab("projects")} 
            className={activeTab === "projects" ? "active" : ""}
          >
            <FaProjectDiagram /> Projects
          </li>
          <li 
            onClick={() => setActiveTab("internships")} 
            className={activeTab === "internships" ? "active" : ""}
          >
            <FaBriefcase /> Internships
          </li>
          <li 
            onClick={() => setActiveTab("certifications")} 
            className={activeTab === "certifications" ? "active" : ""}
          >
            <FaCertificate /> Certifications
          </li>
          <li 
            onClick={() => setActiveTab("achievements")} 
            className={activeTab === "achievements" ? "active" : ""}
          >
            <FaTrophy /> Achievements
          </li>
          <li 
            onClick={() => setActiveTab("professional")} 
            className={activeTab === "professional" ? "active" : ""}
          >
            <FaUser /> Professional
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <div className="progress-indicator">
            <span>Section {currentIndex + 1} of {sections.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {renderSection()}
        
        <div className="button-group">
          <button 
            onClick={handleBack} 
            disabled={currentIndex === 0 || loading}
            className="secondary-btn"
          >
            ← Back
          </button>
          
          {currentIndex < sections.length - 1 ? (
            <button 
              onClick={handleNext} 
              className="primary-btn"
              disabled={loading}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={async () => {
                const success = await handleSave();
                if (success) {
                  navigate("/templates");
                }
              }}
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit Profile ✓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;