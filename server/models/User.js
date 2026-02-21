import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    course: String,
    year: String,

    // 🔥 Multiple subjects
    subjects: [String],

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);