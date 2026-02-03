import Skill from "../models/skill.models.js";
import UserSkill from "../models/userSkill.models.js";

export const saveUserSkills = async (req, res) => {
  try {
    const userId = req.user._id;
    const { skills, type } = req.body;

    if (!skills || !Array.isArray(skills) || !type) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    if (!["offer", "want"].includes(type)) {
      return res.status(400).json({ message: "Invalid skill type" });
    }

    // 1️⃣ Remove existing skills of this type (update scenario)
    await UserSkill.deleteMany({ userId, type });

    // 2️⃣ Loop through skills
    for (const skillName of skills) {
      // find or create skill
      let skill = await Skill.findOne({ name: skillName });

      if (!skill) {
        skill = await Skill.create({ name: skillName });
      }

      // link user ↔ skill
      await UserSkill.create({
        userId,
        skillId: skill._id,
        type,
      });
    }

    res.status(200).json({
      success: true,
      message: "Skills saved successfully",
    });
  } catch (error) {
    console.error("Save Skills Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
