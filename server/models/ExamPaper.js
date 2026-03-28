const mongoose = require("mongoose");

const examPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ["aptitude", "dsa", "technical", "mern", "reasoning", "mixed"], default: "mixed" },
  difficulty: { type: String, enum: ["easy", "medium", "hard", "mixed"], default: "mixed" },
  questionCount: { type: Number, default: 10 },
  duration: { type: Number, default: 30 },
  isActive: { type: Boolean, default: true },
  selectedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
}, { timestamps: true });

module.exports = mongoose.model("ExamPaper", examPaperSchema);
