import { NextFunction, Request, Response } from "express";
import { todoService } from "./todo.service";
import AppError from "../../utils/AppError";

// POST method
const createTodo = async(req: Request, res: Response, next: NextFunction) => {
     const { user_id, title } = req.body;

     if(!user_id) throw new AppError("User ID is required", 400);
     if(!title) throw new AppError("Title is required", 400);

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

// GET method
const getTodos = async(req: Request, res: Response, next: NextFunction) => {
     try{
          const result = await todoService.getTodos();
          
          if(result.length > 0) {
               res.status(200).json({
                    success: true,
                    message: "Todos fetched successfully",
                    data: result
               });
          }else{
               res.status(404).json({
                    success: false,
                    message: "Todos not found",
                    data: null
               });
          }
     }catch(err) {
          return next(err);
     }
}

const getTodoById = async(req: Request, res: Response, next: NextFunction) => {
     const { id } = req.params;

     try{
          const result = await todoService.getTodoById(id as string);
          
          res.status(200).json({
               success: true,
               message: "Todo fetched successfully",
               data: result
          });
     }catch(err) {
          next(err);
     }
}

export const todoController = {
     createTodo,
     getTodos,
     getTodoById,
}