const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true   // ✅ fixed
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],   // ✅ add enum
        default: "student"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);