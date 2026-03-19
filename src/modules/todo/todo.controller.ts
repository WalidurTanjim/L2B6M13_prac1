import { NextFunction, Request, Response } from "express";
import { todoService } from "./todo.service";

// POST method
const createTodo = async(req: Request, res: Response, next: NextFunction) => {
     try{
          const result = await todoService.createTodo(req.body);

          res.status(201).json({
               success: true,
               message: "Todo created successfully",
               data: result
          });
     }catch(err) {
          return next(err);
     }
}

export const todoController = {
     createTodo,
}