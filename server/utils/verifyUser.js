import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};
