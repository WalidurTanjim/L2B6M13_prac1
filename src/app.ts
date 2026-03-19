import express, { Request, Response } from "express";
import { userRoutes } from "./modules/user/user.routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// parser
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Next Level Development')
})

// users CRUD
app.use("/users", userRoutes);

// middleware
app.use(globalErrorHandler);

export default app;