import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    xp: {
      type: Number,
      default: 0,
      min: 0,
    },

    level: {
      type: Number,
      default: 1,
      min: 1,
    },

    weeklyHours: {
      type: Number,
      default: 0,
      min: 0,
    },

    weeklySessions: {
      type: Number,
      default: 0,
      min: 0,
    },

    weekStart: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
