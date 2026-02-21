import express from "express";
import QuizAttempt from "../models/QuizAttempt.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Protected route - only logged-in users can save quiz
router.post("/save", protect, async (req, res) => {
  try {
    const { subject, topic, difficulty, score, totalQuestions } = req.body;

    if (!subject || score == null || !totalQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    const attempt = await QuizAttempt.create({
      user: req.user._id,   // 🔥 Link quiz to logged-in user
      subject,
      topic,
      difficulty,
      score,
      totalQuestions,
      percentage,
    });

    res.status(201).json({
      message: "Quiz attempt saved successfully",
      attempt,
    });

  } catch (error) {
    console.error("Quiz Save Error:", error);
    res.status(500).json({ message: "Failed to save attempt" });
  }
});

export default router;