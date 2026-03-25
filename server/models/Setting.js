const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  testDuration: {
    type: Number,
    default: 60
  },
  questionCount: {
    type: Number,
    default: 5
  }
});

module.exports = mongoose.model("Setting", settingSchema);
