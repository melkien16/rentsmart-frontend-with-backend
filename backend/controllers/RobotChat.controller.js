import { GoogleGenAI } from "@google/genai";
import asyncHandler from "../middleware/asyncHandler.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Item from "../models/itemModel.js";

// --- Load FAQs JSON ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const faqsPath = path.join(__dirname, "faqs.json");
const faqs = JSON.parse(fs.readFileSync(faqsPath, "utf8"));

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY, // keep secret in env
});

// --- Build full context for AI ---
async function buildFullContext() {
  const faqContext = faqs
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

  const rentals = await Item.find().limit(10); // reduce for speed
  const rentalContext = rentals
    .map(
      (r) =>
        `Item: ${r.title}, Price: ${r.price} birr, Status: ${r.status}, Available: ${r.availableQuantity}, Description: ${r.description}`
    )
    .join("\n");

  return [
    faqContext && `FAQs:\n${faqContext}`,
    rentalContext && `Rentals:\n${rentalContext}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

// --- Streaming Support Controller with POST + fetch streaming ---
const robotChatController = asyncHandler(async (req, res) => {
  const { message } = req.body;

  try {
    const context = await buildFullContext();

    const prompt = `You are a professional support assistant for RentSmart, a large-scale online tool rental platform. 
Your responses should be friendly, clear, professional, and based on the context below.
If unsure, use this fallback: 
"I’m sorry, I don’t have the information you’re looking for right now. Please contact our support team."

Context:
${context}`;

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const res = await chat.sendMessage({
      message: {
        role: "user",
        parts: [{ text: message }],
      },
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.8,
        stream: true,
      },
    });

    //return json json file

    console.log("AI response:", res.text);

    res.status(200).json({ reply: res.text });

    // 
  } catch (err) {
    console.error("SupportController error:", err);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default robotChatController;
