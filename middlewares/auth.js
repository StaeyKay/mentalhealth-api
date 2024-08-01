import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user_model.js';
import { roles } from '../config/roles.js';

export const checkAuth = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            // Extract token from headers
            const token = req.headers.authorization.split(' ')[1]

            // Verify the token to get user and append user to request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

            next()
        } catch (error) {
            return res.status(401).json({ error: "Token Expired" })
        }
    }
    else {
        res.status(401).json({ error: 'Not authenticated' })
    }
}

export const hasPermission = (permission) => {
    return async (req, res, next) => {
        try {
            // Get user id from session or request
            const id = req.session?.user?.id || req.user?.id; 
            // Find user by id
            const user = await UserModel.findById(id);
            // Find user role with permissions
            const userRole = roles.find(element => element.role === user.role);
            // Use role to check if user has permission
            if (userRole && userRole.permissions.includes(permission)) {
                next();
            } else {
                res.status(403).json('Not authorized')
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }

    };
};