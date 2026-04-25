import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['period', 'medication', 'water', 'exercise', 'appointment', 'custom'],
      default: 'custom'
    },
    scheduledFor: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'sent', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

export const Reminder = mongoose.model('Reminder', reminderSchema);
