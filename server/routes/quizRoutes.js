import express from "express";
import QuizAttempt from "../models/QuizAttempt.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { subject, topic, difficulty, score, totalQuestions } = req.body;

    const percentage = Math.round((score / totalQuestions) * 100);

    const attempt = await QuizAttempt.create({
      subject,
      topic,
      difficulty,
      score,
      totalQuestions,
      percentage,
    });

    res.status(201).json(attempt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save attempt" });
  }
});

export default router;