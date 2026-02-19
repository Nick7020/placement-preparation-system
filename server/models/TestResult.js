const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  score: Number,
  total: Number,
  accuracy: String,

  startedAt: Date,      // 🔥 NEW
  submittedAt: Date,    // 🔥 NEW
  timeTaken: Number     // 🔥 NEW (seconds)

}, { timestamps: true });

module.exports = mongoose.model("TestResult", testResultSchema);
