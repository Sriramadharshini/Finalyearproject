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

function PersonalInfo() {
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("personal");

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
    plusTwo: "",
    tenth: "",
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
    certOrg: "",
    certYear: "",
    certLink: "",

    // Achievements
    hackathons: "",
    leadership: "",
    extraCurricular: "",

    // Professional
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

  const handleSave = async () => {
  // Ensure internships is an array for backend
  const internships = formData.company
  ? [
      {
        company: formData.company,
        role: formData.role,
        internshipDuration: formData.internshipDuration,
        responsibilities: formData.responsibilities,
        internshipTech: formData.internshipTech
      }
    ]
  : [];

  // Ensure certifications is an object even if fields are empty
  const certifications = {
    certName: formData.certName,
    certOrg: formData.certOrg,
    certYear: formData.certYear,
    certLink: formData.certLink
  };

  const achievements = {
    hackathons: formData.hackathons,
    leadership: formData.leadership,
    extraCurricular: formData.extraCurricular
  };

  const professional = {
    summary: formData.summary,
    careerObjective: formData.careerObjective
  };

  const finalData = {
    personal: {
      fullname: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      linkedin: formData.linkedin,
      github: formData.github,
      portfolio: formData.portfolio,
      dob: formData.dob,
      nationality: formData.nationality,
      gender: formData.gender
    },
    education: {
      university: formData.university,
      degree: formData.degree,
      field: formData.field,
      graduationYear: formData.graduationYear,
      cgpa: formData.cgpa,
      plusTwo: formData.plusTwo,
      tenth: formData.tenth,
      studyMode: formData.studyMode
    },
    skills: {
      technicalSkills: formData.technicalSkills,
      softSkills: formData.softSkills,
      tools: formData.tools,
      languages: formData.languages,
      experienceLevel: formData.experienceLevel
    },
    internships: internships,      // now always array
    projects: projects,            // already an array
    certifications: certifications,
    achievements: achievements,
    professional: professional
  };

  try {
    const response = await API.post("/profile/create", finalData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Backend Response:", response.data);
    alert("Profile Created Successfully ✅");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    alert("Error creating profile ❌");
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
              <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
              <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
              <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub URL" />
              <input name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="Portfolio" />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              <input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" />
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        );

      case "education":
        return (
          <div className="section-card">
            <h2>🎓 Education</h2>
            <div className="grid-2">
              <input name="university" value={formData.university} onChange={handleChange} placeholder="University" />
              <input name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" />
              <input name="field" value={formData.field} onChange={handleChange} placeholder="Field" />
              <input name="graduationYear" value={formData.graduationYear} onChange={handleChange} placeholder="Graduation Year" />
              <input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="CGPA" />
              <input name="plusTwo" value={formData.plusTwo} onChange={handleChange} placeholder="12th %" />
              <input name="tenth" value={formData.tenth} onChange={handleChange} placeholder="10th %" />
              <select name="studyMode" value={formData.studyMode} onChange={handleChange}>
                <option value="">Mode</option>
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="section-card">
            <h2>💻 Skills</h2>
            <textarea name="technicalSkills" value={formData.technicalSkills} onChange={handleChange} placeholder="Technical Skills" />
            <textarea name="softSkills" value={formData.softSkills} onChange={handleChange} placeholder="Soft Skills" />
            <input name="tools" value={formData.tools} onChange={handleChange} placeholder="Tools & Technologies" />
            <input name="languages" value={formData.languages} onChange={handleChange} placeholder="Languages Known" />
            <input name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} placeholder="Experience Level" />
          </div>
        );

      case "projects":
        return (
          <div className="section-card">
            <h2>📂 Projects</h2>
            {projects.map((proj, index) => (
              <div key={index} className="project-card">
                <input name="title" value={proj.title} onChange={(e) => handleProjectChange(index, e)} placeholder="Title" />
                <input name="domain" value={proj.domain} onChange={(e) => handleProjectChange(index, e)} placeholder="Domain" />
                <textarea name="description" value={proj.description} onChange={(e) => handleProjectChange(index, e)} placeholder="Description" />
                <input name="tech" value={proj.tech} onChange={(e) => handleProjectChange(index, e)} placeholder="Technologies" />
                <input name="duration" value={proj.duration} onChange={(e) => handleProjectChange(index, e)} placeholder="Duration" />
              </div>
            ))}
            <button onClick={addProject}>+ Add Project</button>
          </div>
        );

      case "internships":
        return (
          <div className="section-card">
            <h2>🏢 Internships</h2>
            <input name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
            <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" />
            <input name="internshipDuration" value={formData.internshipDuration} onChange={handleChange} placeholder="Duration" />
            <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange} placeholder="Responsibilities" />
            <input name="internshipTech" value={formData.internshipTech} onChange={handleChange} placeholder="Technologies Used" />
          </div>
        );

      case "certifications":
        return (
          <div className="section-card">
            <h2>📜 Certifications</h2>
            <input name="certName" value={formData.certName} onChange={handleChange} placeholder="Certification Name" />
            <input name="certOrg" value={formData.certOrg} onChange={handleChange} placeholder="Issuing Organization" />
            <input name="certYear" value={formData.certYear} onChange={handleChange} placeholder="Year" />
            <input name="certLink" value={formData.certLink} onChange={handleChange} placeholder="Certificate Link" />
          </div>
        );

      case "achievements":
        return (
          <div className="section-card">
            <h2>🏆 Achievements</h2>
            <textarea name="hackathons" value={formData.hackathons} onChange={handleChange} placeholder="Hackathons / Awards" />
            <textarea name="leadership" value={formData.leadership} onChange={handleChange} placeholder="Leadership Roles" />
            <textarea name="extraCurricular" value={formData.extraCurricular} onChange={handleChange} placeholder="Extra Curricular" />
          </div>
        );

      case "professional":
        return (
          <div className="section-card">
            <h2>🧾 Professional Summary</h2>
            <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Summary" />
            <input name="careerObjective" value={formData.careerObjective} onChange={handleChange} placeholder="Career Objective" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar">
        <h2>Career Insight</h2>
        <ul>
          <li onClick={() => setActiveTab("personal")}><FaUser /> Personal</li>
          <li onClick={() => setActiveTab("education")}><FaGraduationCap /> Education</li>
          <li onClick={() => setActiveTab("skills")}><FaCode /> Skills</li>
          <li onClick={() => setActiveTab("projects")}><FaProjectDiagram /> Projects</li>
          <li onClick={() => setActiveTab("internships")}><FaBriefcase /> Internships</li>
          <li onClick={() => setActiveTab("certifications")}><FaCertificate /> Certifications</li>
          <li onClick={() => setActiveTab("achievements")}><FaTrophy /> Achievements</li>
          <li onClick={() => setActiveTab("professional")}><FaUser /> Professional</li>
        </ul>
      </div>

      <div className="dashboard-content">
        {renderSection()}
        <div className="button-group">
          <button onClick={handleBack} disabled={currentIndex === 0}>Back</button>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleNext} disabled={currentIndex === sections.length - 1}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;