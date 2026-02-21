import OpenAI from "openai";
import QuizAttempt from "../models/QuizAttempt.js";

export const generateNotes = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ message: "Topic is required" });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        });

        const response = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are an expert engineering professor.",
                },
                {
                    role: "user",
                    content: `Explain ${topic} in simple terms.
Give:
1. Definition
2. Key Points
3. Example
4. Exam Tip`,
                },
            ],
        });

        res.json({
            notes: response.choices[0].message.content,
        });

    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({ message: "Error generating notes" });
    }
};

export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    const today = new Date().toDateString();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
You are AI Study Buddy.

Today's date is: ${today}

You can answer:
- Engineering
- Programming
- General knowledge
- Career advice
- Casual conversation

Be structured and clear.
If comparing things, use table format.
`,
        },
        ...messages,
      ],
    });

    res.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Chat error" });
  }
};

export const generateQuiz = async (req, res) => {
  try {
    // ✅ UPDATED: Now we accept subject, topic, difficulty & numberOfQuestions
    const { subject, topic, difficulty, numberOfQuestions } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }

    // ✅ Default to 5 if user doesn't provide number
    const totalQuestions = numberOfQuestions || 5;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
You are an expert quiz generator.

Generate ${totalQuestions} multiple choice questions.

Details:
- Subject: ${subject || "General"}
- Topic: ${topic}
- Difficulty: ${difficulty || "Medium"}

Rules:
- Return STRICTLY in valid JSON.
- Do NOT wrap in markdown.
- Do NOT add explanation outside JSON.
- Correct answer must be A, B, C, or D.

Format:

[
  {
    "question": "Question text",
    "options": [
      "Option A text",
      "Option B text",
      "Option C text",
      "Option D text"
    ],
    "correctAnswer": "A",
    "explanation": "Short explanation"
  }
]

Return only JSON array.
`,
        },
      ],
    });

    // ✅ IMPORTANT: Clean response if model accidentally wraps in ```json ```
    let rawContent = response.choices[0].message.content;

    rawContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const quiz = JSON.parse(rawContent);

    res.json(quiz);

  } catch (error) {
    console.error("Quiz Generation Error:", error);
    res.status(500).json({ message: "Quiz generation error" });
  }
};