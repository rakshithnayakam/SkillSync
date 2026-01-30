import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
      index: true,
    },
    message: {
      type: String,
      default: "",
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

// Prevent self-requests
requestSchema.pre("validate", function (next) {
  if (this.fromUserId.equals(this.toUserId)) {
    return next(new Error("fromUserId and toUserId cannot be the same"));
  }
  next();
});

//Prevents duplicate active requests
requestSchema.index(
  { fromUserId: 1, toUserId: 1, skillId: 1, status: 1 },
  {
    unique: true,
  },
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
