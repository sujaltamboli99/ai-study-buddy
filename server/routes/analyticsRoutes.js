import express from "express";
import QuizAttempt from "../models/QuizAttempt.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const attempts = await QuizAttempt.find().sort({ createdAt: -1 });

    const totalQuizzes = attempts.length;

    const averageScore =
      totalQuizzes > 0
        ? Math.round(
            attempts.reduce((acc, curr) => acc + curr.percentage, 0) /
              totalQuizzes
          )
        : 0;

    const bestScore =
      totalQuizzes > 0
        ? Math.max(...attempts.map((a) => a.percentage))
        : 0;

    // Subject-wise stats
    const subjectStats = {};

    attempts.forEach((attempt) => {
      if (!subjectStats[attempt.subject]) {
        subjectStats[attempt.subject] = [];
      }
      subjectStats[attempt.subject].push(attempt.percentage);
    });

    const formattedSubjectStats = Object.keys(subjectStats).map(
      (subject) => ({
        subject,
        average: Math.round(
          subjectStats[subject].reduce((a, b) => a + b, 0) /
            subjectStats[subject].length
        ),
      })
    );

    res.json({
      totalQuizzes,
      averageScore,
      bestScore,
      subjectStats: formattedSubjectStats,
      recentAttempts: attempts.slice(0, 5),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analytics error" });
  }
});

export default router;