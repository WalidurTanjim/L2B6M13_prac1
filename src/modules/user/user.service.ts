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

// GET method
// get all users
const getUsers = async() => {
     try{
          const result = await pool.query(`SELECT * FROM users`);
          return result.rows;
     }catch(err: any) {
          throw new AppError(err?.message || "Users not available", 500)
     }
}

// get single user by id
const getUserById = async(id: string) => {
     try{
          const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
          return result.rows[0]
     }catch(err: any) {
          throw new AppError(err.message || "Something went wrong", 500);
     }
}

// DELETE method
const deleteUserById = async(id: string) => {
     try{
          const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [id]);

          if(result.rowCount === 0){
               return null;
          }else return result.rows;
     }catch(err: any) {
          throw new AppError(err.message || "Something went wrong", 500);
     }
}

// PUT method
const updateUserById = async(id: string, payload: Record<string, unknown>) => {
     const { name, email } = payload;

     if(!name) throw new AppError("Name is required", 500);
     if(!email) throw new AppError("Email is required", 500);

     try{
          const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`, [name, email, id]);
          
          if(result.rowCount === 0) {
               return null;
          }else return result.rows[0]
     }catch(err: any) {
          if(err.code === "23505") {
               if(err.detail.includes("email")) {
                    throw new AppError("Email already exists. Try another", 409);
               }
          }

          throw new AppError(err?.message || "Something went wrong", 500);
     }
}

export const userServices = {
     createUser,
     getUsers,
     getUserById,
     deleteUserById,
     updateUserById
}