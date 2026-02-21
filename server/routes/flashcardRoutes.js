import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // remove this if using real OpenAI
});

router.post("/generate", async (req, res) => {
  try {
    const { subject, topic, difficulty, numberOfCards } = req.body;

    const prompt = `
Generate ${numberOfCards} flashcards for ${subject}.
Topic: ${topic}
Difficulty: ${difficulty}

Return STRICT JSON array only like:

[
  {
    "question": "Question here",
    "answer": "Answer here"
  }
]

No explanation. Only JSON.
`;

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // change if using real OpenAI
      messages: [
        {
          role: "system",
          content: "You are an expert engineering professor."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const rawText = response.choices[0].message.content;

    // Clean markdown if model wraps JSON
    const cleanText = rawText.replace(/```json|```/g, "").trim();

    const flashcards = JSON.parse(cleanText);

    res.json(flashcards);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Flashcard generation failed" });
  }
});

export default router;