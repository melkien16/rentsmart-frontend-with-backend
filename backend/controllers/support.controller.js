import { GoogleGenAI } from "@google/genai";
import asyncHandler from "../middleware/asyncHandler.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Item from "../models/itemModel.js";

// --- Load FAQs JSON safely ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const faqsPath = path.join(__dirname, "faqs.json");
const faqs = JSON.parse(fs.readFileSync(faqsPath, "utf8"));

// --- Initialize Gemini API ---
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // keep this secure
});

// --- Build full context for AI ---
async function buildFullContext() {
  // All FAQs in natural text
  const faqContext = faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  // All Rentals in natural text
  const rentals = await Item.find().limit(20); // adjust limit for scale
  const rentalContext = rentals
    .map(
      (r) =>
        `Item: ${r.title}, Price: ${r.price} birr, Status: ${r.status}, Available: ${r.availableQuantity}, Description: ${r.description}`
    )
    .join("\n");

  // Combine everything
  const contextText = [];
  if (faqContext) contextText.push(`FAQs:\n${faqContext}`);
  if (rentalContext) contextText.push(`Rentals:\n${rentalContext}`);

  return contextText.join("\n\n");
}

// --- Support Controller using streaming API ---
const supportController = asyncHandler(async (req, res) => {
  const { message } = req.body;

  try {
    // Build full context for AI reasoning
    const context = await buildFullContext();

    // AI configuration
    const config = {
      temperature: 0.7, // professional, balanced creativity
      thinkingConfig: { thinkingBudget: -1 }, // AI can reason freely
    };
    const model = "gemini-flash-latest";

    // Compose the prompt for AI
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `You are a professional support assistant for RentSmart, a large-scale online tool rental platform where users can list and rent items. Your responses should be:\n
- Friendly, clear, and professional.\n
- Accurate based on the context below.\n
- If unsure, use the fallback message:\n
"I’m sorry, I don’t have the information you’re looking for right now. Please contact our support team, and they’ll be happy to assist you."\n\n
Context (FAQs and Rentals):\n${context}\n\n
User Question:\n${message}\n\n
Provide the answer in a concise, helpful, and professional manner.`,
          },
        ],
      },
    ];

    // Set headers for streaming response
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const responseStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    // Stream chunks to client
    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(`data: ${chunk.text}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("SupportController error:", err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default supportController;
