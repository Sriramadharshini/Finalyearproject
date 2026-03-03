const Resume = require('../models/Resume');
const Template = require('../models/Template');
const Profile = require('../models/userprofile');

class ResumeController {

  // GENERATE RESUME WITH TEMPLATE
  async generateResume(req, res) {
    try {
      const userId = req.userId;
      const { templateId } = req.params;
      const { jobRole, generationMethod, jobUrl, jobId } = req.body;

      // Get template details
      const template = await Template.findOne({ templateId });
      if (!template) {
        return res.status(404).json({ 
          success: false, 
          message: 'Template not found' 
        });
      }

      // Get profile data
      const profile = await Profile.findOne({ user: userId });
      if (!profile) {
        return res.status(404).json({ 
          success: false, 
          message: 'Profile not found' 
        });
      }

      // Format content for resume
      const content = this.formatResumeContent(profile);

      // Generate analysis for role
      const analysisForRole = this.analyzeForRole(profile, jobRole);

      // Generate analysis for job description (if job matching)
      let analysisForJd = null;
      if (generationMethod === 'job-matching' && req.body.jobDescription) {
        analysisForJd = this.analyzeForJD(profile, req.body.jobDescription);
      }

      // Generate HTML version
      const resumeHtml = this.generateResumeHTML(profile, template);

      // Create resume
      const resume = await Resume.create({
        title: jobRole || profile.professional?.RoleCategory || 'My Resume',
        content: content,
        template: template.name,
        generation_method: generationMethod || 'role-based',
        job_id: jobId || '',
        job_role: jobRole || '',
        job_url: jobUrl || '',
        analysis_for_role: analysisForRole,
        analysis_for_jd: analysisForJd || {
          overall_score: 0,
          detailed_scores: {
            skills_match: 0,
            experience_relevance: 0,
            ats_format: 0
          },
          job_keywords: [],
          your_keywords: [],
          missing_critical_keywords: [],
          ats_compliance_score: "N/A",
          gap_analysis: "No gap analysis provided",
          improvement_recommendations: []
        },
        resume_html: resumeHtml,
        created_by: profile.personal?.email || ''
      });

      res.status(201).json({
        success: true,
        message: 'Resume generated successfully',
        data: resume
      });

    } catch (error) {
      console.error('Resume generation error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      });
    }
  }

  // GET ALL RESUMES FOR USER
  async getUserResumes(req, res) {
    try {
      const userEmail = req.userEmail; // from auth middleware

      const resumes = await Resume.find({ created_by: userEmail })
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: resumes.length,
        data: resumes
      });
    } catch (error) {
      console.error('Get resumes error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      });
    }
  }

