import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

// POST method
router.post("/", todoController.createTodo);

export const todoRouter = router;