const { callLLM } = require('../middleware/llm');

class ResumeGenerator {
  
  // Generate complete resume
  async generateResume(profile, jobRole, template) {
    try {
      const prompt = this.buildResumePrompt(profile, jobRole, template);
      
      const schema = {
        type: "object",
        properties: {
          summary: { type: "string" },
          experience: {
            type: "array",
            items: {
              type: "object",
              properties: {
                role: { type: "string" },
                company: { type: "string" },
                duration: { type: "string" },
                achievements: { type: "array", items: { type: "string" } }
              }
            }
          },
          skills: {
            type: "object",
            properties: {
              technical: { type: "array", items: { type: "string" } },
              soft: { type: "array", items: { type: "string" } },
              tools: { type: "array", items: { type: "string" } },
              languages: { type: "array", items: { type: "string" } }
            }
          },
          education: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                degree: { type: "string" },
                institution: { type: "string" },
                year: { type: "string" },
                cgpa: { type: "string" }
              }
            } 
          },
          projects: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                technologies: { type: "string" }
              }
            } 
          },
          certifications: { 
            type: "array", 
            items: { 
              type: "object",
              properties: {
                name: { type: "string" },
                date: { type: "string" }
              }
            } 
          }
        }
      };

      const result = await callLLM({ 
        prompt, 
        response_json_schema: schema
      });
      
      return result.parsed || this.getFallbackResume(profile, jobRole);
    } catch (error) {
      console.error("Resume generation error:", error);
      return this.getFallbackResume(profile, jobRole);
    }
  }

  // Generate professional summary only
  async generateSummary(profile, jobRole) {
    try {
      const prompt = `
        Write a professional summary for a ${jobRole || 'professional'} position.

        Candidate Background:
        - Name: ${profile.personal?.fullname || 'Candidate'}
        - Skills: ${profile.skills?.technicalSkills || 'Not specified'}
        - Experience: ${profile.internships?.length || 0} years
        - Education: ${JSON.stringify(profile.education || [])}
        - Projects: ${profile.projects?.length || 0} projects

        Make it:
        - 2-3 sentences
        - Highlight key strengths
        - Include years of experience
        - Mention top skills
        - Show career goals
      `;

      const result = await callLLM({ prompt });
      return result.text || `Experienced ${jobRole || 'professional'} with skills in ${profile.skills?.technicalSkills || 'technology'}.`;
    } catch (error) {
      return `Experienced ${jobRole || 'professional'} with expertise in various technologies.`;
    }
  }

  // Build resume prompt
  buildResumePrompt(profile, jobRole, template) {
    return `
      You are an expert resume writer. Create a professional ATS-friendly resume for a ${jobRole || 'professional'} position.

      Candidate Profile:
      =================
      Name: ${profile.personal?.fullname || 'Candidate'}
      Email: ${profile.personal?.email || ''}
      Phone: ${profile.personal?.phone || ''}
      Location: ${profile.personal?.location || ''}
      
      Education:
      ${JSON.stringify(profile.education || [], null, 2)}
      
      Technical Skills:
      ${profile.skills?.technicalSkills || ''}
      
      Soft Skills:
      ${profile.skills?.softSkills || ''}
      
      Tools & Technologies:
      ${profile.skills?.tools || ''}
      
      Languages:
      ${profile.skills?.languages || ''}
      
      Work Experience:
      ${JSON.stringify(profile.internships || [], null, 2)}
      
      Projects:
      ${JSON.stringify(profile.projects || [], null, 2)}
      
      Certifications:
      ${JSON.stringify(profile.certifications || [], null, 2)}
      
      Achievements:
      ${JSON.stringify(profile.achievements || [], null, 2)}

      Template Style: ${template?.name || 'Professional'}
      
      Generate a complete resume with:
      1. Professional Summary (2-3 impactful sentences)
      2. Work Experience (enhance with achievements, use numbers and metrics)
      3. Skills Section (categorized)
      4. Education Details
      5. Projects with technical impact
      6. Certifications
      7. Achievements

      Make it ATS-friendly, use strong action verbs, and quantify achievements with percentages and numbers.
      Return as JSON with appropriate structure.
    `;
  }

  // Fallback resume
  getFallbackResume(profile, jobRole) {
    return {
      summary: `Dedicated ${jobRole || 'professional'} with expertise in ${profile.skills?.technicalSkills || 'software development'}.`,
      experience: profile.internships || [],
      skills: {
        technical: profile.skills?.technicalSkills?.split(',').map(s => s.trim()) || [],
        soft: profile.skills?.softSkills?.split(',').map(s => s.trim()) || [],
        tools: profile.skills?.tools?.split(',').map(s => s.trim()) || [],
        languages: profile.skills?.languages?.split(',').map(s => s.trim()) || []
      },
      education: profile.education || [],
      projects: profile.projects || [],
      certifications: profile.certifications || [],
      achievements: profile.achievements || []
    };
  }
}

// ✅ This is the important part - exporting the instance
module.exports = new ResumeGenerator();