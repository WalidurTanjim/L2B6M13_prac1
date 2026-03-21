import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
     return async(req: Request, res: Response, next: NextFunction) => {
          try{
               const token = req.headers.authorization;
               if(!token) throw new AppError("You are not allowed", 401);

               const secret = config.AUTH_SECRET;
               const decoded = jwt.verify(token, secret as string) as JwtPayload;
               req.user = decoded;

               if(roles.length && !roles.includes(decoded.role)) {
                    throw new AppError("Unauthorized access", 401);
               }

               next();
          }catch(err) {
               next(err);
          }
     }
};

export default auth;