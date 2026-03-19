import config from "../../config";
import { pool } from "../../config/db";
import AppError from "../../utils/AppError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST method
const loginUser = async(payload: Record<string, unknown>) => {
     const { email, password } = payload;

     try{
          const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

          if(result.rows.length === 0) return null;
          const user = result.rows[0];

          const matched = await bcrypt.compare(password as string, user?.password);
          if(!matched) return false;
          
          const token = jwt.sign({ name: user?.name, email: user?.email, role: user?.role }, config.AUTH_SECRET as string, { expiresIn: "7d" });
          
          return { token, user };
     }catch(err: any) {
          console.error(err, err.message)
          throw new AppError(err?.message || "Something went wrong", 500);
     }
}

export const authServices = {
     loginUser,
};