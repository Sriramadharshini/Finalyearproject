const { callLLM } = require('../middleware/llm');

class TemplateAgent {
  
  // Suggest template based on job role
  async suggestTemplate(jobRole, skills) {
    try {
      const prompt = `
        Suggest the best resume template for a ${jobRole || 'professional'} position.

        Candidate Skills:
        ${skills}

        Available template categories:
        - ATS Friendly: Clean, simple layout
        - Executive: Professional, two-column design
        - Creative: Colorful, modern design
        - Corporate: Traditional, formal style
        - Technical: Skill-focused layout
        - Minimal: Simple, elegant design
        - Entry Level: Education-focused layout

        Return JSON with:
        1. recommended_category: string
        2. reason: string
        3. alternatives: array of strings
      `;

      const schema = {
        type: "object",
        properties: {
          recommended_category: { type: "string" },
          reason: { type: "string" },
          alternatives: { type: "array", items: { type: "string" } }
        }
      };

      const result = await callLLM({ prompt, response_json_schema: schema });
      return result.parsed || { 
        recommended_category: "ATS Friendly", 
        reason: "Best for ATS compatibility",
        alternatives: ["Professional", "Minimal"]
      };
    } catch (error) {
      console.error("Template suggestion error:", error);
      return { recommended_category: "ATS Friendly", reason: "Default recommendation" };
    }
  }

  // Customize template colors
  async suggestColors(industry) {
    try {
      const prompt = `
        Suggest color schemes for a resume in the ${industry || 'technology'} industry.

        Return JSON with:
        1. primary: hex color
        2. secondary: hex color
        3. accent: hex color
        4. reasoning: string
      `;

      const schema = {
        type: "object",
        properties: {
          primary: { type: "string" },
          secondary: { type: "string" },
          accent: { type: "string" },
          reasoning: { type: "string" }
        }
      };

      const result = await callLLM({ prompt, response_json_schema: schema });
      return result.parsed || { 
        primary: "#4361ee", 
        secondary: "#3a0ca3", 
        accent: "#f72585",
        reasoning: "Professional blue scheme"
      };
    } catch (error) {
      return { primary: "#4361ee", secondary: "#3a0ca3", accent: "#f72585" };
    }
  }
}

module.exports = new TemplateAgent();