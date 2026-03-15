import Progress from "../models/progress.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * GET PROGRESS
 */
export const getProgressController = asyncHandler(async (req, res) => {
  let progress = await Progress.findOne({ userId: req.user._id });

  // create progress if doesn't exist
  if (!progress) {
    progress = await Progress.findOneAndUpdate(
      { userId: req.user._id },
      {
        $setOnInsert: {
          userId: req.user._id,
          xp: 0,
          level: 1,
          weeklyHours: 0,
          weeklySessions: 0,
          weekStart: new Date(),
        },
      },
      { upsert: true, new: true },
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Progress fetched successfully"));
});

/**
 * UPDATE PROGRESS
 */
export const updateProgressController = asyncHandler(async (req, res) => {
  const { xp, weeklyHours, weeklySessions } = req.body;

  let progress = await Progress.findOne({ userId: req.user._id });

  if (!progress) {
    throw new ApiError(404, "Progress not found");
  }

  // update XP
  if (xp) progress.xp += xp;

  // calculate level from XP (every 100 XP = 1 level)
  progress.level = Math.floor(progress.xp / 100) + 1;

  // update weekly stats
  if (weeklyHours) progress.weeklyHours += weeklyHours;
  if (weeklySessions) progress.weeklySessions += weeklySessions;

  await progress.save();

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Progress updated successfully"));
});

/**
 * RESET WEEKLY PROGRESS
 */
export const resetWeeklyProgressController = asyncHandler(async (req, res) => {
  const progress = await Progress.findOne({ userId: req.user._id });

  if (!progress) {
    throw new ApiError(404, "Progress not found");
  }

  progress.weeklyHours = 0;
  progress.weeklySessions = 0;
  progress.weekStart = new Date();

  await progress.save();

  return res
    .status(200)
    .json(new ApiResponse(200, progress, "Weekly progress reset successfully"));
});
