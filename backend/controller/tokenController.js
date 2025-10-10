// backend/controllers/tokenController.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.RefreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided",
        success: false,
        error: true,
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user
    const user = await User.findById(decoded._id);
    if (!user || user.refreshtoken !== refreshToken) {
      return res.status(401).json({
        message: "Invalid refresh token",
        success: false,
        error: true,
      });
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    });

    return res.status(200).json({
      message: "New access token generated",
      accessToken: newAccessToken,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in refreshTokenController:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: true,
    });
  }
};
