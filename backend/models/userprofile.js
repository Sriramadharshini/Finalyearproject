const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // ---------------- PERSONAL ----------------
  personal: {
    fullname: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,
    dob: String,
    nationality: String,
    gender: String
  },

  // ---------------- EDUCATION ----------------
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    graduationYear: String,
    cgpa: String,
    startyear: String,
    endyear: String,
    mode: String
  }],

  // ---------------- SKILLS ----------------
  skills: {
    technical: String,
    soft: String,
    tools: String,
    languages: String,
    experienceLevel: String
  },

  // ---------------- PROJECTS ----------------
  projects: [{
    title: String,
    domain: String,
    description: String,
    technologies: String,
    duration: String
  }],

  // ---------------- INTERNSHIPS ----------------
  internships: [{
    company: String,
    role: String,
    duration: String,
    responsibilities: String,
    technologies: String
  }],

  // ---------------- CERTIFICATIONS ----------------
  certifications: [{
    name: String,
    monthYear: String
  }],

  // ---------------- ACHIEVEMENTS ----------------
  achievements: [{
    yourAchievements:String,
  }],

  // ---------------- PROFESSIONAL ----------------
  professional: {
    RoleCategory: String,
    summary: String,
    careerObjective: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);