import { Router } from "express";
import { checkAuth, hasPermission } from "../middlewares/auth.js";
import { addResource, deleteResource, getResourceById, getResources, updateResource } from "../controllers/resource_controller.js";

export const resourceRouter = Router();

resourceRouter.post('/users/resources', checkAuth, hasPermission('create_resource'), addResource);
resourceRouter.get('/users/resources', checkAuth, hasPermission('read_resource'), getResources);
resourceRouter.get('/users/resources/:id', checkAuth, hasPermission('read_resource'), getResourceById);
resourceRouter.patch('/users/resources/:id', checkAuth, hasPermission('update_resource'), updateResource);
resourceRouter.delete('/users/resources/:id', checkAuth, hasPermission('delete_resource'), deleteResource);