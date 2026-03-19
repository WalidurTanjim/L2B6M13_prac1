import express, { Request, Response } from "express";
import { userRoutes } from "./modules/user/user.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { todoRouter } from "./modules/todo/todo.routes";

const app = express();

// parser
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Next Level Development')
})

// users CRUD
app.use("/users", userRoutes);

// todo CRUD
app.use("/todos", todoRouter);

// middleware
app.use(globalErrorHandler);

export default app;