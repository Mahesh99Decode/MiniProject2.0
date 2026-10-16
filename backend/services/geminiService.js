const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Farming AI brain instruction
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `
You are KrishiMitra AI, a farming expert assistant for Indian farmers.

Your job:
- Suggest crops based on soil, weather, and location
- Give irrigation and fertilizer advice
- Help with pest and disease problems
- Keep answers simple, practical, and short
- Prefer Indian agriculture conditions
- CRITICAL: You MUST ALWAYS respond in English, regardless of the language the user uses.
- If the user has provided location or weather data in the context, do NOT ask them for it again.

If data is missing and not provided in the context, ask a short follow-up question.
`
});

async function getFarmResponse(userMessage, context = null) {
  let finalPrompt = userMessage;
  if (context && Object.keys(context).length > 0) {
    finalPrompt = `Context Information (Do NOT ask for these details if provided here):\n${JSON.stringify(context, null, 2)}\n\nUser Message: ${userMessage}`;
  }
  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}

async function generateFarmRecommendation(payload) {
  const langPref = payload.preferredLanguage === 'Hindi' ? 
    "You MUST write the cropName, tags, and explanation in pure Hindi using the Devanagari script (no Roman Hindi/Hinglish)." : 
    "You MUST write the cropName, tags, and explanation in English.";

  const prompt = `
You are an expert agricultural AI. Generate 3 crop recommendations based on the following farm profile:

- Land Size: ${payload.farmArea} Acres
- Soil Type: ${payload.soilType}
- Water Availability: ${payload.waterAvailable}
- Budget: ${payload.budget}
- Soil pH: ${payload.ph || 'Unknown'}
- Nitrogen: ${payload.nitrogen || 'Unknown'}
- Phosphorus: ${payload.phosphorus || 'Unknown'}
- Potassium: ${payload.potassium || 'Unknown'}
- Temperature: ${payload.temperature}°C
- Humidity: ${payload.humidity}%
- Rainfall: ${payload.rainfall}mm

${langPref}

Format the output strictly as a valid JSON array containing exactly 3 objects. Do NOT use markdown code blocks like \`\`\`json. The objects must follow this exact schema:
[
  {
    "cropName": "Name of the crop",
    "confidence": 92,
    "expectedProfit": "₹45,000",
    "riskLevel": "Low",
    "tags": ["High Demand", "Low Water Need", "Gov Support"],
    "explanation": "Brief reasoning for why this is recommended based on the soil and weather."
  }
]
  `;

  const result = await model.generateContent(prompt);
  let jsonString = result.response.text();
  // Clean up any markdown blocks if the model still outputs them
  jsonString = jsonString.replace(/```json/gi, "").replace(/```/g, "").trim();
  
  try {
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (e) {
    console.error("JSON parse error:", e.message);
    throw new Error("Failed to generate valid JSON from AI");
  }
}

async function analyzeCropImage(base64Image, mimeType) {
  const prompt = `
You are an expert plant pathologist and agricultural AI. Analyze this crop image and provide a strict JSON response. Do NOT use markdown code blocks like \`\`\`json. The JSON must follow this schema exactly:
{
  "cropName": "Name of the crop (e.g., Tomato, Wheat)",
  "cropStage": "Current growth stage (e.g., Vegetative, Flowering, Fruiting)",
  "healthScore": 85,
  "healthSummary": "Overall crop health is excellent with low disease probability.",
  "detections": [
    {
      "name": "Healthy Leaf Structure",
      "severity": "success-detection",
      "description": "No visible fungal infection patterns.",
      "icon": "✅"
    }
  ],
  "actionableSuggestions": {
    "fertilizer": "Use NPK 10-20-10 to boost flowering.",
    "water": "Maintain moderate soil moisture. Water every 2 days.",
    "immediateAction": "Monitor for whiteflies. No immediate chemical spray required."
  }
}

- "cropName": Identify the crop. If unidentifiable, say "Unknown Crop".
- "cropStage": Estimate the growth stage.
- "healthScore": A number from 0 to 100 representing overall crop health.
- "healthSummary": A 1-2 sentence summary of the image.
- "detections": An array of up to 3 important findings.
- "severity": Must be exactly one of "success-detection", "warning-detection", or "danger-detection".
- "icon": A relevant emoji.
- "actionableSuggestions": Provide practical advice for fertilizer, water, and immediate actions.
  `;

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType
    }
  };

  const result = await model.generateContent([prompt, imagePart]);
  let jsonString = result.response.text();
  jsonString = jsonString.replace(/```json/gi, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("JSON parse error from Vision API:", e.message);
    throw new Error("Failed to generate valid JSON from AI Vision");
  }
}

module.exports = { getFarmResponse, generateFarmRecommendation, analyzeCropImage };