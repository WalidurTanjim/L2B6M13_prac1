import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import AppError from "../../utils/AppError";

// POST method
// create user
const createUser = async(payload: Record<string, unknown>) => {
     const { name, role, email, password } = payload;
     
     if(!email) {
          throw new AppError("Email is required", 400);
     }

     // hash password using bcryptjs
     const hashedPassword = await bcrypt.hash(password as string, 10);

     try{
          const result = await pool.query(`INSERT INTO users(name, role, email, password) VALUES($1, $2, $3, $4) RETURNING *`, [name, role, email, hashedPassword]);
          return result.rows[0];
     }catch(err: any) {
          if(err?.code === "23505") {
               if(err?.detail.includes("email")) {
                    throw new AppError("Email already exists", 409);
               }
          }

          throw new AppError(err?.message || "Database error", 500);
     }
}

export const userServices = {
     createUser,
}