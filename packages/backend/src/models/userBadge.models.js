import mongoose from "mongoose";

const userBadgeSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    badgeId:  { type: String, required: true },
    earned:   { type: Boolean, default: false },
    progress: { type: Number,  default: 0 },
    earnedAt: { type: Date,    default: null },
  },
  { timestamps: true }
);

userBadgeSchema.index({ user: 1, badgeId: 1 }, { unique: true });

export const UserBadge = mongoose.model("UserBadge", userBadgeSchema);