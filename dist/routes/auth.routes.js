import { protectRoute } from "../middlewares/auth.middleware.js";
import express from "express";
import { getProfile, loginUser, logoutUser, registeruser } from "../controllers/auth.controllers.js";
const router = express.Router();
router.post("/register", registeruser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/profile", protectRoute, getProfile);
export default router;
