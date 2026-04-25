import mongoose from 'mongoose';

const cycleLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    lastPeriodDate: { type: Date, required: true },
    averageLength: { type: Number, default: 28, min: 15, max: 60 },
    periodLength: { type: Number, min: 1, max: 15 },
    flow: { type: String, enum: ['light', 'medium', 'heavy'], default: 'medium' },
    symptoms: [{ type: String }]
  },
  { timestamps: true }
);

export const CycleLog = mongoose.model('CycleLog', cycleLogSchema);
