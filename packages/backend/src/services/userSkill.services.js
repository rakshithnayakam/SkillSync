import UserSkill from "../models/userSkill.models.js";
import Skill from "../models/skill.models.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const addUserSkillService = async (userId, skill, type) => {
  const skillDoc = await Skill.findOne({ name: skill }).select("_id");
  if (!skillDoc) {
    throw new ApiError(404, "Skill not found");
  }

  const userSkill = await UserSkill.create({
    userId,
    skillId: skillDoc._id,
    name: skill,
    type,
    proficiency: 0,
  });

  if (!userSkill) {
    throw new ApiError(500, "Failed to add skill to user. Please try again.");
  }

  // Sync to User model so matchmaking can read skillsToTeach / skillsToLearn
  if (type === "offer") {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { skillsToTeach: skill },
    });
  } else if (type === "want") {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { skillsToLearn: skill },
    });
  }

  return userSkill;
};

export const getCurrentUserSkillsService = async (userId) => {
  const userSkills = await UserSkill.find({ userId })
    .populate("skillId")
    .sort({ createdAt: -1 });
  if (!userSkills) {
    throw new ApiError(404, "No skills found for the user");
  }
  return userSkills;
};

export const updateUserProficiencyService = async (id, proficiency, userId) => {
  const userSkill = await UserSkill.findOneAndUpdate(
    { _id: id, userId },
    { proficiency },
    { new: true },
  );
  return userSkill;
};

export const deleteUserSkillService = async (id, userId) => {
  const userSkill = await UserSkill.findOneAndDelete({ _id: id, userId });

  if (userSkill) {
    // Remove from User model too so matchmaking stays in sync
    if (userSkill.type === "offer") {
      await User.findByIdAndUpdate(userId, {
        $pull: { skillsToTeach: userSkill.name },
      });
    } else if (userSkill.type === "want") {
      await User.findByIdAndUpdate(userId, {
        $pull: { skillsToLearn: userSkill.name },
      });
    }
  }

  return userSkill;
};