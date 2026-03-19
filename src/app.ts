import express, { Request, Response } from "express";
import { userRoutes } from "./modules/user/user.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { todoRouter } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

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

// auth 
app.use("/auth", authRoutes);

// 404 not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: req?.path
  });
});

// middleware
app.use(globalErrorHandler);

export default app;