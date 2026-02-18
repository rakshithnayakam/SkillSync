import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
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
    name:{
      type:String,
      required:true,
    },    
    type: {
      type: String,
      enum: ["offer", "want"],
      required: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 5,
      default: 1,
    },
  },
  { timestamps: true },
);
// Prevent offering and wanting the same skill
userSkillSchema.pre("validate", async function () {
  const exists = await this.constructor.findOne({
    userId: this.userId,
    skillId: this.skillId,
    type: this.type === "offer" ? "want" : "offer",
  });

  if (exists) {
    return next(new Error("Cannot both offer and want the same skill"));
  }

});

// Prevent duplicate entries
userSkillSchema.index({ userId: 1, skillId: 1, type: 1 }, { unique: true });

const UserSkill = mongoose.model("UserSkill", userSkillSchema);
export default UserSkill;
