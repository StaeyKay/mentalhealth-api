import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model.js";
import { loginValidator, userValidator } from "../validators/user_validator.js";

export const signup = async (req, res) => {
    // Validate the user
    const {error, value} = userValidator.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // Check if user exists
    const email = value.email
    const findIfUserExists = await UserModel.findOne({email})
    if(findIfUserExists) {
        return res.status(401).send('User has already signed up')
    } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(value.password, 10)
        value.password = hashedPassword
    }

    // Create the user
    const addUser = await UserModel.create(value)

    // Return response
    return res.status(201).json({
        message: 'User registered successfully'
    })
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // Validate user
        const {error, value} = loginValidator.validate(req.body)
    
        // Check if user exists
        const user = await UserModel.findOne({email})
        if(!user) {
            return res.status(401).json({
                message: 'No user found'
            })
        }
    
        // Verify their password
        const correctPassword = bcrypt.compareSync(password, user.password)
        if(!correctPassword) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }
    
        // Generate a session
        req.session.user = {id: user.id}
    
        // Return response
        return res.status(200).json({
            message: 'Login successful'
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

export const token = async (req, res) => {
    try {

        const { email, password } = req.body
        // Validate user
        const {error, value} = loginValidator.validate(req.body)
    
        // Check if user exists
        const user = await UserModel.findOne({email})
        if(!user) {
            return res.status(401).json({
                message: 'No user found'
            })
        }
    
        // Verify their password
        const correctPassword = bcrypt.compareSync(password, user.password)
        if(!correctPassword) {
            return res.status(401).json({
                message: 'Invalid credentials'
            })
        }
    
        // Generate a token
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '72h'}
        )
    
        // Return response
        return res.status(200).json({
            message: 'Login successful',
            accessToken: token,
            user: {
                id: user.id,
                role: user.role // Include user role in response
            }
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// Endpoint to get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Server error' });
    }
};

export const getProfessionals = async (req, res) => {
    try {
        // Query the database for users with the role 'professional'
        const professionals = await UserModel.find({ role: 'professional' });

        // If no professionals are found, return a 404 status with a message
        if (!professionals.length) {
            return res.status(404).json({ message: 'No professionals found' });
        }

        // If professionals are found, return them with a 200 status
        res.status(200).json(professionals);
    } catch (error) {
        // Log the error and return a 500 status with an error message
        console.error('Error fetching professionals:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

