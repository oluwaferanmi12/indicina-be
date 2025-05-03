// src/server.ts

import app from './app';
import dotenv from 'dotenv';

// Load environment variables from .env file if available
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});