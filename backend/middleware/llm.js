const axios = require("axios");
const Api_ = require('../models/api');

// ✅ Make sure this function is exported
async function callLLM({ prompt, response_json_schema = null }) {
  try {
    const api_key = await Api_.findOne({ type_key: "OpenAI" });
    
    if (!api_key) {
      throw new Error("OpenAI API key not found in database");
    }

    const apiKey = api_key.api_key.trim();
    const url = "https://api.openai.com/v1/chat/completions";
    
    const messages = [
      { 
        role: "system", 
        content: "You are an expert resume writer and career advisor. Always respond in valid JSON only." 
      },
      { role: "user", content: prompt },
    ];
    
    const baseBody = {
      model: "gpt-4o-mini",
      messages,
      max_tokens: 4000,
      temperature: 0.3,
    };
    
    if (response_json_schema) {
      baseBody.response_format = {
        type: "json_schema",
        json_schema: {
          name: "custom_schema",
          schema: response_json_schema,
          strict: false,
        },
      };
    } else {
      baseBody.response_format = { type: "json_object" };
    }
    
    const resp = await axios.post(url, baseBody, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 60000,
    });
    
    const text = resp.data.choices?.[0]?.message?.content || "";
    let parsed = null;
    
    try { 
      parsed = JSON.parse(text); 
    } catch (e) { 
      console.warn("⚠️ Could not parse JSON response:", e.message);
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsed = JSON.parse(jsonMatch[0]);
        } catch (e2) {
          console.error("Failed to parse extracted JSON");
        }
      }
    }
    
    return { text, parsed };
  } catch (err) {
    console.error("❌ LLM call failed:", err.message);
    throw err;
  }
}

// ✅ Export the function
module.exports = { callLLM };