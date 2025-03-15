import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter for image files only
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});

// Create the router
const router = express.Router();

// Export the configured multer middleware for use in routes
export const uploadMiddleware = upload;

// Helper functions to handle Base64 images
export const saveBase64Image = (base64String) => {
  // If no image was uploaded
  if (!base64String) return null;
  
  try {
    // Extract the data from the base64 string
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      return null;
    }
    
    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Determine file extension based on mime type
    let ext = '.png'; // Default
    if (contentType === 'image/jpeg' || contentType === 'image/jpg') {
      ext = '.jpg';
    } else if (contentType === 'image/gif') {
      ext = '.gif';
    }
    
    // Generate a unique filename
    const filename = 'logo-' + Date.now() + ext;
    const filepath = path.join(uploadsDir, filename);
    
    // Write the file to disk
    fs.writeFileSync(filepath, buffer);
    
    // Return the path that can be stored in the database
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error saving base64 image:', error);
    return null;
  }
};

export default router;