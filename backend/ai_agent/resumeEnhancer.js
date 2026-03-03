const { callLLM } = require('../middleware/llm');

class ResumeEnhancer {
  
  // Enhance specific section
  async enhanceSection(content, sectionType) {
    try {
      const prompt = `
        Enhance this resume ${sectionType} to make it more professional and impactful.
        
        Current ${sectionType}:
        ${typeof content === 'string' ? content : JSON.stringify(content, null, 2)}

        Make it:
        1. More concise and powerful
        2. Use strong action verbs
        3. Add quantifiable achievements with numbers and percentages
        4. Improve keywords for ATS
        5. Professional tone with industry-standard terminology

        Return only the enhanced ${sectionType} without any additional text.
        ${sectionType === 'experience' ? 'Format as array of bullet points.' : ''}
      `;

      const result = await callLLM({ prompt });
      return result.text || content;
    } catch (error) {
      console.error("Enhance section error:", error);
      return content;
    }
  }

  // Enhance experience bullet points
  async enhanceBulletPoints(experience) {
    try {
      const prompt = `
        Rewrite these experience bullet points to be more impactful and quantified:

        ${experience}

        Make them:
        1. Start with strong action verbs (Led, Developed, Implemented, Achieved)
        2. Include numbers and percentages (increased by X%, reduced by Y%, managed Z)
        3. Show impact and results
        4. Use industry-specific keywords
        5. Each point should be 1-2 lines max

        Return as an array of bullet points in JSON format.
      `;

      const schema = {
        type: "object",
        properties: {
          bulletPoints: { type: "array", items: { type: "string" } }
        }
      };

      const result = await callLLM({ prompt, response_json_schema: schema });
      return result.parsed?.bulletPoints || [experience];
    } catch (error) {
      return [experience];
    }
  }

  // Add keywords to skills section
  async suggestKeywords(skills, jobRole) {
    try {
      const prompt = `
        Suggest additional keywords for a ${jobRole || 'professional'} resume based on these current skills:

        Current Skills:
        ${skills}

        Return JSON with:
        1. suggested_technical: array of technical keywords
        2. suggested_tools: array of tool keywords
        3. suggested_certifications: array of certification names
      `;

      const schema = {
        type: "object",
        properties: {
          suggested_technical: { type: "array", items: { type: "string" } },
          suggested_tools: { type: "array", items: { type: "string" } },
          suggested_certifications: { type: "array", items: { type: "string" } }
        }
      };

      const result = await callLLM({ prompt, response_json_schema: schema });
      return result.parsed || { suggested_technical: [], suggested_tools: [], suggested_certifications: [] };
    } catch (error) {
      return { suggested_technical: [], suggested_tools: [], suggested_certifications: [] };
    }
  }
}

module.exports = new ResumeEnhancer();