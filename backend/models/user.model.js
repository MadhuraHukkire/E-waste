// backend/models/userModel.js

// const mongoose = require("mongoose");
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  reminderEnabled: {
    type: Boolean,
    default: true,
  },
  reminderDay: {
    type: String, // e.g., "Monday"
    default: "Monday",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // default role
  },
  password :{
    type: String,
    required: [true, "Password is required"],
  },

  refreshtoken : {
    type: String,
    default : ""
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create geospatial index for location
UserSchema.index({ location: "2dsphere" });

const UserModel =  mongoose.model("User", UserSchema);
export default UserModel;
