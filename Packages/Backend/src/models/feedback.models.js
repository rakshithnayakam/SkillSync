import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
