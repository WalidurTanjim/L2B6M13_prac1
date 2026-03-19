import express from "express";
import { todoController } from "./todo.controller";

const router = express.Router();

// POST method
router.post("/", todoController.createTodo);

// GET method
router.get("/", todoController.getTodos);

export const todoRouter = router;