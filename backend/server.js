// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes will go here
// Example route to test MongoDB connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'MongoDB connection is working' });
});

// Your actual data routes will go here
// Example:
// app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));