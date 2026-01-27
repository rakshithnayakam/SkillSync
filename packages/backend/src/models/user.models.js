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
    age: Number,
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Learner", "Mentor", "Hybrid", "Admin"],
      default: "Learner",
    },
    bio: String,
    xp: {
      type: Number,
      default: 0,
    },
    refreshTokenHash: {
      type: String | null,
    },
  },
  { timestamps: true },
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();

  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

// Compare password
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// JWT
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY_JWT,
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY_JWT,
    },
  );
};

export const User = mongoose.model("User", userSchema);
