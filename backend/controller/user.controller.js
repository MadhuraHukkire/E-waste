// // // const User = require("../models/user.model");
// // // import User from "../models/user.model.js";

// // // export const userRegisterController =async (req, res) => {
// // //     try {
// // //         const { name, email, phone, address, location, password } = req.body;
// // //         const existingUser = await User.findOne({ email });
// // //         if(!password){
// // //             return res.status(400).json({ message: "Password is required" });
// // //         }
// // //         if (existingUser) {
// // //             return res.status(400).json({ message: "User already exists with this email" });
// // //         }

// // //         const user = new User({
// // //             name,
// // //             email,
// // //             phone,
// // //             address,
// // //             location,
// // //             password

// // //         })

// // //         await user.save();
// // //         return res.status(201).json({
// // //             message : "User registeres SuccessFully",
// // //             data : user,
// // //             success :true,
// // //             error : false
// // //         })
        
// // //     } catch (error) {
// // //         console.log(error);
// // //         res.status(500).json({ message: "Server error" });
// // //     }
// // // }

// // // backend/controllers/userController.js
// // import bcrypt from "bcryptjs";
// // import User from "../models/user.model.js";

// // export const userRegisterController = async (req, res) => {
// //   try {
// //     const { name, email, phone, address, longitude, latitude, password } = req.body;

// //     if (!password) {
// //       return res.status(400).json({ message: "Password is required" });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists with this email" });
// //     }

// //     // 🔒 Hash the password with bcrypt
// //     const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

// //     const user = new User({
// //       name,
// //       email,
// //       phone,
// //       address,
// //       location: {
// //         type: "Point",
// //         coordinates: [longitude, latitude],
// //       },
// //       password: hashedPassword,
// //     });

// //     await user.save();

// //     return res.status(201).json({
// //       message: "User registered successfully",
// //       data: user,
// //       success: true,
// //       error: false,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in userRegisterController:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // backend/controllers/userController.js


// // export const userLoginController = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Validate input
// //     if (!email || !password) {
// //       return res.status(400).json({ message: "Email and password are required" });
// //     }

// //     // Find user by email
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     // Compare password with hashed password
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ message: "Invalid email or password" });
// //     }

// //     // Optional: remove password from returned user object
// //     const { password: pwd, ...userData } = user.toObject();

// //     return res.status(200).json({
// //       message: "Login successful",
// //       data: userData,
// //       success: true,
// //       error: false,
// //     });
// //   } catch (error) {
// //     console.error("❌ Error in userLoginController:", error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };





// // export const getUserProfileController = async(req,res)=>{
// //     try {
// //         const user = await User.findById(req.params.id);
// //         if (!user) return res.status(404).json({ message: "User not found" });
// //         return res.status(200).json({
// //             message : "user profile fetched successfully",
// //             data : user,
// //             success : true,
// //             error : false
// //         })
// //     } catch (error) {
        
// //     }
// // }


// // export const updateUserProfileController = async(req,res)=>{
// //     try {
// //         const user = await User.findById(req.params.id);
// //         if(!user) return res.status(404).json({message : "User not found"});
// //         const {name, email, phone, address, location, reminderEnabled, reminderDay} = req.body;
// //         user.name = name || user.name;
// //         user.email = email || user.email;
// //         user.phone = phone || user.phone;
// //         user.address = address || user.address;
// //         user.location = location || user.location;
        
// //         if (req.body.location) user.location = req.body.location;
// //         await user.save();
// //         return res.status(200).json({
// //             message : "user profile updated successfully",
// //             data : user,
// //             success : true,
// //             error : false
// //         })

// //     } catch (error) {
// //         console.log(error)
// //         res.status(500).json({ message: "Server error" });
// //     }
// // }


// import User from "../models/user.model.js";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';

// dotenv.config();

// // ✅ Single token generator function
// const generateToken = (userId, type = 'access') => {
//   const secret = type === 'access' 
//     ? process.env.ACCESS_TOKEN_SECRET 
//     : process.env.REFRESH_TOKEN_SECRET;
  
//   const expiresIn = type === 'access' 
//     ? process.env.ACCESS_TOKEN_EXPIRY || '15m'
//     : process.env.REFRESH_TOKEN_EXPIRY || '7d';

