import express from 'express';
import { dbConnection } from './config/db.js';
import { userRouter } from './routes/user_router.js';

// Create the express app
const app = express();

// Apply middlewares
app.use(express.json())

// Use routes
app.use('/api/v1', userRouter)

const PORT = process.env.PORT || 3040

// Connect to database
dbConnection()

// Listen for incoming requests
app.listen(PORT, () => {
    console.log('The app is listening')
})