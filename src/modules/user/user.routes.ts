import express from "express";
import { userControllers } from "./user.controller";
import { METHODS } from "http";

const router = express.Router();

// POST method
// create user
router.post("/", userControllers.createUser);

// GET method
router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUserById);

// DELETE method
router.delete("/:id", userControllers.deleteUserById);

export const userRoutes = router;
