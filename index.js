import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import expressOasGenerator from '@mickeymond/express-oas-generator';
import mongoose from 'mongoose';
import { dbConnection } from './config/db.js';
import { userRouter } from './routes/user_router.js';
import { resourceRouter } from './routes/resource_router.js';
import { supportGroupRouter } from './routes/supportGroup_router.js';

// Create the express app
const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth', 'resources', 'supportGroup'],
    mongooseModels: mongoose.modelNames()
})

// Apply middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: '*'}));

// Use routes
app.use('/api/v1', userRouter)
app.use('/api/v1', resourceRouter)
app.use('/api/v1', supportGroupRouter)

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

const PORT = process.env.PORT || 3040

// Connect to database
dbConnection()

// Listen for incoming requests
app.listen(PORT, () => {
    console.log('The app is listening')
})