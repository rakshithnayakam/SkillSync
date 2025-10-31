import mongoose from "mongoose";

const matchRequestSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
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
      enum: ["pending", "accepted", "rejected", "cancelled"],
      required: true,
    },
    message: {
      type: String,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

matchRequestSchema.index({ from: 1, to: 1, skill: 1 }, { unique: true });

export const MatchRequest = mongoose.model("MatchRequest", matchRequestSchema); 