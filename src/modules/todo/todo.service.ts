import { pool } from "../../config/db";
import AppError from "../../utils/AppError";

// POST method
const createTodo = async(payload: Record<string, unknown>) => {
     const { user_id, title } = payload;

     try{
          const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);

          return result.rows[0];
     }catch(err: any) {
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

const getTodoById = async(id: string) => {
     try{
          const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);
          
          if(result.rowCount === 0) {
               throw new AppError("Todo not found", 404);
          }

          return result.rows[0];
     }catch(err: any) {
          throw new AppError(err?.message || "Something went wrong", 500);
     }
}

// DELETE method
const deleteTodo = async(id: string) => {
     try{
          const result = await pool.query(`DELETE FROM todos WHERE id=$1 RETURNING *`, [id]);

          if(result.rowCount === 0) {
               throw new AppError("Todo not found", 404);
          }

          return result.rows[0];
     }catch(err: any) {
          throw new AppError(err?.message || "Something went wrong", 500);
     }
}

export const todoService = {
     createTodo,
     getTodos,
     getTodoById,
     deleteTodo,
}