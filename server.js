import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://siigpt.vercel.app/',
    credentials: true,
}));
app.use(bodyParser.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    // Send prompt to Gemini
    const result = await model.generateContent(message);
    const reply = result.response?.text() || "No reply";

    res.json({ reply });

  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Error calling Gemini API" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
