import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

// POST method
// create user
router.post("/", userControllers.createUser);

export const userRoutes = router;
