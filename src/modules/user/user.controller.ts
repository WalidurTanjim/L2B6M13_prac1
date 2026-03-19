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

export const userControllers = {
     createUser,
}