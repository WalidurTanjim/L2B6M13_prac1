import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = () => {
     return (req: Request, res: Response, next: NextFunction) => {
          const token = req.headers.authorization;
          if(!token) throw new AppError("You are not allowed", 401);

          const secret = config.AUTH_SECRET;
          const decoded = jwt.verify(token, secret as string);

          next();
     }
};

export default auth;