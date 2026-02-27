const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Not authorized ❌" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found ❌" });
    }

    req.user = user;  // 🔥 FULL USER OBJECT

    next();

  } catch (error) {
    res.status(401).json({ message: "Token failed ❌" });
  }
};

module.exports = authMiddleware;