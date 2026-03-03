const Profile = require("../models/userprofile");
const User = require("../models/user");

class ProfileController {

  // CREATE OR UPDATE PROFILE
  async createOrUpdateProfile(req, res) {
    try {
      const userId = req.userId; // must match your JWT middleware
      const formData = req.body; // get data from request

      // Get registered user details
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Build profile data
      const profileData = {
        user: userId,
        personal: {
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
          location: formData.personal?.location || "",
          linkedin: formData.personal?.linkedin || "",
          github: formData.personal?.github || "",
          portfolio: formData.personal?.portfolio || "",
          dob: formData.personal?.dob || "",
          gender: formData.personal?.gender || "",
          nationality: formData.personal?.nationality || ""
        },
        skills: formData.skills || {},
        education: formData.education || {},
        experience: {
          internships: formData.internships ? [formData.internships] : [],
          projects: formData.projects || []
        },
        certifications: formData.certifications || {},
        achievements: formData.achievements || {},
        professional: formData.professional || {}
      };

      // Check existing profile
      const finalData = { ...profileData, user: userId }; // add user field

let profile = await Profile.findOne({ user: userId });

if (profile) {
  // Update existing profile
  profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: finalData },
    { new: true }
  );
} else {
  // Create new profile
  profile = await Profile.create(finalData);
}

res.status(200).json({ message: "Profile saved", data: profile });
    } catch (error) {
      console.error("Profile save error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
  // GET PROFILE
  async getProfile(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.userId })
        .populate("user", ["fullname", "email", "phone"]);

      if (!profile) return res.status(404).json({ message: "Profile not found" });

      return res.status(200).json(profile);

    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error.message });
    }
  }


async updateProfile(req, res) {
  try {
    const userId = req.userId; // must match your JWT middleware
    const formData = req.body; // get data from request

    // Get registered user details
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Build profile data
    const profileData = {
      user: userId,
      personal: {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        location: formData.personal?.location || "",
        linkedin: formData.personal?.linkedin || "",
        github: formData.personal?.github || "",
        portfolio: formData.personal?.portfolio || "",
        dob: formData.personal?.dob || "",
        gender: formData.personal?.gender || "",
        nationality: formData.personal?.nationality || ""
      },
      skills: formData.skills || {},
      education: formData.education || {},
      experience: {
        internships: formData.internships ? [formData.internships] : [],
        projects: formData.projects || []
      },
      certifications: formData.certifications || {},
      achievements: formData.achievements || {},
      professional: formData.professional || {}
    };

    // Check existing profile
    const finalData = { ...profileData, user: userId }; // add user field

let profile = await Profile.findOne({ user: userId });

if (profile) {
  // Update existing profile
  profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: finalData },
    { new: true }
  );
} else {
  // Create new profile
  profile = await Profile.create(finalData);
}

res.status(200).json({ message: "Profile updated", data: profile });
    } catch (error) {
      console.error("Profile update error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  async deleteProfile(req, res) {
    try {
      const userId = req.userId;
      const profile = await Profile.findOneAndDelete({ user: userId });
      
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      return res.status(200).json({ message: "Profile deleted" });
    }
    catch (error) { 
      console.error("Profile deletion error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

module.exports = new ProfileController();