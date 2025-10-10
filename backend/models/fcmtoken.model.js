// backend/models/Token.js
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Token', tokenSchema);
