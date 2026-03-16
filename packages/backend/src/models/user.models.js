import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    age: {
      type: Number,
      default: null,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Learner", "Mentor", "Hybrid", "Admin"],
      default: "Learner",
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "",
    },
    xp: {
      type: Number,
      default: 0,
    },
    refreshTokenHash: {
      type: String,
      default: null,
    },
    skillsToTeach: [{ type: String, trim: true }],
    skillsToLearn: [{ type: String, trim: true }],
    passwordResetToken: { type: String, default: null },
    passwordResetExpiry: { type: Date, default: null },
    emailVerifyToken: { type: String, default: null },
    emailVerifyExpiry: { type: Date, default: null },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash")) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

// Compare password
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_JWT },
  );
};

// Refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY_JWT,
  });
};

export const User = mongoose.model("User", userSchema);
