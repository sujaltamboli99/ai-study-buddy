import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: String,
  topic: String,
  difficulty: String,
  score: Number,
  totalQuestions: Number,
  percentage: Number,
}, { timestamps: true });

export default mongoose.model("QuizAttempt", quizAttemptSchema);