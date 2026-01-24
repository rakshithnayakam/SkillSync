import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },

  type: {
    type: String,
    enum: ["offer", "want"],
    required: true,
  },

  proficiency: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
});

const UserSkill = mongoose.model("UserSkill", userSkillSchema);
export default UserSkill;
