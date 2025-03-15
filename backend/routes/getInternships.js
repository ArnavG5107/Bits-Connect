// routes/getInternships.js
import express from 'express';
import Internship from '../models/Internship.js';

const router = express.Router();

// Get all internships
router.get('/internships', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internships', error: error.message });
  }
});

// Get a single internship by ID
router.get('/internships/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internship', error: error.message });
  }
});

// Search internships with filters
router.get('/internships/search', async (req, res) => {
  try {
    const { companyName, positionTitle, location, duration } = req.query;
    const query = {};
    
    if (companyName) query.companyName = { $regex: companyName, $options: 'i' };
    if (positionTitle) query.positionTitle = { $regex: positionTitle, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (duration) query.duration = { $regex: duration, $options: 'i' };
    
    const internships = await Internship.find(query).sort({ createdAt: -1 });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Error searching internships', error: error.message });
  }
});

export default router;