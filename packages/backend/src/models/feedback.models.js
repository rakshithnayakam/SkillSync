import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Comment must be at least 10 characters"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
  },
  { timestamps: true },
);

feedbackSchema.pre("validate", function () {
  if (this.fromUser.equals(this.toUser)) {
    throw new Error("You cannot leave feedback for yourself");
  }
});

feedbackSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;