import express from "express";
import { generateNotes, chatWithAI, generateQuiz } from "../controllers/aiController.js";

const router = express.Router();

router.post("/notes", generateNotes);
router.post("/chat", chatWithAI);
router.post("/quiz", generateQuiz);

export default router;