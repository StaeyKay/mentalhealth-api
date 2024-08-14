import { Router } from "express";
import { getAllUsers, getProfessionals, login, signup, token } from "../controllers/user_controller.js";
import { checkAuth, hasPermission } from "../middlewares/auth.js";

export const userRouter = Router();

// Use routes
userRouter.post('/users/auth/register', signup);
userRouter.post('/users/auth/token', token);
userRouter.post('/users/auth/session', login);
userRouter.get('/users/auth', checkAuth, hasPermission('read_users'), getAllUsers);
userRouter.get('/users/auth/professionals', checkAuth, getProfessionals);