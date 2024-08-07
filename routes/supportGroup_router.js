import { Router } from "express";
import { checkAuth, hasPermission } from "../middlewares/auth.js";
import { addGroup, deleteGroup, getGroupById, getGroups, joinGroup, leaveGroup, updateGroup } from "../controllers/supportGroup_controller.js";

export const supportGroupRouter = Router();

supportGroupRouter.post('/users/supportGroup', checkAuth, hasPermission('create_supportGroup'), addGroup);
supportGroupRouter.get('/users/supportGroup', getGroups);
supportGroupRouter.get('/users/supportGroup/:id', getGroupById);
supportGroupRouter.patch('/users/supportGroup/:id', checkAuth, hasPermission('update_supportGroup'), updateGroup);
supportGroupRouter.delete('/users/supportGroup/:id', checkAuth, hasPermission('delete_supportGroup'), deleteGroup);
supportGroupRouter.post('/users/supportGroup/join/:id', checkAuth, hasPermission('join_supportGroup'), joinGroup);
supportGroupRouter.post('/users/supportGroup/leave/:id', checkAuth, hasPermission('leave_supportGroup'), leaveGroup);
