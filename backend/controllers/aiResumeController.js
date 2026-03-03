const Resume_ = require('../models/Resume');
const Template_ = require('../models/Template');
const Profile_ = require('../models/userprofile');
const resumeGenerator = require('../ai_agent/resumeGenerator');
const resumeAnalyzer = require('../ai_agent/resumeAnalyzer');
const resumeEnhancer = require('../ai_agent/resumeEnhancer');
const templateAgent = require('../ai_agent/templateAgent');

class AIResumeController {

  // Generate resume using AI
  async generateResume(req, res) {
    try {
      const email = req.email;
      const { templateId, jobRole } = req.body;

      // Get template
      const template = await Template_.findOne({ templateId });
      if (!template) {
        return res.status(404).json({ 
          success: false, 
          message: 'Template not found' 
        });
      }

      // Get profile
      const profile = await Profile_.findOne({ 'personal.email': email });
      if (!profile) {
        return res.status(404).json({ 
          success: false, 
          message: 'Profile not found' 
        });
      }

      // Generate resume using AI agent
      const generated = await resumeGenerator.generateResume(profile, jobRole, template);

      // Save to database
      const resume = await Resume_.create({
        title: jobRole || profile.professional?.RoleCategory || 'AI Generated Resume',
        content: generated,
        template: template.name,
        generation_method: 'role-based',
        job_role: jobRole || '',
        created_by: email
      });

      return res.status(200).json({
        success: true,
        message: "Resume generated successfully",
        data: resume
      });

    } catch (error) {
      console.error('❌ Generation error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // Analyze resume with job
  async analyzeResume(req, res) {
    try {
      const email = req.email;
      const { resumeId, jobDescription } = req.body;

      const resume = await Resume_.findOne({ _id: resumeId, created_by: email });
      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      // Analyze using AI agent
      const analysis = await resumeAnalyzer.analyzeJobMatch(resume.content, jobDescription);
      
      // Get ATS score
      const atsAnalysis = await resumeAnalyzer.analyzeATSScore(resume.content);

      resume.analysis_for_jd = analysis;
      await resume.save();

      return res.status(200).json({
        success: true,
        data: { analysis, atsAnalysis }
      });

    } catch (error) {
      console.error('❌ Analysis error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // Enhance resume section
  async enhanceResume(req, res) {
    try {
      const email = req.email;
      const { resumeId, section, content } = req.body;

      // Enhance using AI agent
      const enhanced = await resumeEnhancer.enhanceSection(content, section);

      // If it's a full resume, update in database
      if (resumeId) {
        const resume = await Resume_.findOne({ _id: resumeId, created_by: email });
        if (resume) {
          if (section === 'summary') resume.content.summary = enhanced;
          else if (section === 'experience') resume.content.experience = enhanced;
          else if (section === 'skills') resume.content.skills = enhanced;
          await resume.save();
        }
      }

      return res.status(200).json({
        success: true,
        data: { enhanced }
      });

    } catch (error) {
      console.error('❌ Enhancement error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // Suggest template
  async suggestTemplate(req, res) {
    try {
      const { jobRole, skills } = req.body;

      // Get suggestion from AI agent
      const suggestion = await templateAgent.suggestTemplate(jobRole, skills);

      return res.status(200).json({
        success: true,
        data: suggestion
      });

    } catch (error) {
      console.error('❌ Template suggestion error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }

  // Get all AI agents status
  async getAgentsStatus(req, res) {
    return res.status(200).json({
      success: true,
      data: {
        resumeGenerator: true,
        resumeAnalyzer: true,
        resumeEnhancer: true,
        templateAgent: true
      }
    });
  }
}

module.exports = new AIResumeController();