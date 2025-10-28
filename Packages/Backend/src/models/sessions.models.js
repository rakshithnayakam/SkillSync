import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["requested", "completed", "confirmed", "cancelled"],
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  },
  { timestamps: true },
);

export const Session = mongoose.model("Session", sessionSchema);