//   return jwt.sign({ _id: userId }, secret, { expiresIn });
// };

// // ✅ REGISTER CONTROLLER
// export const userRegisterController = async (req, res) => {
//   try {
//     const { name, email, phone, address, longitude, latitude, password } = req.body;

//     if (!password) {
//       return res.status(400).json({ 
//         message: "Password is required",
//         success: false,
//         error: true 
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ 
//         message: "User already exists with this email",
//         success: false,
//         error: true 
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       phone,
//       address,
//       location: {
//         type: "Point",
//         coordinates: [longitude, latitude],
//       },
//       password: hashedPassword,
//     });

//     await user.save();

//     const { password: pwd, ...userData } = user.toObject();

//     return res.status(201).json({
//       message: "User registered successfully",
//       data: userData,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     console.error("❌ Error in userRegisterController:", error);
//     res.status(500).json({ 
//       message: "Server error",
//       success: false,
//       error: true 
//     });
//   }
// };

// // ✅ LOGIN CONTROLLER
// export const userLoginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ 
//         message: "Email and password are required",
//         success: false,
//         error: true 
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ 
//         message: "Invalid email or password",
//         success: false,
//         error: true 
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ 
//         message: "Invalid email or password",
//         success: false,
//         error: true 
//       });
//     }

//     // ✅ GENERATE TOKENS
    
//     const refreshToken = generateToken(user._id, 'refresh');
//     await User.findByIdAndUpdate(user._id, { refreshtoken: refreshToken });

//     // ✅ SET COOKIES
//     const cookiesOption = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None"
//     };

   
//     res.cookie('RefreshToken', refreshToken, {
//       ...cookiesOption,
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

    

//     return res.status(200).json({
//       message: "Login successful",
//       data: {

//         user: user,
//         refreshToken
//       },
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     console.error("❌ Error in userLoginController:", error);
//     res.status(500).json({ 
//       message: "Server error",
//       success: false,
//       error: true 
//     });
//   }
// };

// // ✅ GET PROFILE CONTROLLER
// export const getUserProfileController = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId)
    
//     if (!user) {
//       return res.status(404).json({ 
//         message: "User not found",
//         success: false,
//         error: true 
//       });
//     }

//     return res.status(200).json({
//       message: "User profile fetched successfully",
//       data: user,
//       success: true,
//       error: false
//     });
//   } catch (error) {
//     console.error("❌ Error in getUserProfileController:", error);
//     return res.status(500).json({ 
//       message: "Server error",
//       success: false,
//       error: true 
//     });
//   }
// };

// // ✅ UPDATE PROFILE CONTROLLER
// export const updateUserProfileController = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
    
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//         error: true
//       });
//     }

//     const { name, email, phone, address, location, reminderEnabled, reminderDay } = req.body;
    
//     if (name !== undefined) user.name = name;
//     if (email !== undefined) user.email = email;
//     if (phone !== undefined) user.phone = phone;
//     if (address !== undefined) user.address = address;
//     if (location !== undefined) user.location = location;
//     if (reminderEnabled !== undefined) user.reminderEnabled = reminderEnabled;
//     if (reminderDay !== undefined) user.reminderDay = reminderDay;

//     await user.save();

//     const { password: pwd, ...userData } = user.toObject();

//     return res.status(200).json({
//       message: "User profile updated successfully",
//       data: userData,
//       success: true,
//       error: false
//     });

//   } catch (error) {
//     console.error("❌ Error in updateUserProfileController:", error);
    
//     if (error.code === 11000) {
//       return res.status(400).json({
//         message: "Email already exists",
//         success: false,
//         error: true
//       });
//     }

//     return res.status(500).json({ 
//       message: "Server error",
//       success: false,
//       error: true 
//     });
//   }
// };




// // ✅ LOGOUT CONTROLLER
// export const logoutController = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const cookiesOption = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None"
//     };
//     const removeRefreshToken = await User.findByIdAndUpdate(userId, { refreshtoken: "" });
//     if (!removeRefreshToken) {
//         return res.status(404).json({
//             message : "you are not logged in then how can you logout ?",
//             error : true,
//             success : false
//         })
      
//     }

//     res.clearCookie('RefreshToken', cookiesOption);

//     return res.status(200).json({
//       message: "Logout successful",
//       error: false,
//       success: true
//     });
    
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };


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



