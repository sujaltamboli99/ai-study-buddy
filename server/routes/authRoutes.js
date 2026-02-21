import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   AUTH ROUTES
========================= */

// 🔐 Signup
router.post("/signup", signup);

// 🔐 Login
router.post("/login", login);


/* =========================
   ONBOARDING ROUTE
========================= */

// 🔥 Onboarding (Update user profile after signup)
router.put("/onboarding", protect, async (req, res) => {
  try {
    const { name, course, year, subjects } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name;
    user.course = course;
    user.year = year;
    user.subjects = subjects;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Onboarding failed" });
  }
});

export default router;