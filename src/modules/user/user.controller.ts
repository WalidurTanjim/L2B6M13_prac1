import { NextFunction, Request, Response } from "express"
import { userServices } from "./user.service";
import AppError from "../../utils/AppError";

// POST method
// create user
const createUser = async(req: Request, res: Response, next: NextFunction) => {
     try{
          const { name, role, email, password } = req.body;
     
          if(!name || !role || !email || !password) {
               return next(new AppError("All fields are required", 400));
          }

          const result = await userServices.createUser(req.body);

          res.status(201).json({
               success: true,
               message: "User created successfully",
               data: result
          });
     }catch(err) {
          next(err);
     }
}

// GET method
// get all users
const getUsers = async(req: Request, res: Response, next: NextFunction) => {
     try{
          const result = await userServices.getUsers();

          if(result.length > 0){
               res.status(200).json({
                    success: true,
                    message: "Users fetched successfully",
                    data: result
               });
          }else{
               res.status(404).json({
                    success: false,
                    message: "Users not found",
                    data: null
               });
          }

     }catch(err) {
          next(err);
     }
}

export const userControllers = {
     createUser,
     getUsers,
}