import { GoogleGenAI } from "@google/genai";
import asyncHandler from "../middleware/asyncHandler.js";

// --- Initialize Gemini API ---
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY, // keep this secure
});

const helpController = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text input is required" });
  }

  const prompt = `
You are an assistant that helps extract structured search filters from plain user text.

1. If the text is in **Amharic**, translate it into English first.
2. Identify possible values for:
   - "title": a possible item title
   - "category": a broad category if mentioned
   - "tags": relevant keywords or attributes (as a list of strings)
   - "keywords": other words that may help refine a search
3. Respond strictly in **JSON** format like this:
{
  "title": "...",
  "category": "...",
  "tags": ["tag1", "tag2"],
  "keywords": ["word1", "word2"]
}

User text: """${text}"""
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        candidateCount: 1,
        stopSequences: ["x"],
        maxOutputTokens: 200, // increase token limit to allow full JSON
        temperature: 0.3, // lower temperature for more deterministic output
      },
    });

    // Extract text
    let output = response.text;

    // Remove any code fences or extra text
    output = output.replace(/```json|```/g, "").trim();

    // Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to parse AI response", raw: output });
    }

    res.json(parsed);
  } catch (error) {
    console.error("AI processing error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

export default helpController;
