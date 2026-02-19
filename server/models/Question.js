const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["aptitude", "dsa", "technical"],
    required: true
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
