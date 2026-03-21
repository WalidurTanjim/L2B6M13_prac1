import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// POST method
// create user
router.post("/", userControllers.createUser);

// GET method
router.get("/", auth("admin"), userControllers.getUsers);
router.get("/:id", userControllers.getUserById);

// DELETE method
router.delete("/:id", userControllers.deleteUserById);

// PUT method
router.put("/:id", userControllers.updateUserById);

export const userRoutes = router;
