import { Router } from "express";
import { checkAuth, hasPermission } from "../middlewares/auth.js";
import { addResource, deleteResource, getResourceById, getResources, updateResource } from "../controllers/resource_controller.js";

export const resourceRouter = Router();

resourceRouter.post('/resources', checkAuth, hasPermission('create_resource'), addResource);
resourceRouter.get('/resources', checkAuth, hasPermission('read_resource'), getResources);
resourceRouter.get('/resources/:id', checkAuth, hasPermission('read_resource'), getResourceById);
resourceRouter.patch('/resources/:id', checkAuth, hasPermission('update_resource'), updateResource);
resourceRouter.delete('/resources/:id', checkAuth, hasPermission('delete_resource'), deleteResource);