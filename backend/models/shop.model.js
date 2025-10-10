// backend/models/shop.model.js
import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shop name is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Shop address is required"],
  },
  images: {
    type: [String], // array of image URLs
    required: true,
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
  phone: {
    type: String,
    required: [true, "Shop phone number is required"],
  },
  email: {
    type: String,
    lowercase: true,
  },
  services: {
    type: [String], // e.g., ["Mobile Repair", "Laptop Refurbish", "Battery Recycling"]
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  isApproved :{
    type :Boolean,
    default : false,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  
},{timestamps: true});

// Geospatial index for nearest-shop queries
ShopSchema.index({ location: "2dsphere" });

const Shop = mongoose.model("Shop", ShopSchema);
export default Shop;
