const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware= async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Not authorized ❌" });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    req.user = user._id;
    req.userRole = user.role;   // ⭐ IMPORTANT

    next();

  } catch (error) {
    res.status(401).json({ message: "Token failed ❌" });
  }
};

module.exports = authMiddleware;
