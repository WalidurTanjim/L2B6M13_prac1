import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

// POST method
// create user
router.post("/", userControllers.createUser);

// GET method
router.get("/", userControllers.getUsers);

export const userRoutes = router;
