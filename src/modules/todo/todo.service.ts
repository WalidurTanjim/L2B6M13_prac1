import { pool } from "../../config/db";
import AppError from "../../utils/AppError";

// POST method
const createTodo = async(payload: Record<string, unknown>) => {
     const { user_id, title } = payload;

     if(!user_id) throw new AppError("User ID is required", 500);
     if(!title) throw new AppError("Valid title is required", 500);

     try{
          const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);

          return result.rows[0];
     }catch(err: any) {
          console.log(err);
          if(err.code === "23503") {
               if(err.detail.includes("user_id")) {
                    throw new AppError("User ID must be valid", 500)
               }
          }

          throw new AppError(err?.message || "Something went wrong", 500);
     }
}

// GET method
const getTodos = async() => {
     try{
          const result = await pool.query(`SELECT * FROM todos`);

          return result.rows;
     }catch(err: any) {
          throw new AppError(err.message || "Something went wrong", 500);
     }
}

export const todoService = {
     createTodo,
     getTodos,
}