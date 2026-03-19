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

// DELETE method
const deleteTodo = async(req: Request, res: Response, next: NextFunction) => {
     const { id } = req.params;

     if(!id) throw new AppError("Id is required", 400);

     try{
          await todoService.deleteTodo(id as string);

          res.status(204).send();
     }catch(err) {
          next(err);
     }
}

// PUT method
const updateTodoById = async(req: Request, res: Response, next: NextFunction) => {
     const { id } = req.params;
     const { user_id, title } = req.body;

     if(!id) throw new AppError("Id is required", 400);
     if(!user_id) throw new AppError("User Id is required", 400);
     if(!title) throw new AppError("Title is required", 400);

     try{
          const result = await todoService.updateTodoById(id as string, req.body);

          res.status(200).json({
               success: true,
               message: "Todo updated successfully",
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
     deleteTodo,
     updateTodoById
}