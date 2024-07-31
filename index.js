import express from 'express';

// Create the express app
const app = express();

const PORT = process.env.PORT || 3040

// Listen for incoming requests
app.listen(PORT, () => {
    console.log('The app is listening')
})