import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import mongoose from "mongoose"

/**
 * HEALTH CHECK
 */
export const healthCheckController = asyncHandler(async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected"

  return res.status(200).json(
    new ApiResponse(200, {
      status: "ok",
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }, "Server is healthy")
  )
})