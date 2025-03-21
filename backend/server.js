import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import getInternshipsRouter from './routes/getInternships.js';
import saveInternshipRouter from './routes/saveInternships.js';
import uploadRouter from './Upload.js';
import contactRouter from './routes/contact.js'; // This now uses Resend

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import database connection
import connectDB from './db.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Increase payload limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api', getInternshipsRouter);
app.use('/api', saveInternshipRouter);
app.use('/api/upload', uploadRouter);
app.use('/api', contactRouter); // Contact routes now use Resend

console.log('Auth routes loaded');
console.log('Internship routes loaded');
console.log('Contact routes loaded with Resend email service');

// Test route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'MongoDB connection is working' });
});

// Test Resend configuration
app.get('/api/test-resend', (req, res) => {
  if (process.env.RESEND_API_KEY) {
    res.json({ message: 'Resend API key is configured' });
  } else {
    res.status(500).json({ message: 'Resend API key is missing' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} with Resend email service`));
