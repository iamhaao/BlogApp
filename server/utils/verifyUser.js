import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, token) => {
    if (err) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    const user = await User.findById(token.id);
    req.user = user;
    next();
  });
};
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
