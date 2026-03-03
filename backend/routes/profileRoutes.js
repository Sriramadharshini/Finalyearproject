const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization');
const Profile = require('../models/userprofile');
const User = require('../models/user');

// ================= CREATE PROFILE =================
router.post('/create', authorization, async (req, res) => {
  try {
    console.log('Create profile request body', req.body);

    const formData = req.body;
    const userId = req.userId;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists" });
    }

    // Prepare profile data
    const finalData = {
      user: userId, // attach user reference
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
        startYear:formData.startYear,
        endYear:formData.endYear,
        studyMode: formData.studyMode
      },
      skills: {
        technicalSkills: formData.technicalSkills,
        softSkills: formData.softSkills,
        tools: formData.tools,
        languages: formData.languages,
        experienceLevel: formData.experienceLevel
      },
      internships: formData.internships || [], // array from frontend
      projects: formData.projects.map(p => ({
        title: p.title,
        domain: p.domain,
        description: p.description,
        technologies: p.tech, // match schema key
        duration: p.duration
      })),
      certifications: {
        certName: formData.certName,
        monthYear: formData.certMonthYear
      },
      achievements: {
        yourAchievements: formData.yourAchievements
      },
      professional: {
        RoleCategory: formData.roleCategory,
        summary: formData.summary,
        careerObjective: formData.careerObjective
      }
    };

    // Create profile
    const newProfile = await Profile.create(finalData);

    res.status(201).json({
      message: "Profile created successfully",
      data: newProfile
    });

  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({
      error: "Internal server error",
      error_details: error.message
    });
  }
});

router.get("/me", authorization, async (req, res) => {
  console.log("Logged User ID:", req.userId);

  const profile = await Profile.findOne({ user: req.userId });

  console.log("Found Profile:", profile);

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
});

router.put("/update", authorization, async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { $set: req.body },
      { new: true }
    );

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/delete", authorization, async (req, res) => 
{
  try {
    await Profile.findOneAndDelete({ user: req.userId });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;