import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

// POST method
router.post("/login", authController.loginUser);

export const authRoutes = router;