

import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.AccessToken;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) token = authHeader.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Access denied. No token provided.", error: true, success: false });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded._id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired", error: true, success: false });
    if (error.name === "JsonWebTokenError") return res.status(401).json({ message: "Invalid token", error: true, success: false });
    return res.status(500).json({ message: "Authentication failed", error: true, success: false });
  }
};