  // GET RESUME BY ID
  async getResumeById(req, res) {
    try {
      const { resumeId } = req.params;

      const resume = await Resume.findById(resumeId);

      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      res.status(200).json({
        success: true,
        data: resume
      });
    } catch (error) {
      console.error('Get resume error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      });
    }
  }

  // UPDATE RESUME
  async updateResume(req, res) {
    try {
      const { resumeId } = req.params;
      const updateData = req.body;

      const resume = await Resume.findByIdAndUpdate(
        resumeId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      res.status(200).json({
        success: true,
        message: 'Resume updated successfully',
        data: resume
      });
    } catch (error) {
      console.error('Update resume error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      });
    }
  }

  // DELETE RESUME
  async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;

      const resume = await Resume.findByIdAndDelete(resumeId);

      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      res.status(200).json({ 
        success: true, 
        message: 'Resume deleted successfully' 
      });
    } catch (error) {
      console.error('Delete resume error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      });
    }
  }

  // ANALYZE RESUME FOR JOB MATCHING
  async analyzeResumeForJob(req, res) {
    try {
      const { resumeId } = req.params;
      const { jobDescription, jobRole, jobId, jobUrl } = req.body;

      const resume = await Resume.findById(resumeId);

      if (!resume) {
        return res.status(404).json({ 
          success: false, 
          message: 'Resume not found' 
        });
      }

      // Perform job matching analysis
      const analysisForJd = this.matchResumeWithJob(resume, jobDescription, jobRole);

      // Update resume with job analysis
      resume.analysis_for_jd = analysisForJd;
      resume.generation_method = 'job-matching';
      resume.job_id = jobId || resume.job_id;
      resume.job_role = jobRole || resume.job_role;
      resume.job_url = jobUrl || resume.job_url;
      await resume.save();

      res.status(200).json({
        success: true,
        message: 'Job analysis completed',
        data: analysisForJd
      });
    } catch (error) {
      console.error('Job analysis error:', error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message 
      });
    }
  }

  // HELPER: Format Resume Content
  formatResumeContent(profile) {
    return {
      personal: {
        fullname: profile.personal?.fullname || '',
        email: profile.personal?.email || '',
        phone: profile.personal?.phone || '',
        location: profile.personal?.location || '',
        linkedin: profile.personal?.linkedin || '',
        github: profile.personal?.github || '',
        portfolio: profile.personal?.portfolio || '',
        summary: profile.professional?.summary || '',
        careerObjective: profile.professional?.careerObjective || ''
      },
      education: profile.education?.map(edu => ({
        degree: edu.degree || '',
        institution: edu.institution || edu.university || '',
        startDate: edu.startyear || edu.startDate || '',
        endDate: edu.endyear || edu.endDate || '',
        cgpa: edu.cgpa || '',
        field: edu.field || '',
        studyMode: edu.studyMode || ''
      })) || [],
      skills: {
        technical: profile.skills?.technicalSkills?.split(',').map(s => s.trim()) || [],
        soft: profile.skills?.softSkills?.split(',').map(s => s.trim()) || [],
        tools: profile.skills?.tools?.split(',').map(s => s.trim()) || [],
        languages: profile.skills?.languages?.split(',').map(s => s.trim()) || [],
        experienceLevel: profile.skills?.experienceLevel || ''
      },
      experience: profile.internships?.map(intern => ({
        role: intern.role || '',
        company: intern.company || '',
        duration: intern.duration || '',
        responsibilities: intern.responsibilities || '',
        technologies: intern.technologies?.split(',').map(s => s.trim()) || []
      })) || [],
      projects: profile.projects?.map(proj => ({
        title: proj.title || '',
        domain: proj.domain || '',
        description: proj.description || '',
        technologies: (proj.technologies || proj.tech || '').split(',').map(s => s.trim()),
        duration: proj.duration || ''
      })) || [],
      certifications: profile.certifications?.map(cert => ({
        name: cert.name || cert.certName || '',
        date: cert.monthYear || cert.issueMonthYear || ''
      })) || [],
      achievements: profile.achievements?.map(ach => ach.yourAchievements || ach) || []
    };
  }

  // HELPER: Analyze for Role
  analyzeForRole(profile, jobRole) {
    const fields = [
      {
        field_name: 'Skills Match',
        relevance_score: 85,
        grammar_issues: [
          {
            issue: 'Consider using more action verbs',
            correction: 'Use words like "developed", "implemented", "led"'
          }
        ],
        improvement_suggestions_and_score: [
          'Add more relevant keywords for ATS',
          'Quantify your achievements with numbers',
          'Include both hard and soft skills'
        ],
        what_are_missing_points: 'Consider adding cloud computing skills and modern frameworks'
      },
      {
        field_name: 'Experience Relevance',
        relevance_score: 75,
        grammar_issues: [
          {
            issue: 'Some descriptions are too generic',
            correction: 'Add specific examples and metrics'
          }
        ],
        improvement_suggestions_and_score: [
          'Highlight leadership experiences',
          'Add metrics to showcase impact',
          'Include relevant project outcomes'
        ],
        what_are_missing_points: 'More senior-level responsibilities and leadership examples'
      },
      {
        field_name: 'Education',
        relevance_score: 80,
        grammar_issues: [],
        improvement_suggestions_and_score: [
          'Add relevant coursework',
          'Include academic achievements'
        ],
        what_are_missing_points: 'Consider adding certifications'
      }
    ];

    // Calculate overall score
    const overallScore = Math.round(
      fields.reduce((sum, field) => sum + field.relevance_score, 0) / fields.length
    );

    return {
      field: fields,
      overall_score: overallScore,
      overall_improvement_suggestions: [
        'Add a professional summary at the top',
        'Include more technical keywords relevant to the role',
        'Quantify your achievements with numbers and percentages',
        'Use action verbs to start each bullet point',
        'Customize your resume for each job application'
      ]
    };
  }

  // HELPER: Analyze for JD
  analyzeForJD(profile, jobDescription) {
    // Simulated job keywords (in real app, extract from jobDescription)
    const jobKeywords = [
      'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 
      'MongoDB', 'SQL', 'REST API', 'Git', 'Docker'
    ];
    
    // Extract keywords from resume
    const resumeContent = JSON.stringify(profile).toLowerCase();
    const yourKeywords = jobKeywords.filter(keyword => 
      resumeContent.includes(keyword.toLowerCase())
    );
    
    const missingCriticalKeywords = jobKeywords.filter(keyword => 
      !resumeContent.includes(keyword.toLowerCase())
    ).slice(0, 5); // Get top 5 missing keywords

    const skillsMatch = Math.round((yourKeywords.length / jobKeywords.length) * 100);
    const experienceRelevance = 70; // Calculate based on experience match
    const atsFormat = 90; // Check ATS compatibility

    const overallScore = Math.round((skillsMatch + experienceRelevance + atsFormat) / 3);

    return {
      overall_score: overallScore,
      detailed_scores: {
        skills_match: skillsMatch,
        experience_relevance: experienceRelevance,
        ats_format: atsFormat
      },
      job_keywords: jobKeywords,
      your_keywords: yourKeywords,
      missing_critical_keywords: missingCriticalKeywords,
      ats_compliance_score: `${atsFormat}%`,
      gap_analysis: `Your resume matches ${skillsMatch}% of the required skills. ` +
                   `Missing critical keywords: ${missingCriticalKeywords.slice(0, 3).join(', ')}. ` +
                   `Consider adding experience with these technologies to improve your match.`,
      improvement_recommendations: [
        `Add these missing keywords: ${missingCriticalKeywords.slice(0, 3).join(', ')}`,
        'Quantify your achievements with specific numbers and metrics',
        'Use action verbs like "developed", "implemented", "led"',
        'Ensure your resume is ATS-friendly with standard formatting',
        'Add a skills section with both technical and soft skills',
        'Include relevant projects that demonstrate your expertise'
      ]
    };
  }

  // HELPER: Match Resume with Job
  matchResumeWithJob(resume, jobDescription, jobRole) {
    // Simulated job keywords (in real app, extract from jobDescription)
    const jobKeywords = [
      'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 
      'MongoDB', 'SQL', 'REST API', 'Git', 'Docker',
      'TypeScript', 'Express', 'PostgreSQL', 'Redis', 'Kubernetes'
    ];
    
    // Extract keywords from resume content
    const resumeContent = JSON.stringify(resume.content).toLowerCase();
    const yourKeywords = jobKeywords.filter(keyword => 
      resumeContent.includes(keyword.toLowerCase())
    );
    
    const missingKeywords = jobKeywords.filter(keyword => 
      !resumeContent.includes(keyword.toLowerCase())
    );

    const skillsMatch = Math.round((yourKeywords.length / jobKeywords.length) * 100);
    const experienceRelevance = 75; // Calculate based on experience
    const atsFormat = 85; // Check formatting

    const overallScore = Math.round((skillsMatch + experienceRelevance + atsFormat) / 3);

    return {
      overall_score: overallScore,
      detailed_scores: {
        skills_match: skillsMatch,
        experience_relevance: experienceRelevance,
        ats_format: atsFormat
      },
      job_keywords: jobKeywords,
      your_keywords: yourKeywords,
      missing_critical_keywords: missingKeywords.slice(0, 5),
      ats_compliance_score: `${atsFormat}%`,
      gap_analysis: `Your resume matches ${skillsMatch}% of the job requirements. ` +
                   `Missing ${missingKeywords.length} keywords. ` +
                   `Focus on adding: ${missingKeywords.slice(0, 3).join(', ')}.`,
      improvement_recommendations: [
        `Add these missing keywords: ${missingKeywords.slice(0, 3).join(', ')}`,
        'Quantify your achievements with specific numbers',
        'Use action verbs to start each bullet point',
        'Ensure your resume highlights relevant experience',
        'Add a professional summary tailored to this role',
        'Include metrics that demonstrate your impact'
      ]
    };
  }

  // HELPER: Generate Resume HTML
  generateResumeHTML(profile, template) {
    const content = this.formatResumeContent(profile);
    
    return {
      template: template.name,
      templateId: template.templateId,
      styling: {
        primaryColor: template.color.primary,
        secondaryColor: template.color.secondary,
        accentColor: template.color.accent,
        layout: template.layout,
        isPremium: template.isPremium
      },
      content: content,
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '1.0'
      }
    };
  }
}

module.exports = new ResumeController();