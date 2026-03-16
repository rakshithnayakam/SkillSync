import { Router } from "express";
import multer from "multer";
import path from "path";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { User } from "../models/user.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/avatars/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user._id}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new ApiError(400, "Only image files allowed"));
  },
});

router.post("/avatar", verifyJWT, upload.single("avatar"), async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: avatarUrl } },
    { new: true }
  ).select("-passwordHash -refreshTokenHash");
  return res.status(200).json(new ApiResponse(200, user, "Avatar uploaded successfully"));
});

export default router;
