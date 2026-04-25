import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    age: { type: Number, min: 10, max: 80 },
    height: { type: Number, min: 80, max: 250 },
    weight: { type: Number, min: 25, max: 300 },
    healthProfile: {
      conditions: [{ type: String }],
      goals: [{ type: String }],
      preferences: { type: Map, of: String }
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
