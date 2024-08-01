import { Router } from "express";
import { login, signup, token } from "../controllers/user_controller.js";

export const userRouter = Router();

// Use routes
userRouter.post('/users/auth/register', signup);
userRouter.post('/users/auth/token', token);
userRouter.post('/users/auth/session', login)