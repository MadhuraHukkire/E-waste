

import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// ------------------- TOKEN GENERATOR -------------------
const generateToken = (userId, type = 'access') => {
  const secret = type === 'access'
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET;

  const expiresIn = type === 'access'
    ? process.env.ACCESS_TOKEN_EXPIRY || '15m'
    : process.env.REFRESH_TOKEN_EXPIRY || '7d';

  return jwt.sign({ _id: userId }, secret, { expiresIn });
};

// ------------------- REGISTER -------------------
export const userRegisterController = async (req, res) => {
  try {
    const { name, email, phone, address, longitude, latitude, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required", success: false, error: true });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false, error: true });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      address,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      password: hashedPassword,
    });

    await user.save();

    const { password: pwd, ...userData } = user.toObject();

    return res.status(201).json({ message: "User registered successfully", data: userData, success: true, error: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false, error: true });
  }
};

// ------------------- LOGIN -------------------
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false, error: true });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password", success: false, error: true });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password", success: false, error: true });

    // Generate tokens
    const accessToken = generateToken(user._id, 'access');
    const refreshToken = generateToken(user._id, 'refresh');

    // Save refresh token in DB
    await User.findByIdAndUpdate(user._id, { refreshtoken: refreshToken });

    // Set cookies
    const cookieOptions = { httpOnly: true, secure: true, sameSite: "None" };
    res.cookie('RefreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.cookie('AccessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    const { password: pwd, ...userData } = user.toObject();

    return res.status(200).json({ message: "Login successful", data: { user: userData, accessToken }, success: true, error: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false, error: true });
  }
};

// ------------------- GET PROFILE -------------------
export const getUserProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false, error: true });
    const { password: pwd, ...userData } = user.toObject();
    return res.status(200).json({ message: "User profile fetched successfully", data: userData, success: true, error: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false, error: true });
  }
};

// ------------------- UPDATE PROFILE -------------------
export const updateUserProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false, error: true });

    const { name, email, phone, address, location, reminderEnabled, reminderDay } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (location !== undefined) user.location = location;
    if (reminderEnabled !== undefined) user.reminderEnabled = reminderEnabled;
    if (reminderDay !== undefined) user.reminderDay = reminderDay;

    await user.save();
    const { password: pwd, ...userData } = user.toObject();
    return res.status(200).json({ message: "User profile updated successfully", data: userData, success: true, error: false });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) return res.status(400).json({ message: "Email already exists", success: false, error: true });
    return res.status(500).json({ message: "Server error", success: false, error: true });
  }
};

// ------------------- LOGOUT -------------------
export const logoutController = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false, error: true });

    await User.findByIdAndUpdate(req.userId, { refreshtoken: "" });

    const cookieOptions = { httpOnly: true, secure: true, sameSite: "None" };
    res.clearCookie('RefreshToken', cookieOptions);
    res.clearCookie('AccessToken', cookieOptions);

    return res.status(200).json({ message: "Logout successful", success: true, error: false });
  } catch (error) {
    return res.status(500).json({ message: error.message || error, success: false, error: true });
  }
};

// ------------------- REFRESH ACCESS TOKEN -------------------
export const refreshAccessTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.RefreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided", success: false, error: true });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || user.refreshtoken !== refreshToken) return res.status(401).json({ message: "Invalid refresh token", success: false, error: true });

    const accessToken = generateToken(user._id, 'access');

    const cookieOptions = { httpOnly: true, secure: true, sameSite: "None" };
    res.cookie('AccessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    return res.status(200).json({ message: "New access token issued", data: { accessToken }, success: true, error: false });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired refresh token", success: false, error: true });
  }
};



