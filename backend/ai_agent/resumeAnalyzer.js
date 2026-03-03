const { callLLM } = require('../middleware/llm');

class ResumeAnalyzer {
  
  // Analyze resume against job description
  async analyzeJobMatch(resume, jobDescription) {
    try {
      const prompt = `
        Analyze this resume against the job description and provide detailed matching analysis.

        Resume:
        ${JSON.stringify(resume, null, 2)}

        Job Description:
        ${jobDescription}

        Provide analysis in JSON format with:
        1. overall_score (0-100)
        2. detailed_scores: {
            skills_match: number,
            experience_relevance: number,
            ats_format: number
          }
        3. job_keywords: array of extracted keywords from job
        4. your_keywords: array of matching keywords from resume
        5. missing_critical_keywords: array of important missing keywords
        6. ats_compliance_score: string (percentage)
        7. gap_analysis: string explaining the gaps
        8. improvement_recommendations: array of strings

        Be specific and helpful.
      `;

      const schema = {
        type: "object",
        properties: {
          overall_score: { type: "number" },
          detailed_scores: {
            type: "object",
            properties: {
              skills_match: { type: "number" },
              experience_relevance: { type: "number" },
              ats_format: { type: "number" }
            }
          },
          job_keywords: { type: "array", items: { type: "string" } },
          your_keywords: { type: "array", items: { type: "string" } },
          missing_critical_keywords: { type: "array", items: { type: "string" } },
          ats_compliance_score: { type: "string" },
          gap_analysis: { type: "string" },
          improvement_recommendations: { type: "array", items: { type: "string" } }
        }
      };

      const result = await callLLM({ 
        prompt, 
        response_json_schema: schema 
      });
      
      return result.parsed || this.getDefaultAnalysis();
    } catch (error) {
      console.error("Job match analysis error:", error);
      return this.getDefaultAnalysis();
    }
  }

  // Analyze resume for ATS score
  async analyzeATSScore(resume) {
    try {
      const prompt = `
        Analyze this resume for ATS (Applicant Tracking System) compatibility.

        Resume:
        ${JSON.stringify(resume, null, 2)}

        Provide ATS analysis in JSON format with:
        1. ats_score (0-100)
        2. formatting_issues: array of strings
        3. keyword_density: object with keyword counts
        4. missing_sections: array of strings
        5. recommendations: array of strings
      `;

      const schema = {
        type: "object",
        properties: {
          ats_score: { type: "number" },
          formatting_issues: { type: "array", items: { type: "string" } },
          keyword_density: { type: "object" },
          missing_sections: { type: "array", items: { type: "string" } },
          recommendations: { type: "array", items: { type: "string" } }
        }
      };

      const result = await callLLM({ prompt, response_json_schema: schema });
      return result.parsed || { ats_score: 75, recommendations: [] };
    } catch (error) {
      console.error("ATS analysis error:", error);
      return { ats_score: 70, recommendations: ["Consider adding more keywords"] };
    }
  }

  // Default analysis
  getDefaultAnalysis() {
    return {
      overall_score: 75,
      detailed_scores: {
        skills_match: 70,
        experience_relevance: 75,
        ats_format: 80
      },
      job_keywords: [],
      your_keywords: [],
      missing_critical_keywords: [],
      ats_compliance_score: "80%",
      gap_analysis: "Your resume matches most requirements. Consider adding more industry-specific keywords.",
      improvement_recommendations: [
        "Add quantifiable achievements",
        "Use more action verbs",
        "Include relevant certifications"
      ]
    };
  }
}

module.exports = new ResumeAnalyzer();