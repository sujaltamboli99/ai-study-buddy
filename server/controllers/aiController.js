import OpenAI from "openai";

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