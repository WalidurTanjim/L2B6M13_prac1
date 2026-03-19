import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { authServices } from "./auth.service";

// POST method
const loginUser = async(req: Request, res: Response, next: NextFunction) => {
     const { email, password } = req.body;

     if(!email) throw new AppError("Email is required", 400);
     if(!password) throw new AppError("Password is required", 400);

     try{
          const result = await authServices.loginUser(req.body);

          if(result === null) throw new AppError("Invalid email address", 401);
          if(result === false) throw new AppError("Invalid password", 401);

          res.status(200).json({
               success: true,
               message: "Login successful",
               data: result
          });
     }catch(err) {
          next(err);
     }
}

export const authController = {
     loginUser,
};