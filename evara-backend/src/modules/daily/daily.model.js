import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    logDate: { type: Date, default: Date.now, index: true },
    mood: { type: String, default: 'steady' },
    energy: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    symptoms: [{ type: String }],
    sleepHours: { type: Number, min: 0, max: 24 },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

export const DailyLog = mongoose.model('DailyLog', dailyLogSchema);
